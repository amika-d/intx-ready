"use client"

import React from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"
import "swiper/css/navigation"

// Import images
import img1 from "../assets/Feature 1.png"
import img2 from "../assets/Feature 2.png"
import img3 from "../assets/Feature 3.png"

// Import arrow image
import Arrow from "../assets/Arrow.svg"

// Styled component for the carousel container
const Container = styled.div`
  width: 25vw;
  height: 70vh;
  position: relative;

  @media (max-width: 70em) {
    height: 60vh;
  }

  @media (max-width: 64em) {
    height: 50vh;
    width: 30vw;
  }

  @media (max-width: 48em) {
    height: 50vh;
    width: 40vw;
  }

  @media (max-width: 30em) {
    height: 45vh;
    width: 60vw;
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    background-color: ${(props) => props.theme.carouselColor};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  /* Styling for the card effect */
  .swiper-cards {
    overflow: visible;
  }

  .swiper-cards .swiper-slide {
    transform-origin: center bottom;
    backface-visibility: hidden;
  }

  /* Add counter at the bottom */
  .slide-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: ${(props) => props.theme.text};
    font-size: 1rem;
    z-index: 10;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: ${(props) => props.theme.text};
    width: 4rem;
    bottom: 20%;
    top: auto;
    transform: translateY(50%);
    background-image: url(${Arrow});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    &:after {
      display: none;
    }
  }

  .swiper-button-next {
    right: 5%;
  }

  .swiper-button-prev {
    left: 5%;
    transform: translateY(50%) rotate(180deg);
  }

  @media (max-width: 64em) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 3rem;
    }
  }

  @media (max-width: 30em) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 2rem;
    }
  }
`

const Carousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <Container>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectCards]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect={"cards"}
        grabCursor={true}
        cardsEffect={{
          slideShadows: true,
          perSlideOffset: 8,
          perSlideRotate: 2,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1 || "/placeholder.svg"} alt="Feature 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2 || "/placeholder.svg"} alt="Feature 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3 || "/placeholder.svg"} alt="Feature 3" />
        </SwiperSlide>
        <div className="slide-counter">{activeIndex + 1} / 3</div>
      </Swiper>
    </Container>
  )
}

export default Carousel;

