import "./Browse.scss";

import {
  AGE_RANGE_CONSTANT,
  CANCERLOCATIONLIST,
  DISTANCE_WITHIN_CONSTANT,
} from "../../constants/ProfileConstants";
import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useEffect, useState } from "react";

// accordian imports
import Accordion from "@material-ui/core/Accordion";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
import {AdvancedSearch} from "./AdvancedSearch"
import AgeIcon from "@material-ui/icons/DataUsage";
import { BiSortAlt2 } from "react-icons/bi";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Button from "../Styled/Button";
// chat imports
import ChatIcon from "@material-ui/icons/Chat";
import Checkbox from "@material-ui/core/Checkbox";
import DiscreteSlider from "../Common/DiscreteSlider";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { IoIosArrowDown } from "react-icons/io";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Link, NavLink } from 'react-router-dom';
import LocationIcon from "@material-ui/icons/LocationOn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {MenuPopupState} from "./SortByMenu";
// import NotificationIcon from '../../images/NotificationIcon.png';
import Pagination from "react-js-pagination";
import Radio from "@material-ui/core/Radio";
import RangeSlider from "../Common/RangeSlider";
import { SearchParamsStore } from "../../UserStore";
import Select from "../Styled/Select";
import SortBarDisplay from "./SortBarDisplay";
import SortIcon from "@material-ui/icons/Sort";
import TimeAgo from "timeago-react";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "antd";
import axios from "axios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react";
import { NotificationButton } from "../Notifications/NotificationButton";
import {ProfileCardView} from "./ProfileCard"

//const BrowseProfiles: React.FC = ({  }) => {
export const BrowseProfiles = () => {
  const store = useDataStore();
  const [filter, setFilter] = React.useState(
    store.savedSearchParams ? store.savedSearchParams.filter : ""
  );
  const [userCollection, setUserCollection] = React.useState<any>([]);
  const [ageRange, setAgeRange] = useState([
    store.savedSearchParams.ageRange[0],
    store.savedSearchParams.ageRange[1],
  ]);
  const [distance, setDistance] = useState(store.savedSearchParams.distance);

  // const [distanceRange, setDistanceRange] = useState([
  //   store.savedSearchParams.distanceRange[0],
  //   store.savedSearchParams.distanceRange[1],
  // ]);
  const [keywordSearchType, setKeywordSearchType] = useState("OR");
  // Cancer type selected from dropdpwn list
  const [cancerTypeKeyword, setCancerTypeKeyword] = useState(
    store.savedSearchParams.cancerTypeKeyword
  );
  // State code selected from dropdpwn list
  const [stateCodeKeyword, setStateCodeKeyword] = useState(
    store.savedSearchParams.stateCodeKeyword
  );
  // Zip code selected from dropdpwn list
  const [zipcodeKeyword, setZipcodeKeyword] = useState(
    store.savedSearchParams.zipcodeKeyword
  );
  // City selected from dropdpwn list
  const [cityKeyword, setCityKeyword] = useState(
    store.savedSearchParams.cityKeyword
  );
  // Concatenated list of all the dropdown selected
  const [keywordsSelect, setKeywordsSelect] = useState(
    cancerTypeKeyword +
      " " +
      stateCodeKeyword +
      " " +
      zipcodeKeyword +
      " " +
      cityKeyword
  );
  const [searchTextDisplay, setSearchTextDisplay] = useState("");
  //Sort order related
  const [distanceOrder, setDistanceOrder] = useState(
    store.savedSearchParams.distanceOrder
  );
  const [ageOrder, setAgeOrder] = useState("");
  const [lastOnlineOrder, setLastOnlineOrder] = useState("");
  const [newestMemberOrder, setNewestMemberOrder] = useState("");
  // Active users checkbox
  const [activeUsers, setActiveUsers] = useState(
    store.savedSearchParams.activeUsers
  );
  // Reset all selections
  const [reset, setReset] = useState(false);
  // Page counter for pagination
  const [pageCounter, setPageCounter] = useState(1);
  // Total profiles
  const [numberOfProfiles, setNumberOfProfiles] = useState(0);

  // TODO
  // const [activities, setActivites] = useState(store.savedSearchParams.activeUsers);

  // dummy data for notification
  const [newNotif, setNewNotif] = useState<any>({
      image:"/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZEk9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0d5009055e89d71c1189aa1f90bf9ad5fd2c2ddf/DSC_0034.JPG",
      header:"Finish Setting Up Your Profile",
      description:"Make more connections when your profile is completed. Click here to start!",
      date: new Date("January 6, 2022"),
      color: "#9560A8",
      read: false,
  })
 



  const [personality, setPersonality] = useState(store.savedSearchParams.personality);
  const [preferedExerciseLocation, setPrefered] = useState(store.savedSearchParams.prefered_exercise_location);

  const [scroll, setScroll] = useState(window.scrollY !== 0);

  window.onscroll = function() {
    setScroll(window.scrollY !== 0);
  };
 

  useEffect(() => {
    // gets all the profiles to populate the browse profile cards
    const getProfiles = async () => {
      try {
        const { data } = await axios.get(ALLPROFILESURL, {
          params: {
            min_age: ageRange[0],
            max_age: ageRange[1],
            distance: distance,
            // min_distance: distanceRange[0],
            // max_distance: distanceRange[1],
            commit: "Search",
            search: filter,
            keywordsSelect: keywordsSelect,
            keyword_search_type: keywordSearchType,
            distanceOrder: distanceOrder,
            ageOrder: ageOrder,
            lastOnlineOrder: lastOnlineOrder,
            newestMemberOrder: newestMemberOrder,
            page: pageCounter,
            active: activeUsers,
          },
          withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
          },
        });
        setUserCollection(data.profiles);
        setNumberOfProfiles(data.number_of_profiles);
      } catch (e) {
        console.log(`😱 Browse Fetch failed: ${e}`);
        setUserCollection([]);
      }
    };
    getProfiles();
    saveSearchCriteria();
    //setSortChange(false);
  }, [
    keywordsSelect,
    filter,
    ageRange,
    distance,
    // distanceRange,
    keywordSearchType,
    activeUsers,
    distanceOrder,
    ageOrder,
    lastOnlineOrder,
    newestMemberOrder,
    pageCounter,
  ]);

  useEffect(() => {
    addAllKeywords();
  }, [
    cancerTypeKeyword,
    stateCodeKeyword,
    zipcodeKeyword,
    cityKeyword,
    filter,
  ]);

  const handleAgeChange = (newAgeRange: number[]) => {
    setAgeRange(newAgeRange);
  };

  const handleDistanceChange = (newDistanceRange: number[]) => {};

  // Used by Checkbox for Active Users
  const handleActiveUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveUsers(event.target.checked);
    console.log(event.target.checked);
  };

  
  const addAllKeywords = () => {
    let allKeywords = cancerTypeKeyword ? cancerTypeKeyword : "";
    allKeywords = stateCodeKeyword
      ? allKeywords + " " + stateCodeKeyword
      : allKeywords;
    allKeywords = zipcodeKeyword
      ? allKeywords + " " + zipcodeKeyword
      : allKeywords;
    allKeywords = cityKeyword ? allKeywords + " " + cityKeyword : allKeywords;
    setKeywordsSelect(allKeywords);
    let displayText = "";
    displayText = cancerTypeKeyword
      ? "CancerType: " + cancerTypeKeyword + ";"
      : "";
    if (stateCodeKeyword || zipcodeKeyword || cityKeyword) {
      displayText = displayText + " Location: ";
      displayText = stateCodeKeyword
        ? displayText + " State: " + stateCodeKeyword
        : displayText;
      displayText = zipcodeKeyword
        ? displayText + " Zipcode: " + zipcodeKeyword
        : displayText;
      displayText = cityKeyword
        ? displayText + " City: " + cityKeyword
        : displayText;
    }
    displayText = filter
      ? displayText + "  " + " Filter: " + filter
      : displayText;
    //displayText = distanceOrder? displayText +  "  " + " SortOrder: " + distanceOrder : displayText;
    setSearchTextDisplay(displayText);
  };

  // saves search criteria in local store
  const saveSearchCriteria = () => {
    store.savedSearchParams.filter = filter;
    store.savedSearchParams.ageRange = ageRange;
    store.savedSearchParams.distance = distance;
    // store.savedSearchParams.distanceRange = distanceRange
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
    store.savedSearchParams = new SearchParamsStore();
    setFilter(store.savedSearchParams.filter);
    setAgeRange(store.savedSearchParams.ageRange);
    setDistance(store.savedSearchParams.distance);
    // setDistanceRange(store.savedSearchParams.distanceRange)
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
  const handleResetCompletion = () => {
    setReset(false);
  };

  const updateLikedProfiles = async (type: "like" | "unlike", id: number) => {
    try {
      let url = PROFILEURL + "/" + store.profile.id + ".json";
      if (type === "like") {
        store.likeProfile(id);
      } else if (type === "unlike") {
        store.unlikeProfile(id);
      }
      const result = await axios.patch(
        url,
        { profile: store.profile },
        {
          withCredentials: true,
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleRadioSearch = (event) => {
    setKeywordSearchType(event.target.value);
  };

  const handleOrderChange = (field, newOrder) => {
    console.log("field:", field);
    switch (field) {
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
    }
  };

  const checkCreateNotification = () => {
    if (newNotif != null) {
      return (<div className="notification-popup">
      <p className="notification-text">{newNotif.header}</p>
      <Button className="notification-action-btn"><Link to={"/complete-profile/0"} style={{ color: "#fff" }}>LETS GO</Link></Button>
      <Button className="notification-close-btn" onClick={() => closeNotification()}>X</Button>
    </div>)
    }
  }

  const closeNotification = () => {
    setNewNotif(null);
  }

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setPageCounter(pageNumber);
  };

  function ShowProfileCards() {
    return (
      <div className="profile-browse-grid">
        {userCollection.map((profile: any) => (
          <ProfileCardView profile={profile} />
        ))}
      </div>
    );
  }
  const [minDistance, setMinDistance] = useState(1);
  const [maxDistance, setMaxDistance] = useState(99);

  

  return useObserver(() => (
    // consider: using a component to represent each search widget
    <>
      <div className="browse-container">
        <div className="browse-header">
          <h3 className="pageHeader">Browse Profiles</h3>
          <NotificationButton />
          <p className="browse-subheader">Enter keywords separated by spaces in search box(for e.g: TNBC DCIS Stage)</p>
        </div>
            
        {/* <Link to={"/complete-profile/0"}> Complete your Profile!</Link> */}
        {/* <h3 className="pageHeader">Browse Profiles</h3>
        <p>
          Enter keywords separated by spaces in search box(for e.g: TNBC DCIS
          Stage)
        </p> */}
        <div className={`browse-sticky-nav ${scroll ? "scroll" : ""}`}>
          <h5 className="boldedSubheader" style={{ padding: "0px 16px" }}>
            I'm looking for an exercise buddy:
          </h5>
          <div className="browse-search-box">
            <FontAwesomeIcon icon={faSearch} />
            <Tooltip title="Add any word including the cancer type, state, zipcode or city. Example: 1) 20854 Breast Ovarian 2)  VA TNBC 3)   Lung Rockville Gaithersburg 4)   MD DCIS kidney Stage 3">
              <input
                className="browse-search global-input"
                color="#525151"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Free Text Search"
              />
            </Tooltip>
          </div>
          <div className="top-filter">
            {/* age slider */}
            <div style={{ display: "table-caption" }}>
              {/* <RangeSlider ageRange={ageRange} onChange={handleChange}/> */}

              <div className="filter-label">Age</div>
              <div style={{ display: "inline-flex" }}>
                <label style={{ display: "flex", alignItems: "baseline" }}>
                  {" "}
                  <span className="filter-label"> Min </span> &nbsp;
                  <input
                  className="local-input"
                    value={ageRange[0]}
                    onChange={(e) =>
                      handleAgeChange([Number(e.target.value), ageRange[1]])
                    }
                    placeholder="Min"
                    style={{ width: 45 }}
                  />
                </label>
                <label style={{ display: "flex", alignItems: "baseline", marginLeft: "10px" }}>
                  <span className="filter-label"> Max </span> &nbsp;
                  <input
                  className="local-input"
                    value={ageRange[1]}
                    onChange={(e) =>
                      handleAgeChange([ageRange[0], Number(e.target.value)])
                    }
                    placeholder="Max"
                    style={{ width: 45 }}
                  />
                  &nbsp;
                  <span className="filter-label"> Years </span>
                </label>
              </div>
            </div>
            <div>
              <div className="filter-label">Distance</div>
              {/* {!reset && <DiscreteSlider  distance={distance} onChange={handleDistanceChange}/>}
            {reset && <DiscreteSlider  distance={DISTANCE_WITHIN_CONSTANT} onChange={handleDistanceChange}/>} */}
              <div style={{ display: "inline-flex" }}>
                <label style={{ display: "flex", alignItems: "baseline" }}>
                  {" "}
                  <span className="filter-label"> Min </span>&nbsp;
                  <input
                  className="local-input"
                    value={minDistance}
                    onChange={(e) =>
                      handleDistanceChange([
                        Number(e.target.value),
                        maxDistance,
                      ])
                    }
                    placeholder="Min"
                    style={{ width: 45 }}
                  />
                </label>
                <label style={{ display: "flex", alignItems: "baseline" , marginLeft: "10px"}}>
                <span className="filter-label"> Max </span>&nbsp;
                  <input
                    className="local-input"
                    value={maxDistance}
                    onChange={(e) =>
                      handleDistanceChange([
                        minDistance,
                        Number(e.target.value),
                      ])
                    }
                    placeholder="Max"
                    style={{ width: 45 }}
                  />
                  &nbsp;
                  <span className="filter-label"> Miles </span>
                </label>
              </div>
            </div>
            {/* city/state */}
            {store.uniqueLists &&
              store.uniqueLists.unique_state_codes.length > 1 && (
                <div>
                  <label style={{ display: "table-caption" }}>
                    {" "}
                    <span className="filter-label">City/State</span>
                    <Select
                      style={{width: '25em'}}
                      onChange={(e) => setStateCodeKeyword(e.target.value)}
                      value={stateCodeKeyword}
                    >
                      <option
                        className="selector"
                        value=""
                        label="Select State"
                      />
                      {store.uniqueLists.unique_state_codes.map((sc: any) => (
                        <option className="selector" value={sc} label={sc} />
                      ))}
                    </Select>
                  </label>
                </div>
              )}
          </div>
          {/* {(store.uniqueLists && store.uniqueLists.unique_cities.length > 1) && <div className="search-widget">
                <Select onChange={e => setCityKeyword(e.target.value)} margin="0em 2em" value={cityKeyword} >
                  <option className="selector" value="" label="- Select City -" />
                  {store.uniqueLists.unique_cities.map((c: any) => (
                  <option className="selector" value={c} label={c} />
                ))}
                </Select>
              </div>} */}
          {/* active users filter */}
          <div className="bottom-filter">
            {/* className="range-slider search-widget" */}
            <div className="form-group-alignment">
            <Tooltip title="Displays Users active since the last 5 minutes">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={activeUsers}
                      onChange={(e) => handleActiveUsers(e)}
                      name="activeUsers"
                      color="primary"
                    />
                  }
                  label="Active Users"
                />
              </FormGroup>
            </Tooltip>
            {/* yes to long distance button */}
            <Tooltip title="Displays Users Who are Receptive to a Long Distance Buddy">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox name="yes-long-distance" color="primary" />
                  }
                  label="Yes to a Long-distance Buddy"
                />
              </FormGroup>
            </Tooltip>
            </div>
            <Select
              style={{width: '25em'}}
              onChange={(e) => setStateCodeKeyword(e.target.value)}
              value={stateCodeKeyword}
            >
              <option className="selector" value="" label="Select City" />
              {store.uniqueLists.unique_state_codes.map((sc: any) => (
                <option className="selector" value={sc} label={sc} />
              ))}
            </Select>
          </div>

          {/* <h5 className="boldedSubheader">Advanced Search</h5> */}

          <div className="browse-filter-row">
            <AdvancedSearch/>

            <hr style={{ opacity: ".10", marginTop: "1px" }} />
            {/* search button */}

            <Button className="button-active" id="prev" padding="10px 20px">
              SEARCH
            </Button>

            <Button
              className="button-reset"
              id="prev"
              color="#F1658C"
              background="#FFE7ED"
              padding="10px 20px"
              margin="1.5em 1.5em"
              onClick={(e) => {
                handleClearSelections();
              }}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="totalUserProfileHeader">
          <b> Total User Profile - {numberOfProfiles}</b>
          <MenuPopupState userCollection={userCollection} setUserCollection={setUserCollection}/>
        </div>

        <h6>{searchTextDisplay}</h6>
        <ShowProfileCards />
        <div className="range-slider">
          <Pagination
            activePage={pageCounter}
            itemsCountPerPage={12}
            totalItemsCount={numberOfProfiles}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  ));
};

export default BrowseProfiles;
