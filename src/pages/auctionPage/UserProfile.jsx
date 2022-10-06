// React import
import React, { useEffect } from "react";

// Redux import
import { getMember } from "../../redux/modules/MemberSlice";

// Package import
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component & Shared import
import Header from "../../components/header/Header";
import AuctionRow from "../../components/auctionElement/AuctionRow";
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
  UserProfileContent,
  UserProfileInfo,
  UserProfileWrap,
} from "./UserProfile.styled";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { memberId } = useParams();
  const member = useSelector((state) => state.member.member);

  const saleAuctionList = [];
  const doneAuctionList = [];

  member?.auctionResponseDtoList?.map((item) =>
    item.auctionStatus
      ? saleAuctionList.push(item)
      : doneAuctionList.push(item),
  );

  useEffect(() => {
    dispatch(getMember(memberId));
  }, []);

  return (
    <>
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
            <span>
              {member?.nickname?.length > 6
                ? member?.nickname?.split("kakao")[0] + "kakao"
                : member?.nickname}
            </span>
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
          <MidTabLabel htmlFor="auction-sale">
            경매중 {saleAuctionList.length}
          </MidTabLabel>
          <MidTabRadioBtn
            type="radio"
            id="auction-done"
            name="auction-status"
          />
          <MidTabLabel htmlFor="auction-done">
            경매완료 {doneAuctionList.length}
          </MidTabLabel>

          {/* 경매중 목록 */}
          <MidTabContent id="auction-sale-content">
            <ItemList>
              {saleAuctionList?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <AuctionRow item={item} index={idx} />
                </React.Fragment>
              ))}
            </ItemList>
          </MidTabContent>

          {/* 경매완료 목록 */}
          <MidTabContent id="auction-done-content">
            <ItemList>
              {doneAuctionList?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <AuctionRow item={item} index={idx} />
                </React.Fragment>
              ))}
            </ItemList>
          </MidTabContent>
        </MidTabContainer>
      </UserProfileContent>
    </>
  );
};

export default UserProfile;
