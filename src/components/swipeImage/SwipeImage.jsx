// React import
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontEvent } from "../../shared/fonts/font";

// Shared import
import { Back, EventImg, InfoImg, Next } from "../../shared/images";

// Style import
import {
  BannerCircle,
  BannerContent,
  BannerPrice,
  BannerPriceWrap,
  BannerTime,
  BannerTitle,
  EventBanner,
  EventBannerList,
  EventCircle,
  EventContent,
  EventDate,
  EventText,
  EventTitle,
  SwipeBtn,
  SwipeContainer,
  SwipeContent,
  SwipeIdx,
  SwipeIdxItem,
  SwipeImg,
  SwipeItem,
  SwipeShowContainer,
} from "./SwipeImage.styled";

const SwipeImage = ({
  children,
  isMain,
  data,
	width,
  height,
  maxWidth,
  minHeight,
}) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  // console.log(data);

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
    var timeout;
    // 메인화면 5초마다 슬라이드 움직임
    if (isMain && data) {
      if (data?.length > 1) {
        timeout = setTimeout(() => {
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
		} 
		else if (isMain && data === undefined) {
			timeout = setTimeout(() => {
				if (currentImgIndex !== 1) {
					nextSlide();
			    // setCurrentImgIndex(currentImgIndex + 1);
					// const index = (currentImgIndex + 1) * 50;
					// setStyle({
					// 	transfrom: `translateX(-${index}%)`,
					// 	transition: "all 0.4s ease-in-out",
					// });
				} else {
					setCurrentImgIndex(0);
					setStyle({
						transfrom: 0,
						transition: "all 0.4s ease-in-out",
					});
				}
			}, 5000);
		}

    return () => {
      if (isMain) {
        setTimeout(timeout);
      }
    };
  });

  return (
    <SwipeContainer width={width} maxWidth={maxWidth} height={height}>
      <SwipeShowContainer ref={ref} style={style}>
        {data ? (
          data.map((item, idx) => {
            if (isMain) {
              const diff = new Date(new Date(item.deadline) - Date.now());
              const auctionPeriodDiff = `
						${diff.getDate()}일 
						${diff.getHours().toString().padStart(2, "0")}시간
						${diff.getMinutes().toString().padStart(2, "0")}분
					`;

              return (
                <SwipeItem key={idx} minHeight={minHeight}>
                  <SwipeImg src={item.multiImages[0]?.imgUrl} />
                  {/* <SwipeImgLayer /> */}

                  {/* 메인화면 배너 */}
                  <SwipeContent>
                    <BannerContent>
                      <BannerTime idx={idx}>{auctionPeriodDiff}</BannerTime>
                      <BannerTitle>{item.title}</BannerTitle>
                    </BannerContent>
                    <BannerPriceWrap>
                      <span>최고입찰가</span>
                      <BannerPrice>{item.nowPrice}원</BannerPrice>
                    </BannerPriceWrap>
                    <BannerCircle idx={idx} />
                  </SwipeContent>

                  <SwipeIdx isMain={isMain}>
                    {Array.from({ length: data.length }, (_, idxI) =>
                      idx === idxI ? (
                        <SwipeIdxItem key={idxI} idxNow={true} />
                      ) : (
                        <SwipeIdxItem key={idxI} idxNow={false} />
                      ),
                    )}
                  </SwipeIdx>
                </SwipeItem>
              );
            } else {
              return (
                <SwipeItem key={idx} minHeight={minHeight}>
                  <SwipeImg src={item.imgUrl} />

                  <div></div>

                  <SwipeIdx isMain={isMain}>
                    {Array.from({ length: data.length }, (_, idxI) =>
                      idx === idxI ? (
                        <SwipeIdxItem key={idxI} idxNow={true} />
                      ) : (
                        <SwipeIdxItem key={idxI} idxNow={false} />
                      ),
                    )}
                  </SwipeIdx>
                </SwipeItem>
              );
            }
          })
        ) : (
						Array.from({ length: 2 }, (_, idx) => (
              <EventBanner key={idx} idx={idx} isMain={isMain} onClick={idx ? () => navigate("/event/1") : () => navigate("/infoDetail")}>
                <FontEvent />
                <EventContent idx={idx} isMain={isMain}>
                  <EventDate idx={idx} isMain={isMain}>09.27 ~ {idx ? "10.02" : "상시"}</EventDate>
                  <EventTitle idx={idx} isMain={isMain}>
                    {idx ? "소중한 의견을 들려주세요!" : "만나서 반가워요! 땅땅입니다."}
                  </EventTitle>
                  <EventText isMain={isMain}>
                    <span>{idx ? "추첨을 통해 총 5분께" : "땅땅 이용법,"}</span>
                    <span>{idx ? "교촌치킨 기프티콘을 드려요" : "A부터 Z까지 함께 알아봐요"}</span>
                  </EventText>
                </EventContent>
                {idx ? <EventImg /> : <InfoImg />}
                <EventCircle id/>
              </EventBanner>
            ))
        )}
      </SwipeShowContainer>

      {/* 메인화면 버튼 안보임 */}
      {isMain ? null : (
        <>
          {currentImgIndex !== 0 ? (
            <SwipeBtn location="prev" onClick={prevSlide}>
              <Back className="back-btn" />
            </SwipeBtn>
          ) : null}

          {currentImgIndex !== data.length - 1 ? (
            <SwipeBtn location="next" onClick={nextSlide}>
              <Next className="next-btn" />
            </SwipeBtn>
          ) : null}
        </>
      )}
    </SwipeContainer>
  );
};

export default SwipeImage;
