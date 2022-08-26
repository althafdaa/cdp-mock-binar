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
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import InputErrorMessage from '../General/Form/InputErrorMessage';

interface ProductModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ProductModalFormikType {
  name: string;
  price: string;
  imageurl: string;
}

const ProductModal: FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const formik = useFormik({
    onSubmit: (values: ProductModalFormikType) => {
      console.log(values);
    },
    initialValues: {
      name: '',
      price: '',
      imageurl: '',
    },
    validationSchema: AddProductValidationSchema,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
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
            <Button type="submit" colorScheme={'whatsapp'}>
              Add Product
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
