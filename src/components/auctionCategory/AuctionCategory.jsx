// React import
import React from "react";

// Style import
import { CategoryItem } from './AuctionCategory.styled';

const AuctionCategory = ({ division }) => {
  return (
    <CategoryItem>
      <img src="maskable.png" alt="auction-division" />
      <span>{division}</span>
    </CategoryItem>
  );
};

export default AuctionCategory;
