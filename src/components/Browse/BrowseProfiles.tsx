import "./Browse.scss";

import {
  AGE_RANGE_CONSTANT,
  CANCERLOCATIONLIST,
  DISTANCE_WITHIN_CONSTANT,
} from "../../constants/ProfileConstants";
import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import React, { useEffect, useState } from "react";

// accordian imports
import Accordion from "@material-ui/core/Accordion";
import { AccordionDetails } from "@material-ui/core";
import { AccordionSummary } from "@material-ui/core";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { IoIosArrowDown } from "react-icons/io";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Link } from "react-router-dom";
import LocationIcon from "@material-ui/icons/LocationOn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react";

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
  const [personality, setPersonality] = useState(
    store.savedSearchParams.personality
  );
  const [preferedExerciseLocation, setPrefered] = useState(
    store.savedSearchParams.prefered_exercise_location
  );

  useEffect(() => {
    // gets all the profiles to populate the browse profile cards
    const getProfiles = async () => {
      try {
        const { data } = await axios.get(ALLPROFILESURL, {
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


  const MenuPopupState = () => {

    const sortProfileCards = (sortBy, popupState) => {
      let userCollectionTemp
      switch(sortBy){
        case "Age":
          userCollectionTemp = userCollection.slice().sort((profile1, profile2) => profile2.age - profile1.age)
          setUserCollection(userCollectionTemp)
          break
        case "Distance":
          userCollectionTemp = userCollection.slice().sort((profile1, profile2) => profile1.distance - profile2.distance)
          setUserCollection(userCollectionTemp)
          console.log("Distance", userCollection)
          break
        case "Last Online":
          userCollectionTemp = userCollection.slice().sort((profile1, profile2) => profile1.last_seen_at - profile2.last_seen_at)
          setUserCollection(userCollectionTemp)
          console.log("Last Oneline", userCollection)
          break
        case "New Members":
          break
        default:
          break
  
      }
      popupState()
    }
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button
              // variant="contained"
              background="rgb\(149,96,168, 0.1)\"
              border="1px solid"
              color="primary"
              {...bindTrigger(popupState)}
            >
              <BiSortAlt2 />
              &nbsp;
              Sort By
              &nbsp;
              <IoIosArrowDown />
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem style={{ color: "white", background: "#9560A8" }} onClick={() => sortProfileCards("Age", popupState.close)}>Age</MenuItem>
              <MenuItem style={{ color: "white", background: "#9560A8" }} onClick={() => sortProfileCards("Distance", popupState.close)}>Distance</MenuItem>
              <MenuItem style={{ color: "white", background: "#9560A8" }} onClick={() => sortProfileCards("Last Online", popupState.close)}>Last Online</MenuItem>
              <MenuItem style={{ color: "white", background: "#9560A8" }} onClick={() => sortProfileCards("New Members", popupState.close)}>New Members</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  }

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

  const getCancerCard = ({ profile }) => {
    if (profile.cancer_location == "Other/Rare Cancer") {
      return (
        <p className="cancer-type-card  other-cancer-type-card">
          {" "}
          {profile.cancer_location}{" "}
        </p>
      );
    } else if (profile.cancer_location == "Brain") {
      return (
        <p className="cancer-type-card brain-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Breast") {
      return (
        <p className="cancer-type-card breast-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Bladder") {
      return (
        <p className="cancer-type-card bladder-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Bone") {
      return (
        <p className="cancer-type-card bone-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Thyroid") {
      return (
        <p className="cancer-type-card thyroid-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Cervical") {
      return (
        <p className="cancer-type-card cervical-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Colorectal") {
      return (
        <p className="cancer-type-card colorectal-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Esophageal") {
      return (
        <p className="cancer-type-card esophageal-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Gall Bladder") {
      return (
        <p className="cancer-type-card gall-bladder-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Gastric") {
      return (
        <p className="cancer-type-card gastric-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Head and Neck") {
      return (
        <p className="cancer-type-card head-and-neck-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Kidney") {
      return (
        <p className="cancer-type-card kidney-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Leukemia") {
      return (
        <p className="cancer-type-card leukemia-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Liver") {
      return (
        <p className="cancer-type-card liver-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Lung") {
      return (
        <p className="cancer-type-card lung-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Melanoma") {
      return (
        <p className="cancer-type-card melanoma-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Multiple Myeloma") {
      return (
        <p className="cancer-type-card multiple-myeloma-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Ovarian") {
      return (
        <p className="cancer-type-card ovarian-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Pancreatic") {
      return (
        <p className="cancer-type-card pancreatic-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else if (profile.cancer_location == "Sarcoma") {
      return (
        <p className="cancer-type-card sarcoma-cancer-type-card">
          {profile.cancer_location} Cancer
        </p>
      );
    } else {
      return (
        <p className="cancer-type-card"> {profile.cancer_location} Cancer</p>
      );
    }
  };


  const ProfileCard = ({ profile }) =>
    useObserver(() => (
      <div className="single-profile-wrapper " key={profile.id}>
        <Link to={"/user/" + profile.id}>
          <img className="single-profile-image" src={ROOTURL + profile.photo} />
        </Link>
        <div className="single-profile-body">
          <div>
            <Link to={"/user/" + profile.id}>
              <div
                style={{
                  backgroundColor: profile.active ? "#B7FFBF" : "white",
                }}
              >
                {getCancerCard({ profile })}

                <h5 className="profile-username profile-name-loc">
                  {profile.name}{" "}
                </h5>
              </div>
            </Link>

            <span className="profile-location">
              <LocationIcon className="profile-icon"></LocationIcon>
              {profile.city}, {profile.state}
            </span>
            <p className="other-profile-card-data">
              <AgeIcon className="profile-icon"></AgeIcon>
              {profile.age} years old
            </p>

            <Link to={"/userMessage" + "/" + profile.user_id}>
              <p className="other-profile-message-data">
                {" "}
                <ChatIcon className="message-icon"></ChatIcon> Message
              </p>
            </Link>
            <p className="other-profile-card-data">
              {profile.cancer_location} Cancer
            </p>
            <p className="other-profile-card-data">{profile.age} years old</p>
          </div>
          <div>
            {profile.active && (
              <Tooltip
                title={
                  <TimeAgo datetime={profile.last_seen_at} locale="en.US" />
                }
              >
                <Brightness1Icon
                  style={{ color: "#4DED30", fontSize: "medium" }}
                />
              </Tooltip>
            )}
            {!profile.active && (
              <Tooltip
                title={
                  <TimeAgo datetime={profile.last_seen_at} locale="en.US" />
                }
              >
                <Brightness1Icon
                  style={{ color: "#D4D4D4", fontSize: "medium" }}
                />
              </Tooltip>
            )}
            <Link to={"/userMessage" + "/" + profile.user_id}>
              <ChatIcon className="favorite-profile-icon"></ChatIcon>
            </Link>
            {store.profile.liked_profiles.includes(profile.id) ? (
              <FavoriteIcon
                onClick={() => updateLikedProfiles("unlike", profile.id)}
                className="favorite-profile-icon"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => updateLikedProfiles("like", profile.id)}
                className="favorite-profile-icon"
              />
            )}
          </div>
        </div>
      </div>
    ));

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

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setPageCounter(pageNumber);
  };


  function ShowProfileCards() {
    return   <div className="profile-browse-grid">
    {userCollection.map((profile: any) => (
      <ProfileCard profile={profile} />
    ))}
  </div>
  }

  return useObserver(() => (
    // consider: using a component to represent each search widget
    <>
      <div className="browse-container">
        <Link to={"/complete-profile/0"}> Complete your Profile!</Link>
        <h3 className="pageHeader">Browse Profiles</h3>
        <p>
          Enter keywords separated by spaces in search box(for e.g: TNBC DCIS
          Stage)
        </p>
        <div className="browse-sticky-nav">
          <h5 className="boldedSubheader" style={{padding: "0px 16px"}}>
            I'm looking for an exercise buddy:
          </h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "26px 16px 35px"
            }}
          >
            {/* age slider */}
            <div>
              {/* <RangeSlider ageRange={ageRange} onChange={handleChange}/> */}
              <label style={{ display: "table-caption" }}>
                {" "}
                Age
                <Select></Select>
              </label>
            </div>
            {/* distance */}
            <div>
              {/* {!reset && <DiscreteSlider  distance={distance} onChange={handleDistanceChange}/>}
            {reset && <DiscreteSlider  distance={DISTANCE_WITHIN_CONSTANT} onChange={handleDistanceChange}/>} */}
              <label style={{ display: "table-caption" }}>
                {" "}
                Distance
                {!reset && <Select></Select>}
                {reset && <Select></Select>}
              </label>
            </div>
            {/* city/state */}
            {store.uniqueLists &&
              store.uniqueLists.unique_state_codes.length > 1 && (
                <div>
                  <label style={{ display: "table-caption" }}>
                    {" "}
                    City/State
                    <Select
                      onChange={(e) => setStateCodeKeyword(e.target.value)}
                      value={stateCodeKeyword}
                    >
                      <option
                        className="selector"
                        value=""
                        label="- Select City/State -"
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
          <div  style={{
              padding: "0px 16px 35px",
              display: "flex"
            }}>
              {/* className="range-slider search-widget" */}
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

          {/* <h5 className="boldedSubheader">Advanced Search</h5> */}

          {/* free text search */}
          <div className="browse-filter-row" style={{ padding: "0px 16px" }}>
            <Accordion
              className="no-border-accordian"
              style={{ boxShadow: "none", padding: "0px !important" }}
            >
              <AccordionSummary
                className="MuiAccordionSummary-root"
                expandIcon={<KeyboardArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="boldedSubheader">
                  Advanced Search
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <div className="accordian-inside">
                  <Tooltip title="Add any word including the cancer type, state, zipcode or city. Example: 1) 20854 Breast Ovarian 2)  VA TNBC 3)   Lung Rockville Gaithersburg 4)   MD DCIS kidney Stage 3">
                    <input
                      className="browse-search global-input search-widget"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      placeholder="Free Text Search"
                    />
                  </Tooltip>
                  {/* cancer type*/}
                  <Select
                    onChange={(e) => setCancerTypeKeyword(e.target.value)}
                    margin="0em 2em"
                    value={cancerTypeKeyword}
                    className="search-widget"
                  >
                    <option
                      className="selector"
                      value=""
                      label="- Select cancer type -"
                    />
                    {CANCERLOCATIONLIST.map((cancerLoc: any) => (
                      <option
                        className="selector"
                        value={cancerLoc}
                        label={cancerLoc}
                      />
                    ))}
                  </Select>
                  {/* zipcode */}
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                      <div className="search-widget">
                        <Select
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          margin="0em 2em"
                          value={zipcodeKeyword}
                        >
                          <option
                            className="selector"
                            value=""
                            label="- Select Zipcode -"
                          />
                          {store.uniqueLists.unique_zipcodes.map((z: any) => (
                            <option className="selector" value={z} label={z} />
                          ))}
                        </Select>
                      </div>
                    )}
                  {/* Which of the following best describes you? */}
                  <Select
                    onChange={(e) => setPersonality(e.target.value)}
                    margin="0em 2em"
                    value={cancerTypeKeyword}
                    className="search-widget"
                  >
                    <option
                      className="selector"
                      value=""
                      label="- Which of the following best describes you? -"
                    />
                    {/* {store.uniqueLists.unique_personalities.map((personality: any) => (
              <option className="selector" value={personality} label={personality} />
            ))} */}
                  </Select>
                  {/* Favorite activities */}
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                      <div className="search-widget">
                        <Select
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          margin="0em 2em"
                          value={zipcodeKeyword}
                        >
                          <option
                            className="selector"
                            value=""
                            label="- Favorite activities -"
                          />
                          {/* {store.uniqueLists.unique_zipcodes.map((z: any) => (
                <option className="selector" value={z} label={z} />
              ))} */}
                        </Select>
                      </div>
                    )}
                  {/* Preferred exercise location */}
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                      <div className="search-widget">
                        <Select
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          margin="0em 2em"
                          value={zipcodeKeyword}
                        >
                          <option
                            className="selector"
                            value=""
                            label="- Preferred exercise location -"
                          />
                          {/* {store.uniqueLists.unique_zipcodes.map((z: any) => (
                <option className="selector" value={z} label={z} />
              ))} */}
                        </Select>
                      </div>
                    )}
                </div>

                {/* <div className="range-slider">
                <Tooltip title="Sort Users">
                  <SortIcon />
                </Tooltip > 
                {!reset && <SortBarDisplay onChange={handleOrderChange} distanceOrder={distanceOrder} ageOrder={ageOrder} lastOnineOrder={lastOnlineOrder} newestMemberOrder={newestMemberOrder} resetFunction={handleResetCompletion} reset={reset} />}
                {reset && <SortBarDisplay onChange={handleOrderChange} distanceOrder={"asc"} resetFunction={handleResetCompletion} reset={reset} />}
              </div> */}
              </AccordionDetails>
            </Accordion>

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
            <MenuPopupState/>
          </div>

          <h6>{searchTextDisplay}</h6>
        <ShowProfileCards/>
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
