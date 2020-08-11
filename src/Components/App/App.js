import React, { useEffect } from 'react';
import './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';

function App() {

  useEffect(() => {
  
  }, [])
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
