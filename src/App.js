import React, {useState} from 'react';
import Navigation from './components/Navigation';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {UserContext} from "./UserContext";

import PageRenderer from './page-renderer';

function App() {
  
  const [value, setValue] = useState({userName: "", isLoggedIn: false});

  console.log("In APp ");
  console.log(JSON.stringify(value));
 // var userLoggenIn = value.isLoggenIn 
 // ivalue.isLoggedIn)

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{value, setValue}}>
          <Navigation />
        </UserContext.Provider> 
        <Switch>
          <UserContext.Provider value={{value, setValue}}>
            <Route path="/:page" component={PageRenderer} />
            <Route path="/" render={() => <Redirect to="/home" />} />
          </UserContext.Provider>
          <Route component={() => 404} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
