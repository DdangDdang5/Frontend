import React from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";

const ProfileEdit = () => {
  const Img = (
    <img src="https://t1.daumcdn.net/cfile/blog/231A3A3A557C6B3D0A" alt="" />
  );

  return (
    <ProfileEditLayout>
      <Header />

      <MyProfile>
        <MyImgWrap>
          <MyImgBox>
            {Img}
            <div>사진</div>
          </MyImgBox>
        </MyImgWrap>

        <MyTextWrap>
          <div className="MyTextNick">닉네임</div>
          <div className="MyTextInputWrap">
            <input type="text" placeholder="닉네임을 입력해주세요." />
            <button>X</button>
          </div>
          <div className="MyTextCheck">사용할 수 없는 닉네임입니다.</div>
        </MyTextWrap>
      </MyProfile>
      <MyDoneBtn>완료</MyDoneBtn>
    </ProfileEditLayout>
  );
};
const ProfileEditLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;
const MyProfile = styled.div`
  display: flex;
  flex-direction: column;

  margin: 70px 10px 10px 10px;
  margin: 70px 20px 0px 20px;
`;
const MyImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  margin-top: 32px;
`;
const MyImgBox = styled.div`
  display: flex;
  width: 120px;
  height: 100%;

  img {
    display: flex;
    width: 120px;
    height: 120px;
    border-radius: 120px;
  }
  div {
    display: flex;
    position: absolute;
    top: 186px;
    left: 219px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    align-items: center;
    justify-content: center;
    background-color: yellow;
  }
`;

const MyTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  .MyTextNick {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
  }
  .MyTextInputWrap {
    display: flex;
    margin-top: 16px;
    width: 100%;
    height: 56px;
    position: relative;
    input {
      padding-right: 30px;

      width: 100%;
      padding: 17px 9px 14px 9px;
      border-radius: 8px;
      font-size: 18px;
    }
    button {
      position: absolute;
      top: 19px;
      right: 8px;
      width: 18px;
      height: 18px;
      border-radius: 18px;
      border: none;
      align-items: center;
      justify-content: center;
    }
  }
  .MyTextCheck {
    display: flex;
    margin-top: 12px;
    font-weight: 400;
    font-size: 14px;
    color: #bcbcbc;
  }
`;
const MyDoneBtn = styled.button`
  display: flex;
  width: 350px;
  height: 56px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #dedede;
  border: none;
  border-radius: 8px;
  position: fixed;
  bottom: 26px;
  left: 20px;
`;
export default ProfileEdit;
