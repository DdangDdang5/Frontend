// React import
import React, { useEffect, useRef, useState } from "react";

// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Style import
import {
  BannerCircle,
  BannerContent,
  BannerPrice,
  BannerPriceWrap,
  BannerTime,
  BannerTitle,
  SwipeBtn,
  SwipeContainer,
  SwipeContent,
  SwipeIdx,
  SwipeIdxItem,
  SwipeImg,
	SwipeImgLayer,
  SwipeItem,
  SwipeShowContainer,
} from "./SwipeImage.styled";

const SwipeImage = ({
  children,
  isMain,
  data,
  height,
  maxWidth,
  minHeight,
}) => {
  const ref = useRef(null);

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

  useEffect(() => {
    // 메인화면 5초마다 슬라이드 움직임
    if (isMain) {
      setTimeout(() => {
        if (currentImgIndex !== data.length - 1) {
          nextSlide();
        } else {
          setCurrentImgIndex(0);
          setStyle({
            transfrom: 0,
            transition: "all 0.4s ease-in-out",
          });
        }
      }, 5000);
    }
  });

  return (
    <SwipeContainer maxWidth={maxWidth} height={height}>
      <SwipeShowContainer ref={ref} style={style}>
        {data?.map((item, idx) => {
          const diff = new Date(new Date(item.auctionPeriod) - Date.now());
          const auctionPeriodDiff = `
						${diff.getDate()}일 
						${diff.getHours().toString().padStart(2, "0")}시간
						${diff.getMinutes().toString().padStart(2, "0")}분
					`;

          return (
            <SwipeItem key={item.auctionId}>
              <SwipeImg
                src={item.multiImages[0].imgUrl}
                minHeight={minHeight}
              />
							{/* <SwipeImgLayer /> */}

              {/* 메인화면 배너 */}
              {isMain ? (
                <SwipeContent>
                  <BannerContent>
                    <BannerTime>{auctionPeriodDiff}</BannerTime>
                    <BannerTitle>{item.title}</BannerTitle>
                  </BannerContent>
                  <BannerPriceWrap>
                    <span>최고입찰가</span>
                    <BannerPrice>
                      {item.nowPrice !== 0 ? item.nowPrice : item.startPrice}원
                    </BannerPrice>
                  </BannerPriceWrap>
                  <BannerCircle></BannerCircle>
                </SwipeContent>
              ) : (
                <SwipeContent></SwipeContent>
              )}

              <SwipeIdx>
                {Array.from({ length: data.length }, (_, idxI) =>
                  idx === idxI ? (
                    <SwipeIdxItem key={idxI} color="black" />
                  ) : (
                    <SwipeIdxItem key={idxI} color="white" />
                  ),
                )}
              </SwipeIdx>
            </SwipeItem>
          );
        })}
      </SwipeShowContainer>

      {/* 메인화면 버튼 안보임 */}
      {isMain ? null : (
        <>
          {currentImgIndex !== 0 ? (
            <SwipeBtn location="prev" onClick={prevSlide}>
              {/* <IoIosArrowBack size="20"/> */}
              <img
                src="maskable.png"
                alt="all"
                style={{ width: "20px", height: "20px" }}
              />
            </SwipeBtn>
          ) : null}

          {currentImgIndex !== data.length - 1 ? (
            <SwipeBtn location="next" onClick={nextSlide}>
              {/* <IoIosArrowForward size="20"/> */}
              <img
                src="maskable.png"
                alt="all"
                style={{ width: "20px", height: "20px" }}
              />
            </SwipeBtn>
          ) : null}
        </>
      )}
    </SwipeContainer>
  );
};

export default SwipeImage;
