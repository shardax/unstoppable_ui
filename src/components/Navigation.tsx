import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {Avatar} from 'antd';
import {useDataStore} from "../UserContext";
import {useObserver} from 'mobx-react'
import UnsIcon from '../images/2Unstoppable_logo.png'

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
    title: 'Logout',
    path: '/logout'
  },
  {
    title: 'Contact Us',
    path: '/contact-us'

  }
]

const navBeforeLoginLinks = [
  {
    title: 'Login',
    path: '/login'
  },
  {
    title: 'Contact Us',
    path: '/contact-us'

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
    <ul>
      { (store.isLoggedIn ? navAfterLoginLinks : navBeforeLoginLinks).map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))
      }
    </ul>
  ));
}

const DisplayUserName = () => {
  const store = useDataStore();

  return (useObserver(() => <span className='menu-avatar-name'>{store.username}</span>))
}


export default function Navigation () {
  const [menuActive, setMenuActive] = useState(false);

  return (<nav className="site-navigation" role="navigation">
    <span className="menu-title">
      <img src={UnsIcon} width="250" height="50" alt="" />
    </span>
    <div className={`menu-content-container ${menuActive && 'active'}`}>
      <SetNavigationLinks/>
      <span className="menu-avatar-container">
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size= "small" />
        <DisplayUserName/>
      </span>
    </div>
    <i className="ionicons icon ion-ios-menu" onClick={() => setMenuActive(!menuActive)} />
  </nav>)
}