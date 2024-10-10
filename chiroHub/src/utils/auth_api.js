import axios from 'axios'

export async function login(userInfo) {
    console.log(userInfo)
    let res = await axios.post(`/api/login`, userInfo) 
    console.log(res)
    return res.data.token
}

export async function signUp(userInfo) {
    console.log('sign up attempt', userInfo)
    let res = await axios.post(`http://localhost:8000/api/signUp`, userInfo) 
    console.log(res)
    return res.data.token
}
