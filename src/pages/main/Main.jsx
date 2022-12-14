// React import
import React, { useEffect, useState } from "react";

// Redux import
import {
  getAuctionDeadlineList,
  getAuctionHitList,
  getAuctionNewList,
} from "../../redux/modules/AuctionListSlice";
import { clearAuction } from "../../redux/modules/AuctionSlice";
import { clearMode } from "../../redux/modules/ModalSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isIOS } from "react-device-detect";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SwipeImage from "../../components/swipeImage/SwipeImage";
import AuctionCategoryList from "../../components/auctionCategory/AuctionCategoryList";
import AuctionRow from "../../components/auctionElement/AuctionRow";

// Page & Element & Shared import
import Loading from "../etcPage/Loading";
import PlusButton from "../../elements/button/PlusButton";
import { Next } from "../../shared/images";

// Style import
import {
  BannerContainer,
  LastItem,
  LastList,
  ListContainer,
  ListHeader,
  ListHeaderMore,
  MainContainer,
  MainContent,
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

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const auctionAllList = useSelector((state) => state.auctionList.auctionList);

  const auctionHitList = useSelector(
    (state) => state.auctionList.auctionHitList,
  );
  const auctionNewList = useSelector(
    (state) => state.auctionList.auctionNewList,
  );
  const auctionDeadlineList = useSelector(
    (state) => state.auctionList.auctionDeadlineList,
  );

  const getAuctionData = async () => {
    await dispatch(getAuctionHitList());
    await dispatch(getAuctionNewList());
    await dispatch(getAuctionDeadlineList());
    await setLoading(false);
  };

  useEffect(() => {
    getAuctionData();
  }, [JSON.stringify(auctionAllList)]);

	// ?????? ???????????? ??????
  const moveAuctionDetail = (auctionId) => {
    dispatch(clearAuction());
    navigate(`/auctionDetail/${auctionId}`);
  };

	// ?????? ?????? ???????????? ??????
  const moveAuctionList = () => {
    dispatch(clearMode());
    navigate("/auctionList");
  };

  return (
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header logo={true} search={true} />

          <MainContent isIOS={isIOS}>
            {/* ?????? */}
            <BannerContainer>
              {/* ???????????? ?????? ?????? */}

              <SwipeImage
                isMain={true}
                height="100%"
                width="100%"
              />
            </BannerContainer>

            {/* ???????????????, ????????? TOP 6 */}
            <AuctionCategoryList isCategory={true} />
            <AuctionCategoryList isCategory={false} />

            {/* ?????? ?????? */}
            {auctionHitList?.length > 0 && (
              <ListContainer>
                <ListHeader>?????? ?????? ?????? ???!</ListHeader>

                <PopularList>
                  {auctionHitList?.map((item, idx) => (
                    <PopularItem
                      key={item.auctionId}
                      onClick={() => moveAuctionDetail(item.auctionId)}
                    >
                      <img
                        src={item.multiImages[0]?.imgUrl}
                        alt="auction-popular-img"
                      />
                      <PopularItemContent idx={idx}>
                        <div>
                          <TagWrap isPopular={true} idx={idx}>
                            {item.delivery ? <span>??????</span> : null}
                            {item.direct ? <span>?????????</span> : null}
                            <span>{item.region}</span>
                          </TagWrap>
                          <PopularTitle>{item.title}</PopularTitle>
                        </div>
                        <PopularPriceWrap>
                          <span>?????? ?????????</span>
                          <PopularPrice>
                            {item.nowPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            ???
                          </PopularPrice>
                        </PopularPriceWrap>
                      </PopularItemContent>
                    </PopularItem>
                  ))}
                </PopularList>
              </ListContainer>
            )}

            {/* ????????? ?????? */}
            <ListContainer>
              <ListHeader>
                <span>???????????? ?????? ????????? ??????!</span>
                <ListHeaderMore onClick={moveAuctionList}>
                  <span>?????? ??????</span>
                  <Next />
                </ListHeaderMore>
              </ListHeader>

              <NewList>
                {auctionNewList?.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <AuctionRow item={item} index={idx} />
                  </React.Fragment>
                ))}
              </NewList>
            </ListContainer>

            {/* ???????????? ?????? */}
            {auctionDeadlineList?.length > 0 && (
              <ListContainer isLast={true}>
                <ListHeader isLast={true}>
                  <span>???????????????! ??? ????????? ?????????</span>
                  <ListHeaderMore onClick={moveAuctionList}>
                    <span>?????? ??????</span>
                    <Next />
                  </ListHeaderMore>
                </ListHeader>

                <LastList>
                  {auctionDeadlineList?.map((item) => (
                    <LastItem
                      key={item.auctionId}
                      onClick={() => moveAuctionDetail(item.auctionId)}
                    >
                      <img
                        src={item.multiImages[0]?.imgUrl}
                        alt="auction-last-img"
                      />
                      <TagWrap>
                        {item.delivery ? <span>??????</span> : null}
                        {item.direct ? <span>?????????</span> : null}
                        <TagRegion>{item.region}</TagRegion>
                      </TagWrap>
                      <NewItemTitle>{item.title}</NewItemTitle>
                      <NewItemPriceWrap>
                        <span>???????????????</span>
                        <NewItemPrice>
                          {item.nowPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          ???
                        </NewItemPrice>
                      </NewItemPriceWrap>
                    </LastItem>
                  ))}
                </LastList>
              </ListContainer>
            )}
          </MainContent>

          <PlusButton />

          <Footer home={true} />
        </>
      )}
    </MainContainer>
  );
};

export default Main;
