import { createGlobalStyle } from "styled-components";

export const FontBold = createGlobalStyle`
	@font-face {
	  font-family: "SpoqaHanSansNeo-Bold";
	  src: local("SpoqaHanSansNeo-Bold"),
			url("./SpoqaHanSansNeo-Bold.otf") format('truetype');
	}
`;

export const FontLight = createGlobalStyle`
	@font-face {
	  font-family: "SpoqaHanSansNeo-Light";
	  src: url("./SpoqaHanSansNeo-Light.otf");
	}
`;

export const FontMedium = createGlobalStyle`
	@font-face {
	  font-family: "SpoqaHanSansNeo-Medium";
	  src: url("./SpoqaHanSansNeo-Medium.otf");
	}
`;

export const FontRegular = createGlobalStyle`
	/* @font-face {
	  font-family: "SpoqaHanSansNeo-Regular";
	  src: url("./SpoqaHanSansNeo-Regular.otf") format("otf");
	} */
	@font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
	}
`;

export const FontThin = createGlobalStyle`
	@font-face {
	  font-family: "SpoqaHanSansNeo-Thin";
	  src: url("./SpoqaHanSansNeo-Thin.otf");
	}
`;

export const FontEvent = createGlobalStyle`
	@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
	}
`;
