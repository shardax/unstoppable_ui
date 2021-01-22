import React from 'react'
import Paper from '../components/Styled/Paper';
import Button from '../components/Styled/Button';
import Default from '../layouts/Default';

const ForwardUserToLogin = () => {
    return ( 
        <div>
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


export default function SentEmail() {

  
  return (
    <div style={{ margin: "25px auto", maxWidth: "600px"}} className="form-spacing">
            <div className="form-container user-section-wrapper">
                <div className="user-section-data">
                    <Paper>
                        <h4><span>An Email has been sent to your account. Please check email and follow the instructions. </span></h4>
                        <ForwardUserToLogin />
                    </Paper>
                </div>
            </div>
        </div>
    )
  }