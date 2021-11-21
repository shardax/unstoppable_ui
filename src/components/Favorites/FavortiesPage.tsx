import "./FavoritesPage.scss";

import { Dropdown, DropdownButton } from "react-bootstrap";
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { PROFILEURL, ROOTURL, UPLOADAVATARURL } from "../../constants/matcher";
import { Prompt, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";

import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import DraftsIcon from '@material-ui/icons/Drafts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LikedProfile from "../Users/LikedProfile";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from "@material-ui/core/Tooltip";
import { useDataStore } from "../../UserContext";
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  // root: {
  //   '&:focus': {
  //     backgroundColor: theme.palette.primary.main,
  //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
  //       color: theme.palette.common.white,
  //     },
  //   },
  // },
}))(MenuItem);

function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="SortButton">
      <FontAwesomeIcon icon={faSort} />
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

const ViewFavoritesPage: React.FC = ({}) => {
  const store = useDataStore();
  const [userCollection, setUserCollection] = React.useState<any>([]);
  const [currentProfile, setCurrentProfile] = useState(store.profile);
  const [dataLoading, setDataLoading] = useState("");
  const [profileImg, setProfileImg] = useState(ROOTURL + store.avatarPath);
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = React.useState(
    store.savedSearchParams ? store.savedSearchParams.filter : ""
  );
  const [activeUsers, setActiveUsers] = useState(
    store.savedSearchParams.activeUsers
  );
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleActiveUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveUsers(event.target.checked);
    console.log(event.target.checked);
  };

  return (
    <div className="page">
      <div>
        <h3>Favorites Profiles</h3>
        <p>You can find all your favorite profiles here</p>
        <div id="headerFilter">
          <div className="box">
            <FontAwesomeIcon icon={faSearch} />
            <Tooltip title="Add any word including the cancer type, state, zipcode or city. Example: 1) 20854 Breast Ovarian 2)  VA TNBC 3)   Lung Rockville Gaithersburg 4)   MD DCIS kidney Stage 3">
              <input
                className="browse-search global-input"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search by name, state, city, or zip code"
                style={{ width: 500 }}
              />
            </Tooltip>
          </div>
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
          {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item >Action</Dropdown.Item>
          <Dropdown.Item >Another action</Dropdown.Item>
          <Dropdown.Item >Something else</Dropdown.Item>
          </DropdownButton> */}
          <CustomizedMenus/>
        </div>
      </div>

      <div className="profile-browse-grid">
        {store.profile.liked_profiles.map((id: number) => (
          <LikedProfile id={id} />
        ))}
      </div>

      <div>{store.profile.liked_profiles.length}</div>
    </div>
  );
};
export default ViewFavoritesPage;
