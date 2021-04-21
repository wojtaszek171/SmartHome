import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';
import Admin from '../Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

const App: React.FC = () => {

  return (
      <div className="App">
        <Router>
          <Header />
            <div className="appMiddle">
              <Switch>
                <Route path="/" exact>
                  <Content />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
              </Switch>
            </div>
          <Footer />
        </Router>
      </div>
  );
};

export default App;
