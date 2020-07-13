import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";

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
    <div>
      <div>{user.name}</div>
    </div>
  )
}

export default UserSection
