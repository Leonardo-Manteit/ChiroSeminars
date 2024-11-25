import styles from '../Footer/Footer.module.css'

export default function Footer() {
    return (
    <footer>
        <span id={styles.copywrite}><p>&copy; 2024 ChiroOceaniaHub. All Rights Reserved.</p></span>

        <section className={styles.footerReading}>
            <ul>
                <h4>Internal references</h4>
                <li><a href="/">Home</a></li>
                <li><a href="/Contact">Contact</a></li>
                <li><a href="/AboutUs">FAQ's</a></li>
            </ul>
        </section>

        <section className={styles.footerReading}>
            <ul>
                <h4>External references</h4>
                <li><a href="https://chirohubseminars.com/" target='_blank'>ChiroHub</a></li>
                <li><a href="" target='_blank'>Dr. Manteite</a></li>
                <li><a href="" target='_blank'>Partner Practice</a></li>
            </ul>
        </section>

        <section className={styles.footerReading}>  
            <p>Discover trusted chiropractic insights and practical advice to stay up-to-date with the latest techniques and practices in the field.</p>
            <p>Stay informed with guidance tailored to chiropractors and healthcare professionals in Oceania.</p>
        </section>

    </footer>
    )
}