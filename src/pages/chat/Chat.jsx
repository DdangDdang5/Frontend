// React import
import React, { useEffect, useRef, useState } from "react";

// Package import
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// Component import
import Header from "../../components/header/Header";
import MenuModal from "../../components/modal/MenuModal";
import { Add, Send } from "../../shared/images";

// Style import
import {
  AuctionTime,
  AuctionTimeWrap,
  ChatContainer,
  ChatContent,
  ChatFooter,
  ChatMessage,
  ChatMessageList,
  MenuItem,
  MenuItemList,
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
  const isDetail = useLocation().state?.isDetail;
	const nickName = "hey";

  const chatRef = useRef(null);

  const [chatList, setChatList] = useState([]);
  const [userData, setUserData] = useState({
    type: "",
    roomId: roomId,
    sender: "",
    message: "",
  });

  const scrollToBottom = () => {
    // console.log("scroll to bottom!!!!!!!!!!!!");

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
    // var sockJS = new SockJS("https://3.34.2.159/wss/chat");
    stompClient = Stomp.over(sockJS);

    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    // setUserData({ ...userData, type: "ENTER" });
    // console.log(userData);

    stompClient.subscribe(`/topic/chat/room/${roomId}`, onMessageReceived);
    // stompClient.subscribe(`/sub/chat/room/77`, onMessageReceived);

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
      sender: nickName,
      message: "",
    };

    stompClient.send("/app/chat/message", {}, JSON.stringify(chatMessage));
    // stompClient.send(`/pub/chat/message`, {}, JSON.stringify(chatMessage));
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
        sender: nickName,
        message: userData.message,
      };

      stompClient.send("/app/chat/message", {}, JSON.stringify(chatMessage));
      // stompClient.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }

    scrollToBottom();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const [visible, setVisible] = useState(false);

  const onClickMenu = () => {
    setVisible(true);
  };

  return (
    <>
      <ChatContainer>
        <Header
          back={true}
          pageName="채팅방 제목"
          menu={true}
          onClickBtn={onClickMenu}
        />

        {/* 경매 남은 시간 */}
        <ChatContent ref={chatRef}>
          {isDetail ? (
            <AuctionTimeWrap>
              <span>남은시간</span>
              <AuctionTime>5일 03:37</AuctionTime>
            </AuctionTimeWrap>
          ) : null}

          <ChatMessageList>
            {chatList?.map((chat, idx) => (
              <div key={idx}>
                {chat.sender !== nickName ? (
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
                    <MessageInfo isMe={true}>
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
          <Add className="add" />
          <MessageInput
            type="text"
            placeholder="enter public message"
            value={userData.message}
            onChange={(event) => handleValue(event)}
            onKeyDown={(event) => onKeyPress(event)}
          />
          <SendBtn onClick={sendMessage}>
            <Send />
          </SendBtn>
        </ChatFooter>
      </ChatContainer>

      {/* 메뉴 모달 */}
      <MenuModal minHeight="200px" visible={visible} setVisible={setVisible}>
        <MenuItemList>
          <MenuItem>거래 완료하기</MenuItem>
          <MenuItem>차단하기</MenuItem>
          <MenuItem>신고하기</MenuItem>
          <MenuItem>채팅방 나가기</MenuItem>
        </MenuItemList>
      </MenuModal>
    </>
  );
};

export default Chat;
