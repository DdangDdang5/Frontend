// React import
import React, { useRef, useState } from "react";

// Package import
import styled from "styled-components";

const Slider = ({ data }) => {
  const ref = useRef(null);

  const cnt = data.map((item, index) => {
    return item.imgUrl;
  });

  // const [touch, setTouch] = useState({
  //   start: 0,
  //   end: 0,
  // });

  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log("1111", currentIndex);

  const [styled, setStyled] = useState({
    transform: `translateX(-${currentIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const nextSlide = () => {
    if (cnt.length - 1 <= currentIndex) {
      setCurrentIndex(currentIndex);
      setStyled({
        transform: `translateX(-${cnt.length - 1}00%)`,
        transition: `all 0.4s ease-in-out`,
      });
    } else {
      setCurrentIndex(currentIndex + 1);
      setStyled({
        transform: `translateX(-${currentIndex + 1}00%)`,
        transition: `all 0.4s ease-in-out`,
      });
    }
  };

  const prevSlide = () => {
    if (currentIndex == 0) {
      setCurrentIndex(0);
      setStyled({
        transform: `translateX(-${currentIndex}00%)`,
        transition: `all 0.4s ease-in-out`,
      });
    } else {
      setCurrentIndex(currentIndex - 1);
      setStyled({
        transform: `translateX(-${currentIndex - 1}00%)`,
        transition: `all 0.4s ease-in-out`,
      });
    }
  };

  return (
    <SliderWrap>
      <ImgBox style={styled} ref={ref}>
        <div>
          {cnt.map((item, index) => {
            return <img key={index} src={item} alt="" />;
          })}
        </div>
      </ImgBox>
      <BtnBox>
        <button className="left" onClick={prevSlide}></button>
        <button className="right" onClick={nextSlide}></button>
      </BtnBox>
    </SliderWrap>
  );
};

const SliderWrap = styled.div`
  display: flex;
  /* flex-direction: row; */
  /* width: 100%; */
  position: relative;
  overflow: hidden;
  span {
    background-color: yellow;
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  }
`;

const ImgBox = styled.div`
  div {
    display: flex;
    min-width: 390px;
    max-width: 390px;
    min-height: 390px;
    max-height: 390px;
    img {
      display: flex;
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
      /* align-items: center; */
      /* justify-content: center; */
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100%;
  .left {
    width: 50%;
    height: 390px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: none;
  }
  .right {
    width: 50%;
    height: 390px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    border: none;
  }
`;

export default Slider;
