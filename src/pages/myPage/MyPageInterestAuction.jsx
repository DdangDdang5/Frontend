// React import
import React, { useEffect, useState } from "react";

// Redux import
import { _MyPageInterestAuction } from "../../redux/modules/MyPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Package import
import styled from "styled-components";
import { isIOS13 } from "react-device-detect";

// Component import
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";
import Footer from "../../components/footer/Footer";
import AuctionBox from "../../components/auction/AuctionBox";

const MyPageInterestAuction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    myPageInterest: data,
    loading,
    paging,
    followingItem,
  } = useSelector((state) => state.myPage);
  console.log("관심 데이터", loading, paging, followingItem);
  const [isAuction, setIsAuction] = useState(true);

  const [shouldShownData, setShouldShownData] = useState([]);

  const auctionIng = data?.filter((data) => data.auctionStatus === true).length;
  const auctionDone = data?.filter(
    (data) => data.auctionStatus === false
  ).length;

  const handleScroll = (e) => {
    let scrollTopHandler = e.target.scrollTop;

    let clientHeightHandler = e.target.clientHeight;
    let scrollHeightHandler = e.target.scrollHeight;
    console.log(scrollHeightHandler);
    if (scrollHeightHandler - clientHeightHandler - scrollTopHandler - 30 < 0) {
      if (!loading) {
        if (followingItem) {
          dispatch(_MyPageInterestAuction());
        }
      }
    }
  };

  useEffect(() => {
    dispatch(_MyPageInterestAuction());

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

  return (
    <MyAuctionLayout>
      <Header back={true} pageName="관심 경매" alarm={true} />
      <AuctionStateNav
        isAuction={isAuction}
        setIsAuction={setIsAuction}
        auctionIng={auctionIng}
        auctionDone={auctionDone}
      />
      <MyAuctionBody onScroll={handleScroll} isIOS13={isIOS13}>
        <AuctionLayout>
          {shouldShownData?.length === 0 ? (
            <None>상품없음</None>
          ) : (
            <>
              {shouldShownData?.map((item, index) => {
                return (
                  <React.Fragment key={`${index}_${item.id}`}>
                    <AuctionBox
                      item={item}
                      index={index}
                      isAuction={isAuction}
                    />
                    {isAuction ? <></> : <ActionBtn>채팅방 입장하기</ActionBtn>}
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

const MyAuctionLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const MyAuctionBody = styled.div`
  display: flex;
  height: ${(props) =>
    props.isIOS13 ? `calc(100vh - 200px)` : `calc(100vh - 190px)`};
  flex-direction: column;
  overflow: scroll;
`;
const AuctionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 20px;
  height: 100%;
`;

const None = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ActionBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 40px;
  margin-bottom: 32px;
  background-color: white;
  border: 1px solid #4d71ff;
  border-radius: 8px;
  color: #4d71ff;
`;

export default MyPageInterestAuction;
