const HOST = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTES = "api/auth";

const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
console.log(SIGNUP_ROUTE);

const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
console.log(LOGIN_ROUTE);

export { HOST, AUTH_ROUTES, SIGNUP_ROUTE, LOGIN_ROUTE };
