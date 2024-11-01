import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import UserNav from "./UserNav.jsx";
import ProfileCard from "./ProfileCard.jsx";
import { getUserFromLocalStorage } from '../../utils/auth_service.js';

export default function Dashboard() {
    const [user, setUser] = useState(getUserFromLocalStorage());

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <>
            <Nav />
            <UserNav />

            {/* Profile Section */}
            <section className="profile-section">
                <ProfileCard user={user} />
            </section>

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
