// React import
import React, { useEffect, useState } from "react";

// Redux import
import { getChatRoomListByMember } from "../../redux/modules/ChatSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { isIOS } from "react-device-detect";

// Component & Page & Shared import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ChatRoom from "../../components/chat/ChatRoom";
import Loading from "../etcPage/Loading";
import NoChat from "../../shared/images/icon/NoChat.png";

// Style import
import {
  ChatListContainer,
  ChatRoomList,
  NoChatRoom,
  NoChatRoomTitle,
} from "./ChatList.styled";

const ChatList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const chatRoomList = useSelector((state) => state.chat.chatRoomList);

  const nickName = sessionStorage.getItem("memberNickname");

  const getChatRoomtList = async () => {
    await setLoading(true);
    await dispatch(getChatRoomListByMember(nickName));
    await setLoading(false);
  };

  useEffect(() => {
    getChatRoomtList();
  }, [JSON.stringify(chatRoomList)]);

  return (
    <ChatListContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header pageName="채팅" />
          <ChatRoomList isIOS={isIOS}>
            {chatRoomList.length > 0 ? (
              chatRoomList?.map((item) => (
                <ChatRoom key={item.roomId} room={item} />
              ))
            ) : (
              // 낙찰된 경매가 없을 때(1:1 채팅방이 없을 때)
              <NoChatRoom>
                <img src={NoChat} alt="no-chat" />
                <NoChatRoomTitle>아직 낙찰된 경매가 없어요.</NoChatRoomTitle>
                <span>경매가 낙찰되면 판매자와 구매자 간의</span>
                <span>1:1 채팅방이 자동 생성됩니다.</span>
              </NoChatRoom>
            )}
          </ChatRoomList>
          <Footer chat={true} />
        </>
      )}
    </ChatListContainer>
  );
};

export default ChatList;
