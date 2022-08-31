// React import
import React from "react";

// Style import
import {
  ChatRoomContainer,
  ChatRoomContent,
  ChatRoomInfo,
  ChatRoomMessage,
  ChatRoomProfile,
} from "./ChatRoom.styled";

const ChatRoom = () => {
  return (
    <ChatRoomContainer>
      <ChatRoomProfile src="maskable.png" alt="profile" />
      <ChatRoomContent>
        <ChatRoomInfo>
          <span>username</span>
          <span>place</span>
          <span>time</span>
        </ChatRoomInfo>
        <ChatRoomMessage>
          message message message message message message
        </ChatRoomMessage>
      </ChatRoomContent>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
