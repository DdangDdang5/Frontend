// React import
import React from "react";

// Package import
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Button from "../../elements/button/Button";
import { FontEvent } from "../../shared/fonts/font";
import { EventImg } from "../../shared/images";

import {
  EventBanner,
  EventCircle,
  EventContent,
  EventDate,
  EventText,
  EventTitle,
} from "../main/Main.styled";
import {
  EventBtnWrap,
  EventContentTitle,
  EventContentWrap,
  EventImgWrap,
  EventInfo,
  EventInfoContent,
  EventInfoType,
} from "./Event.styled";

const Event = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header back={true} pageName="이벤트" share={true} />

      <EventContentWrap>
        <div>
          <EventContentTitle>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra
            erat arcu gravida vel senectus lectus augue eros imperdiet.
          </EventContentTitle>
        </div>

        <EventImgWrap>
          <EventBanner>
            <FontEvent />
            <EventContent>
              <EventDate>09.26 ~ 10.02</EventDate>
              <EventTitle>소중한 의견을 들려주세요!</EventTitle>
              <EventText>
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
            <span>2022.09.19 ~ 2022.09.26</span>
          </div>
          <div>
            <EventInfoType>당첨 인원</EventInfoType>
            <span>5명</span>
          </div>
        </EventInfo>

        <EventInfoContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra erat
          arcu gravida vel senectus lectus augue eros imperdiet. Commodo elit
          eu, augue cras amet. Varius integer fermentum ligula tristique est
          quisque pellentesque turpis. Tortor massa gravida morbi non, eu
          pulvinar in semper nulla. Lorem mi tellus, nec nisl lorem tempus, arcu
          sit ipsum. Diam vestibulum euismod facilisi molestie sed nam
          venenatis. Condimentum turpis ornare elementum duis adipiscing
          pellentesque viverra. Mi dictum egestas fringilla suspendisse cum elit
          adipiscing justo, quisque. Nisl integer ut tincidunt sociis nibh.
        </EventInfoContent>

        <EventBtnWrap>
          <Button
            text="응모하기"
            style={{
              width: "100%",
              height: "56px",
              color: "White",
              fontWeight: "500",
            }}
          />
        </EventBtnWrap>
      </EventContentWrap>
    </div>
  );
};

export default Event;
