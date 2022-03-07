import "./FavoritesPage.scss";

import { ALLPROFILESURL, PROFILEURL, ROOTURL, UPLOADAVATARURL } from "../../constants/matcher";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { Prompt, useHistory } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { faSearch, faSort } from "@fortawesome/free-solid-svg-icons";

// import Button from '@material-ui/core/Button';
import Button from "../Styled/Button";
import Checkbox from "@material-ui/core/Checkbox";
import DraftsIcon from '@material-ui/icons/Drafts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LikedProfile from "../Users/LikedProfile";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import {MenuPopupState} from "../Browse/SortByMenu";
import Pagination from './Pagination';
import SendIcon from '@material-ui/icons/Send';
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
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
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
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

function ProfileGrid(props) {
  const [currentPage, setCurrentPage] = useState(1)

  let pageSize = 8

  let totalPageCount = Math.ceil(props.profiles.length/8)

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return props.profiles.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


    return <>
    <div className="profile-browse-grid">
  {currentPageData.map((id: number) => (
    <LikedProfile id={id} />
  ))}
   </div>
    <div className="page-footer">
      <Button className="button" disabled={currentPage == totalPageCount} onClick={() => { 
      
        if(currentPage - 1 < totalPageCount) {
          setCurrentPage(currentPage + 1)
        }else{
          return null
        }}}
        color="#FFFFFF"
        background="#F1658C"
        borderRadius="6px"
        margin="2em 1.5em"
        padding="10px 40px">
        Next
      </Button>
      <div>
        <Pagination 
         className="pagination-bar"
         currentPage={currentPage}
         totalCount={props.profiles.length}
         pageSize={8}
         onPageChange={page => setCurrentPage(page)} />
      </div>
    </div>
  </>

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

  const handleActiveUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('looking for active users')
    setActiveUsers(event.target.checked);
    console.log(event.target.checked);
  };

  useEffect(() => {
    // gets all the profiles to populate the browse profile cards
    const getProfiles = async () => {
      try {
        const { data } = await axios.get(ALLPROFILESURL, {
          withCredentials: true,
          headers: {
            contentType: "application/json; charset=utf-8",
          },
        });
        setUserCollection(data.profiles);
        var temp = [] as any;
        for(var i = 0; i < store.profile.liked_profiles.length; i++){
          for(var j = 0; j < userCollection.length; j++){
            if(store.profile.liked_profiles[i] == userCollection[j].profileId){
              temp.push(userCollection[j].profile);
            }
          }
        }
        setUserCollection(temp);
      } catch (e) {
        console.log(`😱 Browse Fetch failed: ${e}`);
        setUserCollection([]);
      }
    };
    getProfiles();

  }, []);

  return (
    <div>
      <div>
        <h3 className="pageHeader">Favorites Profiles</h3>
        <p>You can find all your favorite profiles here</p>
        <div id="headerFilter">
          <div className="favorites-search-box">
            <FontAwesomeIcon icon={faSearch} />
            <Tooltip title="Add any word including the cancer type, state, zipcode or city. Example: 1) 20854 Breast Ovarian 2)  VA TNBC 3)   Lung Rockville Gaithersburg 4)   MD DCIS kidney Stage 3">
              <input
                className="browse-search global-input"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search by name, state, city, or zip code"
                style={{ width: 700 }}
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
          <MenuPopupState className="irbfsN" userCollection={userCollection} setUserCollection={setUserCollection}/>
        </div>
      </div>

      <ProfileGrid profiles={store.profile.liked_profiles} />

    </div>
  );
};
export default ViewFavoritesPage;
