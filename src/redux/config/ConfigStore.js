import { configureStore } from "@reduxjs/toolkit";
import auctionList from "../modules/AuctionListSlice";

export default configureStore({
  reducer: { auctionList },
});
