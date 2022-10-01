// React import
import React, { useRef, useState } from "react";

// Package import
import styled from "styled-components";
import { Back } from "../../shared/images";

const Slider = ({ data }) => {
  const cnt = data?.map((item, index) => {
    return item.imgUrl;
  });

  const totalSlides = cnt?.length - 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const slideRef = useRef(null);

  // const [styled, setStyled] = useState({
  //   transform: `translateX(-${currentIndex}00%)`,
  //   transition: `all 0.4s ease-in-out`,
  // });

  const nextSlide = () => {
    if (count >= totalSlides) {
      setCount(0);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (count === 0) {
      setCount(totalSlides);
    } else {
      setCount((prev) => prev - 1);
    }
  };

  // const nextSlide = () => {
  //   if (cnt.length - 1 <= currentIndex) {
  //     setCurrentIndex(currentIndex);
  //     setStyled({
  //       transform: `translateX(-${cnt.length - 1}00%)`,
  //       transition: `all 0.4s ease-in-out`,
  //     });
  //   } else {
  //     setCurrentIndex(currentIndex + 1);
  //     setStyled({
  //       transform: `translateX(-${currentIndex + 1}00%)`,
  //       transition: `all 0.4s ease-in-out`,
  //     });
  //   }
  // };

  // const prevSlide = () => {
  //   if (currentIndex == 0) {
  //     setCurrentIndex(0);
  //     setStyled({
  //       transform: `translateX(-${currentIndex}00%)`,
  //       transition: `all 0.4s ease-in-out`,
  //     });
  //   } else {
  //     setCurrentIndex(currentIndex - 1);
  //     setStyled({
  //       transform: `translateX(-${currentIndex - 1}00%)`,
  //       transition: `all 0.4s ease-in-out`,
  //     });
  //   }
  // };

  return (
    <SliderWrap>
      {/* <input type="radio" name="imgSlider" id="slider1" /> */}
      <ImgBox ref={slideRef} count={count}>
        {cnt?.map((item, index) => {
          return (
            <ImageList key={index}>
              <img src={item} alt="" />
            </ImageList>
          );
        })}
      </ImgBox>
      <BtnBox>
        <div className="left" onClick={prevSlide}>
          <svg
            onClick={prevSlide}
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.7048 0.29272C17.3145 -0.0975732 16.684 -0.0975732 16.2938 0.29272L8.99872 7.58819L1.70368 0.29272C1.31341 -0.0975732 0.682972 -0.0975732 0.292702 0.29272C-0.0975675 0.683012 -0.0975675 1.31348 0.292702 1.70377L8.29824 9.70979C8.49838 9.90994 8.74856 10 9.00874 10C9.26892 10 9.51908 9.89993 9.71922 9.70979L17.7248 1.70377C18.095 1.31348 18.095 0.683012 17.7048 0.29272Z"
              fill="#A5A9B6"
            />
          </svg>
        </div>
        <div className="right" onClick={nextSlide}>
          <svg
            onClick={nextSlide}
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.7048 0.29272C17.3145 -0.0975732 16.684 -0.0975732 16.2938 0.29272L8.99872 7.58819L1.70368 0.29272C1.31341 -0.0975732 0.682972 -0.0975732 0.292702 0.29272C-0.0975675 0.683012 -0.0975675 1.31348 0.292702 1.70377L8.29824 9.70979C8.49838 9.90994 8.74856 10 9.00874 10C9.26892 10 9.51908 9.89993 9.71922 9.70979L17.7248 1.70377C18.095 1.31348 18.095 0.683012 17.7048 0.29272Z"
              fill="#A5A9B6"
            />
          </svg>
        </div>
      </BtnBox>
      <Bullets>
        {cnt?.map((item, index) => {
          return (
            <div
              className={`slidesDot${count === index ? " active" : ""}`}
              key={index}>
              &nbsp;
            </div>
          );
        })}
      </Bullets>
    </SliderWrap>
  );
};

const SliderWrap = styled.div`
  display: flex;
  width: 410px;
  height: 390px;
  position: relative;
  overflow: hidden;
  flex-direction: row;
  background-color: yellow;
  /* span {
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  } */
`;

const ImgBox = styled.div`
  display: flex;
  width: 100%;
  transition: ${(props) => (!props.count ? "" : "all 0.5s ease-in-out")};
  transform: ${(props) => "translateX(-" + props.count * 410 + "px)"};
  /* div {
    display: flex;
    min-width: 410px;
    max-width: 410px;
    min-height: 390px;
    max-height: 390px;
    img {
      display: flex;
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
    } 
  } */
  img {
    flex: none;
    width: 410px;
    height: 390px;
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
const ImageList = styled.li`
  list-style: none;
`;

const Bullets = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
  z-index: 100;
  flex-direction: row;
  gap: 5px;
  text-align: center;
  .slidesDot {
    display: inline-block;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
  .slidesDot.active {
    display: inline-block;
    border-radius: 50%;
    background-color: #ffffff;
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
`;
const BtnBox = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  .right {
    transform: rotate(270deg);
  }
  .left {
    transform: rotate(90deg);
  }
`;

export default Slider;
