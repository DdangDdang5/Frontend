import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";
import Footer from "../../components/footer/Footer";
import AuctionRow from "../../components/auction/AuctionRow";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { _MyPageInAuction } from "../../redux/modules/MyPageSlice";

function MyPageMyAuction() {
  const dispatch = useDispatch();
  const [isAuction, setIsAuction] = useState(true);
  const {
    myPageIn: myPageInData,
    loading,
    paging,
    followingItem,
  } = useSelector((state) => state.myPage);
  console.log(myPageInData);

  const [shouldShownData, setShouldShownData] = useState([]);

  const auctionIng = myPageInData?.filter(
    (myPageInData) => myPageInData?.auctionStatus === true
  ).length;
  const auctionDone = myPageInData?.filter(
    (myPageInData) => myPageInData?.auctionStatus === false
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

    if (myPageInData && myPageInData.length > 0) {
      myPageInData?.map((item, index) => {
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
  }, [isAuction, JSON.stringify(myPageInData)]);

  if (!myPageInData) {
    return <></>;
  }
  return (
    <MyAuctionLayout>
      <Header back={true} pageName="나의 경매" alarm={true} />
      <AuctionStateNav
        isAuction={isAuction}
        setIsAuction={setIsAuction}
        auctionIng={auctionIng}
        auctionDone={auctionDone}
      />
      {shouldShownData?.length === 0 ? (
        <None>상품없음</None>
      ) : (
        <>
          <MyAuctionBody onScroll={handleScroll}>
            {shouldShownData?.map((item, index) => {
              return (
                <AuctionRow
                  isAuction={isAuction}
                  key={`${item.auctionId}-${index}-${item.title}`}
                  data={item}
                />
              );
            })}
          </MyAuctionBody>
        </>
      )}

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
  height: calc(100vh - 180px);
  flex-direction: column;
  overflow: scroll;
`;
const None = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default MyPageMyAuction;
