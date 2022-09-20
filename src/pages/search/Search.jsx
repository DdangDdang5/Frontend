// React import
import React, { Fragment, useState, useEffect } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { auctionSearchThunk } from "../../redux/modules/SearchSlice";

// Package import
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Component import
import Footer from "../../components/footer/Footer";
import SearchHistory from "../../components/search/SearchHistory";
import SearchBar from "../../components/search/SearchBar";

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
import { getCookie } from "../../shared/Cookie";

const Search = () => {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.search.data);
  const navigate = useNavigate();
  const token = getCookie("accessToken");
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

  const handleAddKeyword = (keyword) => {
    console.log(keyword);
    const newKeyword = {
      memberId: Date.now(),
      keyword: keyword,
    };
    setKeyword([newKeyword, ...keyword]);
  };

  const handleClearKeyword = () => {
    setKeyword([]);
  };

  return (
    <Fragment>
      <SearchBox>
        {/* <SearchBar onAddKeyword={handleAddKeyword}></SearchBar> */}
        <SearchInputGroup>
          <SearchInputWrap>
            {/* <SearchBar onAddKeyword={handleAddKeyword}></SearchBar> */}
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
          <SearchHistory
            keyword={keyword}
            onClearKeyword={handleClearKeyword}
          />
          <SearchFilterTitleSpan>{/* 최근 검색했어요 */}</SearchFilterTitleSpan>
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
                  <Loadingtext>{/* 검색 결과가 없습니다. */}</Loadingtext>
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
