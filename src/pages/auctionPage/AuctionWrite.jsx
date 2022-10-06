// React import
import React, { useEffect, useRef, useState } from "react";

//redux import
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { addAuctionItem } from "../../redux/modules/AuctionListSlice";
import {
  showModal,
  _categoryList,
  _regionList,
} from "../../redux/modules/ModalSlice";

// Package import
import { useNavigate } from "react-router-dom";
import { isIOS } from "react-device-detect";

//components import
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PageModal from "../../components/modal/PageModal";

// Shared import
import { ImgDelete, ImgPlus, UnderArrow } from "../../shared/images";
import { handleFileOnChange, handleUrlOnChange } from "../../shared/ImgResize";

// Style import
import {
  AuctionWriteLayout,
  AuctionWriteWrap,
  ImgBoxBtn,
  WriteImgContainer,
  ImgBoxWrap,
  ImgBox,
  WriteTitleContainer,
  WritePriceWrap,
  WriteBtnBox,
  WriteInputBox,
  WriteTitleAuctionDay,
  WriteDeliveryStateContainer,
  DeliveryBtn,
  DirectBtn,
  WriteTextArea,
} from "./AuctionWrite.styled";

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
    auctionPeriod: 0,
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

  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
    onClickCloseBtn: () => {},
  });

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

  const onLoadFile = async (e) => {
    const imgList = e.target.files;
    const imgFileList = [];
    const imgUrlList = [];

    if (imagePreview.length > 9) {
      return (
        setOptionVisible(true),
        setOptionContent({
          modalText: "이미지 개수는 \n 10장을 초과 할 수 없습니다.",
          btnText: "확인",
          // isConfirm: true,
          onClickBtn: () => setOptionVisible(false),
        })
      );
    } else {
      for (let i = 0; i < imagePreview.length; i++) {
        imgUrlList.push(imagePreview[i]);
        imgFileList.push(imgFile[i]);
      }

      // resize img
      for (let i = 0; i < imgList.length; i++) {
        let newFile = await handleFileOnChange(imgList[i]);
        let newFileURL = await handleUrlOnChange(newFile);

        imgUrlList.push({
          id: imagePreview.length,
          img: newFileURL,
        });
        imgFileList.push(newFile);
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
        setOptionVisible(true);
        setOptionContent({
          modalText: "시작가는 100,000원을 \n 초과할 수 없습니다.",
          btnText: "확인",
          // isConfirm: true,
          onClickBtn: () => setOptionVisible(false),
        });
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
      return (
        setOptionVisible(true),
        setOptionContent({
          modalText: "상품이미지를 \n 추가하셔야 합니다.",
          btnText: "확인",
          // isConfirm: true,
          onClickBtn: () => setOptionVisible(false),
        })
      );
    } else if (inputForm.title === "") {
      return (
        setOptionVisible(true),
        setOptionContent({
          modalText: "제목을 \n 입력하셔야 합니다.",
          btnText: "확인",
          // isConfirm: true,
          onClickBtn: () => setOptionVisible(false),
        })
      );
    } else if (inputForm.startPrice === 0 || inputForm.startPrice === "") {
      return (
        setOptionVisible(true),
        setOptionContent({
          modalText: "경매 시작가를 \n 입력하셔야 합니다.",
          btnText: "확인",
          // isConfirm: true,
          onClickBtn: () => setOptionVisible(false),
        })
      );
    } else if (inputForm.auctionPeriod === 0) {
      return (
        setOptionVisible(true),
        setOptionContent({
          modalText: "경매 시간을 \n 선택하셔야 합니다.",
          btnText: "확인",
          // isConfirm: true,
          onClickBtn: () => setOptionVisible(false),
        })
      );
    } else if (inputForm.delivery === false && inputForm.direct === false) {
      return (
        setOptionVisible(true),
        setOptionContent({
          modalText: "거래 방법을 \n 선택하셔야 합니다.",
          btnText: "확인",
          // isConfirm: true,
          onClickBtn: () => setOptionVisible(false),
        })
      );
    } else if (inputForm.content === "") {
      return (
        setOptionVisible(true),
        setOptionContent({
          modalText: "상세 소개글을 \n 입력하셔야 합니다.",
          btnText: "확인",
          // isConfirm: true,
          onClickBtn: () => setOptionVisible(false),
        })
      );
    } else {
      setOptionVisible(true);
      setOptionContent({
        modalText: "경매글이 \n 게시되었습니다.",
        btnText: "확인",
        // isConfirm: true,
        onClickCloseBtn: () => navigate(-1, { replace: true }),
      });
      dispatch(addAuctionItem(formData));
    }
  };

  return (
    <>
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
            maxLength="25"
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
            onClick={() =>
              dispatch(showModal("categoryList"), _categoryList())
            }>
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

          <WriteTitleContainer>경매 시간</WriteTitleContainer>
          <WriteTitleAuctionDay>
            <button
              className="btn1"
              state={inputForm.auctionPeriod}
              onClick={() => setInputForm({ ...inputForm, auctionPeriod: 10 })}>
              10분
            </button>
            <button
              className="btn5"
              state={inputForm.auctionPeriod}
              onClick={() => setInputForm({ ...inputForm, auctionPeriod: 30 })}>
              30분
            </button>
            <button
              className="btn7"
              state={inputForm.auctionPeriod}
              onClick={() => setInputForm({ ...inputForm, auctionPeriod: 60 })}>
              60분
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
            wrap="hard"
            value={inputForm.content}
            onChange={onChangeHandler}
            maxLength="250"
            placeholder="경매 물품에 대한 상세한 설명을 적어주세요."
          />
          <WriteTitleContainer>
            해시태그
            <div>(최대 6개 까지 가능)</div>
          </WriteTitleContainer>
          <WriteInputBox
            placeholder="태그 앞에 #을 붙여 주세요. (ex: #태그1 #태그2)"
            isIOS={isIOS}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {/* <WritePostBtn type="button" onClick={onTransmitHandler}>
            버튼
          </WritePostBtn> */}
        </AuctionWriteWrap>
        <Footer />
      </AuctionWriteLayout>
      <PageModal
        visible={optionVisible}
        setVisible={setOptionVisible}
        modalText={optionContent.modalText}
        btnText={optionContent.btnText}
        isConfirm={optionContent.isConfirm}
        onClickBtn={optionContent.onClickBtn}
        onClickCloseBtn={optionContent.onClickCloseBtn}
      />
    </>
  );
};

export default AuctionWrite;
