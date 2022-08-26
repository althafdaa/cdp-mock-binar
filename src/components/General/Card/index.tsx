import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import { Box, Image } from '@chakra-ui/react';
import React, { FC } from 'react';

interface ProductTypes {
  title: string;
  imageUrl: string;
  price: string;
}

interface CardProps {
  item: ProductTypes;
}

const Card: FC<CardProps> = ({ item }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display={'flex'}
      flexDirection="column"
      position={'relative'}
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
        <Box as="button">
          <DeleteIcon styleProps={{ style: { height: '24px' } }} />
        </Box>
      </Box>

      <Image src={item.imageUrl} alt={'image'} />

      <Box p="6">
        <Box display="flex" alignItems="baseline"></Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {item.title}
        </Box>

        <Box>${item.price}</Box>
      </Box>
    </Box>
  );
};

export default Card;
