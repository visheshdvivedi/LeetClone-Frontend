import axios from "axios";
import { LOGIN_URL, ACCOUNT_URL } from "../Constants";

export const loginService = (data) => {
    return axios.post(
        LOGIN_URL,
        data
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch (err => { return { status: false, json: err.toJSON() } })
}

export const getMeDetailsService = () => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        ACCOUNT_URL + 'me',
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(resp => { return { status: false, json: err.toJSON() } })
}