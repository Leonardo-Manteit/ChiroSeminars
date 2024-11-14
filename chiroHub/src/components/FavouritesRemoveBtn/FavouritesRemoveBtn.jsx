import { removeFavouriteSeminar } from "../../utils/user_functions"
import { updateToken } from "../../utils/auth_service"

export default function FavouritesRemoveBtn({seminar_id, user, setIsFavourite, setFavourites, favourites}) {
    function handleRemove() {
        setIsFavourite(false)
        removeFavouriteSeminar(seminar_id,user.id)
        updateToken(user)
        setFavourites(favourites.filter(id => id !== String(seminar_id)))
    }
    return(
    <>
    <button onClick={handleRemove}>Remove from Favourites</button>
    </>
    )
}