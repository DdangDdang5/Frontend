// React import
import React from "react";

// Redux import
import { useDispatch } from "react-redux";
import { clearAuction } from "../../redux/modules/AuctionSlice";

// Package import
import { useNavigate } from "react-router-dom";

//Style
import { AuctionContainer, ImgBox, ContentBox } from "./AuctionRow.styled";

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

export default AuctionRow;
