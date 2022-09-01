// Package import
import styled from "styled-components";

export const MainContainer = styled.div`
	width: 100vw;
	height: 100vh;
`;

export const MainContent = styled.div`
	width: 100%;
	background-color: aliceblue;

	position: absolute;
	top: 70px;
	bottom: 70px;
`;

export const Banner = styled.div`
	height: 25%;
	background-color: #dedede;
	font-size: 14px;

	position: relative;
`;

export const BannerContent = styled.div`
	width: 65%;
	/* background-color: aqua; */

	position: absolute;
	top: 20px;
	left: 20px;

	display: flex;
	flex-direction: column;
`;

export const BannerTitle = styled.span`
	font-size: 20px;
	margin-top: 5px;
`;

export const BannerPriceWrap = styled.div`
	/* background-color: aqua; */

	position: absolute;
	bottom: 20px;
	right: 20px;
`;

export const BannerPrice = styled.span`
	font-weight: bold;
	font-size: 24px;
`;