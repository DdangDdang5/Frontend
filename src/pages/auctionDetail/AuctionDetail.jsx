// React import
import React, { useEffect, useState } from "react";

// Reducer import
import { useSelector, useDispatch } from "react-redux";
import {
  auctionDetailData,
  auctionFavorite,
  winAuctionItem,
} from "../../redux/modules/AuctionSlice";

// Package import
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";

// Component import
import Header from "../../components/header/Header";
import Slider from "../../components/auction/Slider";
import AuctionJoinModal from "../../components/modal/AuctionJoinModal";

// Element & Shared import
import Button from "../../elements/button/Button";
import { Close, Next } from "../../shared/images";
import CountdownTimer from "../../components/countDownTimer/CountDownTimer";
import MenuModal from "../../components/modal/MenuModal";

var stompClient = null;

const AuctionDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const data = useSelector((state) => state.auction.auction);
  const bid = useSelector((state) => state.auction.bid);
  const favoriteState = useSelector((state) => state.auction.favorite);

  const imgList = data?.multiImages;

  const nickName = sessionStorage.getItem("memberNickname").split("kakao")[0];
  const memberId = sessionStorage.getItem("memberId");

  const [favorite, setfavorite] = useState(favoriteState?.favoriteStatus);

  console.log("디테일배돌", favorite);

  const [joinVisible, setJoinVisible] = useState(false);

  const [isMenuModal, setIsMenuModal] = useState(false);

  const [winBid, setWinBid] = useState(false);

  const [chatList, setChatList] = useState([]);

  const [userData, setUserData] = useState({
    type: "",
    roomId: data.bidRoomId,
    sender: "",
    message: data.nowPrice,
    createdAt: "",
  });

  // memberId !== data.member.id

  useEffect(() => {
    dispatch(auctionFavorite(data.id));
  }, [JSON.stringify(data.id), JSON.stringify(favorite)]);

  useEffect(() => {
    if (!params?.auctionId) {
      return <></>;
    } else {
      dispatch(auctionDetailData(+params?.auctionId)).then((res) => {
        if (data.bidRoomId !== undefined && chatList.length === 0) {
          registerUser();
        }
      });

      const date = new Date(data.createdAt);

      const deadline = new Date(
        date.setDate(date.getDate() + data.auctionPeriod)
      );

      if (deadline <= Date.now()) {
        dispatch(winAuctionItem(params.auctionId));
        if (bid) {
          if (bid.seller === nickName || bid.bidder === nickName) {
            setWinBid(true);
            console.log("me is win the auction");
          }
        }
      } else {
        // console.log("not finish auction", params);
        // console.log(bid);
      }
    }
  }, [JSON.stringify(data), JSON.stringify(bid.auctionId)]);

  useEffect(() => {
    dispatch(auctionDetailData(+params?.auctionId));
  }, [JSON.stringify(chatList)]);

  if (!data) {
    return navigate(-1);
  }

  const onClickAuctionJoin = async () => {
    // 비로그인 -> 세션에 닉네임 없음
    if (!nickName) {
      if (window.confirm("로그인이 필요합니다. 로그인하시겠습니까?")) {
        navigate("/login");
      }
    } else {
      // 입찰 모달 보여줌
      setJoinVisible(true);
    }
  };

  // 웹소켓 연결
  const registerUser = () => {
    var sockJS = new SockJS(process.env.REACT_APP_URL + "/wss/chat");
    stompClient = Stomp.over(sockJS);
    // stompClient.debug = null; // stompJS console.log 막기

    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe(
      `/topic/chat/room/${data.bidRoomId}`,
      onMessageReceived
    );

    // 채팅방 들어감
    // userJoin();
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    if (payloadData.type === "ENTER" || payloadData.type === "TALK") {
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

      stompClient.send(
        "/app/chat/bid",
        {},
        JSON.stringify({ ...chatMessage, type: "ENTER" })
      );

      stompClient.send("/app/chat/bid", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });

      setJoinVisible(false);
    }
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // 타이머 기능
  const timer = (countDown) => {
    const oneDay = 1 * 24 * 60 * 60 * 1000;
    const fiveDay = oneDay * 5;
    const sevenDay = oneDay * 7;
    const startTime = Date.parse(data.createdAt);
    const dateTimeAfterOneDays = startTime + oneDay;
    const dateTimeAfterFiveDays = startTime + fiveDay;
    const dateTimeAfterSevenDays = startTime + sevenDay;

    switch (countDown) {
      case 1:
        return dateTimeAfterOneDays;
      case 5:
        return dateTimeAfterFiveDays;
      case 7:
        return dateTimeAfterSevenDays;
      default:
        return <div>기간이 끝났습니다</div>;
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
        />

        <DetailBodyWrap>
          <ItemImgContainer>
            <Slider data={imgList} />
          </ItemImgContainer>

          <DetailBodyContainer>
            <DetailBodyProfileBox>
              <DetailBodyProfileImg>
                <img src={data.member.profileImgUrl} alt="" />
              </DetailBodyProfileImg>
              <div className="DetailBodyProfile">
                <DetailBodyProfileContent>
                  <div className="nickName">{data.member.nickName}</div>
                  <div className="trustCount">신뢰도</div>
                </DetailBodyProfileContent>
                <div>신고</div>
              </div>
            </DetailBodyProfileBox>

            <DetailBodyTitle>{data.title}</DetailBodyTitle>

            <DetailBodySelectTag>
              {data.direct ? <div>택배</div> : ""}
              {data.delivery ? <div>직거래</div> : ""}
              {data.region ? <div>{data.region}</div> : ""}
            </DetailBodySelectTag>

            <DetailBodyContent>{data.content}</DetailBodyContent>
            <DetailBodyViewTag>
              <div>관심 10</div>
              <div>조회 {data.viewerCnt}</div>
            </DetailBodyViewTag>
            <DetailBodyItemTag></DetailBodyItemTag>
          </DetailBodyContainer>

          <CommentCountContainer
            onClick={() =>
              navigate(`/chat/${data.chatRoomId}`, {
                state: {
                  auctionId: params?.auctionId,
                  isDetail: true,
                  title: data.title,
                },
              })
            }>
            <CommentCountWrap>
              <CommentCountTitle>실시간 채팅방</CommentCountTitle>
              <p>{data.participantCnt}명 참여중</p>
            </CommentCountWrap>
            <Next />
          </CommentCountContainer>
        </DetailBodyWrap>

        <DetailFooterWrap>
          <DetailFooterTimeContainer>
            <p>남은 시간</p>

            <CountdownTimer targetDate={timer(data.auctionPeriod)} />
            {/* <Timer date={data.createdAt} /> */}
          </DetailFooterTimeContainer>
          <DetailFooterContainer>
            <FooterLeftBox>
              <div onClick={() => setfavorite(!favorite)} className="likeBox">
                {favorite ? (
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.88 0.503374C17.02 -0.666625 13.79 0.273371 12 2.59337C10.76 0.983371 8.80999 0.00337448 6.67999 0.00337448C2.98999 0.00337448 0 2.95336 0 6.58336C0 14.4334 11.08 20.6334 11.55 20.8934C11.69 20.9734 11.84 21.0134 12 21.0134C12.16 21.0134 12.31 20.9734 12.45 20.8934C12.92 20.6334 24 14.4434 24 6.58336C23.99 3.91336 22.37 1.53337 19.88 0.503374Z"
                      fill="#FF664D"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="21"
                    viewBox="0 0 24 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.005 21C11.8549 21 11.6949 20.96 11.5548 20.8801C11.0846 20.6202 0 14.4342 0 6.57918C0 2.9515 3.00124 0.00337233 6.68277 0.00337233C8.80365 0.00337233 10.7545 0.982745 12.005 2.59172C13.8057 0.273197 17.0271 -0.666201 19.8883 0.503054C22.3893 1.5224 24 3.91089 24 6.5692C24 14.4142 12.9154 20.6102 12.4452 20.8701C12.3151 20.96 12.1551 21 12.005 21ZM6.68277 1.8422C4.01166 1.8422 1.84078 3.97084 1.84078 6.58917C1.84078 12.5654 9.97417 17.822 11.995 19.0313C14.0158 17.822 22.1492 12.5554 22.1492 6.58917C22.1492 4.67039 20.9787 2.9415 19.168 2.20197C16.7069 1.19261 13.8658 2.34189 12.8354 4.76035C12.6953 5.10013 12.3551 5.31999 11.985 5.31999C11.6148 5.31999 11.2747 5.10013 11.1346 4.76035C10.3943 2.98148 8.64359 1.8422 6.68277 1.8422Z"
                      fill="#A5A9B6"
                    />
                  </svg>
                )}
              </div>
              <div className="priceBox">
                <div className="presentPrice">최근 입찰가</div>
                {/* {console.log(Math.max(data.nowPrice, data.startPrice, +chatList[chatList.length - 1]?.message))} */}
                <div className="price">{`${data.nowPrice}원`}</div>
              </div>
            </FooterLeftBox>
            {winBid ? (
              <FooterBidContainer>
                <Button
                  text="채팅방으로 이동"
                  _onClick={() => {
                    navigate(`/chat/${bid.roomId}`, {
                      state: {
                        auctionId: params.auctionId,
                        isDetail: false,
                        title: data.title,
                      },
                    });
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
              <FooterRightBox>
                <button onClick={onClickAuctionJoin}>입찰하기</button>
              </FooterRightBox>
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
            id={params.auctionId}
          />
        ) : (
          ""
        )}
      </>

      {/* 경매 입찰 모달 */}
      <AuctionJoinModal visible={joinVisible} setVisible={setJoinVisible}>
        <AuctionJoinModalContent>
          <AuctionJoinIcon>
            <img src="/maskable.png" alt="auction-join" />
          </AuctionJoinIcon>

          <AuctionJoinCloseWrap>
            <Close onClick={() => setJoinVisible(false)} />
          </AuctionJoinCloseWrap>
          <AuctionNowPriceWrap>
            <span>현재 최고가</span>
            <AuctionNowPrice>
              {Math.max(data.startPrice, data.nowPrice)}원
            </AuctionNowPrice>
          </AuctionNowPriceWrap>
          <AuctionJoinInfo>
            입찰 후에는 금액을 수정하거나 취소할 수 없습니다.
          </AuctionJoinInfo>
          <AuctionJoinInput
            type="number"
            value={userData.message}
            onChange={(event) =>
              setUserData({ ...userData, message: event.target.value })
            }
            onKeyDown={(event) => onKeyPress(event)}
            placeholder="입찰 가격을 입력해주세요."
          />
          {userData.message <= Math.max(data.startPrice, data.nowPrice) ? (
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
              _onClick={sendMessage}
              style={{
                width: "100%",
                height: "56px",
                color: "#FFFFFF",
              }}
            />
          </ButtonContainer>
        </AuctionJoinModalContent>
      </AuctionJoinModal>
    </>
  );
};

const AuctionDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const DetailBodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: calc(100vh - 185px);
  overflow: scroll;
`;
const ItemImgContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  /* img {
    width: 100%;
    height: 390px;
  } */
`;
const DetailBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;
const DetailBodyProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
  .DetailBodyProfile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
const DetailBodyProfileImg = styled.div`
  display: flex;
  img {
    height: 48px;
    width: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    margin-right: 11px;
  }
`;
const DetailBodyProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .nickName {
    font-size: 16px;
    font-weight: 700;
  }
  .trustCount {
    font-size: 16px;
    font-weight: 400;
  }
`;

const DetailBodyTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  word-break: break-all;
  margin-bottom: 16px;
`;
const DetailBodySelectTag = styled.div`
  display: flex;
  margin-bottom: 16px;
  div {
    display: flex;
    border-radius: 20px;
    background-color: #dedede;
    padding: 1px 6px;
    margin-right: 6px;
  }
`;
const DetailBodyContent = styled.div`
  display: flex;
  word-break: break-all;
  font-size: 20px;
  height: 100%;
`;
const DetailBodyViewTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 49px;
  gap: 0 9px;

  div {
    font-size: 16px;
    font-weight: 400;
    color: #9b9b9b;
  }
`;

const DetailBodyItemTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 8px;
  height: 22px;
  margin-bottom: 40px;
  div {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;

    padding: 2px 6px;
    border-radius: 100px;
    background-color: #9b9b9b;
    color: white;
  }
`;

const CommentCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 57px;
  padding: 0px 20px;
  border-top: 1px solid #dedede;
  gap: 8px;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: #9b9b9b;
  }

  img {
    width: 16px;
    height: 16px;
  }

  svg {
    width: 10px;
    height: 18px;
    path {
      fill: ${(props) => props.theme.colors.Gray3};
    }
  }
`;

const CommentCountWrap = styled.div`
  display: flex;
  gap: 12px;
`;

const CommentCountTitle = styled.p`
  font-weight: 700 !important;
  color: black !important;
`;

const DetailFooterWrap = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 116px;
  flex-direction: column;
  position: absolute;
  bottom: 0;
`;
const DetailFooterTimeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 42px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  gap: 0 8px;
  p {
    font-size: 14px;
    font-weight: 400;
  }
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;
const DetailFooterContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FooterBidContainer = styled.div`
  margin: auto 12px auto 20px;
`;

const FooterLeftBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin: 10px 0px 11px 20px;
  gap: 12px;
  .likeBox {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .priceBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    .presentPrice {
      display: flex;
      font-size: 14px;
      color: #bcbcbc;
    }
    .price {
      display: flex;
      font-size: 24px;
      font-weight: 700;
    }
  }
`;
const FooterRightBox = styled.div`
  display: flex;
  margin: 13px 20px 14px 0px;
  button {
    display: flex;
    width: 165px;
    height: 47px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 2% auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuctionJoinIcon = styled.div`
  width: 104px;
  height: 104px;

  background-color: ${(props) => props.theme.colors.White};
  border-radius: 50%;

  position: absolute;
  top: -30%;
  right: 50%;
  transform: translate(50%, 50%);

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 82px;
    height: 82px;

    border-radius: 50%;
  }
`;

// const AuctionWrap = styled.div`
// 	background-color: aliceblue;
// 	height: fit-content;
// 	position: absolute;
// 	bottom: 50%;
// 	left: 0;
// 	right: 0;
// `;

const AuctionJoinModalContent = styled.div`
  padding: 20px;
  /* background-color: aliceblue; */
`;

const AuctionJoinCloseWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const AuctionNowPriceWrap = styled.div`
  margin-top: 45px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  span {
    color: ${(props) => props.theme.colors.Black};
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

const AuctionNowPrice = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xl} !important;
  font-weight: ${(props) => props.theme.fontWeights.medium} !important;
`;

const AuctionJoinInfo = styled.p`
  margin-top: 1px;

  color: ${(props) => props.theme.colors.Gray3};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  text-align: center;
`;

const AuctionJoinInput = styled.input`
  width: calc(100% - 30px);
  height: 22px;
  margin-top: 20px;
  padding: 16px 15px;

  background: ${(props) => props.theme.colors.White};
  border: 1px solid ${(props) => props.theme.colors.Gray1};
  border-radius: 8px;
`;

const AuctionJoinInputInfo = styled.p`
  height: 20px;
  margin-top: 8px;

  color: ${(props) => props.theme.colors.Red};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;

export default AuctionDetail;
