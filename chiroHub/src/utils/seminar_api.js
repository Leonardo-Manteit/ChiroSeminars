import axios from 'axios'

export async function getSeminars() {
    let res = await axios.get(`/api/seminars/`)
    // console.log(res)
    return res.data
}

export async function getFeatured() {
    let res = await axios.get(`/api/featured/`)
    console.log(res)
    return res.data
}

export async function getSeminarById(seminar_id) {
    let res = await axios.get(`/api/seminars/${seminar_id}`)
    console.log(res)
    return res.data
}

export async function deleteSeminar(seminar_id) {
    let res = await axios.delete(`/api/delete/${seminar_id}`)
    console.log(res)
    return res.data
}
