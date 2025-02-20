import axios from "axios"

export async function addFavouriteSeminar(favSem_id, user_id) {
    let res = await axios.post(`/chiro/favourite/${favSem_id}/${user_id}`)
    console.log(res)
    return res.data
}

export async function removeFavouriteSeminar(favSem_id, user_id) {
    let res = await axios.delete(`/chiro/favourite/${favSem_id}/${user_id}`)
    console.log(res)
    return res.data
}
    
export async function deleteUser(user_id) {
    let res = await axios.delete(`/chiro/user/delete/${user_id}`)
    console.log(res)
    return res.data
}