import styles from './FeatureBtn.module.css'
import { useState } from 'react'
export default function FeatureBtn({preFeatured}) {
    const [checked, setChecked] = useState(preFeatured)
    function handleChecked(e) {
        setChecked(!checked)
        console.log(e.target.value, checked)
    }
    return(
        <>
        <section>
            <label>Feature</label>
            <div>Would you like to feature this seminar?</div>
            <input checked={checked} type="checkbox" name="feature" className={styles.check_box} onClick={handleChecked}/>
        </section>
        </>
    )
}