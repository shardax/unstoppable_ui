import { observable } from 'mobx';
import { create, persist} from 'mobx-persist';

/** 
export type UserStoreType = {
  username: string
  isLoggedIn: boolean
  profile: ProfileStoreType
}


export type ProfileStoreType = {
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


export type ProfileListStore = {
  profileList: ProfileStoreType[]
}
**/

export class ProfileStore {
  id: number;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  state_code: string;
  distance: number;
  time_zone: string;
  dob: string;
  age: number;
  other_favorite_activities: string;
  fitness_level: string;
  cancer_location: string;
  prefered_exercise_location: string;
  prefered_exercise_time: string;
  reason_for_match: string;
  treatment_status: string;
  treatment_description: string;
  personality: string;
  work_status: string;
  details_about_self: string;
  other_cancer_location: string;
  part_of_wellness_program:boolean;
  which_wellness_program: string;
  latitude: number;
  longitude: number;
  step_status: string;
  moderated: boolean;
  referred_by: string;

  constructor(){
  this.id = 0;
  this.zipcode = "";
  this.city = "";
  this.state = "";
  this.country = "";
  this.state_code = "";
  this.distance = 0;
  this.time_zone = "";
  this.dob = "";
  this.age = 18;
  this.other_favorite_activities = "";
  this.fitness_level = "";
  this.cancer_location = "";
  this.prefered_exercise_location = "";
  this.prefered_exercise_time = "";
  this.reason_for_match = "";
  this.treatment_status = "";
  this.treatment_description = "";
  this.personality = "";
  this.work_status = "";
  this.details_about_self = "";
  this.other_cancer_location = "";
  this.part_of_wellness_program = false;
  this.which_wellness_program = "";
  this.latitude = 0;
  this.longitude = 0;
  this.step_status = "";
  this.moderated = false;
  this.referred_by = "";

  //hydrate('profileStore', this).then(() => console.log('profileStore has been hydrated'))
  }

}
export class UserStore {
  @persist @observable username:string;
  @persist @observable isLoggedIn: boolean;
  @persist @observable profileId: number;
  @persist('object') profile: ProfileStore;
  @persist avatarPath: string;

  constructor(){
     // When the User hits refresh, get the values from the local storage.
    if (localStorage.userStore != null) {
      var localStorageData = JSON.parse(localStorage["userStore"]);
      this.username = localStorageData.username;
      this.isLoggedIn = localStorageData.isLoggedIn;
      this.profile = localStorageData.profile;
      this.avatarPath = localStorageData.avatarPath;
      this.profileId = localStorageData.profileId;
    } else {
      this.username = "";
      this.isLoggedIn = false;
      this.profile = new ProfileStore();
      this.avatarPath = "";
      this.profileId = 0;
      }
    hydrate('userStore', this).then(() => console.log('userStore has been hydrated'))
  }
 
}


const hydrate = create({
  storage: localStorage,   // or AsyncStorage in react-native.
                          // default: localStorage
  jsonify: true  // if you use AsyncStorage, here shoud be true
                  // default: true
})

export function createStore() {
  const store = new UserStore();
  return store;
}



export type TStore = ReturnType<typeof createStore>
