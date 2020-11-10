import React, {useState, useEffect} from "react";
import axios from "axios";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import RangeSlider from "../Common/RangeSlider";
import FavoriteIcon from '@material-ui/icons/Favorite';
import DiscreteSlider from "../Common/DiscreteSlider";
import Radio from '@material-ui/core/Radio';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDataStore } from "../../UserContext";
import {Link} from 'react-router-dom'
import {CANCERLOCATIONLIST, AGE_RANGE_CONSTANT} from '../../constants/ProfileConstants';
import './Browse.scss'
import { useObserver } from "mobx-react";
import Button from '../Styled/Button';
import Select from '../Styled/Select';
import colors from "../../assets/colors"
import ChatIcon from '@material-ui/icons/Chat';
//const BrowseProfiles: React.FC = ({  }) => {
  export const BrowseProfiles = () => {
  const store = useDataStore()
  const [filter, setFilter] = React.useState(store.filter);
  const [userCollection, setUserCollection] = React.useState<any>([]);
  const [ageRange, setAgeRange] = useState([store.ageRange[0],store.ageRange[1]]);
  const [distance, setDistance] = useState(store.distance);
  const [keywordSearchType, setKeywordSearchType] = useState("OR");
  const [cancerTypeKeyword, setCancerTypeKeyword] = useState("");
  const [stateCodeKeyword, setStateCodeKeyword] = useState("");
  const [zipcodeKeyword, setZipcodeKeyword] = useState("");
  const [cityKeyword, setCityKeyword] = useState("");
  const [filterPlusKeywords, setFilterPlusKeywords] = useState("");
  const [numUsers, setNumUsers] = useState(0);

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
              search: filterPlusKeywords,
              keyword_search_type: keywordSearchType
            },
            withCredentials: true,
            headers: {
              contentType: "application/json; charset=utf-8",
            }
          })
        setUserCollection(data)
        setNumUsers(userCollection.size);
      } catch (e) {
        console.log(`😱 Browse Fetch failed: ${e}`);
        setUserCollection([]);
      }
    }
    getProfiles();
    saveSearchCriteria();
    }, [filterPlusKeywords, ageRange, distance, keywordSearchType]);

    useEffect(() => {
      addAllKeywordsToFilter();
    }, [cancerTypeKeyword, stateCodeKeyword, zipcodeKeyword, cityKeyword, filter]);

  const handleChange = (event: any, newAgeRange: number[]) => {
      setAgeRange(newAgeRange);
  };

  const handleDistanceChange = (event: any, newDistance: number) => {
    setDistance(newDistance);
  };

  const addAllKeywordsToFilter = () => {
    let allKeywords = cancerTypeKeyword? cancerTypeKeyword : "";
    allKeywords = stateCodeKeyword? allKeywords + " " + stateCodeKeyword : allKeywords;
    allKeywords = zipcodeKeyword? allKeywords + " " + zipcodeKeyword : allKeywords;
    allKeywords = cityKeyword? allKeywords + " " + cityKeyword : allKeywords;
    if (filter){
      setFilterPlusKeywords(filter + " " + allKeywords);
    } else {
      setFilterPlusKeywords(allKeywords);
    }
  }

  const saveSearchCriteria = () => {
    store.filter = filter;
    store.ageRange = ageRange;
    store.distance = distance;
    localStorage.setItem("userStore", JSON.stringify(store));
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
          <Link to={"/userMessage" + "/" + profile.user_id}>
            <ChatIcon className="favorite-profile-icon"></ChatIcon>
          </Link>
          {store.profile.liked_profiles.includes(profile.id)  ? <FavoriteIcon onClick={() => updateLikedProfiles("unlike", profile.id)} className="favorite-profile-icon" /> : <FavoriteBorderIcon onClick={() => updateLikedProfiles("like", profile.id)} className="favorite-profile-icon" />}
          </div>
        </div>
      </div>
  ))

  const handleRadioSearch = (event) => {
    setKeywordSearchType(event.target.value);
  };
 
  return useObserver(() => (
    <>
      <div>
          <div className="browse-sticky-nav">
            <h3>Browse Profiles</h3>
            <div className="browse-filter-row"> 
              <input className="browse-search global-input" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search by Cancer Type, Zipcode, State Code or City" />
              <Select onChange={e => setCancerTypeKeyword(e.target.value)} margin="0em 2em">
              <option className="selector" value="" label="- Select cancer type -" />
              {CANCERLOCATIONLIST.map((cancerLoc: any) => (
                <option className="selector" value={cancerLoc} label={cancerLoc} />
              ))}
             </Select>
              <div className="range-slider">
                <RangeSlider ageRange={ageRange} onChange={handleChange}/>
              </div>

              <div>
                <label>
                  <Radio value="OR" color="primary" checked={keywordSearchType==="OR"} onChange={(e) => handleRadioSearch(e)}  />OR (Contains any of the keywords)
                </label>
                <label>
                  <Radio value="AND" color="primary" checked={keywordSearchType === "AND"}  onChange={(e) => handleRadioSearch(e)}  />AND (Contains all of the keywords)
                </label>
              </div>
              <div className="range-slider">
                <DiscreteSlider  onChange={handleDistanceChange}/>
              </div>
              {(store.uniqueLists && store.uniqueLists.unique_state_codes.length > 1) && <div>
                <Select onChange={e => setStateCodeKeyword(e.target.value)} margin="0em 2em">
                  <option className="selector" value="" label="- Select State -" />
                  {store.uniqueLists.unique_state_codes.map((sc: any) => (
                  <option className="selector" value={sc} label={sc} />
                ))}
                </Select>
              </div>}
              {(store.uniqueLists && store.uniqueLists.unique_zipcodes.length > 1) && <div>
                <Select onChange={e => setZipcodeKeyword(e.target.value)} margin="0em 2em">
                  <option className="selector" value="" label="- Select Zipcode -" />
                  {store.uniqueLists.unique_zipcodes.map((z: any) => (
                  <option className="selector" value={z} label={z} />
                ))}
                </Select>
              </div>}
              {(store.uniqueLists && store.uniqueLists.unique_cities.length > 1) && <div>
                <Select onChange={e => setCityKeyword(e.target.value)} margin="0em 2em">
                  <option className="selector" value="" label="- Select City -" />
                  {store.uniqueLists.unique_cities.map((c: any) => (
                  <option className="selector" value={c} label={c} />
                ))}
                </Select>
              </div>}
            </div>
          </div>
          <div className="range-slider">
            <h4><b> {userCollection.length} Users</b></h4>
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
