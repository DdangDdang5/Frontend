// React import
import React, { useRef, useState } from "react";

// Package import
import styled from "styled-components";

// Shared import
import { UnderArrow } from "../../shared/images/index";

const Slider = ({ data }) => {
  const cnt = data?.map((item, index) => {
    return item.imgUrl;
  });

  const totalSlides = cnt?.length - 1;

  const [count, setCount] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (count >= totalSlides) {
      setCount(count);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (count === 0) {
      setCount(count);
    } else {
      setCount(count - 1);
    }
  };

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
        {cnt?.length < 2 ? (
          ""
        ) : (
          <div className="left" onClick={prevSlide}>
            <UnderArrow />
          </div>
        )}

        {cnt?.length < 2 ? (
          ""
        ) : (
          <div className="right" onClick={nextSlide}>
            <UnderArrow />
          </div>
        )}
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
`;

const ImgBox = styled.div`
  display: flex;
  width: 100%;
  transition: all 0.5s ease-in-out;
  /* transition: ${(props) => (!props.count ? "" : "all 0.5s ease-in-out")}; */

  transform: ${(props) => "translateX(-" + props.count * 410 + "px)"};

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
