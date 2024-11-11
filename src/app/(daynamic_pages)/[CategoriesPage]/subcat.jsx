"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function SwiperSub({cat,Subcats}) {
  const searchParams = useSearchParams();

  const [Subcat,setSubcat]=useState([])
  const getsucat=async()=>{
      try {
          const res = await axios.get( `https://devstyle-u119.onrender.com/api/SubCat/${cat}`);
          setSubcat(res.data.data);    
          
      } catch (error) {
           console.log(error);
          
      }
  }
  useEffect(()=>{
      getsucat();
  },[])

  const [inputValue, setInputValue] = useState(searchParams.get('Subcat'));
  useEffect(()=>{
    setInputValue(searchParams.get('Subcat'))
    Subcats(searchParams.get('Subcat')); 
  },[searchParams.get('Subcat')])

  const handleSendData = (subcat) => {
    setInputValue(subcat);
    Subcats(subcat); // Call the function from parent    
  };


  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          330: {
            slidesPerView: 2.7,
            spaceBetween: 15,
          },
          350: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          460: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          600: {
            slidesPerView: 4.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 5.5,
            spaceBetween: 15,
          },
          870: {
            slidesPerView: 6.5,
            spaceBetween: 15,
          },
          970: {
            slidesPerView: 7.5,
            spaceBetween: 15,
          },
          1100: {
            slidesPerView: 8.5,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 8.5,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 9.5,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 10.5,
            spaceBetween: 25,
          },
        }}
        className={styles.Swiper}
      >
        {Subcat.map((sucats,index)=>
            <SwiperSlide className={styles.SwiperSlide} key={index}   onClick={() => handleSendData(sucats._id)} 
            style={{color:inputValue==sucats._id?"#FF4D4D":""}} >
                <div className={styles.Subimg}  style={{backgroundImage:`url(https://devstyle-u119.onrender.com${sucats.image})`}}></div>
                <h2 className={styles.nameSubcat}>{sucats.name}</h2>
            </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
