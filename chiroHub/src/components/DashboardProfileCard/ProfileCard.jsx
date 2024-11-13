import DeleteUser from "../DeleteUser/DeleteUser";

export default function ProfileCard({ user }) {
    // Provide default values if user properties are missing
    const name = user?.username || "Anonymous User";
    const email = user?.email || "No email available";
    const profilePic = user?.profilePic || "/home/shandakei/GAH/ChiroSeminars/chiroHub/public/blank-profile-pic.png"; // Use a default image

    return (
        <div className="profile">
            <div className="profile-pic">
                <img src={profilePic} alt={`${name} Profile`} />
            </div>
            <div className="user-details">
                <h2>{name}</h2>
                <p>Email: {email}</p>
                <button>Edit Details</button>
                <DeleteUser />
            </div>
        </div>
    );
}
