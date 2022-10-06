// Package import
import styled from "styled-components";

export const ChatListContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const ChatRoomList = styled.div`
  width: 100%;
	margin-top: 10px;

  position: absolute;
  top: 70px;
  bottom: ${(props) => props.isIOS ? "80px" : "70px"};

	overflow-y: scroll;
`;

export const NoChatRoom = styled.div`
	height: 90%;
	width: 80%;
	margin: auto;
	text-align: center;

	color: ${(props) => props.theme.colors.Gray3};
	font-size: ${(props) => props.theme.fontSizes.md};
	font-weight: ${(props) => props.theme.fontWeights.normal};
	line-height: 140%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	img {
		width: 150px;
		height: 150px;
		margin-bottom: 34px;
	}
`;

export const NoChatRoomTitle = styled.span`
	margin-bottom: 8px;
	color: ${(props) => props.theme.colors.Black} !important;
`;