import { addFavouriteSeminar } from "../../utils/user_functions"
import { getNewToken } from "../../utils/auth_api"

export default function FavouritesBtn({seminar_id, user, setIsFavourite, setFavourites, favourites}) {
    function handleFavourite() {
        setIsFavourite(true)
        addFavouriteSeminar(seminar_id,user.id)
        updateToken()
        setFavourites([...favourites, String(seminar_id)])
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
    <button onClick={handleFavourite}>Add to Favourites</button>
    </>
    )
}