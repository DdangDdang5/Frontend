// Package import
import styled from "styled-components";

export const ChatContainer = styled.div``;

export const ChatBox = styled.div`
	width: 100%;
	position: absolute;
	top: 70px;
	bottom: 70px;
	background-color: aliceblue;
`;

export const MemberList = styled.div``;

export const ChatContent = styled.div`
	height: 100%;
	background-color: green;
`;

export const ChatMessage = styled.ul`
	
`;

export const SendBtn = styled.button``;

export const Member = styled.li``;

export const Message = styled.li``;

export const MessageData = styled.div``;

export const SendMessageWrap = styled.div`
	width: calc(100% - 40px);
	padding: 20px;

	position: absolute;
	bottom: 0;

	display: flex;
	justify-content: space-between;

	img {
		width: 40px;
		height: 40px;
	}
`;

export const SendMessage = styled.div``;

export const MessageInput = styled.input``;
