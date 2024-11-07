import { removeFavouriteSeminar } from "../../utils/user_functions"
import { getNewToken } from "../../utils/auth_api"

export default function FavouritesRemoveBtn({seminar_id, user, setIsFavourite}) {
    function handleRemove() {
        setIsFavourite(false)
        removeFavouriteSeminar(seminar_id,user.id)
        updateToken()
    }
    async function updateToken() {
        try {
            let token = await getNewToken(user)
            localStorage.setItem('token', token)
        } catch (err) {
            console.log('undable to update:',err)
        }
    }
    return(
    <>
    <button onClick={handleRemove}>Remove from Favourites</button>
    </>
    )
}