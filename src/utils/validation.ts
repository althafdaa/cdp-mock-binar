import * as y from 'yup';

export const LoginValidationSchema = y.object().shape({
  email: y.string().email().required('Email is required'),
  password: y.string().required('Password is required'),
});

export const RegisterValidationSchema = y.object().shape({
  name: y.string().required('Name is required'),
  email: y
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: y.string().required('Password is required'),
});

export const AddProductValidationSchema = y.object().shape({
  name: y.string().required('Name is required'),
  price: y.number().required('Price is required'),
  imageurl: y.string().required('Image url is required'),
});

export const UpdateProductValidationSchema = y.object().shape({
  name: y.string().required('Name is required'),
  price: y.number().required('Price is required'),
  imageurl: y.string().required('Image url is required'),
});

export const isFormInvalid = (name: string, formik: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (formik.errors[name] && formik.touched[name]) return true;
  else false;
};
