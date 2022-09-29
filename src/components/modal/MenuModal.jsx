// React import
import React, { useRef } from "react";

// Redux import
import { useDispatch } from "react-redux";
import { deleteAuctionItem } from "../../redux/modules/AuctionListSlice";

// Package import
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MenuModal = ({ isMenuModal, setIsMenuModal, data, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalRef = useRef();
  const memberId = parseInt(sessionStorage?.getItem("memberId"));
  // 모달 닫기
  const handleModalHide = (e) => {
    if (modalRef.current === e.target) {
      setIsMenuModal(!isMenuModal);
    }
  };

  // 게시글 삭제하기
  const handleDelete = async () => {
    if (window.confirm("경매글을 삭제하시겠습니까?"))
      try {
        const response = await dispatch(
          deleteAuctionItem(data.auctionId)
        ).unwrap();
        if (response) {
          return navigate(-1, { replace: true });
        }
      } catch {}
  };

  // 게시글 수정하기
  const handleEdit = () => {
    if (window.confirm("경매글을 수정하시겠습니까?")) {
      return navigate(`/auctionEdit/${+id}`);
    }
  };

  return (
    <MenuModalLayout ref={modalRef} onClick={handleModalHide}>
      <MenuModalWrap>
        {memberId === data.memberId ? (
          <>
            <div onClick={() => handleEdit()}>경매글 수정하기</div>
            <div onClick={() => handleDelete()}>경매글 삭제하기</div>
          </>
        ) : (
          <>
            <div>글쓴이 차단하기</div>
            <div>신고하기</div>
          </>
        )}
      </MenuModalWrap>
    </MenuModalLayout>
  );
};

const MenuModalLayout = styled.div`
  display: flex;
  position: absolute;
  z-index: 100;
  top: 70px;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const MenuModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
  border-radius: 0px 0px 8px 8px;
  position: relative;

  z-index: 200;
  top: 0;
  left: 200px;
  width: 190px;
  height: 112px;

  background-color: white;

  div {
    font-size: 16px;
    margin-left: 20px;
    font-weight: 400;
  }
`;

export default MenuModal;
