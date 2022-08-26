import { ProductTypes } from '@/pages/dashboard';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React, { FC } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ProductTypes;
  handleOk: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  item,
  handleOk,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete {item.name} ?</ModalBody>

        <ModalFooter>
          <Button colorScheme="pink" mr={3} onClick={onClose}>
            No
          </Button>
          <Button type="submit" colorScheme={'whatsapp'} onClick={handleOk}>
            Yes, Delete it
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
