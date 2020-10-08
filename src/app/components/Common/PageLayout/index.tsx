import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

function PageLayout({ children }: any) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default PageLayout;
