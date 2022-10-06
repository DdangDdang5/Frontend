// React import
import React, { useEffect, useState } from "react";

// Redux import
import { useSelector, useDispatch } from "react-redux";
import {
  auctionDetailData,
  winAuctionItem,
} from "../../redux/modules/AuctionSlice";

// Package import
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

// Component import
import Header from "../../components/header/Header";
import Slider from "../../components/swipeImage/Slider";
import AuctionJoinModal from "../../components/modal/AuctionJoinModal";
import CountdownTimer from "../../components/countDownTimer/CountDownTimer";
import MenuModal from "../../components/modal/MenuModal";
import AuctionHeart from "../../components/auctionElement/AuctionHeart";
import PageModal from "../../components/modal/PageModal";
import { useCountdown } from "../../components/hooks/UseCountDown";

// Element & Shared import
import Button from "../../elements/button/Button";
import {
  Claim,
  Close,
  Next,
  BasicProfile,
  LogoClassic,
} from "../../shared/images";

// Style import
import {
  AuctionDetailLayout,
  AuctionJoinIcon,
  AuctionJoinModalContent,
  CommentCountContainer,
  CommentCountTitle,
  DetailBodyBox,
  DetailBodyContainer,
  DetailBodyProfileImg,
  DetailBodySelectTag,
  DetailBodyViewTag,
  DetailBodyWrap,
  DetailFooterTimeContainer,
  FooterBidContainer,
  FooterRightBox,
  ItemImgContainer,
  DetailBodyProfileBox,
  DetailBodyProfileContent,
  DetailBodyContent,
  DetailBodyTitle,
  DetailBodyItemTag,
  DetailFooterContainer,
  FooterLeftBox,
  DetailFooterWrap,
  AuctionJoinIconBackground,
  AuctionJoinCloseWrap,
  AuctionNowPriceWrap,
  AuctionJoinInfo,
  AuctionJoinInput,
  AuctionJoinInputInfo,
  CommentCountWrap,
  AuctionNowPrice,
  ButtonContainer,
} from "./AuctionDetail.styled";

var stompClient = null;

const AuctionDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const data = useSelector((state) => state.auction.auction);
  const bid = useSelector((state) => state.auction.bid);

  const nickName = sessionStorage.getItem("memberNickname");
  const memberId = sessionStorage.getItem("memberId");

  const [joinVisible, setJoinVisible] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);

  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
  });

  const [winBid, setWinBid] = useState(false);
  const [chatOther, setChatOther] = useState("");

  const [chatList, setChatList] = useState([]);
  const [userData, setUserData] = useState({
    type: "",
    roomId: data.bidRoomId,
    sender: "",
    message: 0,
    createdAt: "",
  });

  // 타이머 기능
  const timer = (countDown) => {
    const tenMinute = 10 * 60 * 1000;
    const thirtyMinute = tenMinute * 3;
    const sixtyMinute = tenMinute * 6;
    const startTime = Date.parse(data.createdAt);
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

  const [days, hours, minutes, seconds] = useCountdown(
    timer(data?.auctionPeriod)
  );

  const imgList = data?.multiImages;

  // console.log(chatList);
  // console.log(userData);

  const tagsArray = [
    data.tags?.tag2,
    data.tags?.tag1,
    data.tags?.tag3,
    data.tags?.tag4,
    data.tags?.tag5,
    data.tags?.tag6,
  ];

  // 가격표 세자리 변경
  const postPrice = data?.nowPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    if (!params?.auctionId) {
      return <></>;
    } else {
      dispatch(auctionDetailData(+params?.auctionId)).then((res) => {
        if (
          data?.bidRoomId !== undefined &&
          chatList.length === 0 &&
          data?.auctionStatus
        ) {
          registerUser();
        }
      });

      if (data?.auctionStatus === false) {
        dispatch(winAuctionItem(params.auctionId));

        // console.log(bid);
        // console.log(data);

        if (bid) {
          if (bid.seller === nickName || bid.bidder === nickName) {
            setWinBid(true);
            setChatOther(
              [bid.seller, bid.bidder]
                .filter((item) => item !== nickName)
                .join("")
            );
          }
        }
      }
    }
  }, [JSON.stringify(data), JSON.stringify(bid.auctionId)]);

  useEffect(() => {
    dispatch(auctionDetailData(+params?.auctionId));
    // console.log(chatList);
  }, [JSON.stringify(chatList)]);

  if (!data) {
    return navigate(-1);
  }

  const onClickAuctionJoin = () => {
    // 비로그인 -> 세션에 멤버아이디 없음
    if (!memberId) {
      setOptionContent({
        modalText: "로그인이 필요합니다.\n로그인하시겠습니까?",
        btnText: "로그인하기",
        isConfirm: true,
        onClickBtn: () => navigate("/login"),
      });
      setOptionVisible(true);
    } else {
      if (data?.nickname === nickName) {
        setOptionContent({
          modalText: "본인이 생성한 경매는\n 입찰할 수 없습니다.",
          btnText: "",
          isConfirm: false,
          onClickBtn: () => {},
        });
        setOptionVisible(true);
      } else {
        // 입찰 모달 보여줌
        setJoinVisible(true);
        setUserData({ ...userData, message: "" });
      }
    }
  };

  const onClickAuctionChatRoom = () => {
    if (!memberId) {
      setOptionContent({
        modalText: "로그인이 필요합니다.\n로그인하시겠습니까?",
        btnText: "로그인하기",
        isConfirm: true,
        onClickBtn: () => navigate("/login"),
      });
      setOptionVisible(true);
    } else {
      navigate(`/chat/${data.roomId}`, {
        state: {
          auctionId: params?.auctionId,
          auctionCreatedAt: data.createdAt,
          auctionPeriod: data.auctionPeriod,
          auctionStatus: data.auctionStatus,
          isDetail: true,
          title: data.title,
        },
      });
      window.location.reload();
    }
  };

  const onClickAuctionSeller = () => {
    if (nickName && nickName === data?.nickName) {
      navigate("/myPage");
    } else {
      navigate(`/userProfile/${data?.memberId}`);
    }
  };

  const onSubmitAuctionPrice = () => {
    const nowPrice = Math.max(
      data?.nowPrice,
      chatList.length > 0
        ? +chatList[chatList.length - 1]?.message
        : data.startPrice
    );
    // console.log(
    //   data?.nowPrice,
    //   +chatList[chatList.length - 1]?.message,
    //   nowPrice,
    // );
    // console.log(userData?.message);

    if (+userData.message > nowPrice) {
      if (+userData.message > 999999) {
        setOptionContent({
          modalText: "최대 999,999원까지 \n입력할 수 있습니다.",
          btnText: "",
          isConfirm: false,
          onClickBtn: () => {},
        });
        setOptionVisible(true);
      } else {
        sendMessage();
      }
    } else {
      setOptionContent({
        modalText: "현재 최고가보다\n 높은 금액을 입력해야합니다.",
        btnText: "",
        isConfirm: false,
        onClickBtn: () => {},
      });
      setOptionVisible(true);
    }
  };

  // 웹소켓 연결
  const registerUser = () => {
    var sockJS = new SockJS(process.env.REACT_APP_URL + "/wss/chat");
    stompClient = Stomp.over(sockJS);
    stompClient.debug = null; // stompJS console.log 막기

    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe(
      `/topic/chat/room/${data.bidRoomId}`,
      onMessageReceived
    );

    // 채팅방 들어감
    userJoin();
  };

  const onError = (err) => {
    console.log(err);
  };

  const userJoin = () => {
    let chatMessage = {
      type: "ENTER",
      roomId: data.bidRoomId,
      sender: nickName,
      message: data.nowPrice,
    };

    stompClient.send("/app/chat/bid", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    if (payloadData.type === "TALK") {
      chatList.push(payloadData);
      setChatList([...chatList]);
    }
  };

  const sendMessage = () => {
    if (stompClient && userData.message) {
      let chatMessage = {
        type: "TALK",
        roomId: data.bidRoomId,
        sender: nickName,
        message: userData.message,
      };

      stompClient.send("/app/chat/bid", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });

      chatList.push(chatMessage);
      setChatList([...chatList]);

      setJoinVisible(false);
    }
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      // sendMessage();
      onSubmitAuctionPrice();
    }
  };

  const onDisconnected = () => {
    if (stompClient !== null) {
      stompClient.disconnect();
      stompClient = null;
      navigate(-1);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <AuctionDetailLayout>
        <Header
          back={true}
          share={true}
          menu={true}
          onClickBtn={() => setIsMenuModal(!isMenuModal)}
          onClickBackBtn={onDisconnected}
          color="#ffffff"
        />

        <DetailBodyWrap>
          <ItemImgContainer>
            <Slider data={imgList} />
          </ItemImgContainer>

          <DetailBodyContainer>
            <DetailBodyProfileBox>
              <DetailBodyProfileImg onClick={onClickAuctionSeller}>
                {data?.profileImgUrl === null ? (
                  <BasicProfile className="noOneImg" />
                ) : (
                  <img src={data?.profileImgUrl} alt="" />
                )}
              </DetailBodyProfileImg>
              <div className="DetailBodyProfile">
                <DetailBodyProfileContent>
                  <div className="nickName">
                    {data?.nickname?.length > 6
                      ? data?.nickname?.split("kakao")[0] + "kakao"
                      : data?.nickname}
                  </div>
                  <div className="trustCount">{data?.trustGrade}</div>
                </DetailBodyProfileContent>
                <div>
                  <Claim />
                </div>
              </div>
            </DetailBodyProfileBox>

            <DetailBodyBox>
              <DetailBodyTitle>{data.title}</DetailBodyTitle>

              <DetailBodySelectTag>
                {data?.direct ? <div>택배</div> : ""}
                {data?.delivery ? <div>직거래</div> : ""}
                {data?.region ? (
                  <div className="region">{data.region}</div>
                ) : (
                  ""
                )}
              </DetailBodySelectTag>

              <DetailBodyContent>{data.content}</DetailBodyContent>
              <DetailBodyViewTag>
                <div>관심 {data.favoriteCnt}</div>
                <div>조회 {data.viewerCnt}</div>
              </DetailBodyViewTag>
              <DetailBodyItemTag>
                {tagsArray?.map((item, index) =>
                  item !== null ? <div key={index}>{`#${item}`}</div> : ""
                )}
              </DetailBodyItemTag>
            </DetailBodyBox>
          </DetailBodyContainer>

          <CommentCountContainer onClick={onClickAuctionChatRoom}>
            <CommentCountWrap>
              <CommentCountTitle>실시간 질문방</CommentCountTitle>
              <p>{data.participantCnt}명 질문중</p>
            </CommentCountWrap>
            <Next />
          </CommentCountContainer>
        </DetailBodyWrap>

        <DetailFooterWrap>
          {/* 타이머 기능 */}
          <DetailFooterTimeContainer>
            {data?.auctionStatus && +minutes + +seconds > 0 ? (
              <>
                <span>남은 시간</span>
                <CountdownTimer targetDate={timer(data.auctionPeriod)} />
              </>
            ) : (
              <div className="auctionState">경매가 마감되었습니다.</div>
            )}
          </DetailFooterTimeContainer>
          <DetailFooterContainer>
            <FooterLeftBox>
              {/* 좋아요 기능 */}
              <div className="likeBox">
                <AuctionHeart params={params} />
              </div>
              <div className="priceBox">
                <div className="presentPrice">최근 입찰가</div>
                {/* {console.log(Math.max(data.nowPrice, data.startPrice, +chatList[chatList.length - 1]?.message))} */}
                <div className="price">
                  {Math.max(
                    data?.nowPrice,
                    chatList.length > 0
                      ? chatList[chatList.length - 1]?.message
                      : data?.startPrice
                  )
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </div>
              </div>
            </FooterLeftBox>
            {memberId === null ? (
              <FooterRightBox>
                <button onClick={onClickAuctionJoin}>입찰하기</button>
              </FooterRightBox>
            ) : data?.auctionStatus ? (
              <FooterRightBox>
                <button onClick={onClickAuctionJoin}>입찰하기</button>
              </FooterRightBox>
            ) : winBid ? (
              <FooterBidContainer>
                <Button
                  text="채팅방으로 이동"
                  _onClick={() => {
                    navigate(`/chat/${bid.roomId}`, {
                      state: {
                        auctionId: params.auctionId,
                        isDetail: false,
                        title: data.title,
                        chatOther: chatOther,
                      },
                    });
                    window.location.reload();
                  }}
                  style={{
                    width: "165px",
                    ft_weight: "500",
                    color: "#FFFFFF",
                    bg_color: "#1DC79A",
                  }}
                />
              </FooterBidContainer>
            ) : (
              <FooterBidContainer>
                <Button
                  text="입찰종료"
                  style={{
                    width: "165px",
                    ft_weight: "500",
                    color: "#646778",
                    bg_color: "#EBEEF3",
                  }}
                />
              </FooterBidContainer>
            )}
          </DetailFooterContainer>
        </DetailFooterWrap>
      </AuctionDetailLayout>

      {/* 경매 메뉴 모달 */}
      <>
        {isMenuModal ? (
          <MenuModal
            data={data}
            isMenuModal={isMenuModal}
            setIsMenuModal={setIsMenuModal}
            id={params.auctionId.toString()}
          />
        ) : (
          ""
        )}
      </>

      {/* 경매 입찰 모달 */}
      <AuctionJoinModal visible={joinVisible} setVisible={setJoinVisible}>
        <AuctionJoinModalContent>
          <AuctionJoinIcon>
            h
            <AuctionJoinIconBackground />
            <LogoClassic />
          </AuctionJoinIcon>

          <AuctionJoinCloseWrap>
            <Close onClick={() => setJoinVisible(false)} />
          </AuctionJoinCloseWrap>
          <AuctionNowPriceWrap>
            <span>현재 최고가</span>
            <AuctionNowPrice>
              {Math.max(
                data.nowPrice,
                chatList.length > 0
                  ? +chatList[chatList.length - 1]?.message
                  : data.startPrice
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </AuctionNowPrice>
          </AuctionNowPriceWrap>
          <AuctionJoinInfo>
            입찰 후에는 금액을 수정하거나 취소할 수 없습니다.
            <br />
            최대 999,999원까지 입력할 수 있습니다.
          </AuctionJoinInfo>
          <AuctionJoinInput
            type="number"
            value={userData.message}
            maxLength="6"
            // onInput={(event) =>
            //   event.value.length > event.maxLength
            //     ? (event.value = event.value.slice(0, event.maxLength))
            //     : null
            // }
            onChange={(event) =>
              setUserData({ ...userData, message: event.target.value })
            }
            onKeyDown={(event) => onKeyPress(event)}
            placeholder="입찰 가격을 입력해주세요."
          />
          {/* {console.log(+userData.message, data.nowPrice)} */}
          {+userData.message <=
          Math.max(
            data.nowPrice,
            chatList.length > 0
              ? +chatList[chatList.length - 1]?.message
              : data.startPrice
          ) ? (
            <AuctionJoinInputInfo>
              현재 최고가보다 낮은 호가입니다.
            </AuctionJoinInputInfo>
          ) : (
            <AuctionJoinInputInfo></AuctionJoinInputInfo>
          )}
          <ButtonContainer>
            <Button
              type={"submit"}
              text={"입찰하기"}
              _onClick={() => onSubmitAuctionPrice()}
              style={{
                width: "100%",
                height: "56px",
                color: "#FFFFFF",
              }}
            />
          </ButtonContainer>
        </AuctionJoinModalContent>
      </AuctionJoinModal>

      <PageModal
        visible={optionVisible}
        setVisible={setOptionVisible}
        modalText={optionContent.modalText}
        btnText={optionContent.btnText}
        isConfirm={optionContent.isConfirm}
        onClickBtn={optionContent.onClickBtn}
      />
    </>
  );
};

export default AuctionDetail;
