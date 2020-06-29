import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {StoreProvider} from "./UserContext";
import PageRenderer from './page-renderer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  );
};

const App: React.FC = () => {
  return (
    <>
      <StoreProvider>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/:page" component={PageRenderer} />
              <Route path="/" render={() => <Redirect to="/home" />} />
              <Route component={NoMatchPage} />
            </Switch>
          </div>
        </Router>
      </StoreProvider>
    </>
  );
}

export default App;
