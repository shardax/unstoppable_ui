import React, { useState, useEffect } from "react";
import { useDataStore } from "../../UserContext";
import { ProfileProps } from '../../UserStore';
import EditUsername from '../Auth/EditUsername';
import EditEmail from '../Auth/EditEmail';
import EditZipcode from '../Auth/EditZipcode';
import EditPassword from '../Auth/EditPassword';
import EditPhone from '../Auth/EditPhone';
import EditDOB from '../Auth/EditDOB';
import Default from '../../layouts/Default'
import './UserSettings.scss'
import Button from '../Styled/Button'
import Paper from '../Styled/Paper';
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";

// ProfileIconBlock takes up only half of a Paper row (so 2 blocks fit on one row)
const ProfileIconBlock = ({ field, answer }) => {
  if (!answer || answer === "") {
    return null
  }

  return (
    <div className="profile-block">
      <div className="full-profile-icon-row">
        <div className="field-header">
          <div>{field}</div>
        </div>
        <div className="field-answer muted-text">{answer}</div>
      </div>
    </div>
  )
}

const UserSettings = (props: ProfileProps) => {
  const store = useDataStore();
  const [showEmail, setShowEmail] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showDOB, setShowDOB] = useState(false);
  const [showZipcode, setShowZipcode] = useState(false);
  const [ZipcodeDisable, setZipcodeDisable] = useState(true);
  const [EmailDisable, setEmailDisable] = useState(true);
  const [UsernameDisable, setUsernameDisable] = useState(true);
  const [DOBDisable, setDOBDisable] = useState(true);
  const [PasswordDisable, setPasswordDisable] = useState(true);
  const [PhoneDisable, setPhoneDisable] = useState(true);


  useEffect(() => {
    setZipcodeDisable(!ZipcodeDisable);
    setEmailDisable(!EmailDisable);
    setDOBDisable(!DOBDisable);
    setPasswordDisable(!PasswordDisable);
    setPhoneDisable(!PhoneDisable);
  },
    [showUsername]);

  useEffect(() => {
    setZipcodeDisable(!ZipcodeDisable);
    setUsernameDisable(!UsernameDisable);
    setDOBDisable(!DOBDisable);
    setPasswordDisable(!PasswordDisable);
    setPhoneDisable(!PhoneDisable);
  },
    [showEmail]);

  useEffect(() => {
    setUsernameDisable(!UsernameDisable);
    setEmailDisable(!EmailDisable);
    setDOBDisable(!DOBDisable);
    setPasswordDisable(!PasswordDisable);
    setPhoneDisable(!PhoneDisable);
  },
    [showZipcode]);

  useEffect(() => {
    setZipcodeDisable(!ZipcodeDisable);
    setEmailDisable(!EmailDisable);
    setUsernameDisable(!UsernameDisable);
    setPasswordDisable(!PasswordDisable);
    setPhoneDisable(!PhoneDisable);
  },
    [showDOB]);

  useEffect(() => {
    setZipcodeDisable(!ZipcodeDisable);
    setEmailDisable(!EmailDisable);
    setUsernameDisable(!UsernameDisable);
    setDOBDisable(!DOBDisable);
    setPhoneDisable(!PhoneDisable);
  },
    [showPassword]);

  useEffect(() => {
    setZipcodeDisable(!ZipcodeDisable);
    setEmailDisable(!EmailDisable);
    setUsernameDisable(!UsernameDisable);
    setDOBDisable(!DOBDisable);
    setPasswordDisable(!PasswordDisable);
  },
    [showPhone]);

  const handleEditEmail = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowEmail(!showEmail);
  }
  const handleEditUsername = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowUsername(!showUsername);
  }
  const handleEditPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  }
  const handleEditDOB = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowDOB(!showDOB);
  }
  const handleEditZipcode = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowZipcode(!showZipcode);
  }
  const handleEditPhone = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPhone(!showPhone);
  }

  return (
    <div className="account-settings-default">
      <Default>

        <div className="Values">
          <div className="account-settings-page-header">Account Settings</div>

          <Paper style={{ marginLeft: "auto" , marginRight: "auto"}}  className="paper-block">
            {/* <div className="full-width">
              <ProfileIconBlock field={"Avatar Image"} answer={
                <div className="photo-cropper">
                  <img className="user-section-image" src={ROOTURL + store.avatarPath} />
                </div>
              } />
            </div> */}


            {/* <ProfileIconBlock field={"User Name"} answer={
              <div>
                <input className="readonly-input-field" type="text" value={store.username} readOnly />
              </div>
            } />
            <ProfileIconBlock field={"Email Address"} answer={
              <div>
                <input className="readonly-input-field" type="text" value={store.email} readOnly />
              </div>
            } />
            <ProfileIconBlock field={"Phone Number"} answer={
              <div>
                <input className="readonly-input-field" type="text" value={store.phone} readOnly />
              </div>
            } />
            <ProfileIconBlock field={"Password"} answer={
              <div>
                <input className="readonly-input-field" type="text" value="****************" readOnly />
              </div>
            } />
            <ProfileIconBlock field={"Zipcode"} answer={
              <div>
                <input className="readonly-input-field" type="text" value={store.profile.zipcode} readOnly />
              </div>
            } />
            <ProfileIconBlock field={"Date of Birth"} answer={
              <div>
                <input className="readonly-input-field" type="text" value={store.profile.dob} readOnly />
              </div>
            } /> */}

            <div className="settings-block">
              <Button fontSize="18px" padding="12px 36px" background="#F1658C" color="#FFFFFF" className="settings-button">
                  Disconnect from the buddy system
              </Button>
                <br></br>
                <br></br>
                <div className="account-settings">
                All other settings can be managed in the Wix System
                </div>
              {/* All other settings can be managed in the Wix System */}
                <br></br>
              <Button fontSize="18px" padding="12px 36px" background="#F1658C" color="#FFFFFF" className="settings-button">
                  Go to Wix website
              </Button>
            </div>
            
          </Paper>
        </div>
      </Default>
    </div>
  );
}
export default UserSettings;