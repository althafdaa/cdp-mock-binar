import * as y from 'yup';

export const LoginValidationSchema = y.object().shape({
  email: y.string().email().required('Email is required'),
  password: y.string().required('Password is required'),
});
