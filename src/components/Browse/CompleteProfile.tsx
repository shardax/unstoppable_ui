import React, { useState, useEffect } from "react";
import Button from '../../components/Styled/Button';
import { Link } from "react-router-dom";

export const BrowseProfiles = () => {
    return(
    <div className="complete-profile-container">
        <div className ="complete-profile-message">
            <div className="pageHeader">Please Complete Your Profile to Begin Matching</div>
            <Button><Link to="/complete-profile/0" style={{color:"#fff"}}>Complete Profile Here</Link></Button>
        </div>
    </div>
    );
}

export default BrowseProfiles;
