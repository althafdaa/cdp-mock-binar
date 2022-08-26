import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useApi } from '@/hooks/useApi';
import { ProductTypes } from '@/pages/dashboard';
import { Box, Img, useDisclosure } from '@chakra-ui/react';
import React, { FC } from 'react';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
  useMutation,
} from 'react-query';

interface CardProps {
  item: ProductTypes;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const Card: FC<CardProps> = ({ item, refetch }) => {
  const { instance } = useApi();
  const deleteMutation = useMutation(async (id: number) => {
    try {
      return instance.delete(`/v1/products/${id}`);
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleDelete = async () => {
    try {
      deleteMutation.mutate(item.id, {
        onSuccess: () => {
          refetch();
          onClose();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        item={item}
        handleOk={handleDelete}
      />
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        display={'flex'}
        flexDirection="column"
        position={'relative'}
        boxShadow="md"
      >
        <Box
          display={'flex'}
          gap="0.5rem"
          bg={'gray.100'}
          opacity="0.8"
          position={'absolute'}
          right="0"
          p={'0.2rem'}
          rounded="lg"
          m={'0.2rem'}
        >
          <Box as="button">
            <EditIcon styleProps={{ style: { height: '24px' } }} />
          </Box>
          <Box as="button" onClick={onOpen}>
            <DeleteIcon styleProps={{ style: { height: '24px' } }} />
          </Box>
        </Box>

        <Img loading="lazy" maxH={'200px'} src={item.imageurl} alt={'image'} />

        <Box p="6">
          <Box display="flex" alignItems="baseline"></Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {item.name}
          </Box>

          <Box>${item.price}</Box>
        </Box>
      </Box>
    </>
  );
};

export default Card;
