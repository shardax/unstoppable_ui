import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import { ALLPROFILESURL, ROOTURL, PROFILEURL } from "../constants/matcher";
import axios from 'axios'
import Default from '../layouts/Default';
import UserSection from '../components/Users/UserSection'

const User = () => {
  let { id } = useParams();

  return (    
      <Default>
        <UserSection id={id} />
      </Default>
  )
}

export default User;
