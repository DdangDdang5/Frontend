// Styled import
import styled from "styled-components";

export const SearchResultContainer = styled.div`
  width: 100%;
  margin-left: 50%;
  margin-top: 70%;
  left: 2%;
  right: 2.5%;
  `;

export const SearchResultBox = styled.div`
  box-sizing: border-box;
  gap: 5px;
`;

export const SearchResultLogo = styled.div`
  margin-bottom: 25px;
`
export const SearchResultSpan = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-family: "SpoqaHanSansNeo-Medium";
  text-align: center;
`;
