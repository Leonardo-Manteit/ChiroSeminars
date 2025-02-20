import { removeFavouriteSeminar } from "../../utils/user_functions";
import { updateToken } from "../../utils/auth_service";
import filledStar from "../../assets/star_filled.png";
import halfStar from '../../assets/star_half.png'
import { useState } from 'react';

export default function FavouritesRemoveBtn({ seminar_id, user, setIsFavourite, setFavourites, favourites }) {
  const [starImage, setStarImage] = useState(filledStar);
  
  function handleRemove(e) {
    e.stopPropagation();  // Stop the click event from propagating to the parent div
    setIsFavourite(false);
    removeFavouriteSeminar(seminar_id, user.id);
    updateToken(user);
    setFavourites(favourites.filter((id) => id !== String(seminar_id)));
  }

  return (
<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
  }}
>
  <img
    src={starImage}
    alt="fav seminar"
    onClick={handleRemove}
    onMouseEnter={() => setStarImage(halfStar)} 
    onMouseLeave={() => setStarImage(filledStar)}
    style={{
      width: "50px",
      height: "50px",
      cursor: "pointer",
      margin: "0",
      zIndex: '2'
    }}
  />
</div>
  );
}
