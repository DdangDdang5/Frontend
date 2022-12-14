// React import
import React from "react";

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
  ChatRoomTime,
} from "./ChatRoom.styled";

const ChatRoom = ({ room }) => {
  const navigate = useNavigate();

	// 채팅방 마지막 메시지 시간 계산
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
      onClick={() => {
        navigate(`/chat/${room.roomId}`, {
          state: {
            auctionId: room.auctionId,
            isDetail: false,
            title: room.auctionTitle,
          },
        });
        window.location.reload();
      }}
    >
      <ChatRoomProfile
        src={room.multiImages ? room.multiImages[0].imgUrl : "maskable.png"}
        alt="profile"
      />
      <ChatRoomContent>
        <ChatRoomInfo>
          <ChatRoomNickname>{room.auctionTitle}</ChatRoomNickname>
          <ChatRoomTime>{calcTime(room.lastMessageTime)}</ChatRoomTime>
        </ChatRoomInfo>
        <ChatRoomMessageWrap>
          <ChatRoomMessage>{room.message ? room.message : ""}</ChatRoomMessage>
          {/* <ChatRoomAlarm>1</ChatRoomAlarm> */}
        </ChatRoomMessageWrap>
      </ChatRoomContent>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
