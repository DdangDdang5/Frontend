// React import
import React, { useState } from "react";

// Package import
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Header from "../../components/header/Header";

// Style import
import {
  ChatBox,
  ChatContainer,
  ChatContent,
  ChatMessage,
  Member,
  MemberList,
  Message,
  MessageData,
  MessageInput,
  SendBtn,
  SendMessage,
} from "./Chat.styled";

// 웹소켓 연결
// let sockJS = new SockJS("http://localhost:3000/ws");
// const stompClient = Stomp.over(sockJS);
// var stompClient = null;

const Chat = () => {
  const [publicChats, setpublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHAT");
  const [userData, setUserData] = useState({
    username: "hello",
    receivername: "",
    connected: false,
    message: "",
  });

  const handleValue = (event) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  // const registerUser = () => {
  //   stompClient.connect({}, onConnected, onError);
  // };

  // const onConnected = () => {
  //   setUserData({ ...userData, connected: true });
  //   stompClient.subscribe("/chat/public", onPublicMessageReceived);
  //   stompClient.subscribe(
  //     "/user" + userData.username + "/private",
  //     onPrivateMessageReceived,
  //   );
  // 	userJoin();
  // };

  // const userJoin = () => {
  //   let chatMessage = {
  //     senderName: userData.username,
  //     message: userData.message,
  //     status: "JOIN",
  //   };
  //   stompClient.send(`/app/message`, {}, JSON.stringify(chatMessage));
  // }

  // const onPublicMessageReceived = (payload) => {
  //   let payloadData = JSON.parse(payload.body);
  //   switch (payloadData.status) {
  //     case "JOIN":
  //       if (privateChats.get(payloadData.senderName)) {
  //         privateChats.set(payloadData.senderName, []);
  //         setPrivateChats(new Map(privateChats));
  //       }
  //       break;
  //     case "MESSAGE":
  //       publicChats.push(payloadData);
  //       setpublicChats([...publicChats]);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const onPrivateMessageReceived = (payload) => {
  //   let payloadData = JSON.parse(payload);
  //   if (privateChats.get(payloadData.senderName)) {
  //     privateChats.get(payloadData.senderName).push(payloadData);
  //     setPrivateChats(new Map(privateChats));
  //   } else {
  //     let list = [];
  //     list.push(payloadData);

  //     privateChats.set(payloadData.senderName, list);
  //     setPrivateChats(new Map(privateChats));
  //   }
  // };

  // const onError = (err) => {
  //   console.log(err);
  // };

  // const sendPublicMessage = () => {
  //   if (stompClient) {
  //     let chatMessage = {
  //       senderName: userData.username,
  //       message: userData.message,
  //       status: "MESSAGE",
  //     };
  //     stompClient.send(`/app/message`, {}, JSON.stringify(chatMessage));
  //     setUserData({ ...userData, message: "" });
  //   }
  // };

  // const sendPrivateMessage = () => {
  //   if (stompClient) {
  //     let chatMessage = {
  //       senderName: userData.username,
  // 			receivername: tab,
  //       message: userData.message,
  //       status: "MESSAGE",
  //     };
  // 		if (userData.username !== tab) {
  // 			privateChats.set(tab).push(chatMessage);
  // 			setPrivateChats(new Map(privateChats));
  // 		}
  //     stompClient.send(`/app/private-message`, {}, JSON.stringify(chatMessage));
  //     setUserData({ ...userData, message: "" });
  //   }
  // };

  return (
    <ChatContainer>
			<Header borderBottom="1px solid gray" logo={false}/>
      {/* {userData.connected ? (
        <ChatBox>
          <MemberList>
            <ul>
              {tab === "CHAT" && "active" ? (
                <Member onClick={() => setTab("CHAT")}>Chatroom</Member>
              ) : null}
              {[...privateChats.keys()].map((name, idx) =>
                tab === name && "active" ? (
                  <Member onClick={() => setTab(name)}>Chatroom</Member>
                ) : null,
              )}
            </ul>
          </MemberList>
          {tab === "CHAT" && (
            <ChatContent>
              <ChatMessage>
                {publicChats.map((chat, idx) => {
                  <Message key={idx}>
                    {chat.senderName !== userData.username && (
                      <div>{chat.senderName}</div>
                    )}
                    <MessageData>{chat.message}</MessageData>
                    {chat.senderName === userData.username && (
                      <div>{chat.senderName}</div>
                    )}
                  </Message>;
                })}
              </ChatMessage>

              <SendMessage>
                <MessageInput
                  type="text"
                  placeholder="enter public message"
                  value={userData.message}
                  onChange={handleValue}
                />
                <SendBtn type="button" onClick={sendPublicMessage}></SendBtn>
              </SendMessage>
            </ChatContent>
          )}
          {tab !== "CHAT" && (
            <ChatContent>
              <ChatMessage>
                {[...privateChats.get(tab)].map((chat, idx) => {
                  <Message key={idx}>
                    {chat.senderName !== userData.username && (
                      <div>{chat.senderName}</div>
                    )}
                    <MessageData>{chat.message}</MessageData>
                    {chat.senderName === userData.username && (
                      <div>{chat.senderName}</div>
                    )}
                  </Message>;
                })}
              </ChatMessage>

              <SendMessage>
                <MessageInput
                  type="text"
                  placeholder={`enter private message for ${tab}`}
                  value={userData.message}
                  onChange={handleValue}
                />
                <SendBtn type="button" onClick={sendPrivateMessage}></SendBtn>
              </SendMessage>
            </ChatContent>
          )}
        </ChatBox>
      ) : (
        <div>
          <input
            id="username"
            placeholder="Enter the username"
            type="text"
            value={userData.username}
            onChange={(e) => handleValue(e)}
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )} */}
    </ChatContainer>
  );
};

export default Chat;
