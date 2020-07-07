import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../constants/matcher";
import axios from 'axios'

const User = () => {
  let { id } = useParams();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(`${PROFILEURL}/${id}.json`, { withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
        }})
        setUser(data)
        setLoading(false)
      } catch (e) {
        throw new Error(e)
      }
    }
    getProfile();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <pre>
      {JSON.stringify(user, null, 2)}
    </pre>
  )
}

export default User;
