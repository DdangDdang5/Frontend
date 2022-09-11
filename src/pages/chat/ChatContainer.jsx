import React, { useEffect, useState } from "react";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { useParams } from "react-router-dom";
import styled from "styled-components";

let sockJS = new SockJS(process.env.REACT_APP_URL2 + "/ws/chat");
let stompClient = Stomp.over(sockJS);
// stompClient.debug= () => {};

export const ChatContainer = () => {
  const { roomId } = useParams();

  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (data) => {
				console.log(data);
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
    });
  }, [messages]);

  const handleEnter = (sender, message) => {
    const newMessage = { sender, message, roomId: roomId, type: "TALK" };
    stompClient.send("/pub/chat/message", {}, JSON.stringify(newMessage));
    setMessage("");
  };

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <Chat>
      <div className={"chat-box"}>
        <div className="header">
          유저이름 :
          <input
            style={{ flex: 1 }}
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <div className={"messages"}>
          {messages.map((message) => (
            <div>
              {" "}
              {message.sender} : {message.message}{" "}
            </div>
          ))}
        </div>
        <div>
          <input
            placeholder="input your messages..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSearch={(value) => handleEnter(sender, value)}
            enterButton={"Enter"}
          />
        </div>
      </div>
    </Chat>
  );
};

const Chat = styled.div`
	/* width : 80vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center; */
`;
