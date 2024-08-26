const HOST = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTES = "api/auth";

const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;

const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;

const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;

const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;

export {
  HOST,
  AUTH_ROUTES,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  GET_USER_INFO,
  UPDATE_PROFILE_ROUTE,
};
