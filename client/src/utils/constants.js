// const HOST = import.meta.env.VITE_SERVER_URL;
const HOST = "https://mitr-chatapp.onrender.com/";

const AUTH_ROUTES = "api/auth";

const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;

const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;

const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;

const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;

const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;

const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;

const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

const CONTACT_ROUTES = "api/contacts";

const GET_DM_CONTACTS_ROUTES = `${CONTACT_ROUTES}/get-contacts-for-dm`;

const SEARCH_CONTACTS_ROUTES = `${CONTACT_ROUTES}/search`;

const MESSAGES_ROUTES = "api/messages";

const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;

const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/upload-file`;

export {
  HOST,
  AUTH_ROUTES,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  GET_USER_INFO,
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_IMAGE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
  LOGOUT_ROUTE,
  SEARCH_CONTACTS_ROUTES,
  GET_ALL_MESSAGES_ROUTE,
  GET_DM_CONTACTS_ROUTES,
  UPLOAD_FILE_ROUTE,
};
