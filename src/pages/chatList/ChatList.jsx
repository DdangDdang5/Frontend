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
import { ChatListContainer, ChatRoomList, NoChatRoom, NoChatRoomTitle } from "./ChatList.styled";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { NotificationChat } from "../../shared/images";

const ChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const chatRoomList = useSelector((state) => state.chat.chatRoomList);

  const nickName = sessionStorage.getItem("memberNickname");

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
              <NoChatRoom>
								<NotificationChat />
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
