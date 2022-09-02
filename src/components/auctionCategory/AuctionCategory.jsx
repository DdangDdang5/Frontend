// React import
import React from "react";

// Style import
import { CategoryItem } from './AuctionCategory.styled';

const AuctionCategory = ({ auction }) => {
  return (
    <CategoryItem>
      <img src="maskable.png" alt="search" />
      <span>{auction}</span>
    </CategoryItem>
  );
};

export default AuctionCategory;
