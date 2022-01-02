import './index.scss';

import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import React, {useEffect, useState} from 'react'

import {Avatar} from 'antd';
import {Link} from 'react-router-dom';
import ProfileCardView from "../Browse/ProfileCard";
import axios from 'axios';

const LikedProfile = ({ id }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`${PROFILEURL}/${id}.json`, { withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
        }})
        console.log(data, "data")
        console.log(user, 'user')
        setUser(data.profile)
        setLoading(false)
      } catch (error) {
        setError(true)
        console.log(error, "error")
        // throw new Error(e)
        // change error
        // throw new Error()
      }
    }
    getProfile();
  }, [])

  if(error){
    return (null)
  }
  
  if (!user || loading ) {
    return <div>Loading...</div>
  }

  // return (
  //   <Link to={"/user/" + id}>
  //     {user.name}
  //   </Link>
  // )

  return (
    <ProfileCardView  profile={user} />
    // <Link to={"/user/" + id}>
    //   <div className="liked-profile-wrapper">
    //       <div className="liked-profile-meta">
    //         <Avatar src={ROOTURL + user.photo}  size= "large" />
    //       </div>
    //       <div className="liked-profile-data">
    //       <div className="liked-profile-name">{user.name}</div>
    //       <div className="liked-profile-place">
    //           {user.city}, {user.state}
    //         </div>
    //         <div className="liked-profile-age">
    //           {user.age} years old
    //         </div>
    //       </div>
    //       {/* <ArrowForwardIcon /> */}
    //   </div>
    // </Link>
  )
}

export default LikedProfile
