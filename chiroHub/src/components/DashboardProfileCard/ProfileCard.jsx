import { getUserFromLocalStorage } from "../../utils/auth_service";
import DeleteUser from "../DeleteUser/DeleteUser";
import styles from './ProfileCard.module.css'
import { useState } from "react";

export default function ProfileCard({ user }) {

    const name = user?.username || "Anonymous User";
    const email = user?.email || "No email available";
    
    const profilePic = user?.profilePic 
    ? `https://chiroseminarhub-australia.onrender.com/${user.profilePic}` 
    : "https://chiroseminarhub-australia.onrender.com/uploads/blank-profile-pic.png";
    // const profilePic = user?.profilePic 
    // ? `http://localhost:8000/${user.profilePic}` 
    // : `http://localhost:8000/uploads/blank-profile-pic.png`; // local host

    return (
        <div className={styles.profile}>
            <div className={styles.profilePic}>
                <img src={profilePic} alt={`${name} Profile`} />
            </div>
            <div className={styles.userDetails}>
                <h2>{name}</h2>
                <p>Email: {email}</p>
                {/* <button>Edit Details</button> */}
                <DeleteUser />
            </div>
        </div>
    );
}
