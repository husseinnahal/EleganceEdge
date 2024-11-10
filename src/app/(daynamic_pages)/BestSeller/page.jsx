"use client"
import Link from "next/link"
import styles from "../../(Static_pages)/LandingPage/page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { CheckToken } from "@/Context/UserContext";


export default function Bestseller() {
  const {setDisplayUser,DisplayUser,Login,setNbinwishlist}=CheckToken();
    const [BestSeller,setBestseller]=useState([]);
    const [Refresh,setRefresh]=useState(false);
    const [Loading,setLoading]=useState({});
    const [Token,setToken]=useState(false);

    // check if token is exist or no 
    useEffect(() => {
      // Check for token on component load
      const token = localStorage.getItem("Token");
      setToken(!!token); // true if token exists, false otherwise
  },[DisplayUser,Login]);


  // add to wishlist 
  async function addTowishlist(id){
        if (Token) {
            setLoading((prev) => ({ ...prev, [id]: true }));
            try{
            await axios.post("https://devstyle-u119.onrender.com/api/Wishlist",{
            items:id
            },
            {
            headers: {
              Authorization:`Bearer ${localStorage.Token}` , 
            }
            }
            )

              setRefresh(ref => !ref)
              setNbinwishlist(nb => !nb)

            }
          catch(err){
            console.log(err)
          }
          finally{
            setLoading((prev) => ({ ...prev, [id]: false }));

          }}
        else{
          setDisplayUser("flex")
        }

  }
  // remove from wishlist
  async function Delfromwishlist(id){
    if (Token) {
          setLoading((prev) => ({ ...prev, [id]: true }));
          
          try{
            const res = await axios.delete("https://devstyle-u119.onrender.com/api/Wishlist", {
              data: { items: id }, 
              headers: {
                Authorization: `Bearer ${localStorage.Token}`,
              },
            });
        
            setNbinwishlist(nb => !nb)
            setRefresh(ref => !ref)

          }
        catch(err){
          console.log(err)
        }
        finally{
          setLoading((prev) => ({ ...prev, [id]: false }));
        }}
        else{
          setDisplayUser("flex")
        }

  }
  // get items in wishlist for check the heart and the click to add or remove 
  const [Items,setItems]=useState([]);
  const getItems=async()=>{
      try {
          const res = await axios.get( `https://devstyle-u119.onrender.com/api/Wishlist/inwishlist`,
              {
                  headers: {
                    Authorization:`Bearer ${localStorage.Token}` , 
                  }
              }
          );
          setItems(res.data.data[0].items);
            
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          if (error.response.data.message === "invalide token please Log in again") {
            localStorage.clear();
          }
        } else {
          console.log("An error occurred:", error); // Log generic error if no response data
        }
      }
  }

  useEffect(()=>{
    if (Token){
    getItems();
    }
  },[Token,Refresh])


  useEffect(()=>{
        const getbestseller=async()=>{
        try{
        
          const res = await axios.get( `https://devstyle-u119.onrender.com/api/Items/bestSeller`);
          setBestseller(res.data.data);
        }catch(err){
          console.log(err);
        }
        };
        getbestseller();
  },[Refresh]);






  return (
    <div className={styles.bestSeller}>
      <h1 className={styles.bestSelerTitle}>Best Seller Products</h1>
      <div className={styles.bestItems}>
            {BestSeller.map((items,index)=>{
                const isInWishlist = Items.some((wishlistItem) => wishlistItem._id === items._id);

            return ( <Link href={`/${items.category}/${items._id}`} className={styles.item} key={index}>
                    <div className={styles.img} style={{backgroundImage:`url(https://devstyle-u119.onrender.com${items.imageCover})`}}>
                      
                        {Loading[items._id]? 
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
                        <svg  onClick={(e)=> { e.preventDefault(),isInWishlist ? Delfromwishlist(items._id) : addTowishlist(items._id);} }
                        className={styles.towishlist} width="35" height="35" viewBox="0 0 35 35" fill={isInWishlist?"red":"none"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.2969 11.0498C14.7813 5.31325 5.97656 5.92424 5.97656 13.2562C5.97656 20.5882 17.2969 26.6981 17.2969 26.6981C17.2969 26.6981 28.6173 20.5882 28.6173 13.2562C28.6173 5.92424 19.8126 5.31325 17.2969 11.0498Z" stroke="#060606" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                            <rect x="0.730469" y="0.695312" width="34" height="34" rx="17" fill="white"/>
                            <path d="M18.3204 12.8545C15.8047 7.11794 7 7.72893 7 15.0609C7 22.3929 18.3204 28.5028 18.3204 28.5028C18.3204 28.5028 29.6408 22.3929 29.6408 15.0609C29.6408 7.72893 20.836 7.11794 18.3204 12.8545Z" stroke="#060606" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        }

                        {items.inStock==0 && <p className={styles.outofstock}>out of stock</p>}
                        {items.saleByPercentage>0 && <p className={styles.salecontainer}>-{items.saleByPercentage}%</p>}
                        
                    </div>                                    
                    <h2 className={styles.titleItem}>{items.name}</h2>
                    <div className={styles.infoItem}>
                        <p className={styles.price}>{items.price}$</p>
                        <button className={styles.tocart}>Add to cart</button>
                    </div>
                 </Link>)
            
            })}

      </div>
    </div>
  )
}

