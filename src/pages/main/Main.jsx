// React import
import React from "react";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AuctionCategoryList from "../../components/auctionCategoryList/AuctionCategoryList";

// Style import
import {
  MainContainer,
  MainContent,
  Banner,
  BannerTitle,
  BannerContent,
  BannerPriceWrap,
  BannerPrice,
} from "./Main.styled";

const Main = () => {
  return (
    <MainContainer>
      <Header logo={true} />

      <MainContent>
        <Banner>
          <BannerContent>
            <span>6일 12:36:01</span>
            <BannerTitle>
              폰트사이즈가 고민입니다.. 최대길이는 이 정도입니다.
            </BannerTitle>
          </BannerContent>
          <BannerPriceWrap>
            <span>최고입찰가</span>
            <BannerPrice>{598000}원</BannerPrice>
          </BannerPriceWrap>
        </Banner>

        <AuctionCategoryList isCategory={true}/>
      </MainContent>

      <Footer />
    </MainContainer>
  );
};

export default Main;
