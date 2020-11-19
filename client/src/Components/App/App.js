import React, { useEffect } from 'react';
import './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';
import Admin from '../Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  useEffect(() => {
  
  }, [])
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
}

export default App;
