// React import
import React, { useEffect } from "react";

// Redux import
import { getChatRoomList, makeChatRoom } from "../../redux/modules/ChatSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ChatRoom from "../../components/chatRoom/ChatRoom";

// Style import
import { ChatListContainer, ChatRoomList } from "./ChatList.styled";

const ChatList = () => {
	const dispatch = useDispatch();
	const chatRoomList = useSelector((state) => state.chat.chatRoomList);

  useEffect(() => {
		// dispatch(makeChatRoom());
		dispatch(getChatRoomList());
  }, [JSON.stringify(chatRoomList)]);

  return (
    <ChatListContainer>
      <Header pageName="채팅" alarm={true} />
      <ChatRoomList>
				{chatRoomList?.map((item) => (
          <ChatRoom key={item.roomId} room={item} />
        ))}
      </ChatRoomList>
      <Footer chat={true} />
    </ChatListContainer>
  );
};

export default ChatList;
