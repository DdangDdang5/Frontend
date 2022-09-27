// React import
import { useEffect, useState } from "react";

// Package import
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isIOS, isMacOs, isSafari } from "react-device-detect";
import styled from "styled-components";

// Page import
import Main from "../src/pages/main/Main";
import Login from "../src/pages/login/Login";
import SignUp from "../src/pages/signUp/SignUp";
import MyPage from "./pages/myPage/MyPage";
import MyPageEdit from "./pages/myPage/MyPageEdit";
import Search from "../src/pages/search/Search";
import Chat from "../src/pages/chat/Chat";
import ChatList from "../src/pages/chatList/ChatList";
import AuctionList from "../src/pages/auctionList/AuctionList";
import AuctionWrite from "../src/pages/auctionWrite/AuctionWrite";
import AuctionDetail from "../src/pages/auctionDetail/AuctionDetail";
import AuctionReview from "./pages/auctionReview/AuctionReview";
import MyGrade from "./pages/myGrade/MyGrade";
import MyPageParticipationAuction from "./pages/myPage/MyPageParticipationAuction";
import MyPageInterestAuction from "./pages/myPage/MyPageInterestAuction";
import MyPageMyAuction from "./pages/myPage/MyPageMyAuction";
import AuctionEdit from "./pages/auctionEdit/AuctionEdit";
import Notification from "./pages/notification/Notification";
import NotFound from "./pages/notFound/NotFound";
import Event from "./pages/event/Event";
import EventList from "./pages/eventList/EventList";
import Loading from "./pages/loading/Loading";

// Component & Shared import
import Kakao from "./shared/Kakao";
import CategoryModal from "./components/modal/CategoryModal";
import UserProfile from "./pages/userProfile/UserProfile";

// Style import
import { FontRegular } from "./shared/fonts/font";

// Notification import
import { onMessageListener } from "./firebaseInit";
import Notifications from "./components/notification/Notification";
import ReactNotificationComponent from "./components/notification/ReactNotification";
import { ToastNotification } from "./pages/notification/ToastNotification";
import { add } from "./redux/modules/NotificationSlice";
import MypageEdit from "./pages/myPage/MyPageEdit";

function App() {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modal.show);

  // 알림
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  // if (!((isIOS || isMacOs) && isSafari)) {
  //   onMessageListener()
  //     .then((payload) => {
  //       setShow(true);
  //       setNotification({
  //         title: payload.notification.title,
  //         body: payload.notification.body,
  //       });
  //       console.log(payload);
  //     })
  //     .catch((err) => console.log("failed: ", err));
  // }

  // useEffect(() => {
  //   // 경매 생성 시 알림!!!!
  //   let url = process.env.REACT_APP_URL + "/auction/stream";
  //   const sse = new EventSource(url);
  // 	console.log(sse);

  // 	sse.onmessage = (event) => {
  // 		console.log(event);
  // 	}

  //   sse.addEventListener("post-list-event", (event) => {
  //     const data = JSON.parse(event.data);
  // 		console.log(event);
  //   });

  //   sse.onerror = (error) => {
  // 		console.log('error post-list-event');
  // 		console.log(error)
  //     sse.close();
  //   };

  //   return () => {
  //     sse.close();
  //   };
  // }, []);

  const notifToastList = useSelector(
    (state) => state.notification.notifToastList
  );

  // console.log(notifToastList);
  // const EventSource = NativeEventSource || EventSourcePolyfill;

  useEffect(() => {
    let url =
      process.env.REACT_APP_URL +
      "/subscribe/" +
      sessionStorage.getItem("memberId");
    const sse = new EventSource(url);

    sse.onopen = (event) => {
      console.log("connection opened", event);
    };

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };

    sse.addEventListener("sse", (event) => {
      const data = JSON.parse(event.data);
      console.log(event);
      console.log(data);
      dispatch(add({ newNotifs: data }));
    });

    sse.onerror = (error) => {
      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

  return (
    <AppContainer>
      <FontRegular />
      <div></div>
      {/* {!((isIOS || isMacOs) && isSafari) && show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      {!((isIOS || isMacOs) && isSafari) ? <Notifications /> : <></>} */}

      {notifToastList?.map((item) => (
        <ToastNotification notif={item} />
      ))}

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myPageEdit" element={<MyPageEdit />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat/:roomId" element={<Chat />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/auctionList" element={<AuctionList />} />
        <Route path="/auctionWrite" element={<AuctionWrite />} />
        <Route path="/auctionEdit/:auctionId" element={<AuctionEdit />} />
        <Route path="/auctionDetail/:auctionId" element={<AuctionDetail />} />
        <Route path="/auctionReview/:auctionId" element={<AuctionReview />} />
        <Route path="/member/kakao/callback" element={<Kakao />} />
        <Route path="/myGrade/:memberId" element={<MyGrade />} />
        <Route path="/myPageMyAuction" element={<MyPageMyAuction />} />
        <Route
          path="/myPageParticipationAuction"
          element={<MyPageParticipationAuction />}
        />
        <Route
          path="/myPageInterestAuction"
          element={<MyPageInterestAuction />}
        />
        <Route path="/userProfile/:memberId" element={<UserProfile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/event/:eventId" element={<Event />} />
        <Route path="/eventList" element={<EventList />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      {modal && <CategoryModal />}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
`;

export default App;
