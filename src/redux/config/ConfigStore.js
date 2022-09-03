import { configureStore } from "@reduxjs/toolkit";
import auctionList from "../modules/AuctionListSlice";
import auctionDivision from "../modules/AuctionDivisionSlice";
import auction from "../modules/AuctionSlice";

export default configureStore({
  reducer: {
    auction,
    auctionList,
    auctionDivision,
  },
});
