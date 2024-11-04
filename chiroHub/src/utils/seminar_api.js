import axios from 'axios'

export async function getSeminars() {
    let res = await axios.get(`/chiro/seminars/`)
    // console.log(res)
    return res.data
}

export async function getFeatured() {
    let res = await axios.get(`/chiro/featured/`)
    console.log(res)
    return res.data
}

export async function getSeminarById(seminar_id) {
    let res = await axios.get(`/chiro/seminars/${seminar_id}`)
    console.log(res)
    return res.data
}

export async function deleteSeminar(seminar_id) {
    let res = await axios.delete(`/chiro/delete/${seminar_id}`)
    console.log(res)
    return res.data
}
