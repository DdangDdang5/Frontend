import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { _MyPageInterestAuction } from "../../redux/modules/MyPageSlice";
import { useNavigate } from "react-router-dom";

const AuctionRow = ({ isAuction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.myPage.myPage);
  const [shouldShownData, setShouldShownData] = useState([]);

  useEffect(() => {
    dispatch(_MyPageInterestAuction());
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

  const Img = (
    <img src="https://t1.daumcdn.net/cfile/blog/231A3A3A557C6B3D0A" alt="" />
  );

  return (
    <AuctionLayout>
      {shouldShownData.map((item, index) => {
        return (
          <React.Fragment key={`${index}_${item.id}`}>
            <div
              onClick={() => {
                navigate(`/auctionDetail/${item?.auctionId}`);
              }}>
              <Auction2Container>
                <ImgBox>{Img}</ImgBox>
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
                <Action2Btn>거래 진행중</Action2Btn>
              ) : (
                <Action2Btn>거래 완료</Action2Btn>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </AuctionLayout>
  );
};

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 30px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid #a5a9b6;
  border-radius: 8px;
  color: black;
`;
export default AuctionRow;
