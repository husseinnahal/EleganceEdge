import acc from '@/../public/categories/acc.png';
import Bags from '@/../public/categories/bags.png';
import kids from '@/../public/categories/kids.png';
import Men from '@/../public/categories/men.png';
import Sale from '@/../public/categories/sale.png';
import Shoes from '@/../public/categories/shoes.png';
import Women from '@/../public/categories/women.png';
import LandingImg from "@/../public/landingImg.png";
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import BestSeller from '../../(daynamic_pages)/BestSeller/page';
import Search from './Search';



export default function LandingPage() {

  return (
    <>
      <div className={styles.LandingPage}>
        <svg className={styles.CirclePink} width="30%" height="100%" viewBox="0 0 562 714" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M123.157 271C-228.032 69.1475 266.338 -374.508 476.501 -451.001C686.663 -527.493 992.989 -362.91 1116.5 -23.5702C1240.01 315.77 835.255 619.07 652.655 713.503C470.056 807.936 474.345 472.853 123.157 271Z" fill="#FFD9D9"/>
        </svg>
        <div className={styles.CircleBLue}></div>
        <div className={styles.CircleRed}></div>
        <Image src={LandingImg} priority alt='Landingimg' className={styles.landingImg}></Image>

        <div className={styles.info}>
          <h3 className={styles.desc}>Family store</h3>
          <h1 className={styles.title}>EleganceEdge</h1>
          <p className={styles.paragraph}>All you are needs, in one stop</p>
            <Search/>
        </div>
      </div>

      <div className={styles.categories}>

        <div className={styles.miniCat} style={{backgroundColor:"#2E2D2D"}}>
          <div className={styles.desc}>
            <h1 className={styles.title}>Men s</h1>
            <h2 className={styles.wear}>Wear</h2>
            <Link className={styles.sheck} href={"/MenWears"} style={{color:"#A90000"}}>check it out</Link>
          </div>
          <Image className={styles.images} alt="men" prop="true" src={Men}/>
        </div>
        <div className={styles.miniCat} style={{backgroundColor:"#FFD91A"}}>
          <div className={styles.desc}>
            <h1 className={styles.title}>Women</h1>
            <h2 className={styles.wear} style={{color:"#FFE874"}}>Wear</h2>
            <Link className={styles.sheck} href={"/WomenWears"} style={{color:"#FFD91A"}}>check it out</Link>
          </div>
          <Image  className={styles.images} alt="women" prop="true" src={Women}/>
        </div>
        <div className={styles.largCat} style={{backgroundColor:"#FF4D4D"}}>
          <div className={styles.desc}>
              <h1 className={styles.title}>Kids Wear</h1>
              <h2 className={styles.wear}>for all genders</h2>
              <Link className={styles.sheck} href={"/KidsWears"} style={{color:"#FF4D4D"}}>check it out</Link>
            </div>
            <Image  className={styles.images} alt="kids" prop="true" src={kids}/>
        </div>
        <div className={styles.largCat}  style={{backgroundColor:"#D9D9D9"}}>
          <div className={styles.desc}>
              <h1 className={styles.title} style={{color:"black"}}>Shoes</h1>
              <h2 className={styles.wear} style={{color:"white"}}>Of various types</h2>
              <Link className={styles.sheck} href={"/Shoas"} style={{color:"#767676"}}>check it out</Link>
            </div>
            <Image  className={styles.images} alt="shoes" prop="true" src={Shoes}/>
        </div>
        <div className={styles.miniCat}style={{backgroundColor:"#008E53"}}>
          <div className={styles.desc}>
            <h1 className={styles.title}>Accessory</h1>
            <h2 className={styles.wear}>for all</h2>
            <Link className={styles.sheck} href={"/Accessories"} style={{color:"#008E53"}}>check it out</Link>
          </div>
          <Image  className={styles.images} alt="acc" prop="true" src={acc}/>
        </div>
        <div className={styles.miniCat} style={{backgroundColor:"#004BFE"}}>
          <div className={styles.desc}>
            <h1 className={styles.title}>Bags</h1>
            <h2 className={styles.wear}>for all</h2>
            <Link className={styles.sheck} href={"/Bags"} style={{color:"#004BFE"}}>check it out</Link>
          </div>
          <Image  className={styles.images} alt="bags" prop="true" src={Bags}/>
        </div>

      </div>


      <div className={styles.features}>
        <div className={styles.reason}>
          <svg className={styles.iconfeatur} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect width="50" height="50" fill="url(#pattern0_1421_2621)"/>
            <defs>
            <pattern id="pattern0_1421_2621" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1421_2621" transform="matrix(0.01 0 0 0.01 0.00381296 -0.0635012)"/>
            </pattern>
            <image id="image0_1421_2621" width="100" height="100" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE+ElEQVR4nO2dz48URRTHSzSEBJEQIVFBDZJ4EEzAGI9uIpI00+/V7pLMCWOMF80GFtADR+JJ/BH+AMCLF0/gQQ542njwoIkmuhiiJBwgGOOvuIYoK7KPVE87gZpf3TPd9WrG7yephOwONe+9z7yq3pnuHmMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgiNJskmI3hHmH4RoWZhlIgbRP0J0SZjfE6KNZhwQa58Vop/Ui8e1y/lRGo2dZgw6Y/JlcHtclTTdYGJFmN+NoEihx1smVoT5+wgKFHYQfWtiZaI2cC4s5C8TK+rFURomVrQLAyEe2oWBEA/twkCIh3ZhIMRDuzAQ4qFdGAjx0C4MhHhoFyYWITL8XNeF6BshOi5p+oQZFe3CTIAQuWPcFOYTMjW1BkI4CiGtQfS1ED2GDuFIhLSkXJOZmW1YsjgSIS0pV0p3Si2BjMEw4erwpTSbqyGEoxHixgkI4aiErAjRDJYsjkaIG78L81bsIRyNEDe+GLifBAokumHK1eFnSdOXpdlcX3gvaM15uGMuovchhEcS4mRsLiOiPacx9wjzx958K8JM/Syqv1qj7pA03T+MjPa8abpBiC57XfKrTE8/CiE8hJCSy1QPKc91nN1D9LlMTd3X+eAIXq0xd4ipiB77yXEIYSUhbj8hOuPNvyLW2kKBTPowgYX03E/cQUOSbIIQBSF99pMPBgYy6cMoCcmf601PyL8yPf00hGgJaTbvFeavPCkf9Q1k0odRFJI/X+IJWc6u8NIuzP9ViCM7OeJuKfMQktNTXo1XWwnRG56QcxAySAjRa6YmhOgZ7/muQkhOn+VtSfbufdLUgOzZs9bfRyAkZ8Ces+Q6pY7lq2PP0t5cY9/UJXRc2gFACEOIoEP0O0KwZOkXXSBEv9ACIfrFFQjRL6hAiH4RBUL0CycQol8sgRD9AkEIZzXAWyc52i+Q/0Y0gaBDuHYhi2LtIWHenr3v33rvf3v+s8UxFLIYIp86rj51H9bPybFjq/ykvbMuDmjezc4UFRI4n6qvz3YBvdAr8I5EiHZrSTFFhCjkU7WQuaLB31GIgxELmQudj5tgqaIkF13rlk7AtTvRhaBCiJYLCAmfD9Efrs0+qyRJaw+VDb6dBNGRwB1ycaAQnXwWXCAvVSTkqaETSNMdgYW8XUBI+Hzc1Vru6EGYP61AyLqhE7B2XTAZlN2D5MECQkLnc95dQ9KaIEkeyH4w6UKIrrmT07rGoJvPeeeg2xWjbvlaGGqjj3XJouww9KJbprp1RjuG8Pm4Gi+4ZardGaMgzGcr3AT9c1zPjBxg+Rguj3U+2V+m1R0mfjfq8f+oCNHJsc5HZmcfFuYbXhIHSs9DNO/NcUMajYfqibpPHNY+32VZqSKfv4PlI0SnO9Zrot2F/7+1L2ZfSXR3AqfqjbpPPO7a8arzITpZb9R+l7i7EnRuogf7tXve1vNdZPzi5gyWgB+Xtbu6XJA5Wj6hu12Y9wnRrS5HNxeyv1jdEUezeX823L/dhuevsa3H3yp8T6l68+m8wH/c8hFrX+0qpdwNvl43kSDMR0c83NbPJ+sU5t9KB++WvDSdNZEhzK8I0Z9D5RNBp2dIkmxxF8EX+kyg9ZhTw976KATuDnDC/GF+g+Ri+Vj7iImNTIzbCInO5V/qeD0f7ksrP8l+lyRbzJggjcbj2Ue1AfK5DRfKtGp7CGO1AAAAAElFTkSuQmCC"/>
            </defs>
          </svg>
          <div className={styles.title}>
              <h2 >Fast delivery</h2>
              <p className={styles.why}>2 to 3 working days</p>
          </div>
        </div>
        <div className={styles.reason}>
          <svg  className={styles.iconfeatur} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect width="50" height="50" fill="url(#pattern0_1421_2625)"/>
            <defs>
            <pattern id="pattern0_1421_2625" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1421_2625" transform="matrix(0.01 0 0 0.00892857 0 0.0912572)"/>
            </pattern>
            <image id="image0_1421_2625" width="100" height="100" href="data:image/png;base64,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"/>
            </defs>
          </svg>
          <div className={styles.title}>
              <h2>Affordable Pricing</h2>
              <p>for all peoples</p>
          </div>
        </div>
        <div className={styles.reason}>
          <svg className={styles.iconfeatur} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <rect width="50" height="50" fill="url(#pattern0_1421_2629)"/>
            <defs>
            <pattern id="pattern0_1421_2629" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use href="#image0_1421_2629" transform="scale(0.01)"/>
            </pattern>
            <image id="image0_1421_2629" width="100" height="100" href="data:image/png;base64,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"/>
            </defs>
          </svg>

          <div className={styles.title}>
              <h2>High-quality </h2>
              <p>Best fabric and sewing</p>
          </div>
        </div>

        <div className={styles.reason}>
          <svg className={styles.iconfeatur} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <rect width="50" height="50" fill="url(#pattern0_1421_2633)"/>
          <defs>
          <pattern id="pattern0_1421_2633" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use href="#image0_1421_2633" transform="scale(0.01)"/>
          </pattern>
          <image id="image0_1421_2633" width="100" height="100" href="data:image/png;base64,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"/>
          </defs>
          </svg>

          <div className={styles.title}>
              <h2>extensive variety</h2>
              <p>many categories for everyone</p>
          </div>
        </div>

      </div>

      <div className={styles.sales}>
        <h1 className={styles.saletitle}>Flash Sale</h1>
        <Image width={460} style={{height:"150%"}} src={Sale} alt='flash sale' className={styles.imgsale} />
        <div className={styles.descsale}>
          <h2>Sale Up To 50%</h2>
          <p className={styles.desc}>a sale on most of the products in all of our categories</p>
          <Link href={"/Sales"} className={styles.tosalepage}>check it out</Link>
        </div>
      </div>
      

      <BestSeller/>
    </>
  )
}
