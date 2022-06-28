import React from 'react';
import {Bids, Header, Navbar, Footer} from '../../components'


const Home = () => {

  return <div>
  <Navbar/>
   <Header />
   {/* <Description /> */}
   <Bids title="Hot Bids"  />
   <Footer />
  </div>;
};

export default Home;
