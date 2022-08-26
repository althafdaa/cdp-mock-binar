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
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useFormik } from 'formik';
import { isFormInvalid, RegisterValidationSchema } from '@/utils/validation';
import { useMutation } from 'react-query';
import { useApi } from '@/hooks/useApi';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface RegisterFormikInputType {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: NextPage = () => {
  const { instance } = useApi();
  const router = useRouter();
  const toast = useToast();

  const registerMutation = useMutation(
    async (payload: RegisterFormikInputType) => {
      try {
        return await instance.post('/auth/signup', { ...payload });
      } catch (error) {
        const err = error as Error;
        throw new Error(err.message);
      }
    }
  );

  const handleSubmit = async (values: RegisterFormikInputType) => {
    try {
      registerMutation.mutate(values, {
        onSuccess: ({ data }) => {
          if (Boolean(data.errors)) {
            toast({
              title: 'Something went wrong',
              status: 'error',
              position: 'top-right',
              isClosable: true,
              duration: 1000,
            });
            return;
          }

          toast({
            title: 'Registration Success',
            status: 'success',
            position: 'top-right',
            isClosable: true,
            duration: 1000,
          });
          router.push('/');
        },
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
      name: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterValidationSchema,
  });

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
              <FormControl isInvalid={isFormInvalid('name', formik)}>
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
              <FormControl isInvalid={isFormInvalid('email', formik)}>
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

              <FormControl isInvalid={isFormInvalid('password', formik)}>
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

              <Button
                type="submit"
                colorScheme={'whatsapp'}
                isLoading={formik.isSubmitting}
              >
                Register
              </Button>
            </form>
          </Box>
          <Text fontSize={'sm'} textAlign="center">
            Already have an account ?{' '}
            <Link href={'/'} passHref>
              <a>Login</a>
            </Link>
          </Text>
        </Box>
      </PageWrapper>
    </>
  );
};

export default RegisterPage;
