import InputErrorMessage from '@/components/General/Form/InputErrorMessage';
import PageWrapper from '@/components/General/PageWrapper';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
  Heading,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useFormik } from 'formik';
import { RegisterValidationSchema } from '@/utils/validation';

interface RegisterFormikInputType {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: NextPage = () => {
  const toast = useToast();

  const handleSubmit = async (values: RegisterFormikInputType) => {
    try {
      console.log(values);
    } catch (error) {
      const err = error as Error;
      toast({
        title: err.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 1000,
      });
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterValidationSchema,
  });

  const isFormInvalid = (name: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (formik.errors[name] && formik.touched[name]) return true;
    else false;
  };

  return (
    <>
      <Head>
        <title>Register | Mock Test</title>
      </Head>

      <PageWrapper
        stylingProps={{
          minH: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box as="section">
          <Heading textAlign={'center'} mb="1rem" fontWeight={'500'}>
            REGISTER
          </Heading>
          <Box p={'2rem'} mb="1rem" borderWidth={'1px'} borderRadius="lg">
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <FormControl isInvalid={isFormInvalid('email')}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  type={'name'}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Enter your name here"
                />

                <InputErrorMessage name="name" formik={formik} />
              </FormControl>
              <FormControl isInvalid={isFormInvalid('email')}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type={'email'}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Enter your email here"
                />

                <InputErrorMessage name="email" formik={formik} />
              </FormControl>

              <FormControl isInvalid={isFormInvalid('password')}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type={'password'}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter your email here"
                />
                <InputErrorMessage name="password" formik={formik} />
              </FormControl>

              <Button type="submit" colorScheme={'whatsapp'}>
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </PageWrapper>
    </>
  );
};

export default RegisterPage;