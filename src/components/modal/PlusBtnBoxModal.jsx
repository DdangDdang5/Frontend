import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";

const plusBtnBoxModal = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.modal.show);

  //   useEffect(() => {
  //     dispatch()

  //   }, [show])

  return (
    <ModalWrap>
      <div>상품등록</div>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  z-index: 30;
`;
export default plusBtnBoxModal;
