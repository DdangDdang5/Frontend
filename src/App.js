// React import
import { useEffect, useState } from "react";

// Package import
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  browserName,
  isIOS,
  isMacOs,
  isSafari,
  osName,
} from "react-device-detect";

// Page import
import Main from "../src/pages/main/Main";
import Login from "../src/pages/login/Login";
import SignUp from "../src/pages/signUp/SignUp";
import MyPage from "./pages/myPage/MyPage";
import ProfileEdit from "../src/pages/profileEdit/ProfileEdit";
import Search from "../src/pages/search/Search";
import Chat from "../src/pages/chat/Chat";
import ChatList from "../src/pages/chatList/ChatList";
import AuctionList from "../src/pages/auctionList/AuctionList";
import AuctionWrite from "../src/pages/auctionWrite/AuctionWrite";
import AuctionDetail from "../src/pages/auctionDetail/AuctionDetail";
import AuctionDone from "../src/pages/auctionDone/AuctionDone";
import AuctionReview from "./pages/auctionReview/AuctionReview";
import MyGrade from "./pages/myGrade/MyGrade";
import MyPageParticipationAuction from "./pages/myPage/MyPageParticipationAuction";
import MyPageInterestAuction from "./pages/myPage/MyPageInterestAuction";
import MyPageMyAuction from "./pages/myPage/MyPageMyAuction";
import AuctionEdit from "./pages/auctionEdit/AuctionEdit";

// Component & Shared import
import Kakao from "./shared/Kakao";
import CategoryModal from "./components/modal/CategoryModal";
import UserProfile from "./pages/userProfile/UserProfile";

// Notification import
import { onMessageListener } from "./firebaseInit";
import Notifications from "./components/notification/Notification";
import ReactNotificationComponent from "./components/notification/ReactNotification";

function App() {
  const modal = useSelector((state) => state.modal.show);

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  // console.log(browserName);
  // console.log(isMobileSafari, isSafari);
  // console.log(isMobile, isBrowser, isIOS, isAndroid);

  if (!((isIOS || isMacOs) && isSafari)) {
    onMessageListener()
      .then((payload) => {
        setShow(true);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
        console.log(payload);
      })
      .catch((err) => console.log("failed: ", err));
  }

  return (
    <div className="App">
      {!((isIOS || isMacOs) && isSafari) && show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      {!((isIOS || isMacOs) && isSafari) ? <Notifications /> : <></>}
      <div>{browserName}</div>
      <div>{osName}</div>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/profileEdit" element={<ProfileEdit />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat/:roomId" element={<Chat />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/auctionList" element={<AuctionList />} />
        <Route path="/auctionWrite" element={<AuctionWrite />} />
        <Route path="/auctionEdit/:auctionId" element={<AuctionEdit />} />
        <Route path="/auctionDetail/:auctionId" element={<AuctionDetail />} />
        <Route path="/auctionDone" element={<AuctionDone />} />
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
      </Routes>
      {modal && <CategoryModal />}
    </div>
  );
}

export default App;
