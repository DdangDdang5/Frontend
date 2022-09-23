// React import
import React from "react";
import { createDispatchHook } from "react-redux";

// Package improt
import { useNavigate } from "react-router-dom";

// Style import
import {
  ChatRoomContainer,
  ChatRoomContent,
  ChatRoomInfo,
  ChatRoomMessage,
  ChatRoomMessageWrap,
  ChatRoomNickname,
  ChatRoomProfile,
} from "./ChatRoom.styled";

const ChatRoom = ({ room }) => {
  const navigate = useNavigate();

  const calcTime = (createdAt) => {
    const date = new Date(createdAt);
    return (
      (date.getHours() >= 12 ? "PM " : "AM ") +
      (date.getHours() % 12).toString().padStart(2, 0) +
      ":" +
      date.getMinutes().toString().padStart(2, 0)
    );
  };

  return (
    <ChatRoomContainer
      onClick={() =>
        navigate(`/chat/${room.roomId}`, {
          state: { auctionId: room.auctionId, isDetail: false, title: room.roomName },
        })
      }
    >
      <ChatRoomProfile src={room.multiImages ? room.multiImages[0].imgUrl : "maskable.png"} alt="profile" />
      <ChatRoomContent>
        <ChatRoomInfo>
          <ChatRoomNickname>{room.auctionTitle}</ChatRoomNickname>
          <span>{calcTime(room.createdAt)}</span>
        </ChatRoomInfo>
        <ChatRoomMessageWrap>
          <ChatRoomMessage>
            {room.message
              ? room.message
              : "채팅방 메세지 내용입니다. 두 줄까지 확인 가능합니다."}
          </ChatRoomMessage>
          {/* <ChatRoomAlarm>1</ChatRoomAlarm> */}
        </ChatRoomMessageWrap>
      </ChatRoomContent>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
