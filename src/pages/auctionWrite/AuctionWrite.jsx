// React import
import React, { useEffect, useRef, useState } from "react";

// Package import
import { useNavigate } from "react-router-dom";

//components import

import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

//redux import
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { addAuctionItem } from "../../redux/modules/AuctionListSlice";
import {
  showModal,
  _categoryList,
  _regionList,
} from "../../redux/modules/ModalSlice";

// Style import
import styled from "styled-components";

const AuctionWrite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auctionRequestDto = {
    title: "",
    content: "",
    startPrice: 0,
    category: "가전",
    region: "동대문구",
    direct: false,
    delivery: false,
    auctionPeriod: 1,
  };
  const initialTag = {
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
    tag5: "",
    tag6: "",
  };

  const [imgFile, setImgFile] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const img_ref = useRef();
  const [inputForm, setInputForm] = useState(auctionRequestDto);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(_categoryList());
  }, []);
  useEffect(() => {
    dispatch(_regionList());
  }, []);

  const categoryName = useSelector((state) => state.modal.categoryName);
  const regionName = useSelector((state) => state.modal.regionName);

  const categoryNameCheck = categoryName.split(/\s|\//g).join(""); // 공백, / 제거
  const regionNameCheck = regionName.split(" ").join(""); // 공백 제거

  console.log("배돌배돌", inputForm);

  useEffect(() => {
    setInputForm((prev) => {
      return { ...prev, category: categoryNameCheck };
    });
  }, [categoryNameCheck]);

  useEffect(() => {
    setInputForm((prev) => {
      return { ...prev, region: regionNameCheck };
    });
  }, [regionNameCheck]);

  useEffect(() => {}, [imagePreview, inputForm.auctionPeriod]);

  const onLoadFile = (e) => {
    const imgList = e.target.files;
    const imgFileList = [];
    const imgUrlList = [];

    for (let i = 0; i < imagePreview.length; i++) {
      imgUrlList.push(imagePreview[i]);
      imgFileList.push(imgFile[i]);
    }

    for (let i = 0; i < imgList.length; i++) {
      imgUrlList.push({
        id: imagePreview.length,
        img: URL.createObjectURL(imgList[i]),
      });
      imgFileList.push(imgList[i]);
    }

    setImgFile(imgFileList);
    setImagePreview(imgUrlList);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "startPrice") {
      setInputForm({ ...inputForm, [name]: Number(value) });
    } else {
      setInputForm({ ...inputForm, [name]: value });
    }
  };

  // 이미지, 태그 , 글 업로드
  const onTransmitHandler = () => {
    // 태그 추가
    let tagList = tags.split("#");
    tagList = tagList.slice(1, tagList.length);

    for (let i = 0; i < 6; i++) {
      const tmp = "tag" + (i + 1);
      if (tagList[i]) {
        initialTag[tmp] = tagList[i];
      } else {
        delete initialTag[tmp];
      }
    }

    let formData = new FormData();
    formData.append(
      "auctionRequestDto",
      new Blob([JSON.stringify(inputForm)], { type: "application/json" })
    );
    formData.append(
      "tags",
      new Blob([JSON.stringify(initialTag)], { type: "application/json" })
    );

    for (let i = 0; i < imgFile.length; i++) {
      formData.append("images", imgFile[i]);
    }

    window.alert("새 게시물 만들기 완료");

    dispatch(addAuctionItem(formData));
    // 포스팅 완료후 새로고침

    navigate(-1, { replace: true });
  };

  // 이미지 미리보기 삭제
  const onRemove = (id) => {
    return setImagePreview(
      imagePreview.filter((imagePreview) => imagePreview.id !== id)
    );
  };

  return (
    <AuctionWriteLayout>
      <Header
        back={true}
        pageName="경매 글쓰기"
        save={{ type: "완료" }}
        onClickSave={onTransmitHandler}
      />

      <AuctionWriteWrap>
        <WriteImgContainer>
          <ImgBoxBtn>
            <label className="inBoxBtnContainer" htmlFor="img_UpFile">
              <div>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M26.6452 12.6452H15.3548V1.35484C15.3548 0.605161 14.7497 0 14 0C13.2503 0 12.6452 0.605161 12.6452 1.35484V12.6452H1.35484C0.605161 12.6452 0 13.2503 0 14C0 14.7497 0.605161 15.3548 1.35484 15.3548H12.6452V26.6452C12.6452 27.3948 13.2503 28 14 28C14.7497 28 15.3548 27.3948 15.3548 26.6452V15.3548H26.6452C27.3948 15.3548 28 14.7497 28 14C28 13.2503 27.3948 12.6452 26.6452 12.6452Z"
                    fill="#A5A9B6"
                  />
                </svg>
              </div>
              <div>파일을 입력</div>
            </label>
            <input
              ref={img_ref}
              type="file"
              multiple="multiple"
              accept="image/*"
              id="img_UpFile"
              onChange={onLoadFile}
              style={{ display: "none" }}
            />
          </ImgBoxBtn>
          <ImgBoxWrap>
            {imagePreview.map((item, index) => {
              return (
                <ImgBox key={index}>
                  <img src={item.img} id={index} alt="" />
                  <div className="deleteBox" onClick={() => onRemove(item.id)}>
                    <div>x</div>
                  </div>
                </ImgBox>
              );
            })}
          </ImgBoxWrap>
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
        <WriteBtnBox
          onClick={() => dispatch(showModal("categoryList"), _categoryList())}>
          <div className="WriteBtnBoxWrap">
            {categoryNameCheck === "" ? (
              <div>미선택</div>
            ) : (
              <div>{categoryNameCheck}</div>
            )}
            <div>
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.7048 0.29272C17.3145 -0.0975732 16.684 -0.0975732 16.2938 0.29272L8.99872 7.58819L1.70368 0.29272C1.31341 -0.0975732 0.682972 -0.0975732 0.292702 0.29272C-0.0975675 0.683012 -0.0975675 1.31348 0.292702 1.70377L8.29824 9.70979C8.49838 9.90994 8.74856 10 9.00874 10C9.26892 10 9.51908 9.89993 9.71922 9.70979L17.7248 1.70377C18.095 1.31348 18.095 0.683012 17.7048 0.29272Z"
                  fill="#3A3A3A"
                />
              </svg>
            </div>
          </div>
        </WriteBtnBox>
        <WriteTitleContainer>경매 시작가</WriteTitleContainer>

        {/* placeHoder 위치 조정이 안됨 ㅡㅡ  */}

        <WriteInputBox
          placeholder="시작가를 입력해주세요."
          type="number"
          value={
            inputForm.startPrice === 0 ? "" : inputForm.startPrice.toString()
          }
          name="startPrice"
          onChange={onChangeHandler}
        />
        {/* <input className="inputTag" type="text" placeholder="원" /> */}

        <WriteTitleContainer>경매 일수</WriteTitleContainer>
        <WriteTitleAuctionDay>
          <button
            className="btn1"
            state={inputForm.auctionPeriod}
            onClick={() => setInputForm({ ...inputForm, auctionPeriod: 1 })}>
            1
          </button>
          <button
            className="btn5"
            state={inputForm.auctionPeriod}
            onClick={() => setInputForm({ ...inputForm, auctionPeriod: 5 })}>
            5
          </button>
          <button
            className="btn7"
            state={inputForm.auctionPeriod}
            onClick={() => setInputForm({ ...inputForm, auctionPeriod: 7 })}>
            7
          </button>
        </WriteTitleAuctionDay>

        <WriteTitleContainer>
          배송 방법
          <div>(중복 선택 가능)</div>
        </WriteTitleContainer>

        <WriteDeliveryStateContainer>
          <DeliveryBtn
            state={inputForm.delivery}
            onClick={() =>
              setInputForm({ ...inputForm, delivery: !inputForm.delivery })
            }>
            택배
          </DeliveryBtn>
          <DirectBtn
            state={inputForm.direct}
            onClick={() =>
              setInputForm({ ...inputForm, direct: !inputForm.direct })
            }>
            직거래
          </DirectBtn>
        </WriteDeliveryStateContainer>
        <WriteTitleContainer>지역 선택</WriteTitleContainer>
        <WriteBtnBox
          onClick={() => dispatch(showModal("regionList"), _regionList())}>
          <div className="WriteBtnBoxWrap">
            {regionNameCheck === "전체지역" ? (
              <div>미선택</div>
            ) : (
              <div>{regionNameCheck}</div>
            )}
            <div>
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.7048 0.29272C17.3145 -0.0975732 16.684 -0.0975732 16.2938 0.29272L8.99872 7.58819L1.70368 0.29272C1.31341 -0.0975732 0.682972 -0.0975732 0.292702 0.29272C-0.0975675 0.683012 -0.0975675 1.31348 0.292702 1.70377L8.29824 9.70979C8.49838 9.90994 8.74856 10 9.00874 10C9.26892 10 9.51908 9.89993 9.71922 9.70979L17.7248 1.70377C18.095 1.31348 18.095 0.683012 17.7048 0.29272Z"
                  fill="#3A3A3A"
                />
              </svg>
            </div>
          </div>
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
        <WriteInputBox
          placeholder="최대 6개까지 입력할 수 있습니다."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {/* <WritePostBtn type="button" onClick={onTransmitHandler}>
          버튼
        </WritePostBtn> */}
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
`;
const WriteImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 93px; */
  min-height: 93px;
  gap: 12px;
  /* overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  } */
`;
const ImgBoxBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 93px;
  border: none;
  .inBoxBtnContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 100%;
    height: 100%;
  }
  div {
    font-size: 12px;
    font-weight: 400;
  }
`;

const ImgBoxWrap = styled.div`
  display: flex;
  min-height: 93px;
  gap: 12px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ImgBox = styled.div`
  display: flex;
  height: 100%;
  min-width: 93px;
  width: 93px;
  gap: 16px;
  position: relative;
  background-color: yellow;

  img {
    display: flex;
    object-fit: cover;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
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
  .WriteBtnBoxWrap {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: black;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const WriteDeliveryStateContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 48px;
  gap: 20px;
`;
const DirectBtn = styled.button`
  display: flex;
  width: 165px;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  border-radius: 100px;
  border: ${(props) =>
    props.state ? "1px solid #4D71FF" : "1px solid #a5a9b6"};
  background-color: ${(props) => (props.state ? "#E9F3FF" : "white")};
  color: ${(props) => (props.state ? "#4D71FF" : "#a5a9b6")};
`;
const DeliveryBtn = styled.button`
  display: flex;
  width: 165px;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  border-radius: 100px;
  border: ${(props) =>
    props.state ? "1px solid #4D71FF" : "1px solid #a5a9b6"};
  background-color: ${(props) => (props.state ? "#E9F3FF" : "white")};
  color: ${(props) => (props.state ? "#4D71FF" : "#a5a9b6")};
`;

const WriteTitleAuctionDay = styled.div`
  display: flex;

  justify-content: center;
  gap: 20px;
  .btn1 {
    width: 100px;
    height: 48px;
    border-radius: 100px;
    border: ${(props) =>
      props.children[0].props.state === 1
        ? "1px solid #4D71FF"
        : "1px solid #a5a9b6"};
    /* border: ${(props) => console.log(props.children[0].props.state)}; */
    background-color: ${(props) =>
      props.children[0].props.state === 1 ? "#E9F3FF" : "white"};
    color: ${(props) =>
      props.children[0].props.state === 1 ? "#4D71FF" : "#a5a9b6"};
  }
  .btn5 {
    width: 100px;
    height: 48px;
    border-radius: 100px;
    border: ${(props) =>
      props.children[0].props.state === 5
        ? "1px solid #4D71FF"
        : "1px solid #a5a9b6"};
    background-color: ${(props) =>
      props.children[0].props.state === 5 ? "#E9F3FF" : "white"};
    color: ${(props) =>
      props.children[0].props.state === 5 ? "#4D71FF" : "#a5a9b6"};
  }
  .btn7 {
    width: 100px;
    height: 48px;
    border-radius: 100px;
    border: ${(props) =>
      props.children[0].props.state === 7
        ? "1px solid #4D71FF"
        : "1px solid #a5a9b6"};
    background-color: ${(props) =>
      props.children[0].props.state === 7 ? "#E9F3FF" : "white"};
    color: ${(props) =>
      props.children[0].props.state === 7 ? "#4D71FF" : "#a5a9b6"};
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

export default AuctionWrite;
