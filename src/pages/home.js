import React, {useContext} from 'react'
import { UserContext } from "../UserContext";

export default function Home() {
  const {value, setValue} = useContext(UserContext);
  return( <div>Home  {value.username}</div>)
}