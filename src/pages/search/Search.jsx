// React import
import React, { Fragment, useState, useEffect } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import {
  auctionSearchThunk,
  clearSearch,
} from "../../redux/modules/SearchSlice";

// Package import
import { useNavigate } from "react-router-dom";

// Component & Element & Shared import
import Footer from "../../components/footer/Footer";
import SearchHistory from "../../components/search/SearchHistory";
import SearchResult from "../../components/search/SearchResult";
import { getCookie } from "../../shared/Cookie";
import { SearchImg } from "../../shared/images";
import PageModal from "../../components/modal/PageModal";

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

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendEvent, setSendEvent] = useState(false);

  const searchList = useSelector((state) => state.search.data);
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const token = getCookie("accessToken");

  // 검색 Enter
  const onClickSendEvent = (e) => {
    if (e.key === "Enter") {
      if (keyword === "") {
        setSendEvent(true);
      } else {
        setIsSearch(true);
        dispatch(auctionSearchThunk(keyword));
      }
    } else {
      setIsSearch(false);
    }
  };

  useEffect(() => {
    dispatch(clearSearch());
  }, []);

  useEffect(() => {}, [dispatch]);

  // 경매 상세페이지로 이동
  const moveAuctionDetail = (auctionId) => {
    navigate(`/auctionDetail/${auctionId}`);
  };

  return (
    <Fragment>
      <div>
        <SearchBox>
          <SearchInputGroup>
            <SearchInputWrap>
              <SearchInput
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="검색어를 입력해주세요."
                onKeyDown={(e) => onClickSendEvent(e)}
              />
              <SearchInputIcon>
                <SearchImg />
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
                  <SearchResult />
                </div>
              ) : (
                <SearchHistory setKeyword={setKeyword} />
              )}
            </SearchFilterGroup>
          </>
        </SearchBox>
        <Footer search={true} />
      </div>

      {/* 메뉴 모달의 옵션 클릭 모달 */}
      <PageModal
        visible={sendEvent}
        setVisible={setSendEvent}
        modalText="검색어를 입력해주세요!"
      ></PageModal>
    </Fragment>
  );
};

export default Search;
