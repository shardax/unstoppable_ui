import React, {useState, useEffect} from "react";
import axios from "axios";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../../constants/matcher";
import {useHistory} from 'react-router-dom';
import RangeSlider from "../Common/RangeSlider";
import FavoriteIcon from '@material-ui/icons/Favorite';
import DiscreteSlider from "../Common/DiscreteSlider";
import Radio from '@material-ui/core/Radio';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDataStore } from "../../UserContext";
import {Link} from 'react-router-dom'
import {SearchParamsStore} from "../../UserStore";
import {CANCERLOCATIONLIST, AGE_RANGE_CONSTANT, DISTANCE_WITHIN_CONSTANT} from '../../constants/ProfileConstants';
import './Browse.scss'
import { useObserver } from "mobx-react";
import Button from '../Styled/Button';
import Select from '../Styled/Select';
import colors from "../../assets/colors"
import ChatIcon from '@material-ui/icons/Chat';
import SortBarDisplay from './SortBarDisplay'
import SortIcon from '@material-ui/icons/Sort';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness1Icon from '@material-ui/icons/Brightness1';

//const BrowseProfiles: React.FC = ({  }) => {
  export const BrowseProfiles = () => {
  const store = useDataStore();
  const [filter, setFilter] = React.useState(store.savedSearchParams ? store.savedSearchParams.filter : "");
  const [userCollection, setUserCollection] = React.useState<any>([]);
  const [ageRange, setAgeRange] = useState([store.savedSearchParams.ageRange[0],store.savedSearchParams.ageRange[1]]);
  const [distance, setDistance] = useState(store.savedSearchParams.distance);
  const [keywordSearchType, setKeywordSearchType] = useState("OR");
  const [cancerTypeKeyword, setCancerTypeKeyword] = useState(store.savedSearchParams.cancerTypeKeyword);
  const [stateCodeKeyword, setStateCodeKeyword] = useState(store.savedSearchParams.stateCodeKeyword);
  const [zipcodeKeyword, setZipcodeKeyword] = useState(store.savedSearchParams.zipcodeKeyword);
  const [cityKeyword, setCityKeyword] = useState(store.savedSearchParams.cityKeyword);
  const [filterPlusKeywords, setFilterPlusKeywords] = useState(filter + " " + cancerTypeKeyword + " " + stateCodeKeyword + " " + zipcodeKeyword + " " + cityKeyword);
  const [keywordsSelect, setKeywordSelect] = useState("");
  const [searchTextDisplay, setSearchTextDisplay] = useState("");
  //Sort related
  const [reset, setReset] = useState(false);
  const [distanceOrder, setDistanceOrder] = useState(store.savedSearchParams.distanceOrder);
  const [ageOrder, setAgeOrder] = useState("");
  const [lastOnlineOrder, setLastOnlineOrder] = useState("");
  const [newestMemberOrder, setNewestMemberOrder] = useState("");
  const [activeUsers, setActiveUsers] = useState(store.savedSearchParams.activeUsers);
  const history = useHistory();

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
              search: filter,
              keywordsSelect: keywordsSelect,
              keyword_search_type: keywordSearchType,
              distanceOrder: distanceOrder,
              ageOrder: ageOrder,
              lastOnlineOrder: lastOnlineOrder,
              newestMemberOrder: newestMemberOrder,
              active: activeUsers
            },
            withCredentials: true,
            headers: {
              contentType: "application/json; charset=utf-8",
            }
          })
        setUserCollection(data);
      } catch (e) {
        console.log(`😱 Browse Fetch failed: ${e}`);
        setUserCollection([]);
      }
    }
    getProfiles();
    saveSearchCriteria();
    //setSortChange(false);
    }, [filterPlusKeywords, ageRange, distance, keywordSearchType, activeUsers, distanceOrder, ageOrder, lastOnlineOrder, newestMemberOrder]);

  useEffect(() => {
      addAllKeywordsToFilter();
    }, [cancerTypeKeyword, stateCodeKeyword, zipcodeKeyword, cityKeyword, filter]);

  const handleChange = (event: any, newAgeRange: number[]) => {
      setAgeRange(newAgeRange);
  };

  const handleDistanceChange = (event: any, newDistance: number) => {
    setDistance(newDistance);
  };

  // Used by Checkbox for Active Users
  const handleActiveUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveUsers(event.target.checked);
    console.log(event.target.checked);
  };


  const addAllKeywordsToFilter = () => {
    let allKeywords = cancerTypeKeyword? cancerTypeKeyword : "";
    allKeywords = stateCodeKeyword? allKeywords + " " + stateCodeKeyword : allKeywords;
    allKeywords = zipcodeKeyword? allKeywords + " " + zipcodeKeyword : allKeywords;
    allKeywords = cityKeyword? allKeywords + " " + cityKeyword : allKeywords;
    setKeywordSelect(allKeywords);
    let displayText = "";
    displayText = cancerTypeKeyword? ("CancerType: " + cancerTypeKeyword + ";"): "";
    displayText = displayText + " Location: ";
    displayText = stateCodeKeyword? displayText + " State: " + stateCodeKeyword : displayText;
    displayText = zipcodeKeyword? displayText + " Zipcode: " + zipcodeKeyword : displayText;
    displayText = cityKeyword? displayText + " City: " + cityKeyword : displayText;
    displayText = filter? "; With Search filter:" + displayText + " " + filter : displayText;
    setSearchTextDisplay(displayText);
    
    if (filter){
      setFilterPlusKeywords(filter + " " + allKeywords);
    } else {
      setFilterPlusKeywords(allKeywords);
    }
  }

  const saveSearchCriteria = () => {
    store.savedSearchParams.filter = filter;
    store.savedSearchParams.ageRange = ageRange;
    store.savedSearchParams.distance = distance;
    store.savedSearchParams.cancerTypeKeyword = cancerTypeKeyword;
    store.savedSearchParams.stateCodeKeyword = stateCodeKeyword;
    store.savedSearchParams.zipcodeKeyword = zipcodeKeyword;
    store.savedSearchParams.cityKeyword = cityKeyword;
    store.savedSearchParams.distanceOrder = distanceOrder;
    store.savedSearchParams.ageOrder = ageOrder;
    store.savedSearchParams.lastOnlineOrder = lastOnlineOrder;
    store.savedSearchParams.newestMemberOrder = newestMemberOrder;
    store.savedSearchParams.activeUsers = activeUsers;
    localStorage.setItem("userStore", JSON.stringify(store));
  };


  const handleClearSelections = () => {
    console.log("handleClearSelections");
    store.savedSearchParams = new SearchParamsStore();
    console.log("savedSearchParams", JSON.stringify(store.savedSearchParams));
    setFilter(store.savedSearchParams.filter);
    setAgeRange(store.savedSearchParams.ageRange);
    setDistance(store.savedSearchParams.distance);
    setCancerTypeKeyword(store.savedSearchParams.cancerTypeKeyword);
    setStateCodeKeyword(store.savedSearchParams.stateCodeKeyword);
    setZipcodeKeyword(store.savedSearchParams.zipcodeKeyword);
    setCityKeyword(store.savedSearchParams.cityKeyword);
    setDistanceOrder(store.savedSearchParams.distanceOrder);
    setAgeOrder(store.savedSearchParams.ageOrder);
    setLastOnlineOrder(store.savedSearchParams.lastOnlineOrder);
    setNewestMemberOrder(store.savedSearchParams.newestMemberOrder);
    setActiveUsers(store.savedSearchParams.activeUsers);
    localStorage.setItem("userStore", JSON.stringify(store));
    setReset(true);
  };

  // Used by SortBarDisplay
  const handleResetCompletion= () => {
    setReset(false);
  }

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
              <div
              style={{
                backgroundColor: profile.active ? '#B7FFBF' : 'white'
              }}
            >
            <h5 className="profile-username profile-name-loc">{profile.name} · <span className="profile-location">
              {profile.city}, {profile.state}</span></h5>
            </div>
            </Link>
            <p className="other-profile-card-data">{profile.cancer_location} Cancer</p>
            <p className="other-profile-card-data">{profile.age} years old</p>
          </div>
          <div>
          {profile.active && <Tooltip title={profile.last_seen_at ? "User active since " + profile.last_seen_at: ""}>
            <Brightness1Icon  style={{ color: "#4DED30", fontSize: "medium"}}/>
          </Tooltip >}
          {!profile.active && <Tooltip title={profile.last_seen_at ? "User active since " + profile.last_seen_at: ""}>
            <Brightness1Icon  style={{ color: "#D4D4D4", fontSize: "medium"}}/>
          </Tooltip >}
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

  const handleOrderChange= (field, newOrder) => {
    console.log("field:", field);
    switch(field) {
      case "distance":
        setDistanceOrder(newOrder);
        setAgeOrder("");
        setLastOnlineOrder("");
        setNewestMemberOrder("");
        break;
      case "age":
        setAgeOrder(newOrder);
        setDistanceOrder("");
        setLastOnlineOrder("");
        setNewestMemberOrder("");
        break;
      case "lastOnline":
        setLastOnlineOrder(newOrder);
        setDistanceOrder("");
        setAgeOrder("");
        setNewestMemberOrder("");
        break;
      case "newestMember":
          setNewestMemberOrder(newOrder);
          setDistanceOrder("");
          setAgeOrder("");
          setLastOnlineOrder("");
          break;
      default:
        // code block
    };
  };

  return useObserver(() => (
    <>
      <div>
          <div className="browse-sticky-nav">
            <h3>Browse Profiles</h3>
            <p>Enter keywords separated by spaces in search box(for e.g: TNBC DCIS Stage)</p>
            <div className="browse-filter-row"> 
              <input className="browse-search global-input" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search by Cancer Type, Zipcode, State Code or City" />
            <div>
              <Tooltip title="Contains any of the keywords">
                <label>
                  <Radio value="OR" color="primary" checked={keywordSearchType==="OR"} onChange={(e) => handleRadioSearch(e)}  />OR
                </label>
              </Tooltip>
              <Tooltip title="Contains all of the keywords">
                <label>
                  <Radio value="AND" color="primary" checked={keywordSearchType === "AND"}  onChange={(e) => handleRadioSearch(e)}  />AND
                </label>
              </Tooltip >
            </div>
            <div className="range-slider">
              <RangeSlider ageRange={ageRange} onChange={handleChange}/>
            </div>
            <Select onChange={e => setCancerTypeKeyword(e.target.value)} margin="0em 2em" value={cancerTypeKeyword}>
            <option className="selector" value="" label="- Select cancer type -" />
            {CANCERLOCATIONLIST.map((cancerLoc: any) => (
              <option className="selector" value={cancerLoc} label={cancerLoc} />
            ))}
            </Select> 
            {(store.uniqueLists && store.uniqueLists.unique_state_codes.length > 1) && <div>
              <Select onChange={e => setStateCodeKeyword(e.target.value)} margin="0em 2em" value={stateCodeKeyword}>
                <option className="selector" value="" label="- Select State -" />
                {store.uniqueLists.unique_state_codes.map((sc: any) => (
                <option className="selector" value={sc} label={sc} />
              ))}
              </Select>
            </div>}
            {(store.uniqueLists && store.uniqueLists.unique_zipcodes.length > 1) && <div>
              <Select onChange={e => setZipcodeKeyword(e.target.value)} margin="0em 2em" value={zipcodeKeyword}>
                <option className="selector" value="" label="- Select Zipcode -" />
                {store.uniqueLists.unique_zipcodes.map((z: any) => (
                <option className="selector" value={z} label={z} />
              ))}
              </Select>
            </div>}
            {(store.uniqueLists && store.uniqueLists.unique_cities.length > 1) && <div>
              <Select onChange={e => setCityKeyword(e.target.value)} margin="0em 2em" value={cityKeyword} >
                <option className="selector" value="" label="- Select City -" />
                {store.uniqueLists.unique_cities.map((c: any) => (
                <option className="selector" value={c} label={c} />
              ))}
              </Select>
            </div>}
            <div className="range-slider">
            {!reset && <DiscreteSlider  distance={distance} onChange={handleDistanceChange}/>}
            {reset && <DiscreteSlider  distance={DISTANCE_WITHIN_CONSTANT} onChange={handleDistanceChange}/>}
            </div>
            <div className="range-slider">
              <Tooltip title="Displays Users active since the last 5 minutes">
                <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={activeUsers}
                      onChange={e => handleActiveUsers(e)}
                      name="activeUsers"
                      color="primary"
                    />
                  }
                  label="Active Users"
                />
                </FormGroup>
              </Tooltip >
              </div>
              <div className="range-slider">
                {!reset && <SortBarDisplay onChange={handleOrderChange} distanceOrder={distanceOrder} ageOrder={ageOrder} lastOnineOrder={lastOnlineOrder} newestMemberOrder={newestMemberOrder} resetFunction={handleResetCompletion} reset={reset} />}
                {reset && <SortBarDisplay onChange={handleOrderChange} distanceOrder={"asc"} resetFunction={handleResetCompletion} reset={reset} />}
              </div>
              <div className="range-slider">
                  <Button id="prev" margin="2em 1.5em" padding="10px 20px"
                                            onClick={(e)=>{handleClearSelections()}}>
                                            Reset all selections
                                        </Button>
              </div>
            </div>
          </div>
          <div className="range-slider">
            <h4><b> {userCollection.length} Users</b></h4><h6>{searchTextDisplay}</h6>
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
