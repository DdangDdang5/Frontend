import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HeartEmpty, HeartFull } from "../../shared/images";
import { useDispatch, useSelector } from "react-redux";
import {
  auctionDetailData,
  auctionFavorite,
} from "../../redux/modules/AuctionSlice";

const AuctionHeart = ({ params }) => {
  // 좋아요 기능
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auction.auction);
  const favoriteState = useSelector((state) => state.auction.favorite);

  const likeHandler = () => {
    dispatch(auctionFavorite(params?.auctionId));
  };
  useEffect(() => {
    dispatch(auctionDetailData(params?.auctionId));
  }, [JSON.stringify(favoriteState)]);

  return (
    <>
      <div onClick={() => likeHandler()}>
        {data?.favoriteStatus ? <HeartFull /> : <HeartEmpty />}
      </div>
    </>
  );
};

export default AuctionHeart;
