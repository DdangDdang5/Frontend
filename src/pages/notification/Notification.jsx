import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import {
  clear,
  getAllNotificationList,
  readNotification,
} from "../../redux/modules/NotificationSlice";
import { LogoClassic, NoAlarm } from "../../shared/images";
import {
  NotifContainer,
  NotifContent,
  NotifInfo,
  NotifItem,
  NotifNone,
  NotifTime,
  NotifTitle,
} from "./Notification.styled";

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberId = sessionStorage.getItem("memberId");
  const notifList = useSelector((state) => state.notification.notifList);

  const getNotificationList = () => {
    // dispatch(clear());
    dispatch(getAllNotificationList(memberId));
  };

  const onClickReadBtn = (id) => {
    dispatch(readNotification(id));
    // getNotificationList();
    // dispatch(getAllNotificationList(memberId));
  };

  useEffect(() => {
    getNotificationList();
  }, []);

  useEffect(() => {
    console.log(notifList);
  }, [notifList]);

  return (
    <NotifContainer>
      <Header close={true} pageName="알림" />
      {notifList.length > 0 ? (
        <NotifContent data={true}>
          {notifList?.map((item) => (
            <NotifItem key={item.notifId} read={item.isRead}>
              {
                {
                  COMMENT: <LogoClassic />,
                  AUCTION: <LogoClassic />,
                }[item.notificationType]
              }

              <NotifInfo
                read={item.isRead}
                onClick={() => onClickReadBtn(item.notificationId)}
              >
                <NotifTitle>{item.title}</NotifTitle>
                <span>{item.content}</span>
              </NotifInfo>

              <NotifTime>Time</NotifTime>
            </NotifItem>
          ))}
        </NotifContent>
      ) : (
        <NotifContent>
          <NotifNone>
            <NoAlarm />
            <div>아직 도착한 알림이 없어요</div>
          </NotifNone>
        </NotifContent>
      )}
    </NotifContainer>
  );
};

export default Notification;
