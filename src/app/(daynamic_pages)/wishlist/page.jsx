"use client"
import Link from 'next/link'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CheckToken } from '@/Context/UserContext'


export default function Wishlist() {
    const {DisplayUser ,Login,setNbinwishlist}=CheckToken();
    const [Items,setItems]=useState([])   
    const [Loading,setLoading]=useState(true)  
    const [Load,setLoad]=useState("");
    const [Reload,setreload]=useState("");
    const [Token,setToken]=useState(false);

    // check if token is exist or no 
    useEffect(() => {
      // Check for token on component load
      const token = localStorage.getItem("Token");
      setToken(!!token); // true if token exists, false otherwise
    },[DisplayUser,Login]);

// get items in the wishlist
    const getItems=async()=>{
      setLoading(true)
        try {
            const res = await axios.get( `https://devstyle-u119.onrender.com/api/Wishlist`,
                {
                    headers: {
                      Authorization:`Bearer ${localStorage.Token}` , 
                    }
                }
            );
            setItems(res.data.data[0].items);
                
        } catch (error) {
             setItems([])
             if (error.response && error.response.data && error.response.data.message) {
              if (error.response.data.message === "invalide token please Log in again") {
                localStorage.clear();
              }
            } else {
              console.log("An error occurred:", error); // Log generic error if no response data
            }
        }
        finally{
            setLoading(false);
        }
    }

    // delete an item from wishlist
    async function Delfromwishlist(id){
        if (Token) {
            setLoad(id)
        
            try{
              const res = await axios.delete("https://devstyle-u119.onrender.com/api/Wishlist", {
                data: { items: id }, 
                headers: {
                  Authorization: `Bearer ${localStorage.Token}`,
                },
              });
           
              setreload(!Reload)
              setNbinwishlist(nb => !nb)

            }
           catch(err){
            console.log(err)
           }
           finally{
            setLoad("")
           } 
        }
    }

    useEffect(() => {
            if (Token) {
             getItems();
            }else{
              setLoading(false)
            }
   },[Token,Reload]);

   
  return (
    <div className={styles.wishlist}>
       <div className={styles.nameAndnb}>

        <h1 className={styles.nameWish}>WishList</h1>
        <div className={styles.nbitems}  style={{display:Items.length==0?"none":""}}>{Items.length}</div>

       </div>
       {Loading ? 
            <div className={styles.loadind}>
                <svg className={styles.pl}  viewBox="0 0 240 240">
                    <circle className={styles.pl__ringa} cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                    <circle className={styles.pl__ringb} cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                    <circle className={styles.pl__ringc} cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                    <circle className={styles.pl__ringd} cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                </svg>
            </div>
            :
            <>
            {Items.length==0? <h2 className={styles.noitems}>No Items Found</h2>:
            <div className={styles.wishItem}>
                {Items.map((item,index)=>
                        <Link href={`/${item.category}/${item._id}`} className={styles.item} key={index}>
                            <div className={styles.img}  style={{backgroundImage:`url(https://devstyle-u119.onrender.com${item.imageCover})`}}>
                                    {Load===item._id? 
                                        <div className={styles.dotspinner}>
                                            <div className={styles.dotspinner__dot}></div>
                                            <div className={styles.dotspinner__dot}></div>
                                            <div className={styles.dotspinner__dot}></div>
                                            <div className={styles.dotspinner__dot}></div>
                                            <div className={styles.dotspinner__dot}></div>
                                            <div className={styles.dotspinner__dot}></div>
                                            <div className={styles.dotspinner__dot}></div>
                                            <div className={styles.dotspinner__dot}></div>
                                        </div>
                                        :
                                        <svg  onClick={(e)=> { e.preventDefault(),Delfromwishlist(item._id)}} 
                                        className={styles.towishlist} width="35" height="35" viewBox="0 0 35 35" fill="red" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.2969 11.0498C14.7813 5.31325 5.97656 5.92424 5.97656 13.2562C5.97656 20.5882 17.2969 26.6981 17.2969 26.6981C17.2969 26.6981 28.6173 20.5882 28.6173 13.2562C28.6173 5.92424 19.8126 5.31325 17.2969 11.0498Z" stroke="#060606" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                            <rect x="0.730469" y="0.695312" width="34" height="34" rx="17" fill="white"/>
                                            <path d="M18.3204 12.8545C15.8047 7.11794 7 7.72893 7 15.0609C7 22.3929 18.3204 28.5028 18.3204 28.5028C18.3204 28.5028 29.6408 22.3929 29.6408 15.0609C29.6408 7.72893 20.836 7.11794 18.3204 12.8545Z" stroke="#060606" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    }
                            </div>
                            <h2 className={styles.titleItem}>{item.name}</h2>
                            <div className={styles.infoItem}>
                                <p className={styles.price}>{item.price}$</p>
                                <button href="" className={styles.tocart} onClick={(e)=> { e.preventDefault()}}>Add to cart</button>
                            </div> 
                        </Link>
                )}

            </div>
            }
            </>
        }
    </div>
  )
}
