import { configureStore } from "@reduxjs/toolkit";
import auctionList from "../modules/AuctionListSlice";
import auctionDivision from "../modules/AuctionDivisionSlice";
import member from "../modules/MemberSlice";
import auction from "../modules/AuctionSlice";
import modal from "../modules/ModalSlice";
import search from "../modules/SearchSlice";
import chat from "../modules/ChatSlice";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
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
		chat
  },
});
