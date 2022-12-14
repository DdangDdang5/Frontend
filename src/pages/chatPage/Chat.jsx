// React import
import React, { useEffect, useState } from "react";

// Redux import
import { doneAuction } from "../../redux/modules/AuctionSlice";
import { getChatMessageList } from "../../redux/modules/ChatSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isIOS } from "react-device-detect";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// Component import
import Header from "../../components/header/Header";
import PageModal from "../../components/modal/PageModal";
import ChatOptionModal from "../../components/modal/ChatOptionModal";
import CountdownTimer from "../../components/countDownTimer/CountDownTimer";
import { useCountdown } from "../../components/hooks/UseCountDown";

// Page & Shared import
import Loading from "../etcPage/Loading";
import { Add, BasicProfile, Send } from "../../shared/images";

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
  MessageInfo,
  MessageInput,
  MessageProfile,
  MessageTime,
  MessageWrap,
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

  const [loading, setLoading] = useState(true); // 로딩 화면

  const [visible, setVisible] = useState(false); // 채팅 메뉴 모달
  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
  });

  const [chatList, setChatList] = useState([]); // 웹소켓 연결 시 메시지 저장
  const [userData, setUserData] = useState({
    type: "",
    roomId: roomId,
    sender: "",
    message: "",
    createdAt: "",
  });

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

  const [days, hours, minutes, seconds] = useCountdown(timer(auctionPeriod));

  const initialChat = async () => {
    await setLoading(true);
    await registerUser();
    await scrollToBottom();
  };

  useEffect(() => {
    initialChat();
  }, []);

  useEffect(() => {
    dispatch(getChatMessageList(roomId));

    // 기존 채팅방에 채팅 메시지가 존재할 시
    if (chatMessageList[0]?.data?.length > 0) {
      if (chatList.length > 0) {
        setChatList([...chatMessageList[0].data]);
      } else {
        chatList.push(...chatMessageList[0].data);
        setChatList([...chatList]);
      }
    }
  }, [JSON.stringify(chatMessageList)]);

  // 웹소켓 메시지 송/수신 시 채팅 스크롤 최하단으로
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  // 채팅 입력창 클릭
  const onClickInput = () => {
    // 비로그인 -> 세션에 닉네임 없음
    if (!nickName) {
      setOptionContent({
        modalText: "로그인이 필요합니다.\n 로그인하시겠습니까?",
        btnText: "로그인하기",
        isConfirm: true,
        onClickBtn: () => navigate("/login"),
      });
      setOptionVisible(true);
    }
  };

  // 채팅 메뉴 모달 클릭
  const onClickMenu = () => {
    if (auctionStatus === false || auctionStatus === true) {
      setOptionContent({
        modalText: "1:1 채팅에서만 확인 가능합니다.",
        btnText: "",
        isConfirm: false,
        onClickBtn: () => {},
      });
      setOptionVisible(true);
    } else {
      setVisible(true);
    }
  };

  // 채팅 메뉴 모달 중 "거래 완료하기" 클릭
  const onClickFinishMenu = () => {
    dispatch(doneAuction(auctionId)).then((res) => {
      let state = res.payload.seller
        ? res.payload.sellerDone
        : res.payload.bidderDone;
      if (state) {
        setOptionContent({
          modalText: "이미 평가가 완료되었습니다.",
          btnText: "",
          isConfirm: false,
          onClickBtn: () => {},
        });
      } else {
        setOptionContent({
          modalText:
            "거래가 완료되었나요?\n마이페이지에서 상대방 평가를 할 수 있어요.",
          btnText: "완료할래요",
          isConfirm: true,
          onClickBtn: () => onDisconnected(true),
        });
      }
      setVisible(false);
      setOptionVisible(true);
    });
  };

  // 채팅 메시지 시간 계산
  const calcTime = (createdAt) => {
    if (isIOS) {
      const [hours, minutes, seconds] = createdAt?.split(" ")[1]?.split(":");
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

  // kakao 로그인 시 닉네임 수정
  const checkNickname = (nickName) => {
    if (nickName.includes("kakao")) {
      return (nickName = nickName.split("kakao")[0] + "kakao");
    } else {
      return nickName;
    }
  };

  // 채팅 스크롤 최하단으로
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
    stompClient.subscribe(`/topic/chat/room/${roomId}`, onMessageReceived);

    userJoin();
    scrollToBottom();
  };

  const onError = (err) => {
  };

  // 웹소켓 채팅방 입장
  const userJoin = () => {
    let chatMessage = {
      type: "ENTER",
      roomId: roomId,
      sender: nickName,
      message: "",
    };

    stompClient.send("/app/chat/message", {}, JSON.stringify(chatMessage));

    // 1:1 채팅 시 상대방 닉네임을 안다면 상대방도 입장
    if (chatOther) {
      stompClient.send(
        "/app/chat/message",
        {},
        JSON.stringify({ ...chatMessage, sender: chatOther }),
      );
    }
    setLoading(false);
  };

  // 웹소켓 메시지 수신
  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    if (payloadData.type === "ENTER" || payloadData.type === "TALK") {
      chatList.push(payloadData);
      setChatList([...chatList]);
    }

    scrollToBottom();
  };

  // 웹소켓 메시지 송신
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

  // 채팅 시 엔터키 입력 -> 채팅
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // 웹소켓 연결 해제
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
              onClickBackBtn={() => onDisconnected(false)}
            />

            {/* 경매 남은 시간 */}
            <AuctionTimeWrap isDetail={isDetail}>
              {isDetail ? (
                auctionStatus && +minutes + +seconds > 0 ? (
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
												{/* 채팅 메시지 본인이 아닐 때 */}
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
													// 채팅 메시지 본인일 때
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

          {/* 채팅 메뉴 모달 */}
          <ChatOptionModal
            minHeight="50px"
            visible={visible}
            setVisible={setVisible}
          >
            <MenuItemList>
              <MenuItem onClick={onClickFinishMenu}>거래 완료하기</MenuItem>
              {/* <MenuItem>차단하기</MenuItem>
          		<MenuItem>신고하기</MenuItem>
              <MenuItem onClick={onDisconnected}>채팅방 나가기</MenuItem> */}
            </MenuItemList>
          </ChatOptionModal>

          {/* 메뉴 모달의 옵션 클릭 모달 */}
          <PageModal
            visible={optionVisible}
            setVisible={setOptionVisible}
            modalText={optionContent.modalText}
            btnText={optionContent.btnText}
            isConfirm={optionContent.isConfirm}
            onClickBtn={optionContent.onClickBtn}
          />
        </>
      )}
    </>
  );
};

export default Chat;
