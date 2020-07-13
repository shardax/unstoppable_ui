import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import './index.scss'

const UserSection: React.FC<{id: string}> = ({ id }) => {

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
    <div className="user-section-wrapper">
      <div className="user-metadata">
        <h1>{user.name}</h1>
        <img className="user-section-image" src={ROOTURL + user.photo} />
      </div>
      <div className="user-section-qa">
        Test
      </div>
    </div>
  )
}

export default UserSection
