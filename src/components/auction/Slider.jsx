import React, { useRef, useState } from "react";
import styled from "styled-components";

const Slider = ({ data }) => {
  const ref = useRef(null);

  const cnt = data.map((item, index) => {
    return item.imgUrl;
  });

  // const [imageList, setImageList] = useState([
  //   cnt[cnt?.length - 1],
  //   ...cnt,
  //   cnt[0],
  // ]);

  console.log(cnt.length);

  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("1111", currentIndex);

  const [styled, setStyled] = useState({
    transform: `translateX(-${currentIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const nextSlide = () => {
    if (cnt.length - 1 <= currentIndex) {
      setCurrentIndex(0);
      setStyled({
        transform: `translateX(-${currentIndex - (cnt.length - 1)}00%)`,
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
    if (currentIndex <= 0) {
      setCurrentIndex(cnt.length);
      setStyled({
        transform: `translateX(-${currentIndex + cnt.length - 1}00%)`,
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
      <ImgBox>
        <div style={styled} ref={ref}>
          {cnt.map((item, index) => {
            return <img key={index} src={item} alt="" />;
          })}
        </div>
      </ImgBox>

      <BtnBox>
        <button className="left" onClick={prevSlide}>
          'ㅓ'
        </button>
        <button className="right" onClick={nextSlide}>
          'ㅏ'
        </button>
      </BtnBox>
    </SliderWrap>
  );
};

const SliderWrap = styled.div`
  position: relative;
  display: flex;

  background-color: red;
`;

const ImgBox = styled.div`
  display: flex;
  min-width: 390px;
  width: 100%;
  height: 390px;
  div {
    display: flex;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  top: 50%;
  width: 100%;
  .left {
  }
`;

export default Slider;
