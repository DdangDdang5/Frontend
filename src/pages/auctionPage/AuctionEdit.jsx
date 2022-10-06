// React import
import React, { useEffect, useRef, useState } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { editAuctionItem } from "../../redux/modules/AuctionListSlice";
import { showModal, _regionList } from "../../redux/modules/ModalSlice";
import { auctionDetailData } from "../../redux/modules/AuctionSlice";

// Package import
import { useNavigate, useParams } from "react-router-dom";
import { isIOS } from "react-device-detect";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import PageModal from "../../components/modal/PageModal";

// Element & Shared import
import { ImgDelete, ImgPlus, UnderArrow } from "../../shared/images";
import { handleFileOnChange, handleUrlOnChange } from "../../shared/ImgResize";

// Style import
import {
  AuctionWriteLayout,
  AuctionWriteWrap,
  ImgBox,
  ImgBoxBtn,
  ImgBoxWrap,
  WriteBtnBox,
  WriteImgContainer,
  WriteInputBox,
  WriteTextArea,
  WriteTitleContainer,
} from "./AuctionEdit.styled";

const AuctionEdit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const img_ref = useRef();
  const data = useSelector((state) => state.auction.auction);
  // console.log(data);
  const auctionRequestDto = {
    title: data.title,
    content: data.content,
    region: data.region,
    // startPrice: parseInt(data.startPrice),
    // category: data.category,
    // direct: data.direct,
    // delivery: data.delivery,
    // auctionPeriod: 1,
  };
  const [imgFile, setImgFile] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const initialTag = {
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
    tag5: "",
    tag6: "",
  };
  const [inputForm, setInputForm] = useState(auctionRequestDto);
  const [tags, setTags] = useState([]);
  const regionName = useSelector((state) => state.modal.regionName);
  const regionNameCheck = regionName.split(" ").join(""); // 공백 제거

  const [optionVisible, setOptionVisible] = useState(false); // alert 모달
  const [optionContent, setOptionContent] = useState({
    modalText: "",
    btnText: "",
    isConfirm: false,
    onClickBtn: () => {},
    onClickCloseBtn: () => {},
  });

  // 기존 데이터 수정페이지에 데이터 업데이트
  useEffect(() => {
    dispatch(auctionDetailData(params.auctionId));

    // 수정 전 이미지 업로드
    // const imgArray = data?.multiImages?.map((item, index) => {
    //   return item.imgUrl;
    // });

    // if (imgArray) {
    //   setImagePreview(imgArray);
    //   setImgFile(imgArray);
    // }

    setInputForm(auctionRequestDto);
  }, [JSON.stringify(data)]);

  useEffect(() => {
    dispatch(_regionList());
  }, []);

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
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "startPrice") {
      setInputForm({ ...inputForm, [name]: Number(value) });
    } else {
      setInputForm({ ...inputForm, [name]: value });
    }
  };

  //미리보기 이미지 삭제
  const onRemove = (index) => {
    const cloneImagePreview = [...imagePreview];
    cloneImagePreview.splice(index, 1);
    setImagePreview(cloneImagePreview);
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
      "auctionUpdateDto",
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
    } else {
      setOptionVisible(true);
      setOptionContent({
        modalText: "경매글이 \n 게시되었습니다.",
        btnText: "확인",
        // isConfirm: true,
        onClickCloseBtn: () => navigate(-1, { replace: true }),
      });
      dispatch(
        editAuctionItem({ formData: formData, auctionId: data.auctionId })
      );
      // 포스팅 완료후 새로고침
    }
  };

  return (
    <>
      <AuctionWriteLayout>
        <Header
          back={true}
          pageName="경매 수정하기"
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
                    <img src={item?.img ? item?.img : item} id={index} alt="" />
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
            value={inputForm.title}
            name="title"
            onChange={onChangeHandler}
            placeholder="제목을 입력해주세요."
          />

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
            value={inputForm.content}
            name="content"
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

export default AuctionEdit;
