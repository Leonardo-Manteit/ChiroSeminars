import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import DashboardNav from "../DashboardNav/DashboardNav.jsx";
import ProfileCard from "../DashboardProfileCard/ProfileCard.jsx";
import { getUserFromLocalStorage, updateToken } from '../../utils/auth_service.js';
import { uploadProfilePhoto } from '../../utils/image_upload';
import { generateImagePreview } from '../../utils/image_preview';
import GooglePay from "../GooglePay/GooglePay.jsx";
import Calendar from "../Calender/Calender.jsx";
import DashboardHostedEvents from "../DashboardHostedEvents/DashboardHostedEvents.jsx";

export default function Dashboard() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [image, setImage] = useState(user?.profilePic);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        generateImagePreview(file, setImagePreview); // Set image preview
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (image.lastModified) {
            const formData = new FormData();
            formData.append('profilePhoto', image);
            formData.append('email', user.email);
            const response = await uploadProfilePhoto(formData);
            await updateToken(user)
            setUser(getUserFromLocalStorage())
            setImagePreview(null)
        }
    };
    
    return (
        <>
            <Nav />
            <DashboardNav />
            <section className="profile-section">
                <ProfileCard user={user} />
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="image/*" name="profilePhoto" onChange={handleFileChange} />
                    {imagePreview && <img src={imagePreview} alt="Profile Preview" style={{ width: '100px' }} />}
                    <button type="submit">Change Profile Image</button>
                </form>
            </section>
            <DashboardHostedEvents user={user}/>
            {/* Calendar */}
            <section className="calendar">
                <Calendar />
            </section>

            {/* Billing and Payments */}
            <section className="billing">
                <h3>Billing and Payments</h3>
                <p>Billing information not available</p>

            <GooglePay />
            </section>
            <Footer />
        </>
    );
}
