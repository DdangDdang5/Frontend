// React import
import React, { useEffect, useState } from "react";
import { isIOS } from "react-device-detect";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import CountdownTimer from "../../components/countDownTimer/CountDownTimer";

// Component import
import Header from "../../components/header/Header";
import ChatOptionModal from "../../components/modal/ChatOptionModal";
import OptionModal from "../../components/modal/OptionModal";
import Button from "../../elements/button/Button";
import { doneAuction } from "../../redux/modules/AuctionSlice";
import {
  clearChatMessageList,
  getChatMessageList,
} from "../../redux/modules/ChatSlice";
import { Add, BasicProfile, Send } from "../../shared/images";
import Loading from "../loading/Loading";

// Style import
import {
  AuctionTime,
  AuctionTimeWrap,
  ChatContainer,
  ChatContent,
  ChatFooter,
  ChatFooterContent,
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
  ModalBtnWrap,
  ModalTextWrap,
  OptionModalContainer,
  SendBtn,
  SendIOSContainer,
} from "./Chat.styled";

var stompClient = null;

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { roomId } = useParams();
  const {
    chatOther,
    auctionId,
    auctionCreatedAt,
    auctionPeriod,
    auctionStatus,
    isDetail,
    title,
  } = useLocation().state;

  const nickName = sessionStorage.getItem("memberNickname");

  const chatMessageList = useSelector(
    (state) => state.chat.chatMessageList,
  ).filter((item) => item.roomId === roomId);

  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false); // 채팅 메뉴 모달
  const [optionVisible, setOptionVisible] = useState(false);

  const [chatList, setChatList] = useState([]);
  const [userData, setUserData] = useState({
    type: "",
    roomId: roomId,
    sender: "",
    message: "",
    createdAt: "",
  });

  const initialChat = async () => {
    await setLoading(true);
    await registerUser();
    await scrollToBottom();
  };

  useEffect(() => {
    initialChat();
  }, []);

  // useEffect(() => {
  //   var timeout;
  //   // 5초 이상 로딩시 새로고침
  //   if (loading) {
  //     timeout = setInterval(() => {
  // 			initialChat();
  //     }, 5000);
  //   }

  //   return () => {
  //     if (loading) {
  // 			onDisconnected();
  //       setTimeout(timeout);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    dispatch(getChatMessageList(roomId));

    if (chatMessageList[0]?.data?.length > 0) {
      if (chatList.length > 0) {
        setChatList([...chatMessageList[0].data]);
      } else {
        chatList.push(...chatMessageList[0].data);
        setChatList([...chatList]);
      }
    }
    // console.log("5555555555555555555");
    // console.log(chatMessageList);
  }, [JSON.stringify(chatMessageList)]);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  // 타이머 기능
  const timer = (countDown) => {
    const tenMinute = 10 * 60 * 1000;
    const thirtyMinute = tenMinute * 3;
    const sixtyMinute = tenMinute * 6;
    const startTime = Date.parse(auctionCreatedAt);
    const dateTimeAfterTenMinute = startTime + tenMinute;
    const dateTimeAfterThirtyMinute = startTime + thirtyMinute;
    const dateTimeAfterSixtyMinute = startTime + sixtyMinute;

    switch (countDown) {
      case 10:
        return dateTimeAfterTenMinute;
      case 30:
        return dateTimeAfterThirtyMinute;
      case 60:
        return dateTimeAfterSixtyMinute;
      default:
        return <div>경매가 종료되었습니다.</div>;
    }
  };

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

  // 채팅 메뉴 모달 중 "거래 완료하기" 클릭
  const onClickFinishMenu = () => {
    dispatch(doneAuction(auctionId));
    setVisible(false);
    setOptionVisible(true);
  };

  const calcTime = (createdAt) => {
    if (isIOS) {
      const [hours, minutes, seconds] = createdAt.split(" ")[1].split(":");
      return (hours >= 12 ? "PM " : "AM ") + hours + ":" + minutes;
    } else {
      const date = new Date(createdAt);
      return (
        (date.getHours() >= 12 ? "PM " : "AM ") +
        (date.getHours() % 12).toString().padStart(2, 0) +
        ":" +
        date.getMinutes().toString().padStart(2, 0)
      );
    }
  };

  const checkNickname = (nickName) => {
    if (nickName.includes("kakao")) {
      return (nickName = nickName.split("kakao")[0] + "kakao");
    } else {
      return nickName;
    }
  };

  const scrollToBottom = () => {
    window.document.body
      .querySelector("#chat-content")
      ?.scrollTo(0, document.body.querySelector("#chat-content").scrollHeight);

    // scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  const handleValue = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  // 웹소켓 연결
  const registerUser = () => {
    setLoading(true);
    var sockJS = new SockJS(process.env.REACT_APP_URL + "/wss/chat");
    stompClient = Stomp.over(sockJS);
    stompClient.debug = null; // stompJS console.log 막기

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

    if (chatOther) {
      stompClient.send(
        "/app/chat/message",
        {},
        JSON.stringify({ ...chatMessage, sender: chatOther }),
      );
    }
    setLoading(false);
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

  const onDisconnected = (isDone) => {
    if (stompClient !== null) {
      stompClient.disconnect();
      stompClient = null;

      // 경매 거래 완료 -> isDone === true
      if (isDone) {
        dispatch(doneAuction(auctionId));
        navigate(`/auctionReview/${auctionId}`);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ChatContainer>
            <Header
              back={true}
              pageName={title}
              menu={true}
              onClickBtn={onClickMenu}
              // onClickTitle={() => navigate(`/auctionDetail/${auctionId}`)}
              onClickBackBtn={() => onDisconnected(false)}
            />

            {/* 경매 남은 시간 */}
            <AuctionTimeWrap isDetail={isDetail}>
              {isDetail ? (
                auctionStatus ? (
                  <>
                    <span>남은 시간</span>
                    <CountdownTimer targetDate={timer(auctionPeriod)} />
                  </>
                ) : (
                  <AuctionTime>경매가 마감되었습니다.</AuctionTime>
                )
              ) : (
                <span>거래후 우측 상단 버튼을 눌러 거래를 완료해주세요.</span>
              )}
            </AuctionTimeWrap>

            {/* 채팅 내역 */}
            <ChatContent id="chat-content" isIOS={isIOS}>
              <ChatMessageList>
                {chatList?.map(
                  (chat, idx) =>
                    chat.type === "TALK" && (
                      <div key={idx}>
                        {chat.sender !== nickName ? (
                          <ChatMessage>
                            {chat.profileImgUrl ? (
                              <MessageProfile
                                src={chat.profileImgUrl}
                                alt="chat-profile"
                              />
                            ) : (
                              <BasicProfile />
                            )}
                            <MessageWrap>
                              <span>{checkNickname(chat.sender)}</span>
                              <Message>
                                <div>{chat.message}</div>
                              </Message>
                            </MessageWrap>
                            <MessageInfo>
                              {/* <MessageChecked>1</MessageChecked> */}
                              <MessageTime>
                                {calcTime(chat.createdAtString)}
                              </MessageTime>
                            </MessageInfo>
                          </ChatMessage>
                        ) : (
                          <ChatMessage isMe={true}>
                            <MessageInfo isMe={true}>
                              {/* <MessageChecked>1</MessageChecked> */}
                              <MessageTime>
                                {calcTime(chat.createdAtString)}
                              </MessageTime>
                            </MessageInfo>
                            <MessageWrap>
                              <Message isMe={true}>
                                <div>{chat.message}</div>
                              </Message>
                            </MessageWrap>
                          </ChatMessage>
                        )}
                      </div>
                    ),
                )}
              </ChatMessageList>
            </ChatContent>

            {/* 채팅 보내기 */}
            <ChatFooter isIOS={isIOS}>
              <ChatFooterContent>
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
              </ChatFooterContent>
              {isIOS ? <SendIOSContainer></SendIOSContainer> : <></>}
            </ChatFooter>
          </ChatContainer>

          {/* 메뉴 모달 */}
          <OptionModal
            minHeight="50px"
            visible={visible}
            setVisible={setVisible}
          >
            <MenuItemList>
              <MenuItem onClick={onClickFinishMenu}>거래 완료하기</MenuItem>
              {/* <MenuItem>차단하기</MenuItem>
          <MenuItem>신고하기</MenuItem> */}
              {/* <MenuItem onClick={onDisconnected}>채팅방 나가기</MenuItem> */}
            </MenuItemList>
          </OptionModal>

          {/* 메뉴 모달의 옵션 클릭 모달 */}
          <ChatOptionModal
             minHeight="260px"
            visible={optionVisible}
            setVisible={setOptionVisible}
          >
            <OptionModalContainer>
              <ModalTextWrap>
                <span>거래가 완료되었나요?</span>
                <span>마이페이지에서 상대방 평가를 할 수 있어요.</span>
              </ModalTextWrap>
              <ModalBtnWrap>
                <Button
                  text="완료할래요"
                  _onClick={() => onDisconnected(true)}
                  style={{
                    width: "100%",
                    ft_weight: "500",
                    color: "#FFFFFF",
                  }}
                />
                <Button
                  text="취소"
                  _onClick={() => setOptionVisible(false)}
                  style={{
                    width: "100%",
                    color: "#646778",
                    bg_color: "#EBEEF3",
                  }}
                />
              </ModalBtnWrap>
            </OptionModalContainer>
          </ChatOptionModal>
        </>
      )}
    </>
  );
};

export default Chat;
