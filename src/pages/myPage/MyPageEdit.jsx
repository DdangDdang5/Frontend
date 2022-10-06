// React import
import React, { useEffect, useRef, useState } from "react";

// Redux import
import { editMyPage, _MyPageData } from "../../redux/modules/MyPageSlice";
import { useDispatch, useSelector } from "react-redux";

// Package import
import { useNavigate } from "react-router-dom";

// Component import
import Header from "../../components/header/Header";
import PageModal from "../../components/modal/PageModal";

// Element & Shared import
import { BasicProfile, Camera, Delete } from "../../shared/images";

//Style
import {
  MyDoneBtn,
  MyDoneBtnWrap,
  MyImgWrap,
  MyProfile,
  MyTextWrap,
  ProfileEditLayout,
  MyImgBox,
} from "./MyPageEdit.styled";

const MyPageEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = {
    nickName: "",
  };

  const profileData = useSelector((state) => state?.myPage?.myPage);
  const img_ref = useRef(null);

  const [inputForm, setInputForm] = useState(data);
  const [imgFile, setImgFile] = useState([]);
  const [imagePreview, setImagePreview] = useState(profileData?.profileImgUrl);

  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
    onClickCloseBtn: () => {},
  });

  const memberId = sessionStorage?.getItem("memberId");

  const onLoadFile = (e) => {
    const reader = new FileReader();
    setImgFile(...imgFile, URL.createObjectURL(e.target.files[0]));

    const prevImg = e.target.files[0];
    reader.readAsDataURL(prevImg);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const onSubmitHandler = async () => {
    let formData = new FormData();
    let uploadImg = img_ref.current;

    formData.append(
      "data",
      new Blob([JSON.stringify(inputForm)], { type: "application/json" })
    );
    if (imgFile === []) {
      return formData.append("profileImg", null);
    } else {
      formData.append("profileImg", uploadImg.files[0]);
    }

    const data = dispatch(
      editMyPage({ memberId: memberId, formData: formData })
    ).unwrap();
    if (data) {
      // 포스팅 완료후 새로고침
      setOptionVisible(true);
      setOptionContent({
        modalText: "프로필 변경이 \n 완료되었습니다.",
        btnText: "확인",
        // isConfirm: true,
        onClickCloseBtn: () => navigate(-1, { replace: true }),
      });
    }
  };

  useEffect(() => {
    dispatch(_MyPageData(memberId));
  }, [imagePreview]);

  return (
    <>
      <ProfileEditLayout>
        <Header back={true} pageName="프로필 수정" />

        <MyProfile>
          <MyImgWrap>
            <MyImgBox>
              {imagePreview === null ? (
                profileData?.profileImgUrl === null ? (
                  <BasicProfile />
                ) : (
                  <img src={profileData?.profileImgUrl} alt="" />
                )
              ) : (
                <img src={imagePreview} alt="" />
              )}

              <label htmlFor="img_UpFile">
                <Camera />
              </label>
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
                value={inputForm.nickName}
                name="nickName"
                onChange={onChangeHandler}
                placeholder={
                  profileData.nickname === null
                    ? "닉네임을 입력해주세요."
                    : profileData?.nickname?.length > 6
                    ? profileData?.nickname?.split("kakao")[0] + "kakao"
                    : profileData?.nickname
                }
                minLength="4"
                maxLength="6"
              />

              <Delete />
            </div>
            <span className="MyTextCheck"></span>
          </MyTextWrap>
        </MyProfile>
        <MyDoneBtnWrap>
          <MyDoneBtn type="button" onClick={onSubmitHandler}>
            완료
          </MyDoneBtn>
        </MyDoneBtnWrap>
      </ProfileEditLayout>
      <PageModal
        visible={optionVisible}
        setVisible={setOptionVisible}
        modalText={optionContent.modalText}
        btnText={optionContent.btnText}
        isConfirm={optionContent.isConfirm}
        onClickBtn={optionContent.onClickBtn}
        onClickCloseBtn={optionContent.onClickCloseBtn}
      />
    </>
  );
};

export default MyPageEdit;

