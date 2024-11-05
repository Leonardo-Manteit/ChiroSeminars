import Nav from '../Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer'
import Featured from '../Featured/Featured'
import TopicList from '../TopicFilter/TopicList'
import styles from './Root.module.css'

export default function Root() {
    return (
    <section className={styles.root} >
        <Nav />
        <div className={styles.waveContainer}>
                {/* Wave 1 */}
                <svg className={`${styles.wave} ${styles.wave1}`} viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <path d="M0,50 C150,0 300,100 450,50 C600,0 750,100 900,50 C1050,0 1200,100 1350,50" 
                          fill="none" stroke="rgba(106, 207, 247, 0.4)" strokeWidth="3" />
                </svg>
                
                {/* Wave 2 */}
                <svg className={`${styles.wave} ${styles.wave2}`} viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <path d="M0,50 C150,0 300,100 450,50 C600,0 750,100 900,50 C1050,0 1200,100 1350,50" 
                          fill="none" stroke="rgba(135, 216, 248, 0.4)" strokeWidth="3" />
                </svg>

                {/* Wave 3 */}
                <svg className={`${styles.wave} ${styles.wave3}`} viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <path d="M0,50 C150,0 300,100 450,50 C600,0 750,100 900,50 C1050,0 1200,100 1350,50" 
                          fill="none" stroke="rgba(106, 207, 247, 0.4)" strokeWidth="3" />
                </svg>

                {/* Wave 4 */}
                <svg className={`${styles.wave} ${styles.wave4}`} viewBox="0 0 1200 100" preserveAspectRatio="none">
                    <path d="M0,50 C150,0 300,100 450,50 C600,0 750,100 900,50 C1050,0 1200,100 1350,50" 
                          fill="none" stroke="rgba(135, 216, 248, 0.4)" strokeWidth="3" />
                </svg>
            </div>
        
        <SearchBar />
        <Featured />
        <TopicList />
        <Footer />
    </section>
    )
}