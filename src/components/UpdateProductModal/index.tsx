import { useApi } from '@/hooks/useApi';
import { ProductTypes } from '@/pages/dashboard';
import { AddProductValidationSchema, isFormInvalid } from '@/utils/validation';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  useToast,
} from '@chakra-ui/react';
import { FormikHelpers, useFormik } from 'formik';
import React, { FC } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';
import InputErrorMessage from '../General/Form/InputErrorMessage';

interface UpdateProductModalTypes {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  item: ProductTypes;
}

interface UpdateProductModalFormikType {
  id: number;
  name?: string;
  price?: string;
  imageurl?: string;
}

const UpdateProductModal: FC<UpdateProductModalTypes> = ({
  isOpen,
  onClose,
  refetch,
  item,
}) => {
  const { instance } = useApi();
  const toast = useToast();
  const updateProductMutation = useMutation(
    async (data: UpdateProductModalFormikType) => {
      const { name, imageurl, price } = data || {};

      const payload = { name, imageurl, price };

      if (!name || name === item.name) delete payload.name;
      if (!imageurl || imageurl === item.imageurl) delete payload.imageurl;
      if (!price || price === item.price) delete payload.price;

      try {
        return await instance.put(`/v1/products${data.id}`, {
          ...payload,
        });
      } catch (error) {
        const err = error as Error;
        throw new Error(err.message);
      }
    }
  );

  const formik = useFormik({
    onSubmit: async (
      values: UpdateProductModalFormikType,
      actions: FormikHelpers<any>
    ) => {
      updateProductMutation.mutate(
        { ...values, id: item.id },
        {
          onSuccess: () => {
            refetch();
            toast({
              status: 'success',
              title: 'Product added',
              duration: 1000,
              position: 'top-right',
            });
            onClose();
            actions.resetForm();
          },
          onError: () => {
            toast({
              status: 'error',
              title: 'Something went wrong',
              duration: 1000,
              position: 'top-right',
            });
          },
        }
      );
    },
    initialValues: {
      id: item.id,
      name: item.name,
      price: item.price,
      imageurl: item.imageurl,
    },
    validationSchema: AddProductValidationSchema,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Box display={'flex'} flexDirection="column" gap={'0.5rem'}>
              <FormControl isInvalid={isFormInvalid('name', formik)}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  type={'text'}
                />

                <InputErrorMessage name="name" formik={formik} />
              </FormControl>
              <FormControl isInvalid={isFormInvalid('price', formik)}>
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Price (Dollar USD)"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  type={'text'}
                />

                <InputErrorMessage name="price" formik={formik} />
              </FormControl>
              <FormControl isInvalid={isFormInvalid('imageurl', formik)}>
                <FormLabel>Image Url</FormLabel>
                <Input
                  placeholder="Image Url"
                  name="imageurl"
                  value={formik.values.imageurl}
                  onChange={formik.handleChange}
                  type={'text'}
                />

                <InputErrorMessage name="imageurl" formik={formik} />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button
              type="submit"
              colorScheme={'whatsapp'}
              isLoading={formik.isSubmitting}
            >
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProductModal;
