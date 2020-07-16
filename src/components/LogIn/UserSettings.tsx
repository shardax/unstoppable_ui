import React, {useState, useEffect} from "react";
import {useDataStore} from "../../UserContext";
import {useHistory} from 'react-router-dom';
import { ProfileStore, ProfileProps } from '../../UserStore';
import axios from "axios";
import { PROFILEURL, ROOTURL} from "../../constants/matcher";
import AvatarEditor from 'react-avatar-editor';
import FlexView from 'react-flexview';
//import {PrintUserInfo, DisplayProfileActivityNames, DisplayExerciseReasons} from "./CommonElements";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Default from '../../layouts/Default'
import './UserSettings.scss'


const UserSettings = (props: ProfileProps) => {
  const store = useDataStore();
  const history = useHistory();
  const [showEmail, setShowEmail] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showDOB, setShowDOB] = useState(false);
  const [showZipcode, setShowZipcode] = useState(false);
  const [changeEmail, setChangeEmail] = useState(store.email);
  const [changeUsername, setChangeUsername] = useState(store.username);
  const [changeDOB, setChangeDOB] = useState(store.profile.dob);
  const [changeZipcode, setChangeZipcode] = useState(store.profile.zipcode);






  const profile = props.profile;
  
  //const handleEdit = (event: React.MouseEvent) => {
   // event.preventDefault();
   // store.editMode = true;
   // history.push("/profile");
 // }

 const handleEditEmail = (event: React.MouseEvent) => {
   event.preventDefault();
   setShowEmail(!showEmail);
  }
  const handleEditUsername = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowUsername(!showUsername);
   }
   const handleEditDOB = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowDOB(!showDOB);
   }
   const handleEditZipcode = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowZipcode(!showZipcode);
   }

  return (
    <Default>
    <div>
    <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl"> 
          <div className="profile-box">
      
      <table className="header">
      <td>
        <h1> Account Settings </h1>
      </td>
      </table>
      </div>


          
<div className="Values">
  <table>
    <tr>
      <td>
      <h4><b>Email: </b></h4>
      </td>
      <td>
        {!showEmail &&
          <div style={{fontSize: 20}}>
            {store.email}
          </div>
        }
        { showEmail && 
          <input 
          type="text"
          name="email"
          value={changeEmail}
          onChange={event => setChangeEmail(event.target.value)}
          />
        }
     </td>
     <td>
       {!showEmail &&
        <button className="editButton" onClick={handleEditEmail}>
              Edit
        </button>
       }
      { showEmail &&
        <button className="editButton" onClick={handleEditEmail}>
              save
        </button>
      }
      </td>
    </tr>
    <tr>
      <td>
         <h5><b>Username: </b></h5>
      </td>
      <td>
          {!showUsername &&
            <div style={{fontSize: 20}}>
             {store.username}
            </div>
          }
          { showUsername && 
            <input 
            type="text"
            name="username"
            value={changeUsername}
            onChange={event => setChangeUsername(event.target.value)}
            />
          }
      </td>
      <td>
        {!showUsername &&
          <button className="editButton" onClick={handleEditUsername}>
                Edit
          </button>
        }
        { showUsername &&
          <button className="editButton" onClick={handleEditUsername}>
              save
          </button>
        }
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Date of Birth: </b></h5>
      </td>
      <td>
        {!showDOB &&
          <div style={{fontSize: 20}}>
            {store.profile.dob}
          </div>
        }
        { showDOB && 
          <input 
          type="text"
          name="DOB"
          value={changeDOB}
          onChange={event => setChangeDOB(event.target.value)}
          />
        }
      </td>
      <td>
        {!showDOB &&
         <button className="editButton" onClick={handleEditDOB}>
              Edit
         </button>
        }
        { showDOB &&
          <button className="editButton" onClick={handleEditDOB}>
              save
          </button>
        }
      </td>
    </tr>
    <tr>
      <td>
      <h5><b>Zipcode: </b></h5>
      </td>
      <td>
        {!showZipcode &&
          <div style={{fontSize: 20}}>
            {store.profile.zipcode}
          </div>
        }
        { showZipcode && 
          <input 
          type="text"
          name="zipcode"
          value={changeZipcode}
          onChange={event => setChangeZipcode(event.target.value)}
          />
        }
      </td>
      <td>
        {!showZipcode &&
          <button className="editButton" onClick={handleEditZipcode}>
                Edit
          </button>
        }
        { showZipcode &&
          <button className="editButton" onClick={handleEditZipcode}>
              save
          </button>
        }
      </td>
    </tr>
    <tr>
    </tr>
  </table>
</div>
<div className="SaveButton">
    <table className="header">
        <tr>
        </tr>
      </table>
    </div>
  </Container>
      </React.Fragment>
      
    </div>
    </Default>
      );   
}
export default UserSettings;
  