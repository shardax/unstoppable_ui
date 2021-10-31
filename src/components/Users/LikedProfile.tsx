import React, {useEffect, useState} from 'react'
import './index.scss';
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import {Avatar} from 'antd';
import {Link} from 'react-router-dom';
const LikedProfile = ({ id }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`${PROFILEURL}/${id}.json`, { withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
        }})
        setUser(data.profile)
        setLoading(false)
      } catch (e) {
        // throw new Error(e)
      }
    }
    getProfile();
  }, [])
  
  if (!user || loading ) {
    return <div>Loading...</div>
  }

  // return (
  //   <Link to={"/user/" + id}>
  //     {user.name}
  //   </Link>
  // )

  return (
    <Link to={"/user/" + id}>
      <div className="liked-profile-wrapper">
          <div className="liked-profile-meta">
            <Avatar src={ROOTURL + user.photo}  size= "large" />
          </div>
          <div className="liked-profile-data">
          <div className="liked-profile-name">{user.name}</div>
          <div className="liked-profile-place">
              {user.city}, {user.state}
            </div>
            <div className="liked-profile-age">
              {user.age} years old
            </div>
          </div>
          {/* <ArrowForwardIcon /> */}
      </div>
    </Link>
  )
}

export default LikedProfile
