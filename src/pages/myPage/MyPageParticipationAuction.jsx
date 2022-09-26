// React import
import React, { useEffect, useState } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { _MyPageParticipationAuction } from "../../redux/modules/MyPageSlice";

// Package import
import styled from "styled-components";

// Component import
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";
import Footer from "../../components/footer/Footer";

const MyPageParticipationAuction = () => {
  const dispatch = useDispatch();
  const [isAuction, setIsAuction] = useState(true);

  const {
    myPageParticipation: data,
    loading,
    paging,
    followingItem,
  } = useSelector((state) => state.myPage);

  const [shouldShownData, setShouldShownData] = useState([]);

  const auctionIng = data?.filter(
    (data) => data?.auctionStatus === true
  ).length;
  const auctionDone = data?.filter(
    (data) => data?.auctionStatus === false
  ).length;

  console.log(data);

  useEffect(() => {
    dispatch(_MyPageParticipationAuction());

    if (data && data?.length > 0) {
      data?.map((item, index) => {
        if (isAuction) {
          if (item?.auctionStatus === true) {
            setShouldShownData((prev) => {
              return [...prev, item];
            });
          }
        } else {
          if (item?.auctionStatus === false) {
            setShouldShownData((prev) => {
              return [...prev, item];
            });
          }
        }
      });
    }
    return () => {
      setShouldShownData([]);
    };
  }, [isAuction, JSON.stringify(data)]);

  const handleScroll = (e) => {
    let scrollTopHandler = e.target.scrollTop;
    let clientHeightHandler = e.target.clientHeight;
    let scrollHeightHandler = e.target.scrollHeight;
    if (scrollHeightHandler - clientHeightHandler - scrollTopHandler - 30 < 0) {
      if (!loading) {
        if (followingItem) {
          dispatch(_MyPageParticipationAuction());
        }
      }
    }
  };

  return (
    <MyAuctionLayout>
      <Header back={true} pageName="참여 경매" alarm={true} />
      <AuctionStateNav
        isAuction={isAuction}
        setIsAuction={setIsAuction}
        auctionIng={auctionIng}
        auctionDone={auctionDone}
      />
      <MyAuctionBody>
        <AuctionLayout onScroll={handleScroll}>
          {data.length === 0 ? (
            <None>상품없음</None>
          ) : (
            <>
              {shouldShownData.map((item, index) => {
                return (
                  <React.Fragment key={`${index}_${item.id}`}>
                    <Auction2Container>
                      <ImgBox>{item.profileImgUrl}</ImgBox>
                      <ContentBox>
                        <div className="contentNavBox">
                          <div className="delivery">택배</div>
                          <div className="region">성산구</div>
                        </div>
                        <div className="title">
                          제목은 한 줄만 노출됩니다. 길어진다면 짤라야 겠죠
                        </div>
                        <div className="priceBox">
                          <div>최근입찰가</div>
                          <div className="price">5000원</div>
                        </div>
                      </ContentBox>
                    </Auction2Container>
                    {isAuction ? (
                      <></>
                    ) : (
                      <Action2Btn>채팅방 입장하기</Action2Btn>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}
        </AuctionLayout>
      </MyAuctionBody>
      <Footer />
    </MyAuctionLayout>
  );
};
const None = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MyAuctionLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MyAuctionBody = styled.div`
  display: flex;
  height: calc(100vh - 180px);
  flex-direction: column;
  overflow: scroll;
`;
const AuctionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 20px;
`;
const Auction2Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  margin-bottom: 15px;
`;

const ImgBox = styled.div`
  display: flex;

  img {
    width: 75px;
    height: 75px;
    border-radius: 8px;
  }
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;

  .contentNavBox {
    display: flex;
    flex-direction: row;
    gap: 5px;

    .delivery {
      background-color: #4d71ff;
      color: white;
      border-radius: 100px;
      padding: 2px 6px;
      font-size: 14px;
      font-weight: 500;
    }
    .region {
      border: 1px solid #4d71ff;
      color: #4d71ff;
      border-radius: 100px;
      padding: 2px 6px;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .title {
    width: 100%;
    height: 25px;
    font-size: 18px;
    font-weight: 400;
    align-items: center;

    flex-wrap: nowrap;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
  }
  .priceBox {
    display: flex;
    align-items: center;
    gap: 4px;
    div {
      font-size: 14px;
      font-weight: 400;
      color: #a5a9b6;
    }
    .price {
      font-size: 18px;
      font-weight: 500;
      color: black;
    }
  }
`;
const Action2Btn = styled.button`
  width: 100%;
  box-sizing: border-box;
  height: 30px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid #a5a9b6;
  border-radius: 8px;
`;

export default MyPageParticipationAuction;
