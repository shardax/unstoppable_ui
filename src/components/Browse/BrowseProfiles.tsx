import React, {useState, useEffect} from "react";
import axios from "axios";
import { ALLPROFILESURL, ROOTURL } from "../../constants/matcher";
import RangeSlider from "../RangeSlider";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import './Browse.scss'

//const BrowseProfiles: React.FC = ({  }) => {
  export const BrowseProfiles = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState<any>([]);
  const [ageRange, setAgeRange] = useState([18,120]);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        let url = ALLPROFILESURL + `?&min_age=` + ageRange[0] + `&max_age=` + ageRange[1] + `&distance=` + distance + `""commit=Search&search=${filter}`;
        const { data } = await axios.get(url,
          { withCredentials: true,
            headers: {
              contentType: "application/json; charset=utf-8",
          }})
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
 
  return (
    <>
    <div>
      <div className="browse-filter-row"> 
        <input className="browse-search" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search by Cancer Type OR Zipcode OR City" />
          <RangeSlider ageRange={ageRange} onChange={handleChange}/>
        </div>
        <div className="profile-browse-grid">
          {userCollection.map((profile: any, index: number) => (
            <div className="single-profile-wrapper" key={index}>
              <img className="single-profile-image" src={ROOTURL + profile.photo} />
              <div className="single-profile-body">
                <h5 className="primary-text">{profile.name}</h5>
                <p>{profile.cancer_location} Cancer</p>
                <p>{profile.age} years old</p>
                <FavoriteBorderIcon className="favorite-profile-icon" />
              </div>
            </div>
          ))}
      </div>
    </div>
    </>
      );
}

export default BrowseProfiles;
