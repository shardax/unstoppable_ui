import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {StoreProvider} from "./UserContext";
import PageRenderer from './page-renderer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Pages
import User from './pages/user';
import About from './components/Register/About';
import Inbox from './components/Inbox/Inbox';
import ForgotPasswordForm from './components/LogIn/ForgotPasswordForm';
import ChatroomMessagesList from './components/Chatroom/ChatroomMessagesList';

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
                <Route path="/user/:id" component={User} />
                <Route path="/complete-profile/:stepId" component={About} />
                <Route path="/userMessage/:user_id" component={Inbox} />
                <Route path="/forgotPassword/:tokenId" component={ForgotPasswordForm} />
                <Route path="/chatroomDetails/:chatroomId" component={ChatroomMessagesList} />
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
