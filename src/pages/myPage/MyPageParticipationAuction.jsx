// React import
import React, { useEffect, useState } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import {
  resetList,
  resetPaging,
  _MyPageParticipationAuction,
} from "../../redux/modules/MyPageSlice";

// Package import
import styled from "styled-components";
import { isIOS } from "react-device-detect";

// Component import
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionElement/AuctionStateNav";
import Footer from "../../components/footer/Footer";
import AuctionRow from "../../components/auctionElement/AuctionRow";

const MyPageParticipationAuction = () => {
  const dispatch = useDispatch();
  const [isAuction, setIsAuction] = useState(true);

  const {
    myPageList: data,
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
  useEffect(() => {
    return () => {
      setShouldShownData([]);
      dispatch(resetPaging());
      dispatch(resetList());
    };
  }, []);

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
      {/* <Header back={true} pageName="참여 경매" alarm={true} /> */}
      <Header back={true} pageName="참여 경매" />
      <AuctionStateNav
        isAuction={isAuction}
        setIsAuction={setIsAuction}
        auctionIng={auctionIng}
        auctionDone={auctionDone}
      />
      <MyAuctionBody>
        <AuctionLayout onScroll={handleScroll} isIOS={isIOS}>
          {shouldShownData.map((item, index) => {
            return (
              <React.Fragment key={`${index}_${item.id}`}>
                <AuctionRow item={item} index={index} />
                {/* 일단 추후 업데이트 예정 */}
                {/* {isAuction ? <></> : <ActionBtn>채팅방 입장하기</ActionBtn>} */}
              </React.Fragment>
            );
          })}
        </AuctionLayout>
      </MyAuctionBody>
      <Footer myPage={true} />
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
    props.isIOS ? `calc(100vh - 200px)` : `calc(100vh - 190px)`};
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  ::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
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

export default MyPageParticipationAuction;
