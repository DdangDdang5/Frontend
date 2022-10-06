// React import
import React, { useState } from "react";

// Package import
import { useNavigate } from "react-router-dom";

// Shared import
import { NextImg } from "../../shared/images";
import InfoImg from "../../shared/images/InfoImg.png";
import EventImg from "../../shared/images/EventImg.png";

// Style import
import {
  EventBanner,
  EventCircle,
  EventContent,
  EventDate,
  EventText,
  EventTitle,
  SwipeBtn,
  SwipeContainer,
  SwipeShowContainer,
} from "./SwipeImage.styled";

const SwipeImage = ({
  isMain,
  width,
  height,
  maxWidth,
}) => {
  const navigate = useNavigate();
	
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const nextSlide = () => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  const prevSlide = () => {
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle({
      transform: `translateX(-${currentImgIndex - 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  return (
    <SwipeContainer width={width} maxWidth={maxWidth} height={height}>
      <SwipeShowContainer style={style}>
        {Array.from({ length: 2 }, (_, idx) => (
          <EventBanner
            key={idx}
            idx={idx}
            isMain={isMain}
            onClick={
              idx ? () => navigate("/event/1") : () => navigate("/infoDetail")
            }
          >
            <FontEvent />
            <EventContent idx={idx} isMain={isMain}>
              <EventDate idx={idx} isMain={isMain}>
                09.29 ~ {idx ? "10.02" : "상시"}
              </EventDate>
              <EventTitle idx={idx} isMain={isMain}>
                {idx
                  ? "소중한 의견을 들려주세요!"
                  : "만나서 반가워요! 땅땅입니다."}
              </EventTitle>
              <EventText isMain={isMain}>
                <span>{idx ? "추첨을 통해 총 5분께" : "땅땅 이용법,"}</span>
                <span>
                  {idx
                    ? "교촌치킨 기프티콘을 드려요"
                    : "A부터 Z까지 함께 알아봐요"}
                </span>
              </EventText>
            </EventContent>
            {idx ? <img src={EventImg} alt="event-img" /> : <img src={InfoImg} alt="info-img" />}
            <EventCircle isMain={isMain} idx={idx} />
          </EventBanner>
        ))}
      </SwipeShowContainer>

      {/* 메인화면 이미지 슬라이스 버튼 */}
      {isMain && (
        <>
          {currentImgIndex !== 0 ? (
            <SwipeBtn location="prev" onClick={prevSlide}>
              <NextImg />
            </SwipeBtn>
          ) : null}

          {currentImgIndex !== 1 ? (
            <SwipeBtn location="next" onClick={nextSlide}>
              <NextImg />
            </SwipeBtn>
          ) : null}
        </>
      )}
    </SwipeContainer>
  );
};

export default SwipeImage;
