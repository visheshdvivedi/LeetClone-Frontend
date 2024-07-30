import axios from 'axios';
import { LANGUAGE_URL } from '../Constants';

export const getAllLanguagesService = () => {
    const token = JSON.parse(localStorage.getItem("token"));
   
    if (!token)
        return { status: false, json: { 'message': "Token not found" } }

    return axios.get(
        LANGUAGE_URL,
        {
            headers: { Authorization: "Bearer " + token.access }
        }
    )
    .then(resp => { return { status: true, json: resp.data } })
    .catch(err => { return { status: false, json: err.toJSON() } })
}