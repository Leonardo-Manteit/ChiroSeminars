import axios from 'axios'

export async function getSeminars() {
    let res = await axios.get(`/api/seminars/`)
    console.log(res)
    return res.data
}