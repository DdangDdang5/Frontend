import { configureStore } from "@reduxjs/toolkit";
import auctionList from "../modules/AuctionListSlice";
import auctionDivision from "../modules/AuctionDivisionSlice";
import member from "../modules/MemberSlice";
export default configureStore({
  reducer: {
    auctionList,
    auctionDivision,
    member,
  },
});
