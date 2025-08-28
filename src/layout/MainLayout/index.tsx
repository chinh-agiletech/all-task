import CustomForm from '@components/Form';
import dynamic from 'next/dynamic';

const MainHeader = dynamic(() => import('../components/MainHeader'));

const Footer = dynamic(() => import('../components/Footer'));

const MainLayout = ({ children }: any) => {
  return (
    <>
      {/* <MainHeader /> */}
      {/* <main>{children}</main> */}
      {/* <Footer /> */}
      <CustomForm />
    </>
  );
};

export default MainLayout;
