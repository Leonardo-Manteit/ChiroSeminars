import { addFavouriteSeminar } from "../../utils/user_functions"
import { updateToken } from "../../utils/auth_service"

export default function FavouritesBtn({seminar_id, user, setIsFavourite, setFavourites, favourites}) {
    function handleFavourite() {
        setIsFavourite(true)
        addFavouriteSeminar(seminar_id,user.id)
        updateToken(user)
        setFavourites([...favourites, String(seminar_id)])
    }
    return(
    <>
    <button onClick={handleFavourite}>Add to Favourites</button>
    </>
    )
}