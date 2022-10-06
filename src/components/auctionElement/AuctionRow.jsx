import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { clearAuction } from "../../redux/modules/AuctionSlice";
import { useDispatch } from "react-redux";

const AuctionRow = ({ item, index, isAuction }) => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const nowPrice = item.nowPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const startPrice = item?.startPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!item || !item?.auctionId) {
    return <></>;
  }
  return (
    <AuctionContainer
      state={isAuction}
      onClick={() => {
				dispatch(clearAuction());
        navigate(`/auctionDetail/${item?.auctionId}`);
      }}>
      <ImgBox>
        <img src={item.multiImages[0].imgUrl} alt="" />
      </ImgBox>
      <ContentBox>
        <div className="contentNavBox">
          {item.delivery ? <div className="delivery">택배</div> : <></>}
          {item.direct ? <div className="delivery">직거래</div> : <></>}
          <div className="region">{item.region}</div>
        </div>
        <div className="title">{item.content}</div>
        <div className="priceBox">
          {startPrice === nowPrice ? (
            <>
              <div>경매시작가</div>
              <div className="price">{startPrice}원</div>
            </>
          ) : (
            <>
              <div>현재입찰가</div>
              <div className="price">{nowPrice}원</div>
            </>
          )}
        </div>
      </ContentBox>
    </AuctionContainer>
  );
};

const AuctionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  width: 100%;

  margin-bottom: ${(props) => (props.state ? `40px` : `20px`)};
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
      padding: 2px 6px;
      border-radius: 100px;
      background-color: ${(props) => props.theme.colors.Blue1};
      color: ${(props) => props.theme.colors.White};
      font-size: ${(props) => props.theme.fontSizes.sm};
      font-weight: ${(props) => props.theme.fontWeights.medium};
    }
    .region {
      padding: 2px 6px;
      border: 1px solid #4d71ff;
      border-radius: 100px;
      color: ${(props) => props.theme.colors.Blue1};
      font-size: ${(props) => props.theme.fontSizes.sm};
      font-weight: ${(props) => props.theme.fontWeights.medium};
    }
  }
  .title {
    max-height: 25px;
    align-items: center;
    width: 260px;
    overflow: hidden;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    max-lines: 1;
    text-overflow: ellipsis;

    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.normal};
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

export default AuctionRow;
