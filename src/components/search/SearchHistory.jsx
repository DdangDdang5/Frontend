// React import
import axios from "axios";
import React, { Fragment, useCallback, useEffect, useState } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";

// Style import
import styled from "styled-components";
import {
  popularSearchThunk,
  recentSearchThunk,
} from "../../redux/modules/SearchSlice";

const SearchHistory = ({ onClearKeyword }) => {
  const dispatch = useDispatch();
  // const [recent, setRecent] = useState("");
  // const [popular, setPopular] = useState("");
  const recentSearch = useSelector((state) =>
    console.log("bumsu", state.search.search)
  );
  const popularSearch = useSelector((state) =>
    console.log("bumsu", state.search.search)
  );

  useEffect(() => {
    dispatch(recentSearchThunk());
    dispatch(popularSearchThunk());
  }, [dispatch]);

  // useEffect(() => {}, [dispatch]);

  // useEffect(() => {
  //   dispatch(popularSearch());
  // },[]);

  // useEffect(() => {
  //   const popularSearchList = async () => {
  //     await axios
  //     .get(`/auction/popular-search`).then((res) => {
  //       setPopular(res.data);
  //     });
  //   };
  //   popularSearchList();
  // }, []);

  // const onsubmitHandler = useCallback(
  //   async (event) => {
  //     event.preventDefault();
  //       dispatch(popularSearchThunk({ searchWord })).then((res) => {
  //         if (res.payload.statusCode === 200) {
  //           return res;
  //         }
  //     },
  //   [searchWord]
  // );
  //   });

  return (
    <Fragment>
      <HistoryBox>
        <HeaderContent>
          <Title>최근 검색했어요</Title>
          <HistoryWrap></HistoryWrap>
          <ClearText onClick={onClearKeyword}>모두 지우기</ClearText>
        </HeaderContent>
        <HeaderContent>
          <Title>지금 인기있어요</Title>
          <ClearText onClick={onClearKeyword}>모두 지우기</ClearText>
          <HistoryWrap>
            <div>{/* <b>{popularSearch[0].searchWord}</b> */}</div>
            {/* {Array.from({ length: 10 }, (_, idx) => (
              <PopularKeyword key={idx}></PopularKeyword>
            ))} */}
            {/* {popularSearch?.map((data, idx) => {
              <PopularKeyword
                key={data}
                searchWord={data.searchWord}
              ></PopularKeyword>;
            })} */}
            
          </HistoryWrap>
        </HeaderContent>
        <HistoryItemList></HistoryItemList>
      </HistoryBox>
    </Fragment>
  );
};

export default SearchHistory;

export const HistoryBox = styled.div`
  padding: 18px;
`;

export const HeaderContent = styled.div`
  position: relative;
  overflow: hidden;
  height: 30vh;
  /* border: 1px solid blue; */
`;

export const Title = styled.span`
  float: left;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.Black};
`;

export const HistoryWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  margin-top: 30px;
  /* border: 1px solid red; */
`;

export const ClearText = styled.span`
  float: right;
  color: ${(props) => props.theme.colors.Gray2};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const HistoryItemList = styled.ul`
  margin: 10px 0;
`;

export const KeywordContainer = styled.li`
  overflow: hidden;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const PopularKeyword = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;
