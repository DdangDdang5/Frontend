// Package import
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

// Page import
import Main from "../src/pages/main/Main";
import InfoDetail from "./pages/main/InfoDetail";
import Login from "../src/pages/accountPage/Login";
import SignUp from "../src/pages/accountPage/SignUp";
import Search from "../src/pages/searchPage/Search";
import Chat from "../src/pages/chatPage/Chat";
import ChatList from "../src/pages/chatPage/ChatList";
import AuctionList from "../src/pages/auctionPage/AuctionList";
import AuctionWrite from "../src/pages/auctionPage/AuctionWrite";
import AuctionDetail from "../src/pages/auctionPage/AuctionDetail";
import AuctionReview from "./pages/auctionPage/AuctionReview";
import AuctionEdit from "./pages/auctionPage/AuctionEdit";
import UserProfile from "./pages/auctionPage/UserProfile";
import MyPage from "./pages/myPage/MyPage";
import MyPageEdit from "./pages/myPage/MyPageEdit";
import MyGrade from "./pages/myPage/MyGrade";
import MyPageParticipationAuction from "./pages/myPage/MyPageParticipationAuction";
import MyPageInterestAuction from "./pages/myPage/MyPageInterestAuction";
import MyPageMyAuction from "./pages/myPage/MyPageMyAuction";
import Notice from "./pages/myPage/Notice";
import Notice1 from "./pages/myPage/Notice1";
import Question from "./pages/myPage/Question";
import Event from "./pages/eventPage/Event";
import EventList from "./pages/eventPage/EventList";
import NotFound from "./pages/etcPage/NotFound";
import Loading from "./pages/etcPage/Loading";

// Component & Shared import
import Kakao from "./shared/Kakao";
import CategoryModal from "./components/modal/CategoryModal";

// Style import
import { FontRegular } from "./shared/fonts/font";

function App() {
  const modal = useSelector((state) => state.modal.show);

  return (
    <AppContainer>
      <FontRegular />
      <AppContent>
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
          <Route path="/event/:eventId" element={<Event />} />
          <Route path="/eventList" element={<EventList />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/notice1" element={<Notice1 />} />
          <Route path="/question" element={<Question />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/infoDetail" element={<InfoDetail />} />
        </Routes>
        {modal && <CategoryModal />}
      </AppContent>

      <SmallApp>
        <SmallAppContent>
          <div id="none-background"></div>
          <img src="/logo192.png" alt="logo"></img>
        </SmallAppContent>
        <span>지원하지 않는 디바이스입니다.</span>
      </SmallApp>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
`;

const AppContent = styled.div`
  @media all and (max-width: 359px) {
    display: none;
  }
`;

const SmallApp = styled.div`
  @media all and (min-width: 360px) {
    display: none;
  }

  @media all and (max-width: 359px) {
    width: 100%;
    height: 100vh;

    color: #3a3a3a;
    background-color: #ebeef3;
    font-weight: 400;
    font-size: 18px;
    line-height: 140%;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 70px;
  }
`;

const SmallAppContent = styled.div`
  position: relative;

  div {
    width: 74px;
    height: 74px;
    background-color: #ffffff;
    border-radius: 50%;

    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    width: 100px;
    height: 100px;

    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default App;
