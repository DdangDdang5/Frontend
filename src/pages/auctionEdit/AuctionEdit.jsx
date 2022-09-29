// React import
import React, { useEffect, useRef, useState } from "react";

// Redux import
import { useDispatch, useSelector } from "react-redux";
import { editAuctionItem } from "../../redux/modules/AuctionListSlice";
import { showModal, _regionList } from "../../redux/modules/ModalSlice";
import { auctionDetailData } from "../../redux/modules/AuctionSlice";

// Package import
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { ImgDelete, ImgPlus, UnderArrow } from "../../shared/images";
import { isIOS } from "react-device-detect";

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
    // startPrice: parseInt(data.startPrice),
    // category: data.category,
    region: data.region,
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
      return window.alert("상품 이미지를 추가하셔야 합니다");
    } else {
      window.alert("경매글이 게시 되었습니다.");
    }

    dispatch(
      editAuctionItem({ formData: formData, auctionId: data.auctionId })
    );
    // 포스팅 완료후 새로고침

    navigate(-1, { replace: true });
  };

  return (
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

export default AuctionEdit;
