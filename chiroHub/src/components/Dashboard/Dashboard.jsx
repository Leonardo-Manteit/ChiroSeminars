import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import UserNav from "../DashboardNav/DashboardNav.jsx";
import ProfileCard from "../DashboardProfileCard/ProfileCard.jsx";
import { getUserFromLocalStorage } from '../../utils/auth_service.js';

export default function Dashboard() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [image, setImage] = useState(null);


    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);


    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("profilePhoto", image);

        // Minimal fetch request to upload the image
        await fetch('https://chiroseminarhub-australia.onrender.com/chiro/user/uploadProfilePhoto', {
            method: 'POST',
            body: formData,
        });
    };

    return (
        <>
            <Nav />

            {/* Profile Section */}
            <section className="profile-section">
                <ProfileCard user={user} />

                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <button type="submit">Change Profile Image</button>
                </form>
            </section>

            <UserNav />

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
