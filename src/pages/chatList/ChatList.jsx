// React import
import React, { useEffect } from "react";

// Redux import
import { makeChatRoom } from "../../redux/modules/ChatSlice";

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
    // onMakeChatRoom();
		// console.log(chatRoomList);
		dispatch(makeChatRoom());
  }, [dispatch]);

  return (
    <ChatListContainer>
      <Header logo={false} />
      <ChatRoomList>
        {Array.from({ length: 4 }, (_, idx) => (
          <ChatRoom key={idx} roomId={chatRoomList[0]?.roomId} />
        ))}
      </ChatRoomList>
      <Footer />
    </ChatListContainer>
  );
};

export default ChatList;
