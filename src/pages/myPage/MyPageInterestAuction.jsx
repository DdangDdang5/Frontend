import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header/Header";
import AuctionStateNav from "../../components/auctionStateNav/AuctionStateNav";
import Footer from "../../components/footer/Footer";
import { _MyPageInterestAuction } from "../../redux/modules/MyPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyPageInterestAuction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    myPageInterest: myPageInterest,
    loading,
    paging,
    followingItem,
  } = useSelector((state) => state?.myPage);
  const data = myPageInterest;
  const [isAuction, setIsAuction] = useState(true);

  console.log(data);

  const [shouldShownData, setShouldShownData] = useState([]);

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
      <MyAuctionBody onScroll={handleScroll}>
        <AuctionLayout>
          {shouldShownData?.length === 0 ? (
            <None>상품없음</None>
          ) : (
            <>
              {shouldShownData?.map((item, index) => {
                return (
                  <React.Fragment key={`${index}_${item.id}`}>
                    <Auction2Container
                      onClick={() => {
                        navigate(`/auctionDetail/${item?.auctionId}`);
                      }}>
                      <ImgBox>
                        <img src={item.multiImages[0].imgUrl} alt="" />
                      </ImgBox>
                      <ContentBox>
                        <div className="contentNavBox">
                          {item.delivery ? (
                            <div className="delivery">택배</div>
                          ) : (
                            <></>
                          )}
                          {item.direct ? (
                            <div className="delivery">직거래</div>
                          ) : (
                            <></>
                          )}
                          <div className="region">{item.region}</div>
                        </div>
                        <div className="title">{item.content}</div>
                        <div className="priceBox">
                          <div>최근입찰가</div>
                          <div className="price">{item.startPrice}</div>
                        </div>
                      </ContentBox>
                    </Auction2Container>
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
  width: 100%;
  gap: 18px;
  margin-bottom: 40px;
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
    align-items: center;
    gap: 5px;

    .delivery {
      background-color: #4d71ff;
      border-radius: 100px;
      padding: 2px 6px;
      color: ${(props) => props.theme.colors.White};
      font-size: ${(props) => props.theme.fontSizes.sm};
      font-weight: ${(props) => props.theme.fontWeights.medium};
    }
    .region {
      border: 1px solid #4d71ff;
      border-radius: 100px;
      padding: 2px 6px;
      color: ${(props) => props.theme.colors.Blue1};
      font-size: ${(props) => props.theme.fontSizes.sm};
      font-weight: ${(props) => props.theme.fontWeights.medium};
    }
  }
  .title {
    width: 100%;
    height: 25px;
    align-items: center;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.normal};

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
      font-size: ${(props) => props.theme.fontSizes.sm};
      font-weight: ${(props) => props.theme.fontWeights.normal};
      color: ${(props) => props.theme.colors.Gray3};
    }
    .price {
      font-size: ${(props) => props.theme.fontSizes.md};
      font-weight: ${(props) => props.theme.fontWeights.medium};
      color: ${(props) => props.theme.colors.Black};
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
export default MyPageInterestAuction;
