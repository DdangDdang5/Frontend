// React import
import React from "react";
import { useNavigate } from "react-router-dom";

// Component import
import Header from "../../components/header/Header";
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
  EventItem,
  EventListContainer,
  EventListContent,
} from "./EventList.styled";

const EventList = () => {
  const navigate = useNavigate();

  return (
    <EventListContainer>
      {/* <Header back={true} pageName="이벤트" alarm={true} /> */}
      <Header back={true} pageName="이벤트" />

      <EventListContent>
        {Array.from({ length: 1 }, (_, idx) => (
          <EventItem key={idx} onClick={() => navigate("/event/1")}>
            <EventBanner idx={1} isMain={false}>
              <FontEvent />
              <EventContent idx={1}>
                <EventDate idx={1}>09.27 ~ 10.02</EventDate>
                <EventTitle idx={1}>소중한 의견을 들려주세요!</EventTitle>
                <EventText>
                  <span>추첨을 통해 총 5분께</span>
                  <span>교촌치킨 기프티콘을 드려요</span>
                </EventText>
              </EventContent>
              <EventImg />
              <EventCircle />
            </EventBanner>
          </EventItem>
        ))}
      </EventListContent>
    </EventListContainer>
  );
};

export default EventList;
