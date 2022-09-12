// React import
import React, { useEffect, useRef, useState } from "react";

// Package import
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Redux import
import { hideModal, _regionList } from "../../redux/modules/ModalSlice";

// Style import
import {
  auctionCategoryList,
  auctionCategoryRegionList,
  auctionItemList,
  auctionRegionList,
} from "../../redux/modules/AuctionListSlice";

const CategoryModal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const division = useSelector((state) => state.modal.division);
  const categoryName = useSelector((state) => state.modal.categoryName);
  const regionName = useSelector((state) => state.modal.regionName);

  const categoryList = useSelector((state) =>
    state.modal.categoryList.map((item, index) => {
      return item.categoryName;
    })
  );
  const regionList = useSelector((state) =>
    state.modal.regionList.map((item, index) => {
      return item.region;
    })
  );

  const [modalList, setModalList] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (division === "regionList") {
      setModalList(regionList);
      setTitle("지역 선택");
    } else if (division === "categoryList") {
      setModalList(categoryList);
      setTitle("품목 선택");
    }
  }, [dispatch, division]);

  const onCheckCategoryRegion = (categoryName, regionName) => {
    const categoryNameCheck = categoryName.split("/").join("");

    if (categoryName === "전체품목" && regionName === "전체지역") {
      dispatch(auctionItemList());
    } else if (categoryName !== "전체품목" && regionName !== "전체지역") {
      dispatch(
        auctionCategoryRegionList({
          categoryName: categoryNameCheck,
          regionName,
        })
      );
    } else if (categoryName !== "전체품목") {
      dispatch(auctionCategoryList(categoryNameCheck));
    } else if (regionName !== "전체지역") {
      dispatch(auctionRegionList(regionName));
    }
  };

  const onClickModalItem = (item) => {
    if (division === "categoryList") {
      dispatch(hideModal({ categoryName: item }));
      onCheckCategoryRegion(item, regionName);
    } else {
      dispatch(hideModal({ regionName: item }));
      onCheckCategoryRegion(categoryName, item);
    }
  };

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
          {modalList.map((item, idx) => {
            return (
              <CategoryModalBodyItem>
                <CategoryModalBodyItemIn
                  key={idx}
                  onClick={() => onClickModalItem(item)}>
                  {item}
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
  }import { useEffect } from 'react';


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
