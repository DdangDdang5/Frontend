// Styled import
import styled from "styled-components";

export const SearchResultContainer = styled.div`
  width: 90%;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  margin-top: 100px;
`;

export const SearchResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const SearchResultLogo = styled.div`
  margin-bottom: 25px;

	img {
		width: 150px;
		height: 150px;
	}
`;

export const SearchResultSpan = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-family: "SpoqaHanSansNeo-Medium";
  text-align: center;
`;
