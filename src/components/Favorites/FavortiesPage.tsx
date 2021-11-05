import "./FavoritesPage.scss";

// import { Dropdown, DropdownButton } from 'react-bootstrap';
import { PROFILEURL, ROOTURL, UPLOADAVATARURL } from "../../constants/matcher";
import { Prompt, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Button from "../Styled/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import UserSection from "../Users/UserSection";
import { useDataStore } from "../../UserContext";
import { useObserver } from "mobx-react";

const ViewFavoritesPage: React.FC = ({}) => {
  const store = useDataStore();
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
    setActiveUsers(event.target.checked);
    console.log(event.target.checked);
  };

  return (
    <div>
      <div>
        <h3>Favorites Profiles</h3>
        <p>You can find all your favorite profiles here</p>
        <div id="headerFilter">
          <Tooltip title="Add any word including the cancer type, state, zipcode or city. Example: 1) 20854 Breast Ovarian 2)  VA TNBC 3)   Lung Rockville Gaithersburg 4)   MD DCIS kidney Stage 3">
            <input
              className="browse-search global-input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Free Text Search"
            />
          </Tooltip>
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
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default ViewFavoritesPage;
