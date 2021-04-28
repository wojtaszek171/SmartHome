import React, { FC } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';
import Admin from '../Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import SideMenu from '../SideMenu';

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
          <Footer />
        </Router>
      </div>
  );
};

export default App;
