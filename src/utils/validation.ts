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
