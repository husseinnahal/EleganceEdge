"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css"
import Link from "next/link";
import axios from "axios";
import { CheckToken } from "@/Context/UserContext";




export default function Cart() {
    const {RefrCartinhead,setRefCartinhead,Login,DisplayUser}=CheckToken()
    const [Token,setToken]=useState(false);
    const [Cart,setCarts]=useState([])
    const [Totalcart,setTotalcart]=useState(0)
    const [Loading,setLoading]=useState(true);
    const [WhenRemove,setWhenRemove]=useState("");

    // check if token is exist 
    useEffect(() => {
      setToken(!!localStorage.getItem("Token")); // true if token exists, false otherwise
    },[Login,DisplayUser]);



// get the items from cart
    const getCart = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://devstyle-u119.onrender.com/api/Cart`,
          {
            headers: {
              Authorization:`Bearer ${localStorage.Token}` , 
            }
           }
        );
        
         setCarts(res.data.data.items)  
        setTotalcart(res.data.data.totalCartPrice);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          if (error.response.data.message === "invalide token please Log in again") {
            localStorage.clear();
          }
        } else {
          console.log("An error occurred:", error); // Log generic error if no response data
        }
      }
      finally{
        setLoading(false)
      }
    };
    useEffect(()=>{
        if (Token) {
            getCart()
        }else{
          setLoading(false)
        }
    },[Token,RefrCartinhead])


    // remove an item  from cart
    async function RemoveItemFromCart(id,coloritem,sizeitem){
      setWhenRemove(`${id} ${coloritem}`);
         
      try{
        const res = await axios.delete("https://devstyle-u119.onrender.com/api/Cart", {
          data: {
            productId: id ,
            color:coloritem,
            size:sizeitem,
          }, 
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`,
          },
        });
        setRefCartinhead(ref => !ref)
      }
      catch(err){
      console.log(err)
      }
      finally{
      setWhenRemove("")

      }
    }

    // function to update quantity
   const updateQuantity = async (productId, color, size, newQuantity) => {
      try {
          const res = await axios.put("https://devstyle-u119.onrender.com/api/Cart", {
              productId,
              color,
              size,
              quantity: newQuantity,
          }, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
          });
          setRefCartinhead(ref => !ref)
      } catch (error) {
          console.error("Failed to update quantity:", error);
      }
  };

  // Handlers for increasing and decreasing quantity
  const increaseQuantity = (item) => {
  
          // Filter items by matching `params.Item`
          const filteredItems = Cart.filter(Item => Item.item ===item.item );

          // Calculate total quantity for the filtered items
          const quantity = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
          
          if (quantity<item.instock) {
            updateQuantity(item.item, item.color, item.size, item.quantity + 1);
          }        

  };
  const decreaseQuantity = (item) => {
    if (item.quantity>1) {
      updateQuantity(item.item, item.color, item.size, item.quantity - 1);
    }
  };



  return (
    <div className={styles.Cart}>

                <div className={styles.nameAndnb}>

                <h1 className={styles.nameCart}>Cart</h1>
                <div className={styles.nbitems}>{Cart.length}</div>

                </div>
                {Loading?
                                <div className={styles.loadind}>
                                  <svg className={styles.pl}  viewBox="0 0 240 240">
                                      <circle className={styles.pl__ringa} cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                                      <circle className={styles.pl__ringb} cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                                      <circle className={styles.pl__ringc} cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                                      <circle className={styles.pl__ringd} cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                                  </svg>
                                </div>
                                :
                                (Cart.length>0?
                                  <>
                                      <div className={styles.itemsinCart}>
                                      {Cart.map((cart,index)=>
                                                          <div key={index} className={styles.item}>
                                                              <Link href={`/Item/${cart.item}`} className={styles.imgItem} style={{backgroundImage:`url(https://devstyle-u119.onrender.com${cart.image})`}}></Link>
                                                              <div className={styles.infoItem}>
                                                                  <h2 className={styles.itemName}>{cart.name}</h2>
                                                                  <p className={styles.descItem}>Color : {cart.color} , Size: {cart.size}</p>
                                                                  <div className={styles.PriceandQuantity}>
                                                                      <h1 className={styles.Price}>{cart.price}$</h1>
                                                                      <div className={styles.quantity}>
                                                                          <p className={styles.mins} onClick={() => decreaseQuantity(cart)}>-</p>
                                                                          <h2 className={styles.nb}>{cart.quantity}</h2>
                                                                          <p className={styles.plus} onClick={() => increaseQuantity(cart)}>+</p>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              
                                                              {WhenRemove === `${cart.item} ${cart.color}`?(
                                                                <svg   className={styles.whenremove} xmlns="http://www.w3.org/2000/svg" height="37px" viewBox="0 -960 960 960" width="37px" fill="#FF4D4D">
                                                                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> 
                                                                </svg>)
                                                                :
                                                                <svg  onClick={()=>RemoveItemFromCart(cart.item,cart.color,cart.size)}  className={styles.removeItem} xmlns="http://www.w3.org/2000/svg" height="37px" viewBox="0 -960 960 960" width="37px" fill="#FF4D4D">
                                                                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/> 
                                                                </svg>
                                                              }
                                                          </div>

                                      )}
                                      </div>

                                      <div className={styles.orderSummary}>

                                      <h1 className={styles.summary}>Order Summary</h1>
                                      <div className={styles.subtotal}>
                                          <h2 className={styles.sub}>SubTotal</h2>
                                          <p className={styles.subPrice}>{Totalcart}$</p>
                                      </div>

                                      <div className={styles.subtotal}>
                                          <h2 className={styles.sub}>delivery</h2>
                                          <p className={styles.subPrice}>1$</p>
                                      </div>
                                      
                                      <div className={styles.total}>
                                          <h2 className={styles.sub}>Total</h2>
                                          <p className={styles.subPrice}>{Totalcart+1}$</p>
                                      </div>

                                      <Link href="/Checkout" className={styles.tocart} >Go to Checkout</Link>

                                      </div>
                                  </>
                                :
                                <h1 className={styles.noItemcart}>No items found</h1>)
                }

    </div>
  )
}
