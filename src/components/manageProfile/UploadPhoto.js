import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import { useDataStore } from "../../UserContext";

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const uploadedImage = React.useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const store = useDataStore();

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
      setShowPhoto(!showPhoto);
    }
  };
  
  const uploadPhoto = () => {
    const formData = new FormData();
    formData.append("file", this.state.newPhoto);
    
    // configure your fetch url appropriately
    fetch(`${baseURL}/photo/${this.props.profile.id}`, {
      method: "PATCH",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
       // do something with the returned data
      });
  };
  

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
   // formData.append('file', file);
    console.log(file);
    console.log(filename);
    console.log(uploadedFile);
   // setShowPhoto(!showPhoto);
    

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
      <table>
      <tr>
      <td>
      <div style={{ border: "1px dashed black" }}>
      <img style={{ width: '400px', padding:"10px 0px", margin:"0px 0px" }} ref={uploadedImage} />
      <label>New Profile Picture</label>
      </div>
      </td>
      <td>
      <div>
      <img style={{ width: '400px', padding:"10px 0px", margin:"0px 70%"}}  src={ROOTURL + store.profile.photo} />
      <label>Current Profile Picture</label>
      </div>
      </td>
      </tr>
      </table>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={handleImageUpload}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

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
  );
};

export default FileUpload;