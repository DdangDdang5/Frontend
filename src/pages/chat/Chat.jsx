// React import
import React, { useEffect, useState } from "react";
import { isIOS } from "react-device-detect";

// Redux import
import { doneAuction } from "../../redux/modules/AuctionSlice";
import {
  clearChatMessageList,
  getChatMessageList,
} from "../../redux/modules/ChatSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// Component & Element & Shared import
import Header from "../../components/header/Header";
import PageModal from "../../components/modal/PageModal";
import OptionModal from "../../components/modal/OptionModal";
import CountdownTimer from "../../components/countDownTimer/CountDownTimer";
import Button from "../../elements/button/Button";
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
import { useCountdown } from "../../components/hooks/UseCountDown";

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
    (state) => state.chat.chatMessageList
  ).filter((item) => item.roomId === roomId);

  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false); // 채팅 메뉴 모달
  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
  });

  const [chatList, setChatList] = useState([]);
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
				console.log(dateTimeAfterTenMinute)
        return dateTimeAfterTenMinute;
      case 30:
				console.log(dateTimeAfterThirtyMinute)
        return dateTimeAfterThirtyMinute;
      case 60:
				console.log(dateTimeAfterSixtyMinute)
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
        JSON.stringify({ ...chatMessage, sender: chatOther })
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
                    )
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
            setVisible={setVisible}>
            <MenuItemList>
              <MenuItem onClick={onClickFinishMenu}>거래 완료하기</MenuItem>
              {/* <MenuItem>차단하기</MenuItem>
          <MenuItem>신고하기</MenuItem> */}
              {/* <MenuItem onClick={onDisconnected}>채팅방 나가기</MenuItem> */}
            </MenuItemList>
          </OptionModal>

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
