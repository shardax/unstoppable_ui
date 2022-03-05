
import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Field, Form, useFormikContext } from 'formik';
import { useDataStore } from "../../../UserContext";
import { Prompt } from 'react-router-dom';
import axios from "axios";
import { ROOTURL, PROFILEURL, UPLOADAVATARURL } from "../../../constants/matcher";
import { PERSONALITY_DESCRIPTION, WORK_STATUS_DESCRIPTIONS } from "../../../constants/ProfileConstants"
import Button from '../../Styled/Button';
import Select from '../../Styled/Select';
import Textarea from '../../Styled/Textarea';
import ProgressBar from '../../manageProfile/Progress-Bar';
import './Steps.scss'
import { displayToast } from '../../Toast/Toast';
import { createBrowserHistory } from 'history'
import { STEP_EMAIL_CONFIRMATION_SENT } from "../../../constants/ProfileConstants";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

const Q17_UploadPhoto = () => {
  const store = useDataStore();
  const history = createBrowserHistory({ forceRefresh: true });
  const [prevSubmitted, setPrevSubmitted] = useState(false);
  const [filled, setFilled] = useState(false);

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
  const [profileImg, setProfileImg] = useState<string>(ROOTURL + store.avatarPath);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])
  const [completed, setCompleted] = useState(0);


  const handleImageChange = (e) => {
    setFileChosen(true);
    setUploadedFile(true);
    if (e.target.files[0]) {
      setCompleted(0);
      setShowPhoto(!showPhoto);
      setNewPhoto(e.target.files[0]);
      //   console.log(newPhoto);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const result = reader.result?.toString();
          if (result !== undefined)
            setProfileImg(result);
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
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
        const result = await axios.get(PROFILEURL + `/${store.profileId}.json`,
          {
            withCredentials: true,
            headers: {
              contentType: "application/json; charset=utf-8",
            }
          })
        //   console.log(JSON.stringify(result));
        if (result) {
          console.log("In refresh photo");
          console.log(JSON.stringify(result.data.profile.photo));
          store.avatarPath = result.data.profile.photo;
          store.profile.photo = result.data.profile.photo;
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
    console.log("onSubmitUpload");
    e.preventDefault();
    //props.handleUploadHappening(true);
    setInterval(() => setCompleted(Math.floor(100)), 10000);

    const formData = new FormData();
    formData.append("file", newPhoto);

    fetch(UPLOADAVATARURL + "?id=" + store.current_user_id.toString(), {
      body: formData,
      method: "POST",
      /*
      params: {
        profile: { "avatar": formData },
      },
      withCredentials: true,
      */
    })
      .then(res => {
        console.log(res);
      })
      .then(data => {
        console.log(data);
        setUploadStart(true);
        setTimeout(() => {
          // const percentage= parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          // setUploadPercentage(percentage);
          refreshPhoto();
        }, 10000);
      });
  };




  const PromptIfDirty = () => {
    const formik = useFormikContext();
    return (
      <Prompt
        when={formik.dirty && formik.submitCount === 0}
        message="Are you sure you want to leave? You have with unsaved changes."
      />
    );
  };


  let profile = store.profile;

  useEffect(() => {
    if (store.profile.step_status == STEP_EMAIL_CONFIRMATION_SENT) {
      history.push("/complete-profile/16");
    }
  }, [])

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    history.push("/complete-profile/17");
  }
  return (
    <div>
      <Formik
        initialValues={{
          main_reason: profile.reason_for_match,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          setTimeout(() => {
            resetForm();
            setSubmitting(false);
          }, 500);

          const fetchData = async () => {
            try {
              let url = PROFILEURL + "/" + store.profile.id + "/update_steps_json";

              profile.reason_for_match = values.main_reason;

              // Saving data on server
              const res = await axios.patch(url,
                { profile: profile },
                { withCredentials: true, headers: { contentType: "application/json; charset=utf-8", "Accept": "application/json" } }
              )
              displayToast("Successfully updated profile ✅", "success", 3000, "top-right")
              store.profile = profile;
              localStorage.setItem("userStore", JSON.stringify(store));

              if (prevSubmitted) {
                history.push("/complete-profile/16");
              } else {
                history.push("/complete-profile/17");
              }

            } catch (err) {
              displayToast("Failed to update profile", "error", 3000, "top-right")
              if (err.response) {
                // client received an error response (5xx, 4xx)
              } else if (err.request) {
                // client never received a response, or request never left
              } else {
                // anything else
              }
            }
          };
          fetchData();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <Form>
            <div className="form-container">
              <div className="question-header">Upload Photo</div>
              <div className="question-subheader">Including a photo will help other members feel more comfortable</div>
              <div className="question-number">17/17 Questions</div>
              <div className='Photo'>
                <img style={{ width: '200px', padding: "20px 0px" }} src={profileImg} />
              </div>
              <div className="form-upload-photo">
                <div className="file-input-overlay">
                  <div className="file-input-style-row">
                    <AddAPhotoIcon fontSize="large" />
                  </div>
                  <div className="file-input-style-row">
                    Drop your image here or choose image
                  </div>
                </div>
                <input className="file-input-fake" id="file-input" type="file" accept="image/png, image/jpeg" onChange={(e) => {
                  handleImageChange(e);
                  onSubmitUpload(e);
                }} />
              </div>

              <PromptIfDirty />

              <Button id="prev" margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}
                onClick={(e) => { setPrevSubmitted(true) }}>
                Prev
              </Button>

              <Button margin="2em 1.5em" padding="10px 20px" disabled={isSubmitting}>
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default Q17_UploadPhoto;