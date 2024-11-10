import styles from './page.module.css'

export default function loading() {
  return (
    <div className={styles.loading}>
        <div className={styles.container}>
            <div className={styles.item1}></div>
            <div className={styles.item2}></div>
            <div className={styles.item3}></div>
            <div className={styles.item4}></div>

        </div>
    </div>
  )
}
