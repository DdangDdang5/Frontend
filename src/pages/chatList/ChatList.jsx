// React import
import React, { useEffect, useState } from "react";

// Redux import
import {
  getChatRoomList,
  getChatRoomListByMember,
  makeChatRoom,
} from "../../redux/modules/ChatSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { isIOS } from "react-device-detect";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ChatRoom from "../../components/chatRoom/ChatRoom";

// Style import
import { ChatListContainer, ChatRoomList, NoChatRoom } from "./ChatList.styled";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const chatRoomList = useSelector((state) => state.chat.chatRoomList);

  const nickName = sessionStorage.getItem("memberNickname");

	// console.log(chatRoomList);

	const getChatRoomtList = async () => {
		await setLoading(true);
		await dispatch(getChatRoomListByMember(nickName));
		await setLoading(false);
	};

  useEffect(() => {
    // dispatch(makeChatRoom());
    // dispatch(getChatRoomList());

    getChatRoomtList();
  }, [JSON.stringify(chatRoomList)]);

  return (
    <ChatListContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* <Header pageName="채팅" alarm={true} /> */}
          <Header pageName="채팅" />
          <ChatRoomList isIOS={isIOS}>
            {chatRoomList.length > 0 ? (
              chatRoomList?.map((item) => (
                <ChatRoom key={item.roomId} room={item} />
              ))
            ) : (
              <NoChatRoom>낙찰된 경매가 없습니다!</NoChatRoom>
            )}
          </ChatRoomList>
          <Footer chat={true} />
        </>
      )}
    </ChatListContainer>
  );
};

export default ChatList;
