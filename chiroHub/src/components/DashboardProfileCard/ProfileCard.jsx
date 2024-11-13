import DeleteUser from "../DeleteUser/DeleteUser";
import styles from './ProfileCard.module.css'

export default function ProfileCard({ user }) {
    // Provide default values if user properties are missing
    const name = user?.username || "Anonymous User";
    const email = user?.email || "No email available";
    const profilePic = user?.profile_pic_url || "/public/blank-profile-pic.png"; 

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
