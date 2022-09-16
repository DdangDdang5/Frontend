import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SearchHistory = ({ keyword, onClearKeyword }) => {
    const searchList = useSelector((state) => state.search.data);

  if (keyword.length === 0) {
    return <HistoryContainer>최근 검색된 기록이 없습니다.</HistoryContainer>;
  }
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <ClearText onClick={onClearKeyword}>전체삭제</ClearText>
      </HeaderContainer>
      <ListContainer>
        {searchList ? (
            searchList && searchList).map(({ memberId, text }) => {
          return (
            <KeywordContainer key={memberId}>
              <Keyword>{text}</Keyword>
            </KeywordContainer>
          );
        }) : (
            "검색결과가 없습니다"
            // <LoadingWrap>
            //       <Loadingtext>검색 결과가 없습니다.</Loadingtext>
            //     </LoadingWrap>
        )}
      </ListContainer>
    </HistoryContainer>
  );
};

export default SearchHistory;

export const HistoryContainer = styled.div`
  padding: 18px;
`;
export const HeaderContainer = styled.div`
  overflow: hidden;
`;
export const Title = styled.span`
  float: left;
  font-weight: 400;
  color: #666;
`;
export const ClearText = styled.span`
  float: right;
  color: #a7a7a7;
`;

export const ListContainer = styled.ul`
  margin: 10px 0;
`;

//&는 자기 자신을 나타냄
//즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
export const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Keyword = styled.span`
  font-size: 18px;
  font-weight: 400;
`;
