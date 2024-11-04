import axios from 'axios'

export async function login(userInfo) {
    let res = await axios.post(`/chiro/login`, userInfo) 
    console.log(res)
    return res.data.token
}

export async function signUp(userInfo) {
    let res = await axios.post(`/chiro/signUp`, userInfo) 
    console.log(res)
    return res.data.token
}
