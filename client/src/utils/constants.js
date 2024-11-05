const HOST = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTES = "api/auth";

const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;

const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;

const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;

const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;

const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;

const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;

const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

const CONTACT_ROUTES = "api/contacts";

const SEARCH_CONTACTS_ROUTES = `${CONTACT_ROUTES}/search`;

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
};
