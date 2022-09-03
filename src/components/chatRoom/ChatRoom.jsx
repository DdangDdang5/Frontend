// React import
import React from "react";

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

const ChatRoom = () => {
  return (
    <ChatRoomContainer>
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
