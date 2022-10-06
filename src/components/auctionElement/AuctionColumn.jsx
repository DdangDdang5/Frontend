// React import
import React from "react";

// Redux import
import { useDispatch } from "react-redux";
import { clearAuction } from "../../redux/modules/AuctionSlice";

// Package import
import { useNavigate } from "react-router-dom";

//Style
import {
  AuctionItemContainer,
  AuctionItemWrap,
  ItemContentBody,
  ItemContentFooter,
  ItemContentHeader,
  ItemContentWrap,
  ItemPicture,
  PresentPrice,
  StartPrice,
} from "./AuctionColumn.styled";

const Auction = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nowPrice = data?.nowPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const startPrice = data?.startPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!data || !data?.auctionId) {
    return <></>;
  }
  return (
    <AuctionItemWrap>
      <AuctionItemContainer
        onClick={() => {
          console.log("list to detail");
          dispatch(clearAuction());
          navigate(`/auctionDetail/${data?.auctionId}`);
        }}>
        {data?.multiImages[0]?.imgUrl && (
          <ItemPicture>
            <img src={data.multiImages[0].imgUrl} alt="" />
          </ItemPicture>
        )}
        <ItemContentWrap>
          <ItemContentHeader>
            {data?.direct ? <div>택배</div> : ""}
            {data?.delivery ? <div>직거래</div> : ""}
            <div className="region">{data.region}</div>
          </ItemContentHeader>

          {/* 줄에 표시되는 글자수 제한 */}
          <ItemContentBody>{data?.title}</ItemContentBody>
          <ItemContentFooter>
            {startPrice === nowPrice ? (
              <>
                <StartPrice>경매시작가</StartPrice>
                <PresentPrice>{startPrice}원</PresentPrice>
              </>
            ) : (
              <>
                <StartPrice>현재입찰가</StartPrice>
                <PresentPrice>{nowPrice}원</PresentPrice>
              </>
            )}
          </ItemContentFooter>
        </ItemContentWrap>
      </AuctionItemContainer>
    </AuctionItemWrap>
  );
};

export default Auction;
