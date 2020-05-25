import React,{createContext} from 'react'
import {useLocalStore} from 'mobx-react'

export const  UserContext = createContext({});

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    username: "",
    isLoggedIn: false
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
};

