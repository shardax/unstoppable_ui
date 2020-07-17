import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import './index.scss';
import colors from '../../assets/colors'

import Button from '../Button/Button';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import NotesIcon from '@material-ui/icons/Notes';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';

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

  const ProfileIconRow = ({ icon, field, answer}) => {
    return (
      <div className="full-profile-icon-row">
        {icon}
        <span className="muted-text">{field}: {answer} </span>
      </div>
    )
  }

  if (!user || loading ) {
    return <div>Loading...</div>
  }

  return (
    <div className="user-section-wrapper">
      <div className="user-metadata">
          <img className="user-section-image" src={ROOTURL + user.photo} />
          <Button margin="0.8em 0em 0em 0em">Message User</Button>
          <Button margin="0.8em 0em" background="white" color={colors.primary} border={"1px solid" + colors.primary}>Like User Profile</Button>
      </div>
      <div className="user-section-data">
        <h1 style={{ fontSize: "26px" }}>{user.name}  · <span className="full-profile-location muted-text">city, state</span></h1>
        <p className="muted-text">{user.age} years old, {user.cancer_location} cancer</p>

        <div className="full-profile-icon-row">
          <NotesIcon className="full-profile-icon" />
          <div className="full-profile-das">
            <p>{user.details_about_self}</p>
          </div>
        </div>

        <ProfileIconRow field={"Fitness Level"} answer={user.fitness_level} icon={<FitnessCenterIcon className="full-profile-icon" />}/>
        <ProfileIconRow field={"Activities"} answer={"test"} icon={<SportsTennisIcon className={"full-profile-icon"} />} />
        <p>Not done! More to come down here...</p>
      </div>
    </div>
  )
}

export default UserSection
