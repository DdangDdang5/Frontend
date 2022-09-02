import { configureStore } from "@reduxjs/toolkit";
import auctionList from "../modules/AuctionListSlice";
import auctionDivision from "../modules/AuctionDivisionSlice";

export default configureStore({
  reducer: { 
		auctionList,
		auctionDivision,
 	},
});
