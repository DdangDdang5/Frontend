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
	height: 100%;

	font-size: ${(props) => props.theme.fontSizes.xl};
	font-weight: ${(props) => props.theme.fontWeights.bold};

	display: flex;
	justify-content: center;
	align-items: center;
`;
