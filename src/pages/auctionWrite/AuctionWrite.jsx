// React import
import React, { useEffect, useRef, useState } from "react";

// Package import
import { useNavigate } from "react-router-dom";
import { isIOS } from "react-device-detect";

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
import { ImgDelete, ImgPlus, UnderArrow } from "../../shared/images";

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

  const categoryName = useSelector((state) => state.modal.categoryName);
  const regionName = useSelector((state) => state.modal.regionName);
  const categoryNameCheck = categoryName.split(/\s|\//g).join(""); // 공백, / 제거
  const regionNameCheck = regionName.split(" ").join(""); // 공백 제거

  useEffect(() => {
    dispatch(_categoryList());
  }, []);

  useEffect(() => {
    dispatch(_regionList());
  }, []);
  useEffect(() => {
    setInputForm((prev) => {
      const categoryNameCheck = categoryName.split(/\s|\//g).join(""); // 공백, / 제거
      return { ...prev, category: categoryNameCheck };
    });
  }, [categoryNameCheck]);

  useEffect(() => {
    setInputForm((prev) => {
      const regionNameCheck = regionName.split(" ").join(""); // 공백 제거
      return { ...prev, region: regionNameCheck };
    });
  }, [regionNameCheck]);

  useEffect(() => {}, [imagePreview, inputForm.auctionPeriod]);

  const onLoadFile = (e) => {
    const imgList = e.target.files;
    const imgFileList = [];
    const imgUrlList = [];

    if (imagePreview.length > 9) {
      return window.alert("이미지 개수는 10장을 초과 할 수 없습니다");
    } else {
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
    }
  };

  //미리보기 이미지 삭제
  const onRemove = (index) => {
    const cloneImagePreview = [...imagePreview];
    const cloneImage = [...imgFile];
    cloneImagePreview.splice(index, 1);
    cloneImage.splice(index, 1);
    setImagePreview(cloneImagePreview);
    setImgFile(cloneImage);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    const limit = 6;

    if (name === "startPrice") {
      if (Number(value) > 100000) {
        window.alert(`시작가는 100,000원을 초과할 수 없습니다.`);
        setInputForm({ ...inputForm, [name]: "" });
      } else {
        setInputForm({
          ...inputForm,
          [name]: Number(value).toString().slice(0, limit),
        });
      }
    } else {
      setInputForm({ ...inputForm, [name]: value });
    }
  };

  // 이미지, 태그 , 글 업로드
  const onTransmitHandler = () => {
    // 태그 추가
    if (tags !== "") {
      let tagList = tags.toString().split("#");
      tagList = tagList.slice(1, tagList.length);

      for (let i = 0; i < 6; i++) {
        const tmp = "tag" + (i + 1);
        if (tagList[i]) {
          initialTag[tmp] = tagList[i];
        } else {
          delete initialTag[tmp];
        }
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

    for (let i = 0; i < 10; i++) {
      formData.append("images", imgFile[i]);
    }
    if (imgFile.length === 0) {
      return window.alert("상품 이미지를 추가하셔야 합니다");
    } else if (inputForm.title === "") {
      return window.alert("제목을 입력하셔야 합니다.");
    } else if (inputForm.startPrice === 0 || inputForm.startPrice === "") {
      return window.alert("경매 시작가를 입력하셔야 합니다.");
    } else if (inputForm.delivery === false && inputForm.direct === false) {
      return window.alert("거래 방법을 선택하셔야 합니다.");
    } else if (inputForm.content === "") {
      return window.alert("상세 소개글을 입력하셔야 합니다.");
    } else {
      window.alert("경매글이 게시 되었습니다.");

      dispatch(addAuctionItem(formData));
      // 포스팅 완료후 새로고침

      navigate(-1, { replace: true });
    }
  };

  return (
    <AuctionWriteLayout>
      <Header
        back={true}
        pageName="경매 글쓰기"
        save={{ type: "완료" }}
        onClickSave={onTransmitHandler}
      />

      <AuctionWriteWrap isIOS={isIOS}>
        <WriteImgContainer>
          <ImgBoxBtn>
            <label className="inBoxBtnContainer" htmlFor="img_UpFile">
              <div>
                <ImgPlus />
              </div>
              <div className="imgCount">{`${imagePreview.length}/10`}</div>
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
                  <div className="deleteBox" onClick={() => onRemove(index)}>
                    <ImgDelete />
                  </div>
                </ImgBox>
              );
            })}
          </ImgBoxWrap>
        </WriteImgContainer>

        <WriteTitleContainer>제목</WriteTitleContainer>
        <WriteInputBox
          type="text"
          name="title"
          value={inputForm.title}
          onChange={onChangeHandler}
          placeholder="제목을 입력해주세요."
        />
        {/* <WriteTitleContainer>상품명</WriteTitleContainer>
        <WriteInputBox
          type="text"
          value={inputForm.content}
          name="content"
          onChange={onChangeHandler}
          placeholder="정확한 상품명을 입력해주세요."
        /> */}
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
              <UnderArrow />
            </div>
          </div>
        </WriteBtnBox>
        <WriteTitleContainer>
          경매 시작가
          <div>(최대 100,000원까지 가능)</div>
        </WriteTitleContainer>

        {/* placeHoder 위치 조정이 안됨 ㅡㅡ  */}

        <WritePriceWrap>
          <WriteInputBox
            placeholder="시작가를 입력해주세요."
            type="number"
            name="startPrice"
            value={inputForm.startPrice === 0 ? "" : inputForm.startPrice}
            onChange={onChangeHandler}
            maxLength="6"
          />
          {inputForm.startPrice.length > 0 ? <div>원</div> : ""}
        </WritePriceWrap>

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
          거래 방법
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
              <UnderArrow />
            </div>
          </div>
        </WriteBtnBox>
        <WriteTitleContainer>상세 설명</WriteTitleContainer>
        <WriteTextArea
          type="text"
          name="content"
          value={inputForm.content}
          onChange={onChangeHandler}
          placeholder="경매 물품에 대한 상세한 설명을 적어주세요."
        />
        <WriteTitleContainer>
          해시태그
          <div>(최대 6개 까지 가능)</div>
        </WriteTitleContainer>
        <WriteInputBox
          placeholder="태그 앞에 #을 붙여 주세요. (ex: #태그1 #태그2)"
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

  height: ${(props) =>
    props.isIOS ? `calc(100vh - 160px)` : `calc(100vh - 150px)`};
  overflow: scroll;
  .form {
    display: flex;
    flex-direction: column;
  }
`;
const WriteImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 93px;
  gap: 12px;
  /* height: 93px; */
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
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.Blue1};
  background-color: ${(props) => props.theme.colors.SkyBlue};
  .inBoxBtnContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    gap: 5px;
    width: 100%;
    height: 100%;
  }
  .imgCount {
    font-size: ${(props) => props.theme.fontSizes.ssm};
    font-weight: ${(props) => props.theme.fontWeights.normal};
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
  }
`;
const WriteTitleContainer = styled.div`
  display: flex;
  margin: 32px 0px 16px 0px;
  min-height: 24px;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.bold};

  div {
    margin-left: 5px;
    font-size: ${(props) => props.theme.fontSizes.sm};
    font-weight: ${(props) => props.theme.fontWeights.fontWeights};
    color: ${(props) => props.theme.colors.Gray3};
  }
`;

const WritePriceWrap = styled.div`
  display: flex;
  position: relative;
  div {
    position: absolute;
    top: 16px;
    right: 11px;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.fontWeights};
    color: ${(props) => props.theme.colors.Gray3};
  }
`;

const WriteInputBox = styled.input`
  display: flex;
  width: 100%;
  min-height: 56px;
  /* 인풋태그 디브 박스 안벗어나게 */
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  border-radius: 8px;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 9px;
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.fontWeights};
  letter-spacing: -0.05em;
  line-height: 150%;
`;
const WriteBtnBox = styled.button`
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.theme.colors.White};
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  border-radius: 8px;
  box-sizing: border-box;

  font-size: 18px;
  font-weight: 400;
  padding: 0px 10px;
  .WriteBtnBoxWrap {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.Black};
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
  padding: 10px;
  display: flex;
  width: 100%;
  min-height: 192px;
  box-sizing: border-box;
  resize: none;
  letter-spacing: -0.05em;
  word-spacing: -0.35em;
  line-height: 150%;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.Gray2};
  font-size: ${(props) => props.theme.fontSizes.ms};
  font-weight: ${(props) => props.theme.fontWeights.fontWeights};
`;

export default AuctionWrite;
