// React import
import React from "react";

// Package improt
import { useNavigate } from "react-router-dom";

// Style import
import {
	ChatRoomAlarm,
  ChatRoomContainer,
  ChatRoomContent,
  ChatRoomInfo,
  ChatRoomMessage,
  ChatRoomMessageWrap,
  ChatRoomNickname,
  ChatRoomProfile,
} from "./ChatRoom.styled";

const ChatRoom = ({ roomId }) => {
	const navigate = useNavigate();
	console.log(roomId);

  return (
    <ChatRoomContainer onClick={() => navigate(`/chat/${roomId}`)}>
      <ChatRoomProfile src="maskable.png" alt="profile" />
      <ChatRoomContent>
        <ChatRoomInfo>
          <ChatRoomNickname>nickname</ChatRoomNickname>
          <span>오후 2:30</span>
        </ChatRoomInfo>
				<ChatRoomMessageWrap>
	        <ChatRoomMessage>
	          채팅방 메세지 내용입니다. 두 줄까지 확인 가능합니다.
	        </ChatRoomMessage>
					<ChatRoomAlarm>1</ChatRoomAlarm>
				</ChatRoomMessageWrap>
      </ChatRoomContent>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
