import styled from "styled-components";

export const SearchBox = styled.div`
  width: 100%;
  padding-top: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchInputGroup = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  margin-top: 5%;
`;

export const SearchInputWrap = styled.div`
  width: 100%;
  height: 52px;
  padding: 4px 20px 4px 20px;
  gap: 10px;
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 90%;
  height: 44px;
  position: absolute;
  box-sizing: border-box;
  border: none;
  border-radius: 8px;
  gap: 8px;
  padding: 12px 0px 12px 9px;
  background-color: ${(props) => props.theme.colors.Gray1};
  font-size: ${(props) => props.theme.fontSizes.sm};
  padding-left: 40px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.Gray3};
  }
`;

export const SearchInputIcon = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 55%;
  transform: translate(-50%, -50%);
  left: 10%;
  .icon {
    color: ${(props) => props.theme.colors.Gray3};
  }
`;

export const SearchFilterGroup = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  margin-top: 36px;
  align-items: center;
  justify-content: center;
`;

export const SearchFilterWrap = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
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
    font-weight: ${(props) => props.theme.fontWeights.bold};
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

export const SearchResultContainer = styled.div`
  width: 100%;
`;

export const SearchResultBox = styled.div`
  position: absolute;
  box-sizing: border-box;
  left: 2%;
  right: 2.5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 45%;
  gap: 5px;
`;

export const SearchResultLogo = styled.div`
  margin-bottom: 25px;
`;
export const SearchResultSpan = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-family: "SpoqaHanSansNeo-Medium";
  text-align: center;
`;
