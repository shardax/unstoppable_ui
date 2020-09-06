import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL, UPLOADAVATARURL } from "../../constants/matcher";
import { useDataStore } from "../../UserContext";
import {useObserver} from 'mobx-react'
import './UploadPhoto.scss'
import ProgressBar from "./Progress-Bar";
//import Cropper from 'react-easy-crop'
import Button from '../Styled/Button'
import { createBrowserHistory } from 'history'

const UploadPhoto = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const uploadedImage = React.useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const store = useDataStore();
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])
  const history = createBrowserHistory({ forceRefresh: true });
  const [completed, setCompleted] = useState(0);

  const handleImageChange = (e) => {
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
        //  setAvatarPath(newPhoto);
         // console.log(newPhoto)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
    alert(JSON.stringify(e.target.files[0]));
    alert(newPhoto);
};

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
           //   console.log(JSON.stringify(result.data.profile.photo));
              store.avatarPath = result.data.profile.photo;
              store.profile.photo =  result.data.profile.photo;
            }
        } catch (e) {
          console.log(`😱 Profile Fetch failed: ${e}`);
        }
      }
      fetchProfile();
      if (props.fromWizard) {
        history.push("/wizard/4");
      }
  }
  const onSubmit = async e => {
    e.preventDefault();
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
     //   console.log("res");
      })
      .then(data => {
       // console.log("Uploaded file");
       // console.log(JSON.stringify(data));
        setTimeout(() => {
         // const percentage= parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
         // setUploadPercentage(percentage);
          refreshPhoto();
        }, 10000);
        });
    };
  
return useObserver(() => (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
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
          <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
          <Button
              type='submit'
              value='Upload'
        >Submit</Button>
      </form>
    </Fragment>
  ));
};

export default UploadPhoto;