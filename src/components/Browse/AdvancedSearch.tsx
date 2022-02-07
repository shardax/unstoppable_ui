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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react"; 
 
 
export const AdvancedSearch = () => {
    const store = useDataStore();
    const [cancerTypeKeyword, setCancerTypeKeyword] = useState(
    store.savedSearchParams.cancerTypeKeyword
  );
   const [zipcodeKeyword, setZipcodeKeyword] = useState(
    store.savedSearchParams.zipcodeKeyword
  );
    const [personality, setPersonality] = useState(
    store.savedSearchParams.personality
  );
 
 return (
     <>
  {/* <h5 className="boldedSubheader">Advanced Search</h5> */}
            <Accordion
              className="no-border-accordian"
              style={{ boxShadow: "none", padding: "0px !important" }}
            >
              <AccordionSummary
                // className="MuiAccordionSummary-root"
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
                <div style={{display: "inline-flex"}}>
                  {/* cancer type*/}
                  <label style={{justifyContent: "center",
 
    display: "grid"}}>
                  <span className="filter-label"> Cancer Type </span>
                   <div className="search-widget">
                  <Select
                    style={{width: '20em'}}
                    onChange={(e) => setCancerTypeKeyword(e.target.value)}
                    // margin="0em 2em"
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
                
                  </div>
                  </label>
                  {/* zipcode */}
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                      <label style={{justifyContent: "center",
 
    display: "grid"}}>
    <span className="filter-label"> Keyword </span>
                      <div className="search-widget">
                        <Select
                        style={{width: '20em'}}
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          // margin="0em 2em"
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
                      </label>
                    )}
                  {/* Which of the following best describes you? */}
                   <label style={{justifyContent: "center",
 
    display: "grid"}}>
    <span className="filter-label"> Which of the following best describes you? </span>
                <div className="search-widget">
                  <Select
                  style={{width: '20em'}}
                    onChange={(e) => setPersonality(e.target.value)}
                    // margin="0em 2em"
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
                  </div>
                  </label>
                  {/* Favorite activities */}
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                       <label style={{justifyContent: "center",
 
    display: "grid"}}>
    <span className="filter-label"> Favorite activities </span>
                      <div className="search-widget">
                        <Select
                        style={{width: '20em'}}
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          // margin="0em 2em"
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
                      </label>
                    )}
                  </div>
                  {/* Preferred exercise location */}
                  <div>
 <label style={{
    display: "grid"}}>
    <span className="filter-label"> Preferred exercise location </span>
                  {store.uniqueLists &&
                    store.uniqueLists.unique_zipcodes.length > 1 && (
                      <div className="search-widget">
                        <Select
                        style={{width: '20em'}}
                          onChange={(e) => setZipcodeKeyword(e.target.value)}
                          // margin="0em 2em"
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
                        </label>
                    </div>
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
            </>
    )

}