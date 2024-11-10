"use client"
import styles from './page.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { CheckToken } from '@/Context/UserContext';

export default function Item({ params }) {
  const {setDisplayUser,setCartdisplay,DisplayUser,Login,Cartdisplay,setNbinwishlist}=CheckToken();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [Instock, setInstock] = useState(0);
  const [Items, setItems] = useState([]);
  const [Img, setImgs] = useState([]);
  const [Colors, setColors] = useState([]);
  const [Sizes, setSizes] = useState([]);
  const [Cat, setCats] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Token,setToken]=useState(false);
  const [Wishlist,setWishlist]=useState(false);
  const [Refresh,setRefresh]=useState(false);
  const [Load,setLoad]=useState("");
  const [ColorAddtocart,setColorAddtocart]=useState("");
  const [SizeAddtocart,setSizeAddtocart]=useState("");
  const [Message,setMessage]=useState("");
  const [Cart,setCart]=useState(0);



  function plusOne(instock) {
    if (Instock>quantity) {
      return setQuantity(quantity + 1);
    }
   
  }
  function minsOne() {
    if (quantity > 1) {
      return setQuantity(quantity - 1);
    }
  }
  
  // check if token is exist or no 
  useEffect(() => {
    // Check for token on component load
    setToken(!!localStorage.getItem("Token"));  
},[DisplayUser,Login]);

// Ensure the Wishlist array is fetched before checking if the item is in it
const getWishlist=async()=>{
  try {
      const res = await axios.get( `https://devstyle-u119.onrender.com/api/Wishlist/inwishlist`,
          {
              headers: {
                Authorization:`Bearer ${localStorage.Token}` , 
              }
          }
      );
      const list=res.data.data[0].items

      setWishlist(list.some(wishlistItem => wishlistItem._id === params.Item));
      
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
useEffect(() => {
  if (Token) {
    getWishlist();
  }
}, [Token, Refresh]);


  // addto wishlist
  async function addTowishlist(id){
    if (Token) {
    setLoad(id)
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
    setLoad("")

   }
   }
   else{
    setDisplayUser("flex")
  }
  }
  // remove from wishlist
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
   
      setRefresh(ref => !ref)
      setNbinwishlist(nb => !nb)

    }
   catch(err){
    console.log(err)
   }
   finally{
    setLoad("")
   }}
   else{
    setDisplayUser("flex")
  }
  }

  // get items from cart
  const getCart = async () => {
    try {
      const res = await axios.get(`https://devstyle-u119.onrender.com/api/Cart`,
        {
          headers: {
            Authorization:`Bearer ${localStorage.Token}` , 
          }
         }
      );
      const itemincart = res.data.data.items;

      // Filter items by matching `params.Item`
      const filteredItems = itemincart.filter(item => item.item === params.Item);
      
      // Calculate total quantity for the filtered items
      const quantity = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      
      // Set the cart state with the filtered items
      setCart(quantity);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  
  };
  useEffect(() => {
    if (Token) {
      getCart();
    }
  }, [Token,Cartdisplay]);

// get the  item
const getItem = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`https://devstyle-u119.onrender.com/api/Items/${params.Item}`);
    const itemData = res.data.data;

    // Set the item data and add the inWishlist property
    setItems(itemData);
    setImgs(itemData.images);
    setColors(itemData.color);
    setSizes(itemData.size);
    setInstock(itemData.inStock - Cart)

    const rescat = await axios.get(`https://devstyle-u119.onrender.com/api/Items/cat/${itemData.category}`);
    setCats(rescat.data.data);
    setThumbsSwiper(null);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getItem();
}, [params.Item, Refresh,Cart]);



async function Addtocart() {
  if (Token) {
    if (Instock > 0) {
      try {
        await axios.post("https://devstyle-u119.onrender.com/api/Cart", {
          productId: params.Item,
          quantity,
          color: ColorAddtocart,
          size: SizeAddtocart
        }, { headers: { Authorization: `Bearer ${localStorage.Token}` } });
        setInstock(Instock - quantity);
        setQuantity(1);
        setCartdisplay("0");
        setMessage("");
      } catch (err) {
        setMessage(err.response?.data?.message || "Error adding to cart");
        console.error("Error adding to cart:", err);
      }
    } else {
      setMessage("No items left");
    }
  } else {
    setDisplayUser("flex");
  }
}




  return (
    <>
      {Loading ? (
        <div className={styles.loading}>
          <svg className={styles.pl} viewBox="0 0 240 240">
            <circle className={styles.pl__ringa} cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
            <circle className={styles.pl__ringb} cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
            <circle className={styles.pl__ringc} cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
            <circle className={styles.pl__ringd} cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
          </svg>
        </div>
        ) : (
        <div className={styles.Item}>
          <div className={styles.imgs}>
            {Img.length > 0 && (
              <Swiper
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                }}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.mainImg}
              >
                {Img.map((img, index) => (
                  <SwiperSlide key={index} style={{ backgroundImage: `url(https://devstyle-u119.onrender.com${img})` }} className={styles.imgcover}>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {Img.length > 0 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={15}
                slidesPerView={3}
                breakpoints={{
                  490: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.secondimg}
              >
                {Img.map((img, index) => (
                  <SwiperSlide className={styles.animg} key={index} style={{ backgroundImage: `url(https://devstyle-u119.onrender.com${img})` }}>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
                      {Load === Items._id ?
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
                                    <svg  onClick={()=> {Wishlist ? Delfromwishlist(Items._id) : addTowishlist(Items._id)}} 
                                    className={styles.towishlist} width="35" height="35" viewBox="0 0 35 35" fill={Wishlist?"red":"none"} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.2969 11.0498C14.7813 5.31325 5.97656 5.92424 5.97656 13.2562C5.97656 20.5882 17.2969 26.6981 17.2969 26.6981C17.2969 26.6981 28.6173 20.5882 28.6173 13.2562C28.6173 5.92424 19.8126 5.31325 17.2969 11.0498Z" stroke="#060606" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                        <rect x="0.730469" y="0.695312" width="34" height="34" rx="17" fill="white"/>
                                        <path d="M18.3204 12.8545C15.8047 7.11794 7 7.72893 7 15.0609C7 22.3929 18.3204 28.5028 18.3204 28.5028C18.3204 28.5028 29.6408 22.3929 29.6408 15.0609C29.6408 7.72893 20.836 7.11794 18.3204 12.8545Z" stroke="#060606" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                      }
                      {Items.saleByPercentage>0 && <p className={styles.salecontainer}>-{Items.saleByPercentage}%</p>}
                        
          </div>

          <div className={styles.info}>
            <h1 className={styles.nameItem}>{Items.name}</h1>
            <p className={styles.descItem}>{Items.descreption}</p>
            <h2 className={styles.price}>{Items.price}$</h2>
            <h2 className={styles.color}>Color:</h2>

            <div className={styles.colors}>
              {Colors.map((color, index) => (
                <div
                  style={{ backgroundColor: `${color}` }}
                  className={styles.Acolor}
                  key={index}
                  onClick={()=> setColorAddtocart(color)}
                >
                  <div
                    className={styles.bordercolor}
                    style={{ border: color === 'white' ? '2px solid #D9D9D9' : `2px solid ${color}`,display:ColorAddtocart===color?"block":"" }}
                  ></div>
                </div>
              ))}
            </div>

            <h2 className={styles.titilesize}>Size:</h2>

            <div className={styles.sizes}>
              {Sizes.map((size, index) => (
                <p className={styles.size} key={index} onClick={()=> setSizeAddtocart(size)} style={{color:SizeAddtocart===size?"#FF4D4D":""}}>{size}</p>
              ))}
            </div>
            <div className={styles.stockesamderrors}>
             {Items.inStock==0?(<p className={styles.stocks}>out of stock</p>):(Items.inStock< 4 ?<p className={styles.stocks}>{Items.inStock} items left</p>:"") } 
             {Message && <p style={{color:"red"}}>{Message}</p>}
            </div>
            <div className={styles.order}>
              <div className={styles.quantity}>
                <p className={styles.mins} onClick={minsOne}>-</p>
                <h2 className={styles.nb}>{quantity}</h2>
                <p className={styles.plus} onClick={plusOne}>+</p>
              </div>
              <p className={styles.tocart} onClick={Addtocart}>Add to cart</p>
            </div>
          </div>
        </div>
      )}
      
      <Swiper
        style={{
          '--swiper-navigation-color': 'white',
        }}
        breakpoints={{
          400: {
            slidesPerView: 3,
            spaceBetween: 15,
          }, 
          500: {
            slidesPerView: 4,
            spaceBetween: 15,
          }, 
          600: {
            slidesPerView: 5,
            spaceBetween: 15,
          }, 
          700: {
            slidesPerView: 6,
            spaceBetween: 15,
          }, 
          800: {
            slidesPerView: 6,
            spaceBetween: 15,
          }, 
          900: {
            slidesPerView: 7,
            spaceBetween: 10,
          }, 
          950: {
            slidesPerView: 7,
            spaceBetween: 20,
          },    
          1070: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
          1150: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
          1250: {
            slidesPerView: 9,
            spaceBetween: 10,
          },
          1400: {
            slidesPerView: 9,
            spaceBetween: 30,
          },
        }}
        slidesPerView={2}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className={styles.SwiperItem}
      >
        {Cat.map((cat, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Link
              className={styles.slideItem}
              href={`/${cat.category}/${cat._id}`}
              style={{ backgroundImage: `url(https://devstyle-u119.onrender.com${cat.imageCover})` }}
            ></Link>
          </SwiperSlide>
        ))}
        {Cat.map((cat, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Link
              className={styles.slideItem}
              href={`/${cat.category}/${cat._id}`}
              style={{ backgroundImage: `url(https://devstyle-u119.onrender.com${cat.imageCover})` }}
            ></Link>
          </SwiperSlide>
        ))}
        {Cat.map((cat, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Link
              className={styles.slideItem}
              href={`/${cat.category}/${cat._id}`}
              style={{ backgroundImage: `url(https://devstyle-u119.onrender.com${cat.imageCover})` }}
            ></Link>
          </SwiperSlide>
        ))}
        {Cat.map((cat, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Link
              className={styles.slideItem}
              href={`/${cat.category}/${cat._id}`}
              style={{ backgroundImage: `url(https://devstyle-u119.onrender.com${cat.imageCover})` }}
            ></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
