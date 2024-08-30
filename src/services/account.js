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

export const registerService = (data) => {
    return axios.post(
        ACCOUNT_URL,
        data

    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
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
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const getRecentSubmissionsService = () => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        ACCOUNT_URL + 'recent_submissions',
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const getUserStatisticsService = () => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        ACCOUNT_URL + 'stats/',
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const getProfilePictureService = () => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        ACCOUNT_URL + 'get_profile_picture/',
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const getProfileInfoService = () => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        ACCOUNT_URL + 'profile/',
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const updateProfileInfoService = (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.put(
        ACCOUNT_URL + 'update_profile/',
        data,
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}