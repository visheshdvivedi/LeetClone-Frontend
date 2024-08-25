import axios from "axios";
import { PROBLEM_URL } from "../Constants";

export const listTagService = () => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        PROBLEM_URL + 'list_all_tags',
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}