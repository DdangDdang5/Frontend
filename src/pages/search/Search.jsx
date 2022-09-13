// React import
import React, { Fragment, useState, useEffect } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { auctionSearchThunk } from "../../redux/modules/SearchSlice";

// Package import
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../shared/Cookie";

// Component import
import Footer from "../../components/footer/Footer";

// Style import
import {
  SearchBox,
  SearchInputGroup,
  SearchInputWrap,
  SearchInput,
  SearchInputIcon,
  SearchFilterTitleSpan,
  SearchFilterGroup,
  SearchFilterWrap,
  SearchItem,
  SearchItemContent,
  SearchTagWrap,
  SearchItemTitle,
  SearchItemPriceWrap,
  SearchItemPrice,
  LoadingWrap,
  Loadingtext,
  SearchItemList,
} from "./Search.styled";

const Search = () => {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.search.data);
  const navigate = useNavigate();
  const token = getCookie("accessToken");
  console.log(searchList);
  const [keyword, setKeyword] = useState("");

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(auctionSearchThunk(keyword));
    }
  };

  useEffect(() => {}, [dispatch]);

  const moveAuctionDetail = (auctionId) => {
    navigate(`/auctionDetail/${auctionId}`);
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
        <SearchFilterGroup>
          <SearchFilterTitleSpan>최근 검색했어요</SearchFilterTitleSpan>
          <SearchFilterWrap>
            <SearchItemList>
              {searchList ? (
                searchList &&
                searchList.map((item) => {
                  return (
                    <SearchItem
                      key={item.auctionId}
                      onClick={() => moveAuctionDetail(item.auctionId)}
                    >
                      <img
                        src={item.multiImages[0].imgUrl}
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
                          <SearchItemPrice>{item.startPrice}원</SearchItemPrice>
                        </SearchItemPriceWrap>
                      </SearchItemContent>
                    </SearchItem>
                  );
                })
              ) : (
                <LoadingWrap>
                  <Loadingtext>검색 결과가 없습니다.</Loadingtext>
                </LoadingWrap>
              )}
            </SearchItemList>
          </SearchFilterWrap>
        </SearchFilterGroup>
      </SearchBox>
      <Footer search={true} />
    </Fragment>
  );
};

export default Search;
