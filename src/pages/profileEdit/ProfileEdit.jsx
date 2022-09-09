import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { editMyPage, myPageData } from "../../redux/modules/MyPageSlice";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Img = (
    <img src="https://t1.daumcdn.net/cfile/blog/231A3A3A557C6B3D0A" alt="" />
  );
  const [imgFile, setImgFile] = useState("");
  const [imagePreview, setImagePreview] = useState(Img);
  const img_ref = useRef(null);
  const data = useSelector((state) => state.myPage.myPage);
  const memberId = localStorage.getItem("memberId");

  const initialState = {
    nickName: "",
  };

  const [inputForm, setInputForm] = useState(initialState);

  console.log("프로필 수정", data);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const onLoadFile = (e) => {
    // 미리보기에선 삭제가 됬는데 업로드 올린건 삭제가 됬나?
    const reader = new FileReader();
    setImgFile(...imgFile, URL.createObjectURL(e.target.files[0]));

    const prevImg = e.target.files[0];
    reader.readAsDataURL(prevImg);
    reader.onloadend = () => {
      setImagePreview({ img: reader.result });
    };
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let uploadImg = img_ref.current;

    formData.append(
      "data",
      new Blob([JSON.stringify(inputForm)], { type: "application/json" })
    );

    formData.append("profileImg", uploadImg.files[0]);

    dispatch(editMyPage(formData));
    window.alert("새 게시물 만들기 완료");
    // 포스팅 완료후 새로고침
    navigate("/");
  };

  return (
    <ProfileEditLayout>
      <Header />

      <MyProfile>
        <MyImgWrap>
          <MyImgBox>
            {imagePreview}
            <label htmlFor="img_UpFile">사진</label>
            <input
              ref={img_ref}
              type="file"
              accept="image/*"
              id="img_UpFile"
              onChange={onLoadFile}
              style={{ display: "none" }}
            />
          </MyImgBox>
        </MyImgWrap>

        <MyTextWrap>
          <div className="MyTextNick">닉네임</div>
          <div className="MyTextInputWrap">
            <input
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={inputForm.nickName}
              name="nickname"
              onChange={onChangeHandler}
            />
            <button>X</button>
          </div>
          <div className="MyTextCheck">사용할 수 없는 닉네임입니다.</div>
        </MyTextWrap>
      </MyProfile>
      <MyDoneBtnWrap>
        <MyDoneBtn type="button" onClick={onSubmitHandler}>
          완료
        </MyDoneBtn>
      </MyDoneBtnWrap>
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
  label {
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
const MyDoneBtnWrap = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
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
  left: 50%;
  transform: translate(-50%);
`;

export default ProfileEdit;
