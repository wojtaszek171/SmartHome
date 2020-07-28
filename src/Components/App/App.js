import React from 'react';
import './App.scss';
import Button from '../Button';
import Header from '../Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Button text={'Przycisk'} onClick={()=>{console.log('button clicked');}}/>
    </div>
  );
}

export default App;
