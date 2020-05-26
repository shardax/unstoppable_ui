import { observer, useAsObservableSource, useLocalStore } from "mobx-react"
import React, {useState} from 'react';
import Navigation from './components/Navigation';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {UserContext, StoreProvider} from "./UserContext";
import PageRenderer from './page-renderer';

const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  );
};

function App() {
  

  return (
    <StoreProvider>
      <Router>
        <div className="App">
            <Navigation />
          <Switch>
            <Route path="/:page" component={PageRenderer} />
            <Route path="/" render={() => <Redirect to="/home" />} />
            <Route component={NoMatchPage} />
          </Switch>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
