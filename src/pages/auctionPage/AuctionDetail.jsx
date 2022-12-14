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
import LogoClassic from "../../shared/images/logo/LogoClassic.png";
import { Claim, Close, Next, BasicProfile } from "../../shared/images";

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

  const [joinVisible, setJoinVisible] = useState(false); // ?????? ??????
  const [isMenuModal, setIsMenuModal] = useState(false); // ?????? ???????????? ??????

  const [optionVisible, setOptionVisible] = useState(false); // alert ??????
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
  });

  const [winBid, setWinBid] = useState(false); // ?????????, ??????????????? ??????
  const [chatOther, setChatOther] = useState(""); // 1:1 ?????? ????????? ?????????

  const [chatList, setChatList] = useState([]); // ????????? ?????? ??? ????????? ??????
  const [userData, setUserData] = useState({
    type: "",
    roomId: data.bidRoomId,
    sender: "",
    message: 0,
    createdAt: "",
  });

  // ????????? ??????
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
        return <div>????????? ?????????????????????.</div>;
    }
  };

  const [days, hours, minutes, seconds] = useCountdown(
    timer(data?.auctionPeriod)
  );

  const imgList = data?.multiImages;

  const tagsArray = [
    data.tags?.tag2,
    data.tags?.tag1,
    data.tags?.tag3,
    data.tags?.tag4,
    data.tags?.tag5,
    data.tags?.tag6,
  ];

  useEffect(() => {
    if (!params?.auctionId) {
      return <></>;
    } else {
      dispatch(auctionDetailData(+params?.auctionId)).then((res) => {
        // ??????????????? ?????? ?????? ???
        if (
          data?.bidRoomId !== undefined &&
          chatList.length === 0 &&
          data?.auctionStatus
        ) {
          registerUser();
        }
      });

      // ?????? ????????? ?????? API ??????
      if (data?.auctionStatus === false) {
        dispatch(winAuctionItem(params.auctionId));

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
  }, [JSON.stringify(chatList)]);

  if (!data) {
    return navigate(-1);
  }

  // ????????????
  const Declaration = () => {
    if (memberId === null) {
      setOptionContent({
        modalText: "???????????? ???????????????.\n????????????????????????????",
        btnText: "???????????????",
        isConfirm: true,
        onClickBtn: () => navigate("/login"),
      });
      setOptionVisible(true);
    } else {
      setOptionContent({
        modalText: "\n????????? ??????????????????",
      });

      setOptionVisible(true);
    }
  };

  // ???????????? ?????? ?????? -> ?????? ?????? ?????????
  const onClickAuctionJoin = () => {
    // ???????????? -> ????????? ??????????????? ??????
    if (!memberId) {
      setOptionContent({
        modalText: "???????????? ???????????????.\n????????????????????????????",
        btnText: "???????????????",
        isConfirm: true,
        onClickBtn: () => navigate("/login"),
      });
      setOptionVisible(true);
    } else {
      if (data?.nickname === nickName) {
        setOptionContent({
          modalText: "????????? ????????? ?????????\n ????????? ??? ????????????.",
          btnText: "",
          isConfirm: false,
          onClickBtn: () => {},
        });
        setOptionVisible(true);
      } else {
        // ?????? ?????? ?????????
        setJoinVisible(true);
        setUserData({ ...userData, message: "" });
      }
    }
  };

  // ????????? ????????? ??????
  const onClickAuctionChatRoom = () => {
    if (!memberId) {
      setOptionContent({
        modalText: "???????????? ???????????????.\n????????????????????????????",
        btnText: "???????????????",
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

  // ?????? ?????????(?????????) ????????? ??????
  const onClickAuctionSeller = () => {
    if (nickName && nickName === data?.nickName) {
      navigate("/myPage");
    } else {
      navigate(`/userProfile/${data?.memberId}`);
    }
  };

  // ?????? ?????? ?????? ?????? ??? ??????
  const onSubmitAuctionPrice = () => {
    const nowPrice = Math.max(
      data?.nowPrice,
      chatList.length > 0
        ? +chatList[chatList.length - 1]?.message
        : data.startPrice
    );

    if (+userData.message > nowPrice) {
      if (+userData.message > 999999) {
        setOptionContent({
          modalText: "?????? 999,999????????? \n????????? ??? ????????????.",
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
        modalText: "?????? ???????????????\n ?????? ????????? ?????????????????????.",
        btnText: "",
        isConfirm: false,
        onClickBtn: () => {},
      });
      setOptionVisible(true);
    }
  };

  // ????????? ??????
  const registerUser = () => {
    var sockJS = new SockJS(process.env.REACT_APP_URL + "/wss/chat");
    stompClient = Stomp.over(sockJS);
    stompClient.debug = null; // stompJS console.log ??????

    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    // ????????? ??????
    stompClient.subscribe(
      `/topic/chat/room/${data.bidRoomId}`,
      onMessageReceived
    );

    userJoin();
  };

  const onError = (err) => {
    console.log(err);
  };

  // ????????? ????????? ??????(??????)
  const userJoin = () => {
    let chatMessage = {
      type: "ENTER",
      roomId: data.bidRoomId,
      sender: nickName,
      message: data.nowPrice,
    };

    stompClient.send("/app/chat/bid", {}, JSON.stringify(chatMessage));
  };

  // ????????? ????????? ??????
  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    if (payloadData.type === "TALK") {
      chatList.push(payloadData);
      setChatList([...chatList]);
    }
  };

  // ????????? ????????? ??????
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

  // ?????? ?????? ??? ????????? ?????? -> ??????
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmitAuctionPrice();
    }
  };

  // ????????? ?????? ??????
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

                <div onClick={() => Declaration()}>
                  <Claim />
                </div>
              </div>
            </DetailBodyProfileBox>

            <DetailBodyBox>
              <DetailBodyTitle>{data.title}</DetailBodyTitle>

              <DetailBodySelectTag>
                {data?.direct ? <div>??????</div> : ""}
                {data?.delivery ? <div>?????????</div> : ""}
                {data?.region ? (
                  <div className="region">{data.region}</div>
                ) : (
                  ""
                )}
              </DetailBodySelectTag>

              <DetailBodyContent>{data.content}</DetailBodyContent>
              <DetailBodyViewTag>
                <div>?????? {data.favoriteCnt}</div>
                <div>?????? {data.viewerCnt}</div>
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
              <CommentCountTitle>????????? ?????????</CommentCountTitle>
              <p>{data.participantCnt}??? ?????????</p>
            </CommentCountWrap>
            <Next />
          </CommentCountContainer>
        </DetailBodyWrap>

        <DetailFooterWrap>
          {/* ????????? ?????? */}
          <DetailFooterTimeContainer>
            {data?.auctionStatus && +minutes + +seconds > 0 ? (
              <>
                <span>?????? ??????</span>
                <CountdownTimer targetDate={timer(data.auctionPeriod)} />
              </>
            ) : (
              <div className="auctionState">????????? ?????????????????????.</div>
            )}
          </DetailFooterTimeContainer>
          <DetailFooterContainer>
            <FooterLeftBox>
              {/* ????????? ?????? */}
              <div className="likeBox">
                <AuctionHeart params={params} />
              </div>
              <div className="priceBox">
                <div className="presentPrice">?????? ?????????</div>
                <div className="price">
                  {Math.max(
                    data?.nowPrice,
                    chatList.length > 0
                      ? chatList[chatList.length - 1]?.message
                      : data?.startPrice
                  )
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  ???
                </div>
              </div>
            </FooterLeftBox>
            {memberId === null ? (
              <FooterRightBox>
                <button onClick={onClickAuctionJoin}>????????????</button>
              </FooterRightBox>
            ) : data?.auctionStatus ? (
              <FooterRightBox>
                <button onClick={onClickAuctionJoin}>????????????</button>
              </FooterRightBox>
            ) : winBid ? (
              <FooterBidContainer>
                <Button
                  text="??????????????? ??????"
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
                  text="????????????"
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

      {/* ?????? ?????? ?????? */}
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

      {/* ?????? ?????? ?????? */}
      <AuctionJoinModal visible={joinVisible} setVisible={setJoinVisible}>
        <AuctionJoinModalContent>
          <AuctionJoinIcon>
            <AuctionJoinIconBackground />
            <img src={LogoClassic} alt="logo" />
          </AuctionJoinIcon>

          <AuctionJoinCloseWrap>
            <Close onClick={() => setJoinVisible(false)} />
          </AuctionJoinCloseWrap>
          <AuctionNowPriceWrap>
            <span>?????? ?????????</span>
            <AuctionNowPrice>
              {Math.max(
                data.nowPrice,
                chatList.length > 0
                  ? +chatList[chatList.length - 1]?.message
                  : data.startPrice
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              ???
            </AuctionNowPrice>
          </AuctionNowPriceWrap>
          <AuctionJoinInfo>
            ?????? ????????? ????????? ??????????????? ????????? ??? ????????????.
            <br />
            ?????? 999,999????????? ????????? ??? ????????????.
          </AuctionJoinInfo>
          <AuctionJoinInput
            type="number"
            value={userData.message}
            maxLength="6"
            onChange={(event) =>
              setUserData({ ...userData, message: event.target.value })
            }
            onKeyDown={(event) => onKeyPress(event)}
            placeholder="?????? ????????? ??????????????????."
          />
          {+userData.message <=
          Math.max(
            data.nowPrice,
            chatList.length > 0
              ? +chatList[chatList.length - 1]?.message
              : data.startPrice
          ) ? (
            <AuctionJoinInputInfo>
              ?????? ??????????????? ?????? ???????????????.
            </AuctionJoinInputInfo>
          ) : (
            <AuctionJoinInputInfo></AuctionJoinInputInfo>
          )}
          <ButtonContainer>
            <Button
              type={"submit"}
              text={"????????????"}
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

      {/* alert ?????? */}
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
