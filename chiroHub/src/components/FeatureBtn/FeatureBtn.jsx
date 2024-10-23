import styles from './FeatureBtn.module.css'
export default function FeatureBtn() {
    return(
        <>
        <section>
            <label>Feature</label>
            <div>Would you like to feature this seminar?</div>
            <input type="checkbox" name="feature" className={styles.check_box}/>
        </section>
        </>
    )
}