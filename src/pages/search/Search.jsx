// React import
import React, { Fragment, useState, useEffect } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { auctionSearchThunk } from "../../redux/modules/SearchSlice";

// Package import
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Component & Shared import
import Footer from "../../components/footer/Footer";
import SearchHistory from "../../components/search/SearchHistory";
import SearchResult from "../../components/search/SearchResult";
import { getCookie } from "../../shared/Cookie";

// Style import
import {
  SearchBox,
  SearchInputGroup,
  SearchInputWrap,
  SearchInput,
  SearchInputIcon,
  SearchFilterGroup,
  SearchFilterWrap,
  SearchItem,
  SearchItemContent,
  SearchTagWrap,
  SearchItemTitle,
  SearchItemPriceWrap,
  SearchItemPrice,
  SearchItemList,
} from "./Search.styled";
import { NoSearch } from "../../shared/images";
import styled from "styled-components";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchList = useSelector((state) => state.search.data);
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const token = getCookie("accessToken");

  // 검색 Enter
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (keyword === "") {
        window.alert("검색어를 입력해주세요.");
      } else {
        setIsSearch(true);
        dispatch(auctionSearchThunk(keyword));
      }
    } else {
      setIsSearch(false);
    }
  };

  useEffect(() => {}, [dispatch]);

  // 경매 상세로 페이지 이동
  const moveAuctionDetail = (auctionId) => {
    navigate(`/auctionDetail/${auctionId}`);
  };

  // 검색어 모두 지우기
  const handleClearKeyword = () => {
    setKeyword([]);
  };

  return (
    <Fragment>
      <SearchBox>
        <SearchInputGroup>
          <SearchInputWrap>
            <SearchInput
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="검색어를 입력해주세요."
              onKeyDown={(e) => onKeyPress(e)}
            />
            <SearchInputIcon>
              <IoSearchOutline className="icon" />
            </SearchInputIcon>
          </SearchInputWrap>
        </SearchInputGroup>
        <>
          <SearchFilterGroup>
            {searchList?.length > 0 ? (
              searchList.map((item) => {
                return (
                  <SearchFilterWrap>
                    <SearchItemList>
                      <SearchItem
                        key={item.auctionId}
                        onClick={() => moveAuctionDetail(item.auctionId)}
                      >
                        <img
                          src={item?.multiImages[0]?.imgUrl}
                          alt="auction-popular-img"
                        />
                        <SearchItemContent>
                          <SearchTagWrap>
                            {item.delivery ? <span>택배</span> : null}
                            {item.direct ? <span>직거래</span> : null}
                            <span>{item.region}</span>
                          </SearchTagWrap>
                          <SearchItemTitle>{item.title}</SearchItemTitle>
                          <SearchItemPriceWrap>
                            <span>최고입찰가</span>
                            <SearchItemPrice>
                              {item.startPrice}원
                            </SearchItemPrice>
                          </SearchItemPriceWrap>
                        </SearchItemContent>
                      </SearchItem>
                    </SearchItemList>
                  </SearchFilterWrap>
                );
              })
            ) : isSearch ? (
              <div>
               <SearchResult/>
              </div>
            ) : (
              <SearchHistory
              // onClearKeyword={handleClearKeyword}
              />
            )}
            {console.log(isSearch)}
          </SearchFilterGroup>
        </>
      </SearchBox>
      <Footer search={true} />
    </Fragment>
  );
};

export default Search;