import "./Browse.scss";

import {
  AGE_RANGE_CONSTANT,
  CANCERLOCATIONLIST,
  DISTANCE_WITHIN_CONSTANT,
} from "../../constants/ProfileConstants";
import { ALLPROFILESURL, PROFILEURL, ROOTURL } from "../../constants/matcher";
import { Link, NavLink } from 'react-router-dom';
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';

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
import LocationIcon from "@material-ui/icons/LocationOn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationIcon from '../../images/NotificationIcon.png';
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

export const MenuPopupState = (props) => {
    const classes = useStyles();
    const sortProfileCards = (sortBy, popupState) => {
      let userCollectionTemp;
      switch (sortBy) {
        case "Age":
          userCollectionTemp = props.userCollection
            .slice()
            .sort((profile1, profile2) => profile2.age - profile1.age);
          props.setUserCollection(userCollectionTemp);
          break;
        case "Distance":
          userCollectionTemp = props.userCollection
            .slice()
            .sort(
              (profile1, profile2) => profile1.distance - profile2.distance
            );
          props.setUserCollection(userCollectionTemp);
          console.log("Distance", props.userCollection);
          break;
        case "Last Online":
          userCollectionTemp = props.userCollection
            .slice()
            .sort(
              (profile1, profile2) =>
                profile1.last_seen_at - profile2.last_seen_at
            );
          props.setUserCollection(userCollectionTemp);
          console.log("Last Oneline", props.userCollection);
          break;
        case "New Members":
          break;
        default:
          break;
      }
      popupState();
    };
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
              &nbsp; Sort By &nbsp;
              <IoIosArrowDown />
            </Button>
            <Menu 
              {...bindMenu(popupState)}
              classes={{ paper: classes.menuPaper }}
              getContentAnchorEl={null}
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
              transformOrigin={{vertical: 'top', horizontal: 'center'}}>
              <MenuItem
                style={{ color: "white", background: "#9560A8" }}
                onClick={() => sortProfileCards("Age", popupState.close)}
              >
                Age
              </MenuItem>
              <MenuItem
                style={{ color: "white", background: "#9560A8" }}
                onClick={() => sortProfileCards("Distance", popupState.close)}
              >
                Distance
              </MenuItem>
              <MenuItem
                style={{ color: "white", background: "#9560A8" }}
                onClick={() =>
                  sortProfileCards("Last Online", popupState.close)
                }
              >
                Last Online
              </MenuItem>
              <MenuItem
                style={{ color: "white", background: "#9560A8" }}
                onClick={() =>
                  sortProfileCards("New Members", popupState.close)
                }
              >
                New Members
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  };


  export const useStyles = makeStyles((theme: Theme) => ({
    menuPaper: {
      backgroundColor: "#9560A8",
      // top: "44.5em !important",
      // left: "88.5em !important"
    },
  }));
  


