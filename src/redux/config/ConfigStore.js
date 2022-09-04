import { configureStore } from "@reduxjs/toolkit";
import auctionList from "../modules/AuctionListSlice";
import auctionDivision from "../modules/AuctionDivisionSlice";
import member from "../modules/MemberSlice";
import auction from "../modules/AuctionSlice";
import modal from "../modules/ModalSlice";

export default configureStore({
  reducer: {
    auction,
    auctionList,
    auctionDivision,
    member,
    modal,
  },
});
