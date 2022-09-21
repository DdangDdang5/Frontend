// Styled import
import styled from "styled-components";

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
`
export const SearchResultSpan = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-family: "SpoqaHanSansNeo-Medium";
  text-align: center;
`;
