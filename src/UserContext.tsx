import React, {createContext, ReactNode} from 'react'
import {useLocalStore} from 'mobx-react'

export type UserStore = {
  username: string
  isLoggedIn: boolean
  profile: ProfileStore
}

export type ProfileStore = {
  id: number
  zipcode: string
  city: string
  state: string
  country: string
  state_code: string
  distance: number
  time_zone: string
  dob: string
  age: number
  other_favorite_activities: string
  fitness_level: string
  cancer_location: string
  prefered_exercise_location: string
  prefered_exercise_time: string
  reason_for_match: string
  treatment_status: string
  treatment_description: string
  personality: string
  work_status: string
  details_about_self: string
  other_cancer_location: string
  part_of_wellness_program:boolean
  which_wellness_program: string
  latitude: number
  longitude: number
  step_status: string
  moderated: boolean
  referred_by: string
}

let initProfile = {
  id: 0, dob: "", zipcode: "", other_favorite_activities: "", fitness_level: "", cancer_location: "", prefered_exercise_location: "", prefered_exercise_time: "", reason_for_match: "", treatment_status: "", treatment_description: "", personality: "", work_status: "", details_about_self: "", other_cancer_location: "", part_of_wellness_program: false, which_wellness_program: "",  latitude: 0, longitude: 0, step_status: "", moderated: false, referred_by: "", city: "", state: "", country: "", state_code: "", distance: 0, time_zone: "", age: 18
}

function createStore() {
  const store: UserStore = {
    username: "",
    isLoggedIn: false,
    profile: initProfile
  };
  return store;
}

//type Store = ReturnType<typeof createStore>;

export const  UserContext = createContext({});

export const StoreContext = React.createContext<UserStore | null>(null);

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

