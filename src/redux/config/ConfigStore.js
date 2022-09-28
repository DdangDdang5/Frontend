// Redux import
import auctionList from "../modules/AuctionListSlice";
import auctionDivision from "../modules/AuctionDivisionSlice";
import member from "../modules/MemberSlice";
import auction from "../modules/AuctionSlice";
import modal from "../modules/ModalSlice";
import search from "../modules/SearchSlice";
import chat from "../modules/ChatSlice";
import myPage from "../modules/MyPageSlice";
import notification from "../modules/NotificationSlice";

// Package import
import { configureStore } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default configureStore({
  reducer: {
    auction,
    auctionList,
    auctionDivision,
    member,
    modal,
    router: connectRouter(history),
    search,
    chat,
    myPage,
		notification,
  },
});
