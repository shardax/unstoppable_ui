// App Server URL
//export const ROOTURL = "http://localhost:3001"
export const ROOTURL = "https://trusting-swirles-21bd7c.netlify.app"

// Web Socket URLs
//export const WEBSOCKETCABLEURL = "ws://localhost:3001/cable"
export const WEBSOCKETCABLEURL = "wss://uns1.herokuapp.ble"

// Authorization and Registration related URLs
export const LOGINURL = ROOTURL + "/users/sign_in"
export const LOGOUTURL = ROOTURL + "/users/sign_out"
export const REGISTERURL = ROOTURL + "/users"
export const ABOUTURL = ROOTURL + "/users"
export const SENDUSERNAMEURL = ROOTURL + "/send_username.json"
export const SAVEUSERURL = ROOTURL + "/users"
export const RESETPASSWORDURL = ROOTURL + "/users/password/edit"
export const UPLOADAVATARURL = ROOTURL + "/attachment/photosavejson"
export const FORGOTPASSWORDURL = ROOTURL + "/users/update_password_json"

// Account setting URLs
export const VALIDUSERNAMEURL = ROOTURL + "/account_settings/valid_username"
export const SAVEUSERNAMEURL = ROOTURL + "/account_settings/change_username"
export const VALIDEMAILURL = ROOTURL + "/account_settings/valid_email"
export const SAVEEMAILURL = ROOTURL + "/account_settings/change_email"
export const SAVEDOBURL = ROOTURL + "/account_settings/change_dob"
export const SAVEZIPCODEURL = ROOTURL + "/account_settings/change_zipcode"
export const SAVEPASSWORDURL = ROOTURL + "/account_settings/update_password"
export const SAVEPHONEURL = ROOTURL + "/account_settings/change_phone"
export const VALIDPHONEURL = ROOTURL + "/account_settings/valid_phone"

// Search related URLs
export const ALLPROFILESURL = ROOTURL + "/profiles.json"
export const PROFILEURL = ROOTURL + "/profiles"
export const SAVESEARCHPARAMSURL = ROOTURL + "/account_settings/save_search_params"

// Messaging URLs
export const SENDMESSAGEURL = ROOTURL + "/conversations"
export const CONVERSATIONSURL = ROOTURL + "/conversations/conversationsjson.json"
export const ALLCONVERSATIONSURL = ROOTURL + "/conversations/allconversationsjson.json"

// Chatrooms URLs
export const CHATROOMSURL = ROOTURL + "/chatrooms"

//
//export const EVENTSURL = ROOTURL + "/events"



