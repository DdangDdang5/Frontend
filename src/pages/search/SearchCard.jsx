// React import
import React, { useState, useEffect, Fragment }  from "react";

// Redux import
import { useDispatch } from "react-redux";

// Package import
import { useNavigate } from "react-router-dom";

// Style import
import styled from "styled-components";

const SearchCard = (props) => {
  const { searchList } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                }}
              />
            ) : (
              <div
                className="SearchCardImgThumbnailDefaultWrap"
                onClick={() => {
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
