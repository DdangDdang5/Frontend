// React import
import React, { useState } from "react";

// Redux import
import { useDispatch } from "react-redux";
import { clearMode } from "../../redux/modules/ModalSlice";

// Package import
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { isIOS13, isIPhone13, isIOS } from "react-device-detect";

// Component improt
import PageModal from "../../components/modal/PageModal";

const PlusButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberId = sessionStorage.getItem("memberId");

  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
  });

  const handleWriteLogin = () => {
    if (!memberId) {
      setOptionContent({
        modalText: "로그인이 필요합니다.\n 로그인하시겠습니까?",
        btnText: "로그인하기",
        isConfirm: true,
        onClickBtn: () => navigate("/login"),
      });
      setOptionVisible(true);
    } else {
      dispatch(clearMode());
      navigate("/auctionWrite");
    }
  };

  return (
    <>
      <PlusBtn onClick={() => handleWriteLogin()} isIOS={isIOS}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30.26 14.5H17.5V1.73999C17.5 0.90999 16.83 0.23999 16 0.23999C15.17 0.23999 14.5 0.90999 14.5 1.73999V14.5H1.74001C0.910006 14.5 0.240005 15.17 0.240005 16C0.240005 16.83 0.910006 17.5 1.74001 17.5H14.5V30.26C14.5 31.09 15.17 31.76 16 31.76C16.83 31.76 17.5 31.09 17.5 30.26V17.5H30.26C31.09 17.5 31.76 16.83 31.76 16C31.76 15.17 31.09 14.5 30.26 14.5Z"
            fill="white"
          />
        </svg>
      </PlusBtn>

      <PageModal
        visible={optionVisible}
        setVisible={setOptionVisible}
        modalText={optionContent.modalText}
        btnText={optionContent.btnText}
        isConfirm={optionContent.isConfirm}
        onClickBtn={optionContent.onClickBtn}
      />
    </>
  );
};

const PlusBtn = styled.button`
  display: flex;
  position: absolute;
  z-index: 10;
  bottom: ${(props) => (isIOS ? `100px` : `90px`)};
  right: 20px;

  justify-content: center;
  align-items: center;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 500px;
  font-size: 50px;
  color: white;
  padding: 0px 15px;
  background-color: #4d71ff;

  :hover {
    background-color: #de5539;
  }
`;
export default PlusButton;
