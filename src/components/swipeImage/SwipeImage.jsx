// React import
import React, { useRef, useState } from "react";
import {
  Banner,
  BannerCircle,
  BannerContent,
  BannerPrice,
  BannerPriceWrap,
  BannerTime,
  BannerTitle,
} from "../../pages/main/Main.styled";

// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Style import
import {
  SwipeBtn,
  SwipeContainer,
  SwipeIdx,
  SwipeIdxItem,
  SwipeImg,
  SwipeItem,
  SwipeShowContainer,
} from "./SwipeImage.styled";

const SwipeImage = ({ children, data, height, maxWidth, minHeight }) => {
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

  return (
    <SwipeContainer maxWidth={maxWidth} height={height}>
      <SwipeShowContainer ref={ref} style={style}>
        {data?.map((item, idx) => {
          return (
            <SwipeItem>
              <SwipeImg key={idx} src={item.imgUrl} minHeight={minHeight} />
              {/* {children} */}

              <Banner>
                <BannerContent>
                  <BannerTime>{item.time}</BannerTime>
                  <BannerTitle>{item.title}</BannerTitle>
                </BannerContent>
                <BannerPriceWrap>
                  <span>최고입찰가</span>
                  <BannerPrice>{item.price}원</BannerPrice>
                </BannerPriceWrap>
                <BannerCircle></BannerCircle>
              </Banner>
							
              <SwipeIdx>
                {Array.from({ length: data.length }, (_, idx_i) =>
                  idx === idx_i ? (
                    <SwipeIdxItem color="black" />
                  ) : (
                    <SwipeIdxItem color="white" />
                  ),
                )}
              </SwipeIdx>
            </SwipeItem>
          );
        })}
      </SwipeShowContainer>

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
    </SwipeContainer>
  );
};

export default SwipeImage;
