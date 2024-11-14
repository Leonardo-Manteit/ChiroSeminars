import { getUserFromLocalStorage } from "../../utils/auth_service";
import DeleteUser from "../DeleteUser/DeleteUser";
import styles from './ProfileCard.module.css'
import { useState } from "react";

export default function ProfileCard({ user }) {
    // Provide default values if user properties are missing
    const name = user?.username || "Anonymous User";
    const email = user?.email || "No email available";
    const profilePic = user?.profilePic || "/public/blank-profile-pic.png"; // deployed version
    // const profilePic = `http://localhost:8000/${user?.profilePic}` || `http://localhost:8000/public/blank-profile-pic.png` // local host

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
