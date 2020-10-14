import React from 'react'
import Input from '../components/Styled/Input';
import Paper from '../components/Styled/Paper';
import Button from '../components/Styled/Button';

const ForwardUserToLogin = () => {
  return ( 
      <div>
        <p> You have have successfully confirmed your pin. </p>
          <form onSubmit={handleLogin}>
              <Button
                  type='submit'
                  value='login'
            >Login</Button>
          </form>
          <br/>
      </div>
    
  )
}

const handleLogin = async e => {
  e.preventDefault();
  window.location.pathname = '/login'
}

export default function Welcome() {
  //const history = createBrowserHistory({ forceRefresh: true });
  
  return (
    <div>
      <div className="form-container user-section-wrapper">
        <div className="user-section-data">
        <Paper>
            <h2><span>Welcome to 2Unstoppable!</span></h2>
            <p> <span>Your email has been confirmed. You may now proceed to login.</span></p>
            <ForwardUserToLogin />
        </Paper>
      </div></div></div>
    
    )
  }