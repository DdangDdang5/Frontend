import styled from "styled-components";

export const SearchBox = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
`;

export const SearchInputGroup = styled.div`
  width: 100%;
  height: 36px;
  position: relative;
  box-sizing: border-box;
  margin-top: 10%;
`;

export const SearchInputWrap = styled.div`
  width: 100%;
  height: 36px;
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 90%;
  height: 36px;
  position: absolute;
  box-sizing: border-box;
  border: none;
  background-color: ${(props) => props.theme.colors.Gray1};
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontSizes.sm};
  padding-left: 35px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.Gray3};
  }
`;

export const SearchInputIcon = styled.div`
  .icon {
    position: absolute;
    color: ${(props) => props.theme.colors.Gray3};
    top: 50%;
    left: 40px;
    transform: translate(-50%, -50%);
  }
`;

export const SearchFilterGroup = styled.div`
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 7%;
`;

export const SearchFilterTitleSpan = styled.span`
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  line-height: 140%;
  margin-left: 5%;
`;

export const SearchFilterWrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const LoadingWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export const Loadingtext = styled.div`
  margin-left: 5%;
`;

export const SearchItemList = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 5%;
  gap: 16px 20px;
`;

export const SearchItem = styled.div`
  width: 165px;
  img {
    width: 100%;
    height: 160px;
    margin-bottom: 10px;
    border-radius: 8px;
  }
`;

export const SearchItemContent = styled.div``;

export const SearchTagWrap = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 4px;
  span {
    padding: 2px 6px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.White};
    background-color: ${(props) => props.theme.colors.Blue1};
    font-size: ${(props) => props.theme.fontSizes.sm};
    border-radius: 100px;
  }
`;

export const SearchItemTitle = styled.div`
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SearchItemPriceWrap = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SearchItemPrice = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
`;
