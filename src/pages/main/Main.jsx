// React import
import React from "react";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AuctionCategoryList from "../../components/auctionCategoryList/AuctionCategoryList";
import SwipeImage from "../../components/swipeImage/SwipeImage";

// Style import
import {
  AddAuction,
  Banner,
  BannerCircle,
  BannerContainer,
  BannerContent,
  BannerItem,
  BannerPrice,
  BannerPriceWrap,
  BannerTime,
  BannerTitle,
  LastItem,
  LastList,
  ListContainer,
  ListHeader,
  ListHeaderMore,
  MainContainer,
  MainContent,
  NewItem,
  NewItemContent,
  NewItemPrice,
  NewItemPriceWrap,
  NewItemTitle,
  NewList,
  PopularItem,
  PopularList,
  PopularPrice,
  PopularPriceWrap,
  PopularTitle,
  TagWrap,
} from "./Main.styled";

const Main = () => {
  const data = [
    {
			imgUrl: "maskable.png",
      time: "6일 12:36:01",
      title: "폰트사이즈가 고민입니다.. 최대길이는 이 정도입니다.",
      price: 598000,
    },
    {
			imgUrl: "logo512.png",
      time: "4일 11:59:59",
      title: "Banner Title!!!",
      price: 398000,
    },
  ];

  return (
    <MainContainer>
      <Header logo={true} />

      <MainContent>
        {/* 배너 */}
        <BannerContainer>
					<SwipeImage data={data} height="100%">
	          <Banner>
	            <BannerContent>
	              <BannerTime>6일 12:36:01</BannerTime>
	              <BannerTitle>
	                폰트사이즈가 고민입니다.. 최대길이는 이 정도입니다.
	              </BannerTitle>
	            </BannerContent>
	            <BannerPriceWrap>
	              <span>최고입찰가</span>
	              <BannerPrice>{598000}원</BannerPrice>
	            </BannerPriceWrap>
	            <BannerCircle></BannerCircle>
	          </Banner>
					</SwipeImage>
        </BannerContainer>

        {/* 카테고리별, 지역별 TOP 6 */}
        <AuctionCategoryList isCategory={true} />
        <AuctionCategoryList isCategory={false} />

        {/* 인기 경매 */}
        <ListContainer>
          <ListHeader>지금 관심 폭발 중!</ListHeader>

          <PopularList>
            {Array.from({ length: 3 }, () => (
              <PopularItem>
                <div>
                  <TagWrap backgroundColor="white">
                    <span>택배</span>
                    <span>마포구</span>
                  </TagWrap>
                  <PopularTitle>예시 텍스트입니다. 최대 두줄</PopularTitle>
                </div>
                <PopularPriceWrap>
                  <span>현재 입찰가</span>
                  <PopularPrice>{18000}원</PopularPrice>
                </PopularPriceWrap>
              </PopularItem>
            ))}
          </PopularList>
        </ListContainer>

        {/* 새로운 경매 */}
        <ListContainer>
          <ListHeader>
            <span>따끈따끈 새로 올라온 경매!</span>
            <ListHeaderMore>
              <span>전체보기</span>
              <img src="maskable.png" alt="all" />
            </ListHeaderMore>
          </ListHeader>

          <NewList>
            {Array.from({ length: 3 }, () => (
              <NewItem>
                <img src="maskable.png" alt="auction-img" />
                <NewItemContent>
                  <TagWrap backgroundColor="gray">
                    <span>택배</span>
                    <span>성산구</span>
                  </TagWrap>
                  <NewItemTitle>
                    제목은 한 줄만 노출됩니다. 길어진 길이는 안보입니다.
                  </NewItemTitle>
                  <NewItemPriceWrap>
                    <span>입찰시작가</span>
                    <NewItemPrice>{5000}원</NewItemPrice>
                  </NewItemPriceWrap>
                </NewItemContent>
              </NewItem>
            ))}
          </NewList>
        </ListContainer>

        {/* 마감임박 경매 */}
        <ListContainer>
          <ListHeader fontSize="18px">
            <span>서두르세요! 곧 경매가 끝나요</span>
            <ListHeaderMore>
              <span>전체보기</span>
              <img src="maskable.png" alt="all" />
            </ListHeaderMore>
          </ListHeader>

          <LastList>
            {Array.from({ length: 4 }, () => (
              <LastItem>
                <img src="maskable.png" alt="auction-img" />
                <TagWrap backgroundColor="gray">
                  <span>택배</span>
                  <span>성산구</span>
                </TagWrap>
                <NewItemTitle>
                  제목은 한 줄만 노출됩니다. 길어진 길이는 안보입니다.
                </NewItemTitle>
                <NewItemPriceWrap>
                  <span>최고입찰가</span>
                  <NewItemPrice>{5000}원</NewItemPrice>
                </NewItemPriceWrap>
              </LastItem>
            ))}
          </LastList>
        </ListContainer>
      </MainContent>

      <AddAuction src="maskable.png" alt="auction-img" />

      <Footer />
    </MainContainer>
  );
};

export default Main;
