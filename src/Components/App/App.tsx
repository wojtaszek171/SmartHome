import React, { FC } from 'react';
import { Footer, Modal } from 'pwojtaszko-design';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getIsTokenValid } from 'src/selectors/session';
import Admin from '../Admin';
import Content from '../Content';
import Header from '../Header';
import Register from '../Register';
import SideMenu from '../SideMenu';
import './App.scss';

interface AppProps {
  isAdminConfigured: boolean;
  onRegister: () => void;
}

const App: FC<AppProps> = ({ isAdminConfigured, onRegister }) => {
  const isTokenValid = useSelector(getIsTokenValid);

  return (
    <div className='App'>
      <Modal
        show={isAdminConfigured}
      >
        <Register
          onRegister={onRegister}
        />
      </Modal>
      <Header/>
      <div className='appMiddle'>
        {isTokenValid &&
          <SideMenu >
            <Admin />
          </SideMenu>
        }
        <Router>
          <Routes>
            <Route path='/' element={<Content />}/>
          </Routes>
        </Router>
      </div>
      <Footer
        middle={<span className='footer-text'>This is footer. Made by Paweł Wojtaszko</span>}
      />
      <div id='portal-root' />
    </div>
  );
};

export default App;
