// React import
import React, { Fragment } from "react";

// Redux import
import { useSelector } from "react-redux";

// Style import
import styled from "styled-components";
import { NoSearch } from "../../shared/images";

const SearchHistory = ({ keyword, onClearKeyword }) => {
  const searchList = useSelector((state) => state.search.data);

  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색했어요</Title>
        <ClearText onClick={onClearKeyword}>모두 지우기</ClearText>
      </HeaderContainer>
      <ListContainer>
        {searchList ? (
          (searchList && searchList).map(({ memberId, text }) => {
            return (
              <KeywordContainer key={memberId}>
                <Keyword>{text}</Keyword>
              </KeywordContainer>
            );
          })
        ) : (
          <NoSearch />
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
  font-weight: ${(props) => props.theme.fontWeights.normal};
  color: ${(props) => props.theme.colors.Black};
`;

export const ClearText = styled.span`
  float: right;
  color: ${(props) => props.theme.colors.Gray2};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSizes.sm};
`;

export const ListContainer = styled.ul`
  margin: 10px 0;
`;

export const KeywordContainer = styled.li`
  overflow: hidden;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Keyword = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;
