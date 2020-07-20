import React, {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../constants/matcher";
import axios from 'axios'
import Default from '../layouts/Default';
import UserSection from '../components/Users/UserSection'

const User = () => {
  let { id } = useParams();

  return (    
      <Default>
        <div style={{ width: "100vh", position: "relative" }}>
          <Link style={{ textDecoration: "underline" }} to="/home">Go Back Home</Link>
          <UserSection id={id} />
        </div>
      </Default>
  )
}

export default User;
