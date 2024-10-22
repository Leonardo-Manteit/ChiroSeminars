import axios from 'axios'

export async function getSeminars() {
    let res = await axios.get(`/api/seminars/`)
    console.log(res)
    return res.data
}

export async function getFeatured() {
    let res = await axios.get(`/api/featured/`)
    console.log(res)
    return res.data
}