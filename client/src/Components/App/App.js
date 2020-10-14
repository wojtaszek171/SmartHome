import React, { useEffect } from 'react';
import './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';
import LeftMenu from '../LeftMenu/LeftMenu';

function App() {

  useEffect(() => {
  
  }, [])
  return (
    <div className="App">
      <Header />
      <div className="appMiddle">
        <LeftMenu />
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
