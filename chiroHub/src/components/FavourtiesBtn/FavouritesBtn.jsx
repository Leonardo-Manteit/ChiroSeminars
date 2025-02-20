import { useState } from 'react';
import { addFavouriteSeminar } from "../../utils/user_functions";
import { updateToken } from "../../utils/auth_service";
import emptyStar from '../../assets/star_empty.png';
import halfStar from '../../assets/star_half.png';

export default function FavouritesBtn({ seminar_id, user, setIsFavourite, setFavourites, favourites }) {
  const [starImage, setStarImage] = useState(emptyStar);

  function handleFavourite(e) {
    e.stopPropagation();  // Stop the click event from propagating to the parent div
    setIsFavourite(true);
    addFavouriteSeminar(seminar_id, user.id);
    updateToken(user); 
    setFavourites([...favourites, String(seminar_id)]); 
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <img
        src={starImage}
        alt="fav seminar"
        onClick={handleFavourite}
        onMouseEnter={() => setStarImage(halfStar)} 
        onMouseLeave={() => setStarImage(emptyStar)}
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
