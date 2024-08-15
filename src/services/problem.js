import axios from "axios";
import { PROBLEM_URL } from "../Constants";

export const listProblemsService = (filters) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (filters.difficulty === "")
        delete filters['difficulty'];
    if (filters.tags === "")
        delete filters['tags'];
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        PROBLEM_URL,
        {
            params: filters,
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const retrieveProblemService = (public_id) => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        PROBLEM_URL + public_id + "/",
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const retrieveSubmissionsService = (public_id) => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        PROBLEM_URL + public_id + "/submissions/",
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const runCodeService = (public_id, language_id, code) => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.post(
        PROBLEM_URL + public_id + "/run/",
        { language_id: language_id, code: btoa(code) },
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}

export const submitCodeService = (public_id, language_id, code) => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.post(
        PROBLEM_URL + public_id + "/submit/",
        { language_id: language_id, code: btoa(code) },
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}