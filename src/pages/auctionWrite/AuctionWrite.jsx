import React, { useRef, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useDispatch } from "react-redux";
import { addAuctionItem } from "../../redux/modules/AuctionListSlice";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../redux/modules/ModalSlice";
const AuctionWrite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auctionRequestDto = {
    title: "",
    content: "",
    startPrice: "",
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

  console.log("배돌배돌데이터", inputForm);
  // 이미지 업로드
  const onLoadFile = (e) => {
    // 미리보기에선 삭제가 됬는데 업로드 올린건 삭제가 됬나?
    const reader = new FileReader();
    setImgFile(...imgFile, URL.createObjectURL(e.target.files[0]));

    const prevImg = e.target.files[0];
    reader.readAsDataURL(prevImg);
    reader.onloadend = () => {
      setImagePreview([
        ...imagePreview,
        { id: imagePreview.length, img: reader.result },
      ]);
    };
  };

  const onRemove = (id) => {
    return setImagePreview(
      imagePreview.filter((imagePreview) => imagePreview.id !== id)
    );
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

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
    // 이미지 업로드
    let uploadImg = img_ref.current;
    let formData = new FormData();
    formData.append(
      "auctionRequestDto",
      new Blob([JSON.stringify(inputForm)], { type: "application/json" })
    );
    formData.append(
      "tags",
      new Blob([JSON.stringify(initialTag)], { type: "application/json" })
    );
    formData.append("images", uploadImg.files[0]);
    window.alert("새 게시물 만들기 완료");

    dispatch(addAuctionItem(formData));
    // 포스팅 완료후 새로고침

    navigate(-1, { replace: true });
    // window.location.reload();
  };

  return (
    <AuctionWriteLayout>
      <Header page="경매 글쓰기" write={true} movePage={onTransmitHandler} />

      <AuctionWriteWrap>
        <WriteImgContainer>
          <ImgBoxBtn>
            <label className="inBoxBtnContainer" htmlFor="img_UpFile">
              <div>+</div>
              <div>파일을 입력</div>
            </label>
            <input
              ref={img_ref}
              type="file"
              accept="image/*"
              id="img_UpFile"
              onChange={onLoadFile}
              style={{ display: "none" }}
            />
          </ImgBoxBtn>

          {imagePreview.map((item, index) => {
            return (
              <ImgBox key={index}>
                <img src={item.img} alt="" />
                <div className="deleteBox" onClick={() => onRemove(item.id)}>
                  <div>x</div>
                </div>
              </ImgBox>
            );
          })}
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
        <WriteBtnBox onClick={() => dispatch(showModal("categoryList"))}>
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
        <WriteBtnBox onClick={() => dispatch(showModal("regionList"))}>
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
  .inBoxBtnContainer {
    display: flex;
    flex-direction: column;
  }
  div {
    font-size: 12px;
    font-weight: 400;
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
