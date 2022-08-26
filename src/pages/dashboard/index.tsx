import Card from '@/components/General/Card';
import PageWrapper from '@/components/General/PageWrapper';
import ProductModal from '@/components/ProductModal';
import { useApi } from '@/hooks/useApi';
import Navbar from '@/layouts/Navbar';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import { dehydrate, DehydratedState, QueryClient, useQuery } from 'react-query';

interface DashboardPageType {
  token: string;
}

export interface ProductTypes {
  id: number;
  name: string;
  imageurl: string;
  price: string;
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<{
  props?: { token?: string; dehydratedState?: DehydratedState };
  redirect?: { permanent: boolean; destination: string };
}> {
  const { token } = nookies.get(ctx);
  const queryClient = new QueryClient();

  if (!token) {
    return {
      redirect: { permanent: false, destination: '/' },
    };
  }

  await queryClient.prefetchQuery(['products'], async () => {
    const { data } = await axios.get(
      'https://test-binar.herokuapp.com/v1/products',
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data.result;
  });

  const dehydratedState = dehydrate(queryClient);

  return {
    props: { token, dehydratedState },
  };
}

const DashboardPage: NextPage<DashboardPageType> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { instance } = useApi();
  const { data, isLoading, isError, refetch, isRefetching } = useQuery(
    ['products'],
    async () => {
      try {
        const { data } = await instance.get('/v1/products');

        return data.result;
      } catch (error) {
        console.log(error);
      }
    }
  );

  if (isError) return <Text>...Something went wrong</Text>;

  if (isLoading) return <Text>...Loading</Text>;

  return (
    <>
      <ProductModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      <Navbar onOpen={onOpen} />
      <Head>
        <title>Dashboard | Mock Test</title>
      </Head>

      <PageWrapper>
        <Box
          display={'grid'}
          gridTemplateColumns={{
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          }}
          gap={'1rem'}
          placeContent="center"
        >
          {data?.map((item: ProductTypes, idx: number) => {
            return (
              <Card item={item} key={`${idx}-${item.id}`} refetch={refetch} />
            );
          })}
        </Box>
      </PageWrapper>
    </>
  );
};

export default DashboardPage;
