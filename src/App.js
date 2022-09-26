// React import
import { useEffect } from "react";

// Redux import
import { useDispatch } from "react-redux";

// Package import
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

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
import AuctionReview from "./pages/auctionReview/AuctionReview";
import MyGrade from "./pages/myGrade/MyGrade";
import MyPageParticipationAuction from "./pages/myPage/MyPageParticipationAuction";
import MyPageInterestAuction from "./pages/myPage/MyPageInterestAuction";
import MyPageMyAuction from "./pages/myPage/MyPageMyAuction";
import AuctionEdit from "./pages/auctionEdit/AuctionEdit";

// Component & Shared import
import Kakao from "./shared/Kakao";
import { getCookie } from "./shared/Cookie";
import CategoryModal from "./components/modal/CategoryModal";
import UserProfile from "./pages/userProfile/UserProfile";

function App() {
  // const token = getCookie("accessToken");
  const modal = useSelector((state) => state.modal.show);

  // useEffect(() => {
  //   if (token) {
  //     dispatch();
  //   }
  // }, []);

  return (
    <div className="App">
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
