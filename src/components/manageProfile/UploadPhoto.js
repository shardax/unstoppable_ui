import React, { Fragment, useState, useEffect } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL, UPLOADAVATARURL } from "../../constants/matcher";
import { useDataStore } from "../../UserContext";
import {useObserver} from 'mobx-react'

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const uploadedImage = React.useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  //const [newPhoto, setNewPhoto] = useState("");;
  const [newPhoto, setNewPhoto] = useState("");
  const store = useDataStore();
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  
  const setAvatarPath = (newPhoto) => {
    store.avatarPath = newPhoto;
    localStorage.setItem("userStore", JSON.stringify(store));
  }

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
     // setShowPhoto(!showPhoto);
    }
  };
  
  const uploadPhoto = () => {
    const formData = new FormData();
    formData.append("file", newPhoto);
    
    // configure your fetch url appropriately

    /** 
    fetch(`${baseURL}/photo/${this.props.profile.id}`, {
      method: "PATCH",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
       // do something with the returned data
      });
    **/
  };
  
  

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
    //  alert("setting newPhoto");
      setNewPhoto( e.target.files[0] );
   //   console.log(newPhoto);
      const reader = new FileReader();
      reader.onload = () =>{
        if(reader.readyState === 2){
          setProfileImg(reader.result);
        //  setAvatarPath(newPhoto);
          console.log(newPhoto)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
    alert(JSON.stringify(e.target.files[0]));
    alert(newPhoto);
};

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
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
            console.log(JSON.stringify(result));
            if(result){
              console.log(JSON.stringify(result.data.profile.photo));
              store.avatarPath = result.data.profile.photo;
              store.profile.photo =  result.data.profile.photo;
            }
        } catch (e) {
          console.log(`😱 Profile Fetch failed: ${e}`);
        }
      }
      fetchProfile();
  }
  const onSubmit = async e => {
    e.preventDefault();
    //const formData = new FormData();
   // formData.append('file', file);
    
   // setShowPhoto(!showPhoto);
    

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
        console.log("res");
      })
      .then(data => {
        console.log("Uploaded file");
        console.log(JSON.stringify(data));
        setTimeout(() => {
        }, 3000);
        });
       refreshPhoto();
    };
  
        //onUploadProgress: progressEvent => {
        //  setUploadPercentage(
        //    parseInt(
        //      Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //    )
       //   );

          // Clear percentage
     //     setTimeout(() => setUploadPercentage(0), 10000);
     //   }
     // });

   /*  
      console.log("Uploaded file");
      console.log(JSON.stringify(res));
      const { fileName, filePath } = res.data;
      store.avatarPath = res.data.photo;


      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
     // alert(JSON.stringify(res));
      alert(JSON.stringify(err));
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
    
  
*/
return useObserver(() => (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
      <table>
      <tr>
      <td>
      <div classname='btn btn-primary btn-block mt-4'> 
      <img  style={{ width: '400px', padding:"10px 0px", margin:"0px 70%"}} src={profileImg} />
     {/* <label>New Profile Picture</label>*/}
      </div>
      </td>
      <td>
      <div>
      <img style={{ width: '400px', padding:"10px 0px", margin:"0px 70%"}}  src={ROOTURL + store.avatarPath} />
      <label>Current Profile Picture</label>
      </div>
      </td>
      </tr>
      </table>
       {/* <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={handleImageUpload}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>*/}
        <div className='Photo'>
          <input type="file" name="Photo123" accept="image/png, image/jpeg" onChange={handleImageChange} />
        </div>

       {/* <Progress percentage={uploadPercentage} />*/}

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
     {/* <div>
            {!showPhoto &&
              <img style={{ width: '50%' }}  src={ROOTURL + store.profile.photo} />
            }
            { showPhoto &&
              <img style={{ width: '50%' }} ref={uploadedImage} />
            }
      </div>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
         <img className="user-section-image" src={ROOTURL + store.photo} />
          </div>
        </div>
      ) : null}*/}
    </Fragment>
  ));
};

export default FileUpload;