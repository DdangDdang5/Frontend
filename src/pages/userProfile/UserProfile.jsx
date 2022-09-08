// React import
import React from "react";
import { useNavigate } from "react-router-dom";

// Component import
import Header from "../../components/header/Header";

// Style import
import {
  ItemList,
  MidTabContainer,
  MidTabContent,
  MidTabLabel,
  MidTabRadioBtn,
  UserGrade,
  UserProfileContainer,
  UserProfileContent,
  UserProfileInfo,
  UserProfileWrap,
} from "./UserProfile.styled";
import {
  ReviewItem,
  ReviewItemContent,
  ReviewItemPrice,
  ReviewItemPriceWrap,
  ReviewItemTitle,
  TagWrap,
} from "../auctionReview/AuctionReview.styled";

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <UserProfileContainer>
      <Header page="프로필" />

      <UserProfileContent>
        {/* 유저 프로필 정보 */}
        <UserProfileWrap>
          <UserProfileInfo>
            <img src="maskable.png" alt="user-profile" />
            <span>닉네임</span>
          </UserProfileInfo>
          <UserGrade onClick={() => navigate("/myGrade")}></UserGrade>
        </UserProfileWrap>

        <MidTabContainer>
          {/* 중간 탭 */}
          <MidTabRadioBtn
            type="radio"
            id="auction-sale"
            name="auction-status"
            checked
          />
          <MidTabLabel htmlFor="auction-sale">경매중</MidTabLabel>
          <MidTabRadioBtn
            type="radio"
            id="auction-done"
            name="auction-status"
          />
          <MidTabLabel htmlFor="auction-done">경매완료</MidTabLabel>

          {/* 경매중 목록 */}
          <MidTabContent id="auction-sale-content">
            <ItemList>
              {Array.from({ length: 6 }, (_, idx) => (
                <ReviewItem key={idx}>
                  <img src="maskable.png" alt="auction-new-img" />
                  <ReviewItemContent>
                    <TagWrap backgroundColor="gray">
                      <span>택배</span>
                      <span>직거래</span>
                      <span>동작구</span>
                    </TagWrap>
                    <ReviewItemTitle>
                      제목은 한 줄만 노출됩니다. 길어진 텍스트는 줄어듭니다.
                    </ReviewItemTitle>
                    <ReviewItemPriceWrap>
                      <span>최근입찰가</span>
                      <ReviewItemPrice>5000원</ReviewItemPrice>
                    </ReviewItemPriceWrap>
                  </ReviewItemContent>
                </ReviewItem>
              ))}
            </ItemList>
          </MidTabContent>

          {/* 경매완료 목록 */}
          <MidTabContent id="auction-done-content">
            <ItemList>
              {Array.from({ length: 3 }, (_, idx) => (
                <ReviewItem key={idx}>
                  <img src="maskable.png" alt="auction-new-img" />
                  <ReviewItemContent>
                    <TagWrap backgroundColor="gray">
                      <span>택배</span>
                      <span>직거래</span>
                      <span>동작구</span>
                    </TagWrap>
                    <ReviewItemTitle>
                      제목은 한 줄만 노출됩니다. 길어진 텍스트는 줄어듭니다.
                    </ReviewItemTitle>
                    <ReviewItemPriceWrap>
                      <span>최근입찰가</span>
                      <ReviewItemPrice>5000원</ReviewItemPrice>
                    </ReviewItemPriceWrap>
                  </ReviewItemContent>
                </ReviewItem>
              ))}
            </ItemList>
          </MidTabContent>
        </MidTabContainer>
      </UserProfileContent>
    </UserProfileContainer>
  );
};

export default UserProfile;
