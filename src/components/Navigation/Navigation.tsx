import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {Avatar} from 'antd';
import {useDataStore} from "../../UserContext";
import {useObserver} from 'mobx-react'
import UnsIcon from '../../images/2unstoppable.png'
import { ALLPROFILESURL, ROOTURL } from "../../constants/matcher";
import './Navigation.scss';

const navAfterLoginLinks = [
  {
    title: 'Browse', //Home
    path: '/'
  },
  {
    title: 'My Profile',
    path: '/profile'
  },
  {
    title: 'Messages',
    path: '/contact-us'
  },
  {
    title: 'Logout',
    path: '/logout'
  },
]

const navBeforeLoginLinks = [
  {
    title: 'Login',
    path: '/login'
  }
]

/**
 * 
 * // example Context object
const ThemeContext = React.createContext("dark");

// usage with context Consumer
function Button() {
  return <ThemeContext.Consumer>
        {theme => <button className={theme}> Amazing button </button>}
  </ThemeContext.Consumer>
}


// usage with useContext hook 
import {useContext} from 'react';

function ButtonHooks() {
 const theme = useContext(ThemeContext)
 return <button className={theme}>Amazing button</button>
}

 * 
 */

const SetNavigationLinks = () => {
  const store = useDataStore();

  return useObserver(() => (
    <span>
      { (store.isLoggedIn ? navAfterLoginLinks : navBeforeLoginLinks).map((link, index) => (
            <span key={index}>
              <Link className="link-wrapper" to={link.path}>{link.title}</Link>
            </span>
          ))
      }
    </span>
  ));
}

const DisplayUserName = () => {
  const store = useDataStore();

  return (useObserver(() => <span className='menu-avatar-name'>{store.username}</span>))
}

const DisplayAvatar = () => {
  const store = useDataStore();
  console.log(store.avatarPath);
  //return (useObserver(() => <img src={ROOTURL + store.avatarPath} height={50} width={50} />))
  return (useObserver(() => <Avatar src={ROOTURL + store.avatarPath}  size= "large" />))
}


export default function Navigation () {
  const [menuActive, setMenuActive] = useState(false);
  const store = useDataStore();

  return (
  <nav className="site-navigation" role="navigation">
    <span className="menu-title">
      <img className="logo-navbar" src={UnsIcon} alt="" />
      {/* <h3 style={{ color: "white" }}><span 2unstoppable</h3> */}
    </span>
    <div className={`menu-content-container ${menuActive && 'active'}`}>
      <>
      <SetNavigationLinks/>
      <DisplayAvatar/>
      <DisplayUserName/>
      </>
    </div>
    <i className="ionicons icon ion-ios-menu" onClick={() => setMenuActive(!menuActive)} />
  </nav>)
}