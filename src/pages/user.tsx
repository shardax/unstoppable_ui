import React, {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../constants/matcher";
import axios from 'axios'
import Default from '../layouts/Default';
import UserSection from '../components/Users/UserSection'
import Button from '../components/Button/Button';


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
          <Link style={{ textDecoration: "underline" }} to="/home"><Button background="white" color="#222222" fontSize="13px" padding="2px 12px" border="1px solid #222222" borderRadius="30px">Go Back Home</Button></Link>
          <UserSection me={false} user={user} />
      </Default>
  )
}

export default User;
