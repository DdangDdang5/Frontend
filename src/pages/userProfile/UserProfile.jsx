// React import
import React, { useEffect } from "react";

// Redux import
import { getMember } from "../../redux/modules/MemberSlice";

// Package import
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component & Shared import
import Header from "../../components/header/Header";
import { findGrade } from "../../shared/Grade";
import { BasicProfile } from "../../shared/images";

// Style import
import {
  ItemList,
  MidTabContainer,
  MidTabContent,
  MidTabLabel,
  MidTabRadioBtn,
  MyGradeImgWrap,
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
  TagRegion,
  TagWrap,
} from "../auctionReview/AuctionReview.styled";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { memberId } = useParams();
  const member = useSelector((state) => state.member.member);
  console.log(member);

  const saleAuctionList = [];
  const doneAuctionList = [];

  member?.auctionResponseDtoList?.map((item) =>
    item.auctionStatus
      ? saleAuctionList.push(item)
      : doneAuctionList.push(item),
  );

  console.log(saleAuctionList);
  console.log(doneAuctionList);

  useEffect(() => {
    dispatch(getMember(memberId));
  }, []);

  return (
    <UserProfileContainer>
      <Header back={true} pageName="프로필" />

      <UserProfileContent>
        {/* 유저 프로필 정보 */}
        <UserProfileWrap>
          <UserProfileInfo>
            {member?.profileImgUrl ? (
              <img src={member?.profileImgUrl} alt="user-profile" />
            ) : (
              <BasicProfile />
            )}
            <span>{member?.nickname}</span>
          </UserProfileInfo>
          <MyGradeImgWrap>
            <div></div>
            {findGrade(member?.trustGrade)}
          </MyGradeImgWrap>
        </UserProfileWrap>

        <MidTabContainer>
          {/* 중간 탭 */}
          <MidTabRadioBtn
            type="radio"
            id="auction-sale"
            name="auction-status"
            checked
          />
          <MidTabLabel htmlFor="auction-sale">경매중 {saleAuctionList.length}</MidTabLabel>
          <MidTabRadioBtn
            type="radio"
            id="auction-done"
            name="auction-status"
          />
          <MidTabLabel htmlFor="auction-done">경매완료 {doneAuctionList.length}</MidTabLabel>

          {/* 경매중 목록 */}
          <MidTabContent id="auction-sale-content">
            <ItemList>
              {saleAuctionList?.map((item) => (
                <ReviewItem
                  key={item.auctionId}
                  onClick={() => navigate(`/auctionDetail/${item.auctionId}`)}
                >
                  <img
                    src={item.multiImages[0]?.imgUrl}
                    alt="user-sale-auction-img"
                  />
                  <ReviewItemContent>
                    <TagWrap backgroundColor="gray">
                      {item.delivery ? <span>택배</span> : null}
                      {item.direct ? <span>직거래</span> : null}
                      <TagRegion>{item.region}</TagRegion>
                    </TagWrap>
                    <ReviewItemTitle>{item.title}</ReviewItemTitle>
                    <ReviewItemPriceWrap>
                      <span>최근입찰가</span>
                      <ReviewItemPrice>{item.nowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ReviewItemPrice>
                    </ReviewItemPriceWrap>
                  </ReviewItemContent>
                </ReviewItem>
              ))}
            </ItemList>
          </MidTabContent>

          {/* 경매완료 목록 */}
          <MidTabContent id="auction-done-content">
            <ItemList>
              {doneAuctionList?.map((item) => (
                <ReviewItem
                  key={item.auctionId}
                  onClick={() => navigate(`/auctionDetail/${item.auctionId}`)}
                >
                  <img
                    src={item.multiImages[0]?.imgUrl}
                    alt="user-sale-auction-img"
                  />
                  <ReviewItemContent>
                    <TagWrap backgroundColor="gray">
                      {item.delivery ? <span>택배</span> : null}
                      {item.direct ? <span>직거래</span> : null}
                      <TagRegion>{item.region}</TagRegion>
                    </TagWrap>
                    <ReviewItemTitle>{item.title}</ReviewItemTitle>
                    <ReviewItemPriceWrap>
                      <span>최근입찰가</span>
                      <ReviewItemPrice>{item.nowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</ReviewItemPrice>
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
