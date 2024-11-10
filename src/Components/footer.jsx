import styles from '@/app/page.module.css'
import Link from 'next/link'

export default function footer() {
  return (
    <div className={styles.footer}>

      <div className={styles.aboutUs}>
        <h1 className={styles.name}>EleganceEdge</h1>
        <p className={styles.desc}>We offer a diverse range of high-quality, trendy items to suit every style and occasion. </p>
      </div>

      <div className={styles.categories}>
        <h2 className={styles.titleCat}>categories</h2>
        <ul className={styles.listCat}>
          <li className={styles.Acat}><Link href="/MenWears">Men</Link></li>
          <li className={styles.Acat}><Link href="/WomenWears">Women</Link></li>
          <li className={styles.Acat}><Link href="/KidsWears">Kids</Link></li>
          <li className={styles.Acat}><Link href="/Shoas">Shoes</Link></li>
          <li className={styles.Acat}><Link href="/Accessories">accessories</Link></li>
          <li className={styles.Acat}><Link href="/Bags">Bags</Link></li>
        </ul>
      </div>

      <div className={styles.links}>
        <h2 className={styles.titlelink}>Links</h2>
        <Link  href="/"  className={styles.link}>Home</Link>
        <Link  href="/Sales" className={styles.link}>Flash Sale</Link>
        <div className={styles.social}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect width="30" height="30" fill="url(#pattern0_1421_2673)"/>
            <defs>
            <pattern id="pattern0_1421_2673" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1421_2673" transform="scale(0.01)"/>
            </pattern>
            <image id="image0_1421_2673" width="100" height="100" href="data:image/png;base64,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"/>
            </defs>
          </svg>

          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect width="30" height="30" fill="url(#pattern0_1421_2674)"/>
            <defs>
            <pattern id="pattern0_1421_2674" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1421_2674" transform="scale(0.01)"/>
            </pattern>
            <image id="image0_1421_2674" width="100" height="100" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVklEQVR4nO2dv4sdVRTHRyVqfqCCjSBWwUI0WpmshQkEHyx7z5l5RSaInc1D8k+shUTEIomdhZCQVBZaC2KhnZVVEmIaxR+gsP5Y0SXEfGXuDnH37tt9mbn37p6X+X5gisDsuTPnkztn5t1hTlEQQgghhBBCyByAyWQfnDsF1StQvQbVv6CKQW8iq20urvjcTCb7dkeGagXVG3ueADW/NTmq8olYXn4Qqu8aOFHM0XYHImeb3KUXQhnoLUbkbI7L1J1goH8gcg7OHcVodLAYOBiNDvpciJz3uQlnSlmW6Qr41prxHZx7IckA9yGoqiMQ+X5LTUlR6Nu7qc0zgzLuTYrq2qbcOXcqPvD6re3G6+G56KADAaoXgtxdjg8qcj0I+nKSox0AKMtjQe6uxwddf+D5P2hdH0pytAMAdX0oELIaHzS4hUtypAMCqfNHIXFQiDEoxBgUYgwKMQaFGINCjEEh24C63o+yrCHyIVS/huovELkFkdtQXfE/mKp+BZGPIPIWnHsJdf1QEQmFBKCuH4fqO23Su65jrELkYy/yxIlHix5QyAagOoLIj4lW/36FyHLREQppgeqkvRwlXZYtOkIhhU/CaYj8OyWhP/gVvbJ8DePxYb/KV9cPYzx+0v9b9SREzkDkot+XQuKBc09D5PegFtzydaSu93eKJfIKZ0gkUP00kHEbZfl6RDxesvoC516dcqd0pndAComjWSINhHyJonggKiZnSD9QVU9A5O8ggSej41JIP5r3noJL1c17mR3+LkvkTah+4l/VCZesKaQf7dP4RiHnZ/7N0tJzEPmWzyEZgOpngZA3Zv6kIvITHwwzAdWrQXKfn7H/23xSzwhUf96U4KWlp2bs/00g5BLK8jiq6hmIHEh4XMN86wTha5uLi4/suH9YvDO9MD5kIehynLt1XhSiFGICcIbYAhRiI/Ho+UQdsUh1OuZ4o04+S8B5FzIeH4453qiTzxJwvoWsdP31mEI0q5DPu8gYpJAi71jvbxpP5L0eMSgkFRD5Iqag+xgUkoamVkDkt5iC7uNQSBrg3LOxBd3HoZA0NG+qxBZ0H4dC7BT0QRZ17N5zSOeCPm2cXiedNeC8Chl3L+jTxul10lkDzqeQlb7vd1GIZhHSq6APQsh2xM6QIhMUohRiAnCG2AIUYgtQiC1AIbYAhdgCFGILUIgtQCG2AIXYAhRiC1CILUAhtgCF2AIUYgtQiC1AIbYAhdgCFGILUIgtMBghIn/OQ0MXGBSCxcXHgnH+SN/yyLmjhUFgUYjqQvqWR1ubgs387NFeAItCRD5I3xRsWtu8qjpSGAPGhPhPlWdpm7ddY0ljUmBICFRfzNZYcofWq2ttn74FC4Ueeyyk7ci20F6m1rK1Xr07IJsTw0xz4rvtu5tW1FtnCjfdg/bdwdc/2eBeZ/5HvJH8MrVjoV+/+2puia/N+rTqIDbxObjqP+bc5CZVASeEEEIIIYSQIi//AVO4IySLWCSWAAAAAElFTkSuQmCC"/>
            </defs>
          </svg>

          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect width="30" height="30" fill="url(#pattern0_1421_2675)"/>
            <defs>
            <pattern id="pattern0_1421_2675" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1421_2675" transform="scale(0.01)"/>
            </pattern>
            <image id="image0_1421_2675" width="100" height="100" href="data:image/png;base64,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"/>
            </defs>
          </svg>

        </div>
      </div>
      
    </div>
  )
}
