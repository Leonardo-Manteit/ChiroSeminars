
import styles from './Testimonials.module.css';


export default function Testimonials() {
    const testimonials = [
        { text: "Finding the perfect seminar was easier than I imagined. The variety offered is amazing!", author: "Dr. Jane Doe, Chiropractor" },
        { text: "I attended a sports therapy seminar, and it completely transformed my practice!", author: "Dr. John Smith, Sports Specialist" },
        { text: "The nutrition seminar helped me better support my patients' overall well-being.", author: "Dr. Emily Davis, Wellness Advocate" },
        { text: "The paediatric seminar opened my eyes to new approaches for younger patients.", author: "Dr. Sarah Lee, Paediatric Chiropractor" },
        { text: "ChiroOceania seminars are a game changer for anyone looking to grow their practice.", author: "Dr. Michael Carter, Practice Growth Specialist" },
        { text: "The communication seminar helped me build stronger patient relationships.", author: "Dr. Lauren King, Chiropractor" },
        { text: "A must-attend for anyone passionate about neurology in chiropractic care!", author: "Dr. Alex Wright, Neurology Expert" },
        { text: "The sports seminar gave me actionable tools to help athletes recover faster.", author: "Dr. Chris Patel, Sports Chiropractor" },
        { text: "Every seminar I've attended has been packed with practical tips I can use immediately.", author: "Dr. Amy Rogers, Wellness Advocate" },
        { text: "The pregnancy seminar was eye-opening and beautifully presented.", author: "Dr. Megan Walker, Pregnancy Specialist" },
        { text: "The soft tissue seminar was the most hands-on learning experience I’ve had.", author: "Dr. Thomas Hall, Chiropractor" },
        { text: "This is my go-to platform for learning and professional growth!", author: "Dr. Rachel Adams, Chiropractor" },
    ];

    return (
        <section className={styles.testimonialsSection}>
            {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                    <p className={styles.testimonialText}>"{testimonial.text}"</p>
                    <p className={styles.testimonialAuthor}>- {testimonial.author}</p>
                </div>
            ))}
        </section>
    );
}
