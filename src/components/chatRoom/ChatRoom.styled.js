// Package import
import styled from "styled-components";

export const ChatRoomContainer = styled.div`
  padding: 10px 20px;
  /* border-bottom: 1px solid gray; */

  display: flex;
  align-items: center;
`;

export const ChatRoomProfile = styled.img`
  width: 73px;
  height: 73px;
	margin-right: 20px;
  border-radius: 8px;
`;

export const ChatRoomContent = styled.div`
  width: 70%;
	font-size: 14px;
`;

export const ChatRoomInfo = styled.div`
  display: flex;
	justify-content: space-between;
  gap: 10px;
`;

export const ChatRoomNickname = styled.div`
	font-size: 16px;
	font-weight: bold;
`;

export const ChatRoomMessageWrap = styled.div`
	width: 100%;
	margin-top: 4px;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const ChatRoomMessage = styled.span`
	width:70%;
	font-size: 16px;

  display: -webkit-box;
  overflow: hidden;

	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

export const ChatRoomAlarm = styled.div`
	width: 20px;
	height: 20px;

	text-align: center;
	font-weight: bold;
	
	color: white;
	background-color: gray;
	border-radius: 10px;
`;