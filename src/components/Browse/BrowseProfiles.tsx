import React, {useState, useEffect} from "react";
import axios from "axios";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import RangeSlider from "../RangeSlider";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDataStore } from "../../UserContext";
import {Link} from 'react-router-dom'

import './Browse.scss'
import { useObserver } from "mobx-react";
import Button from '../Styled/Button'
import colors from "../../assets/colors"
import ChatIcon from '@material-ui/icons/Chat';
//const BrowseProfiles: React.FC = ({  }) => {
  export const BrowseProfiles = () => {
  const store = useDataStore()
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState<any>([]);
  const [ageRange, setAgeRange] = useState([18,120]);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const { data } = await axios.get(ALLPROFILESURL,
          { 
            params: {
              min_age: ageRange[0],
              max_age: ageRange[1],
              distance: distance,
              commit: "Search",
              search: filter
            },
            withCredentials: true,
            headers: {
              contentType: "application/json; charset=utf-8",
            }
          })
        setUserCollection(data)
      } catch (e) {
        console.log(`😱 Browse Fetch failed: ${e}`);
        setUserCollection([]);
      }
    }
    getProfiles()
    }, [filter, ageRange]);

  const handleChange = (event: any, newAgeRange: number[]) => {
      setAgeRange(newAgeRange);
  };

  const updateLikedProfiles = async (type: 'like' | 'unlike', id: number) => {
    try {
      let url = PROFILEURL + "/" + store.profile.id + ".json" ;
      if (type==="like") {
        store.likeProfile(id)
      } else if (type==="unlike") {
        store.unlikeProfile(id)
      }
      const result = await axios.patch(url, { profile: store.profile }, {  withCredentials: true, headers: {"Access-Control-Allow-Origin": "*"}} )
    } catch (e) {
      console.log(e)
    }
  }

  const ProfileCard = ({profile}) => useObserver(() => (
      <div className="single-profile-wrapper" key={profile.id}>
        <Link to={"/user/" + profile.id}>
          <img className="single-profile-image" src={ROOTURL + profile.photo} />
        </Link>
        <div className="single-profile-body">
          <div>
            <Link to={"/user/" + profile.id}>
              <h5 className="profile-username profile-name-loc">{profile.name} · <span className="profile-location">{profile.city}, {profile.state}</span></h5>
            </Link>
            <p className="other-profile-card-data">{profile.cancer_location} Cancer</p>
            <p className="other-profile-card-data">{profile.age} years old</p>
          </div>
          <div>
          <Link to={"/messages"}>
            <ChatIcon className="favorite-profile-icon"></ChatIcon>
          </Link>
          {store.profile.liked_profiles.includes(profile.id)  ? <FavoriteIcon onClick={() => updateLikedProfiles("unlike", profile.id)} className="favorite-profile-icon" /> : <FavoriteBorderIcon onClick={() => updateLikedProfiles("like", profile.id)} className="favorite-profile-icon" />}
          </div>
        </div>
      </div>
  ))
 
  return useObserver(() => (
    <>
      <div>
          <div className="browse-sticky-nav">
            <h3>Browse Profiles</h3>
            <div className="browse-filter-row"> 
              <input className="mdc-elevation--z1 browse-search global-input" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search by Cancer Type OR Zipcode OR City" />
              <RangeSlider ageRange={ageRange} onChange={handleChange}/>
              </div>
          </div>
          <div className="profile-browse-grid">
            {userCollection.map((profile: any) => (
              <ProfileCard profile={profile} />
            ))}
        </div>
      </div>
    </>
  ))
}

export default BrowseProfiles;
