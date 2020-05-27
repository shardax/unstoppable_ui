import React, {createContext, ReactNode} from 'react'
import {useLocalStore} from 'mobx-react'

function createStore() {
  const store = {
    username: "",
    isLoggedIn: false
  };
  return store;
}

type Store = ReturnType<typeof createStore>;

export const  UserContext = createContext({});

export const StoreContext = React.createContext<Store | null>(null);

export const StoreProvider = (props: { children?: ReactNode }) => {
  const store = useLocalStore(createStore);
 
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
};

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("useStore: !store, did you forget StoreProvider?");
  }
  return store;
};

