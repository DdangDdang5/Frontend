// React import
import React, { useState } from "react";

// Package & Element & Shared import
import Header from "../../components/header/Header";
import PageModal from "../../components/modal/PageModal";
import Button from "../../elements/button/Button";
import { FontEvent } from "../../shared/fonts/font";
import { EventImg } from "../../shared/images";

// Style import
import {
  EventBanner,
  EventCircle,
  EventContent,
  EventDate,
  EventText,
  EventTitle,
} from "../../components/swipeImage/SwipeImage.styled";
import {
  EventBtnWrap,
  EventContentTitle,
  EventContentWrap,
  EventImgWrap,
  EventInfo,
  EventInfoContent,
  EventInfoType,
  ModalBtnWrap,
  ModalTextWrap,
  OptionModalContainer,
} from "./Event.styled";

const Event = () => {
  const [sendEvent, setSendEvent] = useState(false);

  const onClickSendEvent = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSeb5BmihSk7ltyQiUnREPJfi3pv2PrDQ4RurPm5IlicOitZHA/viewform",
      "_blank",
    );
    setSendEvent(true);
  };

  return (
    <>
      <div>
        <Header back={true} pageName="이벤트" share={true} />

        <EventContentWrap>
          <div>
            <EventContentTitle>땅땅 설문조사 피드백 이벤트</EventContentTitle>
          </div>

          <EventImgWrap>
            <EventBanner idx={1} isMain={false}>
              <FontEvent />
              <EventContent idx={1}>
                <EventDate idx={1}>09.29 ~ 10.02</EventDate>
                <EventTitle idx={1}>소중한 의견을 들려주세요!</EventTitle>
                <EventText idx={1}>
                  <span>추첨을 통해 총 5분께</span>
                  <span>교촌치킨 기프티콘을 드려요</span>
                </EventText>
              </EventContent>
              <EventImg />
              <EventCircle />
            </EventBanner>
          </EventImgWrap>

          <EventInfo>
            <div>
              <EventInfoType>이벤트 기간</EventInfoType>
              <span>2022.09.29 ~ 2022.10.02</span>
            </div>
            <div>
              <EventInfoType>당첨 인원</EventInfoType>
              <span>5명</span>
            </div>
          </EventInfo>

          <EventInfoContent>
            땅땅과 함께 해주셔서 감사합니다.
            <br />
            땅땅은 여러분의 소중한 피드백과 함께 성장합니다.
            <br />
            <br />
            땅땅을 사용해보시고 가감 없는 의견을 남겨주세요!
            <br />
            저희가 서비스를 준비하면서 모바일 중점적으로 제작하고 있으나, 특정
            핸드폰에서 오작동이 발견될 수 있습니다. 그러한 경우 반드시 피드백을
            주시면 저희가 오류수정을 빠른 시일 내에 진행하도록 하겠습니다.
            <br />
            <br />
            여러분의 소중한 피드백에 대한 보답으로, 추첨을 통해 소정의 선물을
            드리고자 합니다!!
            <br />
            <br />
            <br />
            상품 : 교촌 치킨 (5명) _ [반반 오리지날 웨지 감자세트]
            <br />
            <br />
            <br />
            방문후기를 작성해주신 분들 께 추첨을 통해 치킨을 드립니다! 상품은
            10월 3일 일괄적으로 제공됩니다. 상품 제공을 위해 여러분의 전화번호는
            필수로 기입해주세요!
          </EventInfoContent>

          <div>
            <Button
              text="응모하기"
              style={{
                width: "100%",
                height: "56px",
                color: "White",
                fontWeight: "500",
              }}
              _onClick={onClickSendEvent}
            />
          </div>
        </EventContentWrap>
      </div>

      {/* 메뉴 모달의 옵션 클릭 모달 */}
      {/* <PageModal
        visible={sendEvent}
        setVisible={setSendEvent}
        modalText="응모 완료 되었어요!"
      /> */}
    </>
  );
};

export default Event;
