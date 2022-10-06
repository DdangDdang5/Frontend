// React import
import React, { useEffect, useRef, useState } from "react";

// Redux import
import { hideModal } from "../../redux/modules/ModalSlice";
import {
  auctionCategoryList,
  auctionCategoryRegionList,
  auctionItemList,
  auctionRegionList,
  clearAuctionList,
  initialPaging,
} from "../../redux/modules/AuctionListSlice";

// Package import
import { useDispatch, useSelector } from "react-redux";

// Style import
import {
  CategoryModalBodyContainer,
  CategoryModalBodyItem,
  CategoryModalBodyItemIn,
  CategoryModalHead,
  CategoryModalWrap,
  ModalLayout,
} from "./CategoryModal.styled";

const CategoryModal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const division = useSelector((state) => state.modal.division);
  const categoryName = useSelector((state) => state.modal.categoryName);
  const regionName = useSelector((state) => state.modal.regionName);
  const show = useSelector((state) => state.modal.show);

  const categoryList = useSelector((state) =>
    state.modal.categoryList.map((item) => item.categoryName),
  );
  const regionList = useSelector((state) =>
    state.modal.regionList.map((item) => item.region),
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
  }, [division]);

  // 카테고리, 지역 이름 변환 후 API 호출
  const onCheckCategoryRegion = (categoryName, regionName) => {
    const categoryNameCheck = categoryName.split(/\s|\//g).join(""); // 공백, / 제거
    const regionNameCheck = regionName.split(" ").join(""); // 공백 제거
    dispatch(initialPaging());

    if (categoryNameCheck === "전체품목" && regionNameCheck === "서울전체") {
      dispatch(clearAuctionList());
      dispatch(auctionItemList());
    } else if (
      categoryNameCheck !== "전체품목" &&
      regionNameCheck !== "서울전체"
    ) {
      dispatch(
        auctionCategoryRegionList({
          categoryName: categoryNameCheck,
          regionName: regionNameCheck,
        }),
      );
    } else if (categoryNameCheck !== "전체품목") {
      dispatch(auctionCategoryList(categoryNameCheck));
    } else if (regionNameCheck !== "서울전체") {
      dispatch(auctionRegionList(regionNameCheck));
    }
  };

  // 카테고리, 지역 선택
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
      }}
    >
      <CategoryModalWrap show={show}>
        <CategoryModalHead>{title}</CategoryModalHead>
        <CategoryModalBodyContainer>
          {modalList.map((item, idx) => {
            return (
              <React.Fragment key={idx}>
                <CategoryModalBodyItem>
                  <CategoryModalBodyItemIn
                    key={idx}
                    onClick={() => onClickModalItem(item)}
                  >
                    {item}
                  </CategoryModalBodyItemIn>
                </CategoryModalBodyItem>
              </React.Fragment>
            );
          })}
        </CategoryModalBodyContainer>
      </CategoryModalWrap>
    </ModalLayout>
  );
};

export default CategoryModal;
