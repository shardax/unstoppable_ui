import React, {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../constants/matcher";
import axios from 'axios'
import Default from '../layouts/Default';
import UserSection from '../components/Users/UserSection'
import Button from '../components/Button/Button'
const User = () => {
  let { id } = useParams();

  return (    
      <Default>
          <Link style={{ textDecoration: "underline" }} to="/home"><Button background="white" color="#222222" fontSize="13px" padding="2px 12px" border="1px solid #222222" borderRadius="30px">Go Back Home</Button></Link>
          <UserSection id={id} />
      </Default>
  )
}

export default User;
