import React, { FC } from 'react';
import { Footer, Modal } from 'pwojtaszko-design';
import Content from '../Content';
import Admin from '../Admin';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SideMenu from '../SideMenu';
import Header from '../Header';
import { useSelector } from 'react-redux';
import { getIsTokenValid } from 'src/selectors/session';
import './App.scss';
import Register from '../Register';

interface AppProps {
  isAdminConfigured: boolean;
  onRegister: () => void;
};

const App: FC<AppProps> = ({ isAdminConfigured, onRegister }) => {
  const isTokenValid = useSelector(getIsTokenValid);

  return (
    <div className="App">
      <Modal
        show={isAdminConfigured}
      >
        <Register
          onRegister={onRegister}
        />
      </Modal>
      <Router>
        <Header/>
          <div className="appMiddle">
            <Route path="/">
              <Content />
              {isTokenValid &&
                <SideMenu >
                  <Admin />
                </SideMenu>
              }
            </Route>
          </div>
        <Footer
          middle={<span className="footer-text">This is footer. Made by Paweł Wojtaszko</span>}
        />
      </Router>
      <div id="portal-root" />
    </div>
  );
};

export default App;
