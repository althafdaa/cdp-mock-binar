import InputErrorMessage from '@/components/General/Form/InputErrorMessage';
import PageWrapper from '@/components/General/PageWrapper';
import { useApi } from '@/hooks/useApi';
import { LoginValidationSchema } from '@/utils/validation';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

interface LoginFormikInputType {
  email: string;
  password: string;
}

const Home: NextPage = () => {
  const { instance } = useApi();

  const loginMutation = useMutation(async (payload: LoginFormikInputType) => {
    try {
      await instance.post('/auth/login', { ...payload });
    } catch (error) {
      throw new Error(error);
    }
  });

  const toast = useToast();
  const handleSubmit = (values: LoginFormikInputType) => {
    try {
      const payload = { email: values.email, password: values.password };

      loginMutation.mutate(payload);

      toast({
        title: 'Login Success',
        status: 'success',
        position: 'top-right',
        isClosable: true,
        duration: 1000,
      });
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
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
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
        <title>Login | Mock Test</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
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
            LOGIN
          </Heading>

          <Box p={'2rem'} borderWidth={'1px'} borderRadius="lg">
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
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
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </PageWrapper>
    </>
  );
};

export default Home;
