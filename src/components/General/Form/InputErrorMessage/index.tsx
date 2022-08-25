import { FormErrorMessage } from '@chakra-ui/react';
import React, { FC } from 'react';

interface InputErrorMessageProps {
  name: string;
  formik: any;
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ name, formik }) => {
  const formValidationErrorProps = {
    fontSize: 'xs',
    color: 'red',
  };

  return (
    <>
      {formik.errors[name] && formik.touched[name] && (
        <FormErrorMessage {...formValidationErrorProps}>
          {formik.errors[name]}
        </FormErrorMessage>
      )}
    </>
  );
};

export default InputErrorMessage;
