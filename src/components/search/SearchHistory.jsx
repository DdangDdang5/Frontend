// React import
import React, { Fragment, useEffect } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import {
  popularSearchThunk,
  recentSearchThunk,
} from "../../redux/modules/SearchSlice";

// Style import
import {
  HistoryBox,
  HeaderContent,
  Title,
  RecentKeywordWrap,
  RecentKeyword,
  PopularKeywordWrap,
  PopularNum,
  PopularKeyword,
} from "./SearchHistory.styled";

const SearchHistory = ({ onClearKeyword }) => {
  const dispatch = useDispatch();
  const recentSearch = useSelector((state) => state.search.recentSearch);
  const popularSearch = useSelector((state) => state.search.popularSearch);
  console.log(recentSearch);
  console.log(popularSearch)
  useEffect(() => {
    dispatch(recentSearchThunk());
    dispatch(popularSearchThunk());
  }, [dispatch]);

  return (
    <Fragment>
      <HistoryBox>
        <HeaderContent>
          <Title>최근 검색했어요</Title>
          <RecentKeywordWrap>
            {recentSearch?.map((item, idx) => (
              <RecentKeyword>
                <div key={idx}>
                  <div>{item.searchWord}</div>
                </div>
              </RecentKeyword>
            ))}
          </RecentKeywordWrap>
        </HeaderContent>
        <HeaderContent>
          <Title>지금 인기있어요</Title>
          <PopularKeywordWrap>
            {popularSearch?.map((item, idx) => (
              <div key={idx}>
                <PopularNum>
                  <div>{idx + 1}</div>
                </PopularNum>
                <PopularKeyword>
                  <div>{item.searchWord}</div>
                </PopularKeyword>
              </div>
            ))}
          </PopularKeywordWrap>
        </HeaderContent>
      </HistoryBox>
    </Fragment>
  );
};

export default SearchHistory;
