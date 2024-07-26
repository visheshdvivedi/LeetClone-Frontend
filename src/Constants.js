const BASE_URL = "http://localhost:8000/api/v1";

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

export const LOGIN_URL = BASE_URL + "/token/";
export const ACCOUNT_URL = BASE_URL + "/account/";
export const PROBLEM_URL = BASE_URL + "/problem/";