import React, { FC } from 'react';
import { Footer } from 'pwojtaszko-design';
import Content from '../Content';
import Admin from '../Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideMenu from '../SideMenu';
import Header from '../Header';
import './App.scss';

interface AppProps {
  isTokenValid: boolean;
};

const App: FC<AppProps> = ({ isTokenValid }) => {
  return (
    <div className="App">
      <Router>
        <Header/>
          <div className="appMiddle">
            <Switch>
              <Route path="/" exact>
                <Content />
                {isTokenValid &&
                  <SideMenu >
                    <Admin />
                  </SideMenu>
                }
              </Route>
            </Switch>
          </div>
        <Footer
          middle={<span className="footer-text">This is footer. Made by Paweł Wojtaszko</span>}
        />
      </Router>
    </div>
  );
};

export default App;
