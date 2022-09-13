// React import
import React, { useEffect } from "react";

//redux import
import { useDispatch } from "react-redux";
import { deleteAuctionItem } from "../../redux/modules/AuctionListSlice";

// Package import
import { useNavigate } from "react-router-dom";

// Style import
import {
  HeaderContainer,
  HeaderContent,
  HeaderIconContainer,
  HeaderTitle,
  Logo,
  PageTitle,
} from "./Header.styled";

const Header = ({
  borderBottom,
  logo,
  page,
  write,
  movePage,
  deleteBtn,
  detailData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteAuctionItem(detailData.id));
    navigate(-1, { replace: true });
  };

  return (
    <HeaderContainer borderBottom={borderBottom}>
      <HeaderContent>
        {logo ? (
          <Logo onClick={() => navigate("/")}>땅땅</Logo>
        ) : (
          <HeaderTitle>
            <img src="maskable.png" alt="back" onClick={() => navigate(-1)} />
            <PageTitle>{page}</PageTitle>
          </HeaderTitle>
        )}
        <HeaderIconContainer>
          {write ? (
            <div type="button" onClick={movePage}>
              완료
            </div>
          ) : deleteBtn ? (
            <div type="button" onClick={handleDelete}>
              삭제
            </div>
          ) : (
            <>
              <img
                src="maskable.png"
                alt="search"
                onClick={() => navigate("/search")}
              />
              <img src="maskable.png" alt="alarm" />
            </>
          )}
        </HeaderIconContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
