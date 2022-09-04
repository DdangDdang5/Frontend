import React from "react";
import styled from "styled-components";

const Modal = () => {
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
    <ModalLayout>
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
        <CategoryModalFooter>닫기</CategoryModalFooter>
      </CategoryModalWrap>
    </ModalLayout>
  );
};
const ModalLayout = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  top: 0;
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

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
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
  border-radius: 20px;
`;
const CategoryModalBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
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

const CategoryModalBodyItemIn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: tan;
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
