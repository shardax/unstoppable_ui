import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom';
import {Avatar} from 'antd';
import { UserContext } from "../UserContext";
import UnsIcon from '../images/2Unstoppable_logo.png'

const navAfterLoginLinks = [
  {
    title: 'Home',
    path: '/'
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
    title: 'Home',
    path: '/'
  },
  {
    title: 'Login',
    path: '/login'
  },
  {
    title: 'Contact Us',
    path: '/contact-us'

  }
]

export default function Navigation () {
  const [menuActive, setMenuActive] = useState(false)
  const {value, setValue} = useContext(UserContext);
 
  var navLinks;
  if (value.isLoggedIn) {
    navLinks = navAfterLoginLinks;
  } else {
    navLinks = navBeforeLoginLinks ;
  }


  return (<nav className="site-navigation" role="navigation">
    <span className="menu-title">
      <img src={UnsIcon} width="250" height="50"/>
    </span>
    <div className={`menu-content-container ${menuActive && 'active'}`}>
      <ul>
      { navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))
      }
      </ul>
      <span className="menu-avatar-container">
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size= "38" />
        <span className='menu-avatar-name'>{`${value.username}`}</span>
      </span>
    </div>
    <i className="ionicons icon ion-ios-menu" onClick={() => setMenuActive(!menuActive)} />
  </nav>)
}