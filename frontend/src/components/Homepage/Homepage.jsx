import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer'
import Featured from '../Featured/Featured'
import styles from './Homepage.module.css'
import Testimonials from '../Testimonials/Testimonials';
import Waves from '../Waves/Waves';
import Welcome from '../Welcome/Welcome';
import { useState } from 'react';
import { getUserFromLocalStorage } from '../../utils/auth_service';
import homepageImg from '../../../public/welcome-banner.png'

export default function Homepage() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [favourites, setFavourites] = useState(user?.favouriteSeminarIds)
    
    const banner = './welcome-banner.png'

    return (
    <div className={styles.root} >
        <Nav />
        <section className={styles.welcomeBannerSection} style={{ backgroundImage: `url(${homepageImg})` }}/>
        <Waves />
        <Welcome />
        <Featured user={user} favourites={favourites}/>
        <Testimonials />
        <Footer />
    </div>
    )
}