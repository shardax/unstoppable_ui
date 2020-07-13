import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../constants/matcher";
import axios from 'axios'
import Default from '../layouts/Default';

const User = () => {
  let { id } = useParams();
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
        throw new Error(e)
      }
    }
    getProfile();
  }, [])

  if (!user || loading ) {
    return <div>Loading...</div>
  }

  return (    
      <Default>
        <div>{user.name}</div>
      </Default>
  )
}

export default User;
