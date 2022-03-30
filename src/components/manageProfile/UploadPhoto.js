import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { ROOTURL, PROFILEURL, UPLOADAVATARURL } from "../../constants/matcher";
import { useDataStore } from "../../UserContext";
import {useObserver} from 'mobx-react'
import './UploadPhoto.scss'
import ProgressBar from "./Progress-Bar";
//import Cropper from 'react-easy-crop'
import Paper from '../Styled/Paper';
import Button from '../Styled/Button'
import {Link} from 'react-router-dom';
import { createBrowserHistory } from 'history'
import {STEP_EMAIL_CONFIRMATION_SENT} from "../../constants/ProfileConstants";

const UploadPhoto = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState(false);
  const [uploadStart, setUploadStart] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const uploadedImage = React.useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const store = useDataStore();
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  const [fromWizard, setFromWizard] = useState(props.fromWizard);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])
  const history = createBrowserHistory({ forceRefresh: true });
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (fromWizard && (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT)) {
      // history.push("/wizard/5");
    }
  }, []);

  const handleImageChange = (e) => {
    setFileChosen(true);
    if (e.target.files[0]) {
    //  alert("setting newPhoto");
      setCompleted(0);
      setShowPhoto(!showPhoto);
      setNewPhoto( e.target.files[0] );
   //   console.log(newPhoto);
      const reader = new FileReader();
      reader.onload = () =>{
        if(reader.readyState === 2){
          setProfileImg(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  };

  const handleNext = () => {
    history.push("/complete-profile/4");
  };
  const handlePrev = () => {
    history.push("/complete-profile/2");
  };

  const handleCancelUpload = (e) => {
    e.preventDefault();
    setProfileImg(ROOTURL + store.avatarPath);
    setUploadedFile(false);
    setUploadStart(false);
    setFileChosen(false);
    setCompleted(0);
  }

  const refreshPhoto = () => {
      const fetchProfile = async () => {
        try {
          //setDataLoading("Loading");
          const result  = await axios.get(PROFILEURL + `/${store.profileId}.json`,
            { withCredentials: true,
              headers: {
                contentType: "application/json; charset=utf-8",
            }})
         //   console.log(JSON.stringify(result));
            if(result){
              console.log("In refresh photo");
              console.log(JSON.stringify(result.data.profile.photo));
              store.avatarPath = result.data.profile.photo;
              store.profile.photo =  result.data.profile.photo;
              localStorage.setItem("userStore", JSON.stringify(store));
            }
        } catch (e) {
          console.log(`😱 Profile Fetch failed: ${e}`);
        }
      }
      fetchProfile();
      //if (props.fromWizard) {
      //  history.push("/wizard/4");
      //}
      setUploadedFile(false);
      setUploadStart(false);
      setFileChosen(false);
      setCompleted(0);
  }
  const onSubmitUpload = async e => {
    e.preventDefault();
    //props.handleUploadHappening(true);
    setInterval(() => setCompleted(Math.floor(100)), 10000);

      const formData = new FormData();
      formData.append("file", newPhoto);

      fetch(UPLOADAVATARURL + "?id=" +  store.current_user_id.toString(),{
        body: formData,
        method: "POST",
        params: {
          profile: {"avatar": formData},
        },
        withCredentials: true,
    
      },)
      .then(res => {
      })
      .then(data => {
        setUploadStart(true);
        setTimeout(() => {
         // const percentage= parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
         // setUploadPercentage(percentage);
          refreshPhoto();
        }, 10000);
        });
    };
  
return useObserver(() => (
  <div>
    <div className="form-container user-section-wrapper">
      <div className="user-section-data">
                    <Paper>
                      <div className="profile-section-header">Upload Photo</div>
      <Fragment>
        {message ? <Message msg={message} /> : null}
        <p> <em> Including a photo will help other members feel more comfortable.</em></p>
        <form onSubmit={onSubmitUpload}>
          <table>
            <tr>
              <td>
                <div className='Photo'> 
                  <img  style={{ width: '400px', padding:"20px 0px"}} src={profileImg} />
                </div>
              </td>
            </tr>
          </table>
          <div className='Photo'>
                <input type="file" name="Photo123" accept="image/png, image/jpeg" onChange={handleImageChange} />
          </div>
          <div>
            <br/><br/>
            {(uploadStart) && <p> File Uploading... </p> }
            {(uploadedFile) && <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />}
          </div>
          {(fileChosen) && <Button type='submit' value='Upload'  onClick={(e)=>{setUploadedFile(true)}}  >
            Upload Photo
          </Button>}
          {(fileChosen) && (!uploadedFile) && <Button margin="0em 1.5em"  onClick={handleCancelUpload}>
                Cancel
          </Button>}
          {/* {(fromWizard) && (!uploadStart) && <Button margin="0em 1.5em"  onClick={handlePrev}>
                Prev
          </Button>} */}
          {(fromWizard) && (!uploadStart) && 
          <Link to="/">
            <Button margin="0em 1.5em">
                  Next
            </Button>
          </Link>}
        </form>
      </Fragment>
      </Paper>
      </div>
      </div>
    </div>
  ));
};

export default UploadPhoto;