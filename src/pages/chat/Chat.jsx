// React import
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  SendMessageWrap,
} from "./Chat.styled";

// 웹소켓 연결
// let sockJS = new SockJS("http://localhost:8080/ws/chat");
// const stompClient = Stomp.over(sockJS);
var stompClient = null;

const Chat = () => {
  const { roomId } = useParams();

  const [publicChats, setpublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("TALK");
  const [userData, setUserData] = useState({
    type: "",
    roomId: roomId,
    sender: "",
    message: "",
  });

  // const roomId = "9245f350-836b-4097-81b5-2611aa08fa9c";

  useEffect(() => {
    registerUser();
  }, []);

  const handleValue = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const registerUser = () => {
    var sockJS = new SockJS(process.env.REACT_APP_URL2 + "/ws/chat");

    stompClient = Stomp.over(sockJS);

    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    // setUserData({ ...userData, type: "ENTER" });
    // console.log(userData);

    // 기존의 대화내용 가져옴
    // stompClient.subscribe(`/sub/chat/room/${roomId}`, (body) => {
    // 	console.log(body);
    //   // setpublicChats((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    // 	// console.log(publicChats);
    // });
    const a = stompClient.subscribe(
      `/sub/chat/room/${roomId}`,
      onPublicMessageReceived
    );

    // stompClient.subscribe(
    //   "/user" + userData.username + "/private",
    //   onPrivateMessageReceived,
    // );
    // stompClient.send()

    // 채팅방 들어감
    userJoin();
  };

  const onError = (err) => {
    console.log(err);
  };

  const userJoin = () => {
    console.log("444444444444444444 user enter");
    let chatMessage = {
      type: "ENTER",
      roomId: roomId,
      sender: "rang",
      message: "",
    };
    // sockjs.send(JSON.stringify(chatMessage));
    const c = stompClient.send(
      `/pub/chat/message`,
      {},
      JSON.stringify(chatMessage)
    );
    // setpublicChats([...publicChats, {sender: "rang", message: ""}]);
    console.log("444444444444444444 user enter finish");
  };

  const onPublicMessageReceived = (payload) => {
    console.log("3333333333333333333 on public message received");
    console.log("public message received", payload);
    let payloadData = JSON.parse(payload.body);

    if (payloadData.type === "ENTER" || payloadData.type === "TALK") {
      publicChats.push(payloadData);
      setpublicChats([...publicChats]);
    }

    // switch (payloadData.type) {
    //   case "ENTER":
    //     if (privateChats.get(payloadData.sender)) {
    //       privateChats.set(payloadData.sender, []);
    //       setPrivateChats(new Map(privateChats));
    //     }
    //     break;
    //   case "TALK":
    //     publicChats.push(payloadData);
    //     setpublicChats([...publicChats]);
    //     break;
    //   default:
    //     break;
    // }
    console.log("3333333333333333333 on public message received finish");
  };

  const sendPublicMessage = () => {
    if (stompClient) {
      let chatMessage = {
        type: "TALK",
        roomId: roomId,
        sender: "rang",
        message: userData.message,
      };

      // sockjs.send(JSON.stringify(chatMessage));
      stompClient.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
      // setpublicChats([...publicChats, chatMessage]);
      setUserData({ ...userData, message: "" });
    }
  };

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

  // const sendPrivateMessage = () => {
  //   if (stompClient) {
  //     let chatMessage = {
  //       sender: userData.username,
  // 			receivername: tab,
  //       message: userData.message,
  //       type: "TALK",
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
      <Header borderBottom="1px solid gray" logo={false} />
      {/* {userData.connected ? ( */}
      <ChatBox>
        {/* <MemberList>
            <ul>
              {tab === "TALK" && "active" ? (
                <Member onClick={() => setTab("TALK")}>Chatroom</Member>
              ) : null}
              {[...privateChats.keys()].map((name, idx) =>
                tab === name && "active" ? (
                  <Member onClick={() => setTab(name)}>Chatroom</Member>
                ) : null,
              )}
            </ul>
          </MemberList> */}
        {/* {publicChats.map((item, idx) => (
					<>
					{item.type === "TALK" ? (
						<>

						</>
					) : (
          	<div>{item.message}</div>
					)}
					</>
				))} */}
        {tab === "TALK" && (
          <ChatContent>
            chat content
            <ChatMessage>
              {console.log("csssssssssssssssss", publicChats)}
              {publicChats?.map((chat, idx) => (
                <Message key={idx}>
                  <div>
                    {chat.sender}
                    {chat.message}
                  </div>
                  {/* {chat.sender !== "rang" && (
                    <div>{chat.sender}</div>
                  )}
                  <MessageData>{chat.message}</MessageData>
                  {chat.sender === "rang" && (
                    <div>{chat.sender}</div>
                  )} */}
                </Message>
              ))}
            </ChatMessage>
            {/* <SendMessage>
                <MessageInput
                  type="text"
                  placeholder="enter public message"
                  value={userData.message}
                  onChange={(event) => handleValue(event)}
                />
                <SendBtn type="button" onClick={sendPublicMessage}></SendBtn>
              </SendMessage> */}
          </ChatContent>
        )}
        {/* {tab !== "TALK" && (
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
          )} */}
      </ChatBox>
      {/* ) : (
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

      <SendMessageWrap>
        <img src="/maskable.png" alt="add-chat" />

        <SendMessage>
          <MessageInput
            type="text"
            placeholder="enter public message"
            value={userData.message}
            onChange={(event) => handleValue(event)}
          />
          <SendBtn type="button" onClick={sendPublicMessage}></SendBtn>
        </SendMessage>
        <img src="/maskable.png" alt="push-chat" />
      </SendMessageWrap>
    </ChatContainer>
  );
};

export default Chat;
