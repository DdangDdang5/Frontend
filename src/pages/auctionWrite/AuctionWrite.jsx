import React, { useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useDispatch } from "react-redux";
import { addAuctionItem } from "../../redux/modules/AuctionListSlice";

const AuctionWrite = () => {
  const dispatch = useDispatch();
  const [filed, setFiled] = useState("");
  const img_ref = useRef(null);

  const auctionRequestDto = {
    title: "",
    content: "",
    startPrice: "",
    category: "가전",
    region: "동대문구",
    direct: true,
    delivery: true,
    auctionPeriod: 1,
  };
  const initalTags = {
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
    tag5: "",
    tag6: "",
  };
  const onLoadFile = (e) => {
    setFiled(URL.createObjectURL(e.target.files[0]));
    console.log(filed);
  };
  const [inputForm, setInputForm] = useState(auctionRequestDto);
  const [tags, setTags] = useState(initalTags);
  console.log("배돌배돌배돌", inputForm);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const onTransmitHandler = () => {
    let uploadImg = img_ref.current;
    console.log(uploadImg.files[0]);
    let formData = new FormData();
    formData.append(
      "auctionRequestDto",
      new Blob([JSON.stringify(inputForm)], { type: "application/json" })
    );
    formData.append(
      "tags",
      new Blob([JSON.stringify(tags)], { type: "application/json" })
    );
    formData.append("images", uploadImg.files[0]);
    dispatch(addAuctionItem(formData));
  };

  return (
    <AuctionWriteLayout>
      <Header />

      <AuctionWriteWrap>
        <WriteImgContainer>
          <ImgBoxBtn>
            <div>+</div>
            <input
              ref={img_ref}
              type="file"
              accept="image/*"
              id="img_upFile"
              onChange={onLoadFile}
            />
          </ImgBoxBtn>

          <ImgBox>
            <img src="" alt="" />
            <div className="deleteBox">
              <div>x</div>
            </div>
          </ImgBox>
          <ImgBox>
            <img src="" alt="" />
            <div className="deleteBox">
              <div>x</div>
            </div>
          </ImgBox>
          <ImgBox>
            <img src="" alt="" />
            <div className="deleteBox">
              <div>x</div>
            </div>
          </ImgBox>
          <ImgBox>
            <img src="" alt="" />
            <div className="deleteBox">
              <div>x</div>
            </div>
          </ImgBox>
        </WriteImgContainer>

        <WriteTitleContainer>제목</WriteTitleContainer>
        <WriteInputBox
          type="text"
          value={inputForm.title}
          name="title"
          onChange={onChangeHandler}
          placeholder="제목을 입력해주세요."
        />
        <WriteTitleContainer>상품명</WriteTitleContainer>
        <WriteInputBox
          type="text"
          value={inputForm.content}
          name="content"
          onChange={onChangeHandler}
          placeholder="정확한 상품명을 입력해주세요."
        />
        <WriteTitleContainer>카테고리 선택</WriteTitleContainer>
        <WriteBtnBox>
          <div>미선택</div>
          <div>V</div>
        </WriteBtnBox>
        <WriteTitleContainer>경매 시작가</WriteTitleContainer>

        {/* placeHoder 위치 조정이 안됨 ㅡㅡ  */}

        <WriteInputBox
          placeholder="시작가를 입력해주세요."
          type="number"
          value={inputForm.startPrice}
          name="startPrice"
          onChange={onChangeHandler}
        />
        {/* <input className="inputTag" type="text" placeholder="원" /> */}

        <WriteTitleContainer>
          배송 방법
          <div>(중복 선택 가능)</div>
        </WriteTitleContainer>

        <WriteDeliveryStateContainer>
          <button
            onClick={() =>
              setInputForm({ ...inputForm, delivery: !inputForm.delivery })
            }>
            택배
          </button>
          <button
            onClick={() =>
              setInputForm({ ...inputForm, direct: !inputForm.direct })
            }>
            직거래
          </button>
        </WriteDeliveryStateContainer>
        <WriteTitleContainer>지역 선택</WriteTitleContainer>
        <WriteBtnBox>
          <div>미선택</div>
          <div>V</div>
        </WriteBtnBox>
        <WriteTitleContainer>상세 설명</WriteTitleContainer>
        <WriteTextArea
          type="text"
          value={inputForm.content}
          name="content"
          onChange={onChangeHandler}
          placeholder="경매 물품에 대한 상세한 설명을 적어주세요."
        />
        <WriteTitleContainer>해시태그</WriteTitleContainer>
        <WriteInputBox placeholder="최대 6개까지 입력할 수 있습니다." />
        <WritePostBtn type="button" onClick={onTransmitHandler}>
          버튼
        </WritePostBtn>
      </AuctionWriteWrap>
      <Footer />
    </AuctionWriteLayout>
  );
};

const AuctionWriteLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const AuctionWriteWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 70px;
  padding: 0px 20px;

  height: calc(100vh - 140px);
  overflow: scroll;
  .form {
    display: flex;
    flex-direction: column;
  }
  /* background-color: yellow; */
`;
const WriteImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 93px; */
  min-height: 93px;
  gap: 12px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ImgBoxBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 93px;
  border: none;
  div {
    font-size: 12px;
    font-weight: 400;
  }
`;
const ImgBox = styled.div`
  display: flex;
  height: 100%;
  min-width: 93px;
  background-color: yellow;
  position: relative;
  .deleteBox {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background-color: #3a3a3a;
    div {
      position: relative;
      top: -3px;
      right: -3px;
      color: white;
      display: flex;
    }
  }
`;
const WriteTitleContainer = styled.div`
  display: flex;
  margin: 32px 0px 16px 0px;
  min-height: 24px;
  font-size: 16px;
  font-weight: 700;
  div {
    font-size: 14px;
    font-weight: 400;
    color: #9b9b9b;
  }
`;
const WriteInputBox = styled.input`
  display: flex;
  width: 100%;
  min-height: 56px;
  /* 인풋태그 디브 박스 안벗어나게 */
  box-sizing: border-box;
  border: 1px solid #dedede;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 9px;
`;
const WriteBtnBox = styled.button`
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;

  background-color: white;
  border: 1px solid #dedede;
  border-radius: 8px;
  box-sizing: border-box;

  font-size: 18px;
  font-weight: 400;
  padding: 0px 10px;
`;
const WriteDeliveryStateContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 48px;
  gap: 20px;

  button {
    display: flex;
    width: 165px;
    height: 100%;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    border-radius: 100px;
    border: 1px solid #9b9b9b;
    background-color: white;
  }
`;
const WriteTextArea = styled.textarea`
  display: flex;
  width: 100%;
  min-height: 192px;
  box-sizing: border-box;
  resize: none;
  border: 1px solid #c5d0e1;
`;

const WritePostBtn = styled.button`
  display: flex;
  width: 40px;
  height: 30px;
  background-color: red;
`;

export default AuctionWrite;
