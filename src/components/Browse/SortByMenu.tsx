import "./Browse.scss";

import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import { BiSortAlt2 } from "react-icons/bi";
import Button from "../Styled/Button";
import { IoIosArrowDown } from "react-icons/io";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// accordian imports


// chat imports




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
  


