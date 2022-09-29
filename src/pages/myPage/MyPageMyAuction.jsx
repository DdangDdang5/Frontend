// React import
import React, { useEffect, useState } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import {
  resetList,
  resetPaging,
  _MyPageInAuction,
} from "../../redux/modules/MyPageSlice";

// Package import
import styled from "styled-components";
import { isIOS } from "react-device-detect";

// Component import
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionBody/AuctionStateNav";
import Footer from "../../components/footer/Footer";
import AuctionRow from "../../components/auctionBody/AuctionRow";

function MyPageMyAuction() {
  const dispatch = useDispatch();
  const [isAuction, setIsAuction] = useState(true);
  const {
    myPageList: data,
    loading,
    paging,
    followingItem,
  } = useSelector((state) => state.myPage);

  console.log(data);

  const [shouldShownData, setShouldShownData] = useState([]);

  // console.log("내 옥션 데이터", data);
  const auctionIng = data?.filter(
    (data) => data?.auctionStatus === true
  ).length;
  const auctionDone = data?.filter(
    (data) => data?.auctionStatus === false
  ).length;

  const handleScroll = (e) => {
    let scrollTopHandler = e.target.scrollTop;
    let clientHeightHandler = e.target.clientHeight;
    let scrollHeightHandler = e.target.scrollHeight;
    if (scrollHeightHandler - clientHeightHandler - scrollTopHandler - 30 < 0) {
      if (!loading) {
        if (followingItem) {
          dispatch(_MyPageInAuction());
        }
      }
    }
  };

  useEffect(() => {
    dispatch(_MyPageInAuction());

    if (data && data.length > 0) {
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

  // const button =()=>{
  //   switch()
  // }

  if (!data) {
    return <></>;
  }
  return (
    <MyAuctionLayout>
      {/* <Header back={true} pageName="나의 경매" alarm={true} /> */}
      <Header back={true} pageName="나의 경매" />
      <AuctionStateNav
        isAuction={isAuction}
        setIsAuction={setIsAuction}
        auctionIng={auctionIng}
        auctionDone={auctionDone}
      />
      <MyAuctionBody onScroll={handleScroll} isIOS={isIOS}>
        <AuctionLayout>
          {shouldShownData?.map((item, index) => {
            return (
              <React.Fragment key={`${index}_${item.id}`}>
                <AuctionRow item={item} index={index} isAuction={isAuction} />
                {isAuction ? <></> : <ActionBtn>채팅방 입장하기</ActionBtn>}
              </React.Fragment>
            );
          })}
        </AuctionLayout>
      </MyAuctionBody>
      <Footer />
    </MyAuctionLayout>
  );
}

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
  background-color: ${(props) => props.theme.colors.White};
  border: 1px solid ${(props) => props.theme.colors.Blue1};
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.fontWeights};
  color: ${(props) => props.theme.colors.Blue1};
`;

export default MyPageMyAuction;
