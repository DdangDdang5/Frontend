// React import
import React, { useEffect, useState } from "react";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// Component import
import Header from "../../components/header/Header";
import OptionModal from "../../components/modal/OptionModal";
import { getChatMessageList } from "../../redux/modules/ChatSlice";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { roomId } = useParams();
  const { isDetail, title } = useLocation().state;
  const nickName = sessionStorage.getItem("memberNickname").split("kakao")[0];

  const chatMessageList = useSelector(
    (state) => state.chat.chatMessageList
  ).filter((item) => item.roomId === roomId);

  const [visible, setVisible] = useState(false); // 채팅 메뉴 모달

  const [chatList, setChatList] = useState([]);
  const [userData, setUserData] = useState({
    type: "",
    roomId: roomId,
    sender: "",
    message: "",
    createdAt: "",
  });

  useEffect(() => {
    registerUser();

    scrollToBottom();
  }, []);

  useEffect(() => {
    dispatch(getChatMessageList(roomId));

    if (chatMessageList[0]?.data.length > 0) {
      chatList.push(...chatMessageList[0].data);
      setChatList(chatList);
    }
  }, [JSON.stringify(chatMessageList)]);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  // 채팅 입력창 클릭
  const onClickInput = () => {
    // 비로그인 -> 세션에 닉네임 없음
    if (!nickName) {
      if (window.confirm("로그인이 필요합니다. 로그인하시겠습니까?")) {
        navigate("/login");
      }
    }
  };

  // 채팅 메뉴 모달 클릭
  const onClickMenu = () => {
    setVisible(true);
  };

  const calcTime = (createdAt) => {
    const date = new Date(createdAt);
    return (
      (date.getHours() >= 12 ? "PM " : "AM ") +
      (date.getHours() % 12).toString().padStart(2, 0) +
      ":" +
      date.getMinutes().toString().padStart(2, 0)
    );
  };

  const checkNickname = (nickName) => {
    if (nickName.includes("kakao")) {
      return (nickName = nickName.split("kakao")[0] + "kakao");
    } else {
      return nickName;
    }
  };

  const scrollToBottom = () => {
    // #root > div > div.sc-dUWWNf > div.sc-hsOonA.jcBIja
    window.document.body
      .querySelector("#root > div > div.sc-gzzPqb > div.sc-gkJlnC.iINcZz")
      ?.scrollTo(
        0,
        document.body.querySelector(
          "#root > div > div.sc-gzzPqb > div.sc-gkJlnC.iINcZz"
        ).scrollHeight
      );
  };

  const handleValue = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  // 웹소켓 연결
  const registerUser = () => {
    var sockJS = new SockJS(process.env.REACT_APP_URL + "/wss/chat");
    stompClient = Stomp.over(sockJS);
    // stompClient.debug = null; // stompJS console.log 막기

    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    // setUserData({ ...userData, type: "ENTER" });

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
      sender: nickName,
      message: "",
    };

    stompClient.send("/app/chat/message", {}, JSON.stringify(chatMessage));
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
      setUserData({ ...userData, message: "" });
    }

    scrollToBottom();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const onDisconnected = () => {
    if (stompClient !== null && window.confirm("채팅방을 나가겠습니까?")) {
      stompClient.disconnect();
      stompClient = null;
      navigate(-1);
    }
  };

  return (
    <>
      <ChatContainer>
        <Header
          back={true}
          pageName={title}
          menu={true}
          onClickBtn={onClickMenu}
        />

        {/* 경매 남은 시간 */}
        {isDetail ? (
          <AuctionTimeWrap>
            <span>남은시간</span>
            <AuctionTime>5일 03:37</AuctionTime>
          </AuctionTimeWrap>
        ) : null}

        <ChatContent isDetail={isDetail}>
          <ChatMessageList>
            {chatList?.map((chat, idx) => (
              <div key={idx}>
                {chat.sender !== nickName ? (
                  <ChatMessage>
                    <MessageProfile
                      src={
                        chat.profileImgUrl
                          ? chat.profileImgUrl
                          : "/maskable.png"
                      }
                      alt="chat-profile"
                    />
                    <MessageWrap>
                      <span>{checkNickname(chat.sender)}</span>
                      <Message>
                        <div>{chat.message}</div>
                      </Message>
                    </MessageWrap>
                    <MessageInfo>
                      {/* <MessageChecked>1</MessageChecked> */}
                      <MessageTime>{calcTime(chat.createdAt)}</MessageTime>
                    </MessageInfo>
                  </ChatMessage>
                ) : (
                  <ChatMessage isMe={true}>
                    <MessageInfo isMe={true}>
                      {/* <MessageChecked>1</MessageChecked> */}
                      <MessageTime>{calcTime(chat.createdAt)}</MessageTime>
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
            onClick={onClickInput}
          />
          <SendBtn onClick={sendMessage}>
            <Send />
          </SendBtn>
        </ChatFooter>
      </ChatContainer>

      {/* 메뉴 모달 */}
      <OptionModal minHeight="200px" visible={visible} setVisible={setVisible}>
        <MenuItemList>
          <MenuItem>거래 완료하기</MenuItem>
          <MenuItem>차단하기</MenuItem>
          <MenuItem>신고하기</MenuItem>
          <MenuItem onClick={onDisconnected}>채팅방 나가기</MenuItem>
        </MenuItemList>
      </OptionModal>
    </>
  );
};

export default Chat;
