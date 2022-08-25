import PageWrapper from '@/components/General/PageWrapper';
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

const DashboardPage: NextPage<DashboardPageType> = ({ token }) => {
  return (
    <>
      <Head>
        <title>Page Title</title>
      </Head>

      <PageWrapper>dashboard</PageWrapper>
    </>
  );
};

export default DashboardPage;
