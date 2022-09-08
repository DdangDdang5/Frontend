import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { auctionItemList } from "../../redux/modules/AuctionListSlice";
import styled from "styled-components";

const SearchCard = (props) => {
  const { searchList } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchListClick = (auctionId) => {
    dispatch(auctionItemList(auctionId));
  };

  const auctionDetail = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <Fragment>
      {searchList && (
        <div className="SearchCardWrapMap">
          <div className="SearchCardImg">
            {searchList.postImgUrl ? (
              <img
                className="searchCardImgThumbnail"
                src={searchList.postImgUrl}
                alt=""
                onClick={() => {
                  auctionDetail(searchList.auctionId);
                }}
              />
            ) : (
              <div
                className="SearchCardImgThumbnailDefaultWrap"
                onClick={() => {
                  auctionDetail(searchList.auctionId);
                }}
              >
                <img
                  className="SearchCardImgThumbnailDefault"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SearchCard;

export const SearchCardWrapMap = styled.div``;

export const SearchCardImg = styled.img``;
