"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './page.module.css'
import { useState } from 'react';

export default function CatSwiper({cat}) {
  const [Cats,setCats]=useState("")
  const handleSendData = (catname) => {
    setCats(catname);
    cat(catname);
  };

  return (
    <>
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          350: {
            slidesPerView: 2.5,
            spaceBetween: 15,
          },
          400: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          580: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          800: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          850: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
          1000: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
          1100: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 7,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 7,
            spaceBetween: 40,
          },
        }}
        className={styles.Swiper}
      >

        <SwiperSlide className={styles.SwiperSlide} onClick={() => handleSendData("")} style={{backgroundColor:!Cats?"#FFD9D9":""}}>
            <h3 className={styles.cat}>All</h3>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide} onClick={() => handleSendData("MenWears")} style={{backgroundColor:Cats==="MenWears"?"#FFD9D9":""}}>
            <h3 className={styles.cat}>Men</h3>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide} onClick={() => handleSendData("WomenWears")} style={{backgroundColor:Cats==="WomenWears"?"#FFD9D9":""}}>
            <h3 className={styles.cat}>Women</h3>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide} onClick={() => handleSendData("KidsWears")} style={{backgroundColor:Cats==="KidsWears"?"#FFD9D9":""}}>
            <h3 className={styles.cat}>Kids</h3>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide} onClick={() => handleSendData("Shoas")} style={{backgroundColor:Cats==="Shoas"?"#FFD9D9":""}}>
            <h3 className={styles.cat}>Shoes</h3>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide} onClick={() => handleSendData("Accessories")} style={{backgroundColor:Cats==="Accessories"?"#FFD9D9":""}}>
            <h3 className={styles.cat}>Accessories</h3>
        </SwiperSlide>
        <SwiperSlide className={styles.SwiperSlide} onClick={() => handleSendData("Bags")} style={{backgroundColor:Cats==="Bags"?"#FFD9D9":""}}>
            <h3 className={styles.cat}>Bags</h3>
        </SwiperSlide>


      </Swiper>
    </>
  );
}
