import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { hideModal } from "../../redux/modules/ModalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const outSection = useRef();

  const regionList = [
    "서울 전체",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  return (
    <ModalLayout
      ref={outSection}
      onClick={(e) => {
        if (outSection.current === e.target) {
          dispatch(hideModal());
        }
      }}>
      <CategoryModalWrap>
        <CategoryModalHead>지역선택</CategoryModalHead>
        <CategoryModalBodyContainer>
          {regionList.map((index, item) => {
            return (
              <CategoryModalBodyItem>
                <CategoryModalBodyItemIn key={item}>
                  {index}
                </CategoryModalBodyItemIn>
              </CategoryModalBodyItem>
            );
          })}
        </CategoryModalBodyContainer>

        <CategoryModalFooter onClick={() => dispatch(hideModal())}>
          닫기
        </CategoryModalFooter>
      </CategoryModalWrap>
    </ModalLayout>
  );
};
const ModalLayout = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const CategoryModalWrap = styled.div`
  display: flex;
  height: 520px;
  width: 100%;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
  top: calc(100% - 520px);
  bottom: 0px;

  background-color: white;
`;
const CategoryModalHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
`;
const CategoryModalBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }

  align-content: flex-start;
  justify-content: flex-start;
  height: 400px;
  padding: 0px 20px;
  gap: 26px 20px;
`;
const CategoryModalBodyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 48px;
  width: 165px;
`;

const CategoryModalBodyItemIn = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  border: none;
  outline: none;
  border-radius: 100px;
  :hover {
    background-color: #dedede;
  }
`;
const CategoryModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 20px;
  font-weight: 500;
`;
export default Modal;
