import Card from '@/components/General/Card';
import PageWrapper from '@/components/General/PageWrapper';
import { useApi } from '@/hooks/useApi';
import { Box } from '@chakra-ui/react';
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
    await axios.get('https://test-binar.herokuapp.com/v1/products', {
      headers: {
        Authorization: token,
      },
    });
  });

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return {
    props: { token, dehydratedState },
  };
}

const DashboardPage: NextPage<DashboardPageType> = ({ token }) => {
  const { instance } = useApi();
  const { data, error, isLoading } = useQuery(['products'], async () => {
    try {
      const { data } = await instance.get('/v1/products');

      return data.result;
    } catch (error) {
      console.log(error);
    }
  });

  if (isLoading) return <div>...Loading</div>;

  return (
    <>
      <Head>
        <title>Dashboard | Mock Test</title>
      </Head>

      <PageWrapper>
        <Box
          display={'grid'}
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          gap={'0.5rem'}
        >
          {data?.map((item: ProductTypes, idx: number) => {
            return <Card item={item} key={`${idx}-${item.id}`} />;
          })}
        </Box>
      </PageWrapper>
    </>
  );
};

export default DashboardPage;
