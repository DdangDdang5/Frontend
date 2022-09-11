import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import "./ChatRoom.css";

var stompClient = null;

const ChatRoom = () => {
  const { roomId } = useParams();

  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    type: "",
    roomId: roomId,
    sender: "",
    message: "",
  });

  useEffect(() => {
		console.log(publicChats);
    console.log(userData);
  }, [userData]);

  const registerUser = () => {
    connect();
  };

  const connect = () => {
    var sockJS = new SockJS(process.env.REACT_APP_URL2 + "/ws/chat");
    stompClient = over(sockJS);
		console.log(sockJS);
		console.log(stompClient);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(`/sub/chat/room/${roomId}`, function(message) {
			var recv = JSON.parse(message.body);
			console.log(recv);
			setPublicChats([...publicChats, recv]);
      // onMessageReceived(message);
		});
    // stompClient.subscribe(
    //   "/user/" + userData.username + "/private",
    //   onPrivateMessage,
    // );
    userJoin();
  };

  const onError = (err) => {
    console.log(err);
  };

  const userJoin = () => {
    var chatMessage = {
			type: "ENTER",
			roomId: roomId,
      sender: userData.sender
    };
    stompClient.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
		console.log(payloadData);
		
		publicChats.push(payloadData);
		setPublicChats([...publicChats]);

    // switch (payloadData.type) {
    //   case "ENTER":
    //     if (!privateChats.get(payloadData.sender)) {
    //       privateChats.set(payloadData.sender, []);
    //       setPrivateChats(new Map(privateChats));
    //     }
    //     break;
    //   case "TALK":
    //     publicChats.push(payloadData);
    //     setPublicChats([...publicChats]);
    //     break;
		// 	default:
		// 		break;
    // }
  };

  // const onPrivateMessage = (payload) => {
  //   console.log(payload);
  //   var payloadData = JSON.parse(payload.body);
  //   if (privateChats.get(payloadData.sender)) {
  //     privateChats.get(payloadData.sender).push(payloadData);
  //     setPrivateChats(new Map(privateChats));
  //   } else {
  //     let list = [];
  //     list.push(payloadData);
  //     privateChats.set(payloadData.sender, list);
  //     setPrivateChats(new Map(privateChats));
  //   }
  // };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, sender: value });
  };

  const sendValue = () => {
		console.log('send value');
		console.log(stompClient);
    if (stompClient) {
      var chatMessage = {
        type: "TALK",
				roomId: roomId,
        sender: userData.sender,
        message: userData.message
      };
      console.log(chatMessage);
      stompClient.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
			console.log(userData);
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        type: "TALK",
				roomId: roomId,
        sender: userData.sender,
        // receiverName: tab,
        message: userData.message,
      };

      if (userData.sender !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.sender && "self"
                    }`}
                    key={index}
                  >
                    {chat.sender !== userData.sender && (
                      <div className="avatar">{chat.sender}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.sender === userData.sender && (
                      <div className="avatar self">{chat.sender}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={(e) => handleMessage(e)}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
          {/* {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.sender === userData.sender && "self"
                    }`}
                    key={index}
                  >
                    {chat.sender !== userData.sender && (
                      <div className="avatar">{chat.sender}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.sender === userData.sender && (
                      <div className="avatar self">{chat.sender}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )} */}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.sender}
            onChange={(e) => handleUsername(e)}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
