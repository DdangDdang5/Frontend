// React import
import React, { useEffect, useRef, useState } from "react";

// Package import
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// Component import
import Header from "../../components/header/Header";

// Style import
import {
  ChatContainer,
  ChatContent,
  ChatFooter,
  ChatMessage,
  ChatMessageList,
  Message,
  MessageChecked,
  MessageInfo,
  MessageInput,
  MessageProfile,
  MessageTime,
  MessageWrap,
  SendBtn,
} from "./Chat.styled";

var stompClient = null;

const Chat = () => {
  const { roomId } = useParams();
  const chatRef = useRef(null);

  const [chatList, setChatList] = useState([]);
  const [userData, setUserData] = useState({
    type: "",
    roomId: roomId,
    sender: "",
    message: "",
  });

  const scrollToBottom = () => {
    console.log("scroll to bottom!!!!!!!!!!!!");
    
		if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
      // chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    // connect();						// spring homepage
    registerUser();

    scrollToBottom();
  }, []);

  const handleValue = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  // =======================================================================================
	// spring homepage

  // function connect() {
  // 	// spring homepage
  //   var socket = new SockJS(process.env.REACT_APP_URL + '/gs-guide-websocket');
  //   stompClient = Stomp.over(socket);
  //   stompClient.connect({}, (frame) => {
  //     // setConnected(true);
  //     console.log('Connected: ' + frame);

  // 		// spring homepage
  //     stompClient.subscribe('/topic/chat/room', (greeting) => {
  //       showGreeting(JSON.parse(greeting.body).content);
  //     });
  //   });
  // }

  // function sendName() {
  //   stompClient.send("/app/hello", {}, JSON.stringify({name: userData.message}));
  // 	setUserData({ ...userData, message: "" })
  // }

  // function showGreeting(message) {
  // 	console.log(message);
  // 	chatList.push(message);
  // 	setChatList([...chatList]);
  // }

  // function disconnect() {
  //     if (stompClient !== null) {
  //         stompClient.disconnect();
  //     }
  //     // setConnected(false);
  //     console.log("Disconnected");
  // }

  // =======================================================================================

  // 웹소켓 연결
  const registerUser = () => {
    var sockJS = new SockJS(process.env.REACT_APP_URL + "/wss/chat");
    stompClient = Stomp.over(sockJS);

    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    // setUserData({ ...userData, type: "ENTER" });
    // console.log(userData);

    stompClient.subscribe(`/topic/chat/room/${roomId}`, onMessageReceived);

    // 채팅방 들어감
    userJoin();

    scrollToBottom();
  };

  const onError = (err) => {
    console.log(err);
  };

  const userJoin = () => {
    let chatMessage = {
      type: "ENTER",
      roomId: roomId,
      sender: "rang",
      message: "",
    };

    stompClient.send(`/app/chat/message`, {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    if (payloadData.type === "ENTER" || payloadData.type === "TALK") {
      chatList.push(payloadData);
      setChatList([...chatList]);
    }

    scrollToBottom();
  };

  const sendMessage = () => {
    if (stompClient && userData.message) {
      let chatMessage = {
        type: "TALK",
        roomId: roomId,
        sender: "rang",
        message: userData.message,
      };

      stompClient.send("/app/chat/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }

    scrollToBottom();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <Header borderBottom="1px solid gray" logo={false} />
      <ChatContent ref={chatRef}>
        <ChatMessageList>
          {chatList?.map((chat, idx) => (
            <div key={idx}>
              {chat.sender !== "rang" ? (
                <ChatMessage>
                  <MessageProfile src="/maskable.png" alt="chat-profile" />
                  <MessageWrap>
                    <span>{chat.sender}</span>
                    <Message>
                      <div>{chat.message}</div>
                    </Message>
                  </MessageWrap>
									<MessageInfo>
										<MessageChecked>1</MessageChecked>
                  	<MessageTime>PM 09:15</MessageTime>
									</MessageInfo>
                </ChatMessage>
              ) : (
                <ChatMessage isMe={true}>
									<MessageInfo>
										<MessageChecked>1</MessageChecked>
                  	<MessageTime>PM 09:15</MessageTime>
									</MessageInfo>
                  <MessageWrap>
                    <Message isMe={true}>
                      <div>{chat.message}</div>
                    </Message>
                  </MessageWrap>
                </ChatMessage>
              )}
            </div>
          ))}
        </ChatMessageList>
      </ChatContent>

      {/* 채팅 보내기 */}
      <ChatFooter>
        <img src="/maskable.png" alt="add-chat" />
        <MessageInput
          type="text"
          placeholder="enter public message"
          value={userData.message}
          onChange={(event) => handleValue(event)}
          onKeyDown={(event) => onKeyPress(event)}
        />
        <SendBtn onClick={sendMessage}>
          <img src="/maskable.png" alt="push-chat" />
        </SendBtn>
      </ChatFooter>
    </ChatContainer>
  );
};

export default Chat;
