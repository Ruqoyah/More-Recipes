import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const PageNotFound = () => (
  <div>
    <Header />
    <div className="not-found">
      <div> <img src="images/alert.png" /> </div> <br/>
      <h1>404 - Page Not Found</h1>
    </div>
    <Footer />
  </div>
);

export default PageNotFound;
