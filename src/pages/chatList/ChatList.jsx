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
import api from "../../shared/Api";

const ChatList = () => {
	const dispatch = useDispatch();
	const chatRoomList = useSelector((state) => state.chat.chatRoomList);
	// const roomId = "6e9cf34c-fca7-40c3-93fe-180f70d77e11";

  // const onMakeChatRoom = async () => {
  //   try {
  //     await api
  //       .post("http://localhost:8080/chat/room?name=채팅")
  //       .then((res) => console.log(res))
  //       .then((res) => (roomId = res.roomId));
  //     // console.log(response);
  //     // return response.roomId;
  //     // roomId = response.roomId;
	// 		console.log(roomId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    // onMakeChatRoom();
		console.log(chatRoomList);
		dispatch(makeChatRoom());
  }, [dispatch]);

  return (
    <ChatListContainer>
      <Header logo={false} />
      <ChatRoomList>
        {Array.from({ length: 4 }, (_, idx) => (
          <ChatRoom key={idx} roomId={chatRoomList[chatRoomList.length - 1]?.roomId} />
        ))}
      </ChatRoomList>
      <Footer />
    </ChatListContainer>
  );
};

export default ChatList;
