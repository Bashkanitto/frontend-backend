import React from 'react';
import Hero from './Hero/Hero';
import Banner from './Banner/Banner';
import FadeInWrapper from '../utils/FadeInWrapper';
import Footer from './Footer/Footer';
import Features from './Features/Features';

const Layout = () => {
  return (
    <>
      <Hero />
      <FadeInWrapper>
        <Banner
          title="Need to customize this template?"
          subtitle="bbb"
          buttonText="View"
          leftIcon="/images/gamepad.svg"
          rightImage="/images/banner1.avif"
        />
        <Features />
      </FadeInWrapper>
      <FadeInWrapper>
        <Footer />
      </FadeInWrapper>
    </>
  );
};

export default Layout;
