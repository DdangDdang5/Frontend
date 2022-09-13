// React import
import React, { useEffect } from "react";

// Redux import
import { auctionItemList } from "../../redux/modules/AuctionListSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AuctionCategoryList from "../../components/auctionCategoryList/AuctionCategoryList";
import SwipeImage from "../../components/swipeImage/SwipeImage";

// Style import
import {
  AddAuction,
  BannerContainer,
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
  PopularItemContent,
  PopularList,
  PopularPrice,
  PopularPriceWrap,
  PopularTitle,
  TagRegion,
  TagWrap,
} from "./Main.styled";
import PlusButton from "../../components/button/PlusButton";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auctionAllList = useSelector((state) => state.auctionList.auctionList);

  // 판매중인 경매 목록
  const auctionSaleList = auctionAllList?.filter(
    (item) => item?.auctionStatus === true
  );

  // 인기 경매 목록 3개
  const auctionPopularList = auctionSaleList
    ?.slice()
    .sort((a, b) => b.viewerCnt - a.viewerCnt)
    .slice(0, 3);

  // 새로운 경매 목록 3개
  const auctionNewList = auctionSaleList?.slice(0, 3);

  // 마감임박 경매 목록 4개
  const auctionLastList = auctionSaleList
    ?.map((item) => {
      const date = new Date(item.createdAt);
      return {
        ...item,
        auctionPeriod: new Date(
          date.setDate(date.getDate() + item.auctionPeriod)
        ),
      };
    })
    .sort(
      (a, b) =>
        new Date(a.auctionPeriod).valueOf() -
        new Date(b.auctionPeriod).valueOf()
    )
    .slice(0, 4);

  useEffect(() => {
    dispatch(auctionItemList());
  }, [dispatch]);

  const moveAuctionDetail = (auctionId) => {
    navigate(`/auctionDetail/${auctionId}`);
  };

  return (
    <MainContainer>
      <Header logo={true} search={true} alarm={true}/>

      <MainContent>
        {/* 배너 */}
        <BannerContainer>
          <SwipeImage isMain={true} data={auctionLastList} height="100%" />
        </BannerContainer>

        {/* 카테고리별, 지역별 TOP 6 */}
        <AuctionCategoryList isCategory={true} />
        <AuctionCategoryList isCategory={false} />

        {/* 인기 경매 */}
        <ListContainer>
          <ListHeader>지금 관심 폭발 중!</ListHeader>

          <PopularList>
            {auctionPopularList?.map((item) => (
              <PopularItem
                key={item.auctionId}
                onClick={() => moveAuctionDetail(item.auctionId)}>
                <img
                  src={item.multiImages[0].imgUrl}
                  alt="auction-popular-img"
                />
                <PopularItemContent>
                  <div>
                    <TagWrap isPopular={true}>
                      {item.delivery ? <span>택배</span> : null}
                      {item.direct ? <span>직거래</span> : null}
                      <span>{item.region}</span>
                    </TagWrap>
                    <PopularTitle>{item.title}</PopularTitle>
                  </div>
                  <PopularPriceWrap>
                    <span>현재 입찰가</span>
                    <PopularPrice>{item.startPrice}원</PopularPrice>
                  </PopularPriceWrap>
                </PopularItemContent>
              </PopularItem>
            ))}
          </PopularList>
        </ListContainer>

        {/* 새로운 경매 */}
        <ListContainer>
          <ListHeader>
            <span>따끈따끈 새로 올라온 경매!</span>
            <ListHeaderMore>
              <span>전체 보기</span>
              <img src="maskable.png" alt="all" />
            </ListHeaderMore>
          </ListHeader>

          <NewList>
            {auctionNewList?.map((item) => (
              <NewItem
                key={item.auctionId}
                onClick={() => moveAuctionDetail(item.auctionId)}>
                <img src={item.multiImages[0].imgUrl} alt="auction-new-img" />
                <NewItemContent>
                  <TagWrap>
                    {item.delivery ? <span>택배</span> : null}
                    {item.direct ? <span>직거래</span> : null}
                    <TagRegion>{item.region}</TagRegion>
                  </TagWrap>
                  <NewItemTitle>{item.title}</NewItemTitle>
                  <NewItemPriceWrap>
                    <span>입찰시작가</span>
                    <NewItemPrice>{item.startPrice}원</NewItemPrice>
                  </NewItemPriceWrap>
                </NewItemContent>
              </NewItem>
            ))}
          </NewList>
        </ListContainer>

        {/* 마감임박 경매 */}
        <ListContainer>
          <ListHeader isLast={true}>
            <span>서두르세요! 곧 경매가 끝나요</span>
            <ListHeaderMore>
              <span>전체 보기</span>
              <img src="maskable.png" alt="all" />
            </ListHeaderMore>
          </ListHeader>

          <LastList>
            {auctionLastList?.map((item) => (
              <LastItem
                key={item.auctionId}
                onClick={() => moveAuctionDetail(item.auctionId)}>
                <img src={item.multiImages[0].imgUrl} alt="auction-last-img" />
                <TagWrap>
                  {item.delivery ? <span>택배</span> : null}
                  {item.direct ? <span>직거래</span> : null}
                  <TagRegion>{item.region}</TagRegion>
                </TagWrap>
                <NewItemTitle>{item.title}</NewItemTitle>
                <NewItemPriceWrap>
                  <span>최고입찰가</span>
                  <NewItemPrice>{item.startPrice}원</NewItemPrice>
                </NewItemPriceWrap>
              </LastItem>
            ))}
          </LastList>
        </ListContainer>
      </MainContent>

      <PlusButton />

      <Footer />
    </MainContainer>
  );
};

export default Main;
