import React, {createContext, ReactNode} from 'react'
import {useLocalStore} from 'mobx-react'
import {createStore, UserStore, ProfileStore} from './UserStore'

//type Store = ReturnType<typeof createStore>;

export const StoreContext = React.createContext<UserStore | null>(null);

export const StoreProvider = (props: { children?: ReactNode }) => {
  const store = useLocalStore(createStore);
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
};

export const useDataStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("useDataStore: !store, did you forget StoreProvider?");
  }
  return store;
};

export const AddToProfileStore = (profile: ProfileStore) => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("useDataStore: !store, did you forget StoreProvider?");
  }
  //store.profile = profile;
};
