
let baseURL = "";
let environment = import.meta.env.VITE_ENVIRONMENT;

if (environment === 'dev')
    baseURL = "http://localhost:8000";
else if (environment === 'prod')
    baseURL = "https://leetclone-backend.azurewebsites.net"; 

export const BASE_URL = baseURL;
const BASE_API_URL = baseURL + "/api/v1";

export const TOAST_CONFIG = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
}

export const LOGIN_URL = BASE_API_URL + "/token/";
export const ACCOUNT_URL = BASE_API_URL + "/account/";
export const PROBLEM_URL = BASE_API_URL + "/problem/";
export const LANGUAGE_URL = BASE_API_URL + "/language/";