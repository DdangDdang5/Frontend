import React, { useEffect, useRef, useState } from "react";

// redux import
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/modules/ModalSlice";

// styled import
import styled, { keyframes } from "styled-components";

const CategoryModal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const category = useSelector((state) => state.modal.category);
  const [modalList, setModalList] = useState([]);
  const [title, setTitle] = useState("");

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
  const categoryList = [
    "가구/인테리어",
    "가전",
    "남성 패션",
    "여성 패션",
    "악세서리",
    "스포츠/레저",
    "취미/게임/악기",
    "디지털",
    "뷰티/미용",
  ];

  useEffect(() => {
    if (category === "regionList") {
      setModalList(regionList);
      setTitle("지역 선택");
    } else if (category === "categoryList") {
      setModalList(categoryList);
      setTitle("품목 선택");
    } else {
    }
    return () => {
      setModalList([]);
    };
  }, [category]);

  return (
    <ModalLayout
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          dispatch(hideModal());
        }
      }}>
      <CategoryModalWrap>
        <CategoryModalHead>{title}</CategoryModalHead>
        <CategoryModalBodyContainer>
          {modalList.map((index, item) => {
            return (
              <CategoryModalBodyItem>
                <CategoryModalBodyItemIn key={item}>
                  {index}
                </CategoryModalBodyItemIn>
              </CategoryModalBodyItem>
            );
          })}
        </CategoryModalBodyContainer>

        {/* <CategoryModalFooter onClick={() => dispatch(hideModal())}>
          닫기
        </CategoryModalFooter> */}
      </CategoryModalWrap>
    </ModalLayout>
  );
};

const ModalLayout = styled.div`
  display: flex;
  position: absolute;
  z-index: 20;
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
  height: 460px;
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
// const CategoryModalFooter = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 60px;
//   font-size: 20px;
//   font-weight: 500;
// `;

export default CategoryModal;