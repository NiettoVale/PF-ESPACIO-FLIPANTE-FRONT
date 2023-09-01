import React from "react";
import styles from "./ProductSlider.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const ProductSlider = () => {
  return (
    <div>
      <h1>PRODUCTOS DESTACADOS</h1>
      <Swiper
        freeMode={true}
        grabCursor={true}
        FreeMode={true}
        className={styles.swiper}
        slidesPerView={5}
        spaceBetween={10}
      >
        <SwiperSlide>
          <h1>Slide 1</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>Slide 2</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>Slide 3</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>Slide 4</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>Slide 5</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>Slide 6</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>Slide 7</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>Slide 8</h1>
        </SwiperSlide>
        <SwiperSlide>
          <h1>Slide 9</h1>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
