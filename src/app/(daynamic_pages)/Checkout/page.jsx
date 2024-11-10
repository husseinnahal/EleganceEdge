"use client"
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import axios from 'axios';
import { CheckToken } from '@/Context/UserContext';

export default function Checkout() {
  const {RefrCartinhead}=CheckToken();

  // check if token is exist or no 
  const [Token,setToken]=useState(false);
  useEffect(() => {
      const token = localStorage.getItem("Token");
      setToken(!!token); // true if token exists, false otherwise
  },[]);


// get information of user 
const [Infouser,setInfouser]=useState({
  name:"",
  phone:"",
  adress:""
})
const getuser = async () => {
    try {
      const res = await axios.get(`https://devstyle-u119.onrender.com/api/User/Auser`,
        {
          headers: {
            Authorization:`Bearer ${localStorage.Token}` , 
          }
         }
      );
      const User=res.data.data
      setInfouser({
        name: User.name ,
        phone: User.phone ,
        adress: User.adress ,
      });

    } catch (error) {
        console.log("An error occurred:", error); // Log generic error if no response data
    }
};
  useEffect(()=>{
    if (Token) {
      getuser()
    }
  },[Token])

  // for handle the value in inputs when change
  function handle(e){
    setInfouser({...Infouser,[e.target.name]:e.target.value});
  };

// get cart id to send for order
const [Cart,setCart]=useState([])
  const getCart = async () => {
    try {
      const res = await axios.get(`https://devstyle-u119.onrender.com/api/Cart`,
        {
          headers: {
            Authorization:`Bearer ${localStorage.Token}` , 
          }
         }
      );
      
      setCart(res.data.data.items)  
    } catch (error) {
        console.log("An error occurred:", error); // Log generic error if no response data
    }
  };
  useEffect(()=>{
    if (Token) {
      getCart()
    }
  },[Token,RefrCartinhead]);


  // send data to order 
  const [Message,setMessage]=useState("")
  async function Order(e) {
      e.preventDefault();
        try {
          const res=await axios.post("https://devstyle-u119.onrender.com/api/Order", {
            cartid: Cart._id,
            name:Infouser.name,
            addres: Infouser.adress,
            phone:Infouser.phone
          }, 
          { headers: { Authorization: `Bearer ${localStorage.Token}` } });
          setInfouser({
            name: "" ,
            phone: "" ,
            adress:"" ,
          });

          alert("Order created successfully!");
          window.location.href = "/";

        } catch (err) {
          setMessage(err.response?.data?.error?.message || "An error occurred while placing the order");
          console.error("Error adding to cart:", err);
        }

  }
  

  return (
    <div className={styles.checkout}>
      {Token?(
      Cart.length>0?
      <>
      <h1 className={styles.titlecheckout}>Checkout</h1>
      <form  className={styles.forminfo}>
           <label htmlFor='name' className={styles.labels}>Name</label>
           <input className={styles.inputs} id='name' value={Infouser.name} type="text" name='name' onChange={handle}/>

           <label htmlFor='phone' className={styles.labels}>Phone number</label>
           <input className={styles.inputs} id='phone'  value={Infouser.phone} type="text" name='phone' onChange={handle} />

           <label htmlFor='addres' className={styles.labels}>Address</label>
           <input className={styles.inputs} id='addres'  value={Infouser.adress} type="text" name='adress' onChange={handle} />
          {Message && <p className={styles.errors} style={{color:Message=="Order created successfully" && "green"}}>{Message}</p>}
        <input type="submit" onClick={Order} className={styles.send} value="Order now" />
      </form>
      </>:
      <h1 className={styles.notoken}>Your Cart is Empty</h1>

      )
      :
      <h1 className={styles.notoken}>Please log in and try again</h1>
      }
    </div>
  )
}
