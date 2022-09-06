// Package import
import { Route, Routes } from "react-router-dom";

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

// Component & Shared import
import Kakao from "./shared/Kakao";
import Modal from "./components/modal/Modal";

// redux import
import { useSelector } from "react-redux";

function App() {
  const modal = useSelector((state) => state.modal.show);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/profileEdit" element={<ProfileEdit />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/auctionList" element={<AuctionList />} />
        <Route path="/auctionWrite" element={<AuctionWrite />} />
        <Route path="/auctionDetail/:auctionId" element={<AuctionDetail />} />
        <Route path="/auctionDone" element={<AuctionDone />} />
        <Route path="/kakao/callback" element={<Kakao />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>
      {modal && <Modal />}
    </div>
  );
}

export default App;
