import React, {ReactNode, createContext} from 'react'
import {UserStore, createStore} from './UserStore'

import {WEBSOCKETCABLEURL} from './constants/matcher'
import actionCable from 'actioncable'
import {useLocalStore} from 'mobx-react'

const CableApp = {cable: {}}
CableApp.cable = actionCable.createConsumer(WEBSOCKETCABLEURL) 
export const ActionCableContext = createContext({});

/*export const CableProvider  = (props: { children?: ReactNode }) => {
  return (
    <ActionCableContext.Provider value={CableApp.cable}>
      {props.children}
    </ActionCableContext.Provider>
  )
};

export const useCable = () => {
  const cable =  React.useContext(ActionCableContext);
  return cable;
}*/

export const StoreContext = React.createContext<UserStore | null>(null);

export const StoreProvider = (props: { children?: ReactNode }) => {
  const store = useLocalStore(createStore);
  return (
    <StoreContext.Provider value={store}>
      <ActionCableContext.Provider value={CableApp.cable}>
        {props.children}
      </ActionCableContext.Provider>
    </StoreContext.Provider>
  )
};

export const useDataStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("useDataStore: !store, did you forget StoreProvider?");
  }
  console.log('store!!!!', store)
  return store;
};
