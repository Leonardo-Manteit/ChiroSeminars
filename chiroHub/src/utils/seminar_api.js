import axios from 'axios'

export async function getSeminars() {
    let res = await axios.get(`/chiro/seminars/`)
    // console.log(res)
    return res.data
}

export async function getFeatured() {
    let res = await axios.get(`/chiro/featured/`)
    // console.log(res)
    return res.data
}

export async function getSeminarById(seminar_id) {
    let res = await axios.get(`/chiro/seminars/${seminar_id}`)
    // console.log(res)
    return res.data
}

export async function deleteSeminar(seminar_id) {
    let res = await axios.delete(`/chiro/delete/${seminar_id}`)
    // console.log(res)
    return res.data
}

export async function getUpdates(seminar_id, user_email) {
    let res = await axios.post(`/chiro/get-updates/${seminar_id}/${user_email}`)
    console.log(res)
    return res.data
}

export async function stopUpdates(seminar_id, user_email) {
    let res = await axios.delete(`/chiro/stop-updates/${seminar_id}/${user_email}`)
    console.log(res)
    return res.data
}

export async function getUserHostedSeminars(user_id) {
    let res = await axios.get(`/chiro/user-hosted-events/${user_id}`)
    console.log(res)
    return res.data
}