import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import UserNav from "../DashboardNav/DashboardNav.jsx";
import ProfileCard from "../DashboardProfileCard/ProfileCard.jsx";
import { getUserFromLocalStorage } from '../../utils/auth_service.js';
import { uploadProfilePhoto } from '../../utils/image_upload';
import { generateImagePreview } from '../../utils/image_preview';
import DeleteUser from "../DeleteUser/DeleteUser.jsx";

export default function Dashboard() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [favourites, setFavourites] = useState(user?.favouriteSeminarIds)
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) setUser(storedUser);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        generateImagePreview(file, setImagePreview); // Set image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await uploadProfilePhoto(image);
        console.log('Profile photo upload response:', response);
    };


    return (
        <>
            <Nav />
            <section className="profile-section">
                <ProfileCard user={user} />
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {imagePreview && <img src={imagePreview} alt="Profile Preview" style={{ width: '100px' }} />}
                    <button type="submit">Change Profile Image</button>
                </form>
            </section>
            <UserNav />
            <DeleteUser />
            {/* Events Section */}
            <section className="events">
                <h3>Upcoming Events</h3>
                <p>No upcoming events</p>

                <h3>Hosted Events</h3>
                <p>No hosted events</p>
            </section>

            {/* Calendar */}
            <section className="calendar">
                <h3>Calendar</h3>
                <div className="calendar-widget">Calendar goes here</div>
            </section>

            {/* Activity Section */}
            <section className="recent-activity">
                <h3>Recent Activity</h3>
                <p>No recent activity</p>
            </section>

            {/* Billing and Payments */}
            <section className="billing">
                <h3>Billing and Payments</h3>
                <p>Billing information not available</p>
            </section>

            {/* Advanced Settings */}
            <section className="advanced-settings">
                <h3>Advanced Settings</h3>
                <p>Configure your settings here</p>
            </section>

            <Footer />
        </>
    );
}
