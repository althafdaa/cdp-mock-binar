import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import Card from '@/components/General/Card';
import PageWrapper from '@/components/General/PageWrapper';
import { Box, Image } from '@chakra-ui/react';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';

interface DashboardPageType {
  token: string;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { token } = nookies.get(ctx);

  if (!token) {
    return {
      redirect: { permanent: false, destination: '/' },
    };
  } else {
    return {
      props: { token },
    };
  }
}

const dummy = {
  title: 'Rumah mewah',
  price: '1500',
  imageUrl: 'https://dummyimage.com/600x400/000/fff',
};

const DashboardPage: NextPage<DashboardPageType> = ({ token }) => {
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
          <Card item={dummy} />
          <Card item={dummy} />
          <Card item={dummy} />
        </Box>
      </PageWrapper>
    </>
  );
};

export default DashboardPage;
