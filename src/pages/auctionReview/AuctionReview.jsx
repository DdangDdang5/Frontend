// React import
import React, { useEffect, useState } from "react";

// React import
import {
  auctionDetailData,
  reviewAuction,
} from "../../redux/modules/AuctionSlice";

// Package improt
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isIOS } from "react-device-detect";

// Component import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

// Style import
import {
  AnswerContainer,
  AnswerItem,
  AnswerList,
  AnswerRadioBtn,
  AuctionReviewContainer,
  AuctionReviewContent,
  QuestionList,
  ReviewItem,
  ReviewItemContent,
  ReviewItemPrice,
  ReviewItemPriceWrap,
  ReviewItemTitle,
  ReviewItemWrap,
  ReviewItemWrapTitle,
  TagRegion,
  TagWrap,
} from "./AuctionReview.styled";

const AuctionReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auctionId } = useParams();

  const auction = useSelector((state) => state.auction.auction);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState({
    value: [0, 0, 0],
    isCheck: [false, false, false],
  });

  const finialPrice = auction?.nowPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const questionList = [
    "상대의 응답 속도는 어떠셨나요?",
    "상대의 매너는 어떠셨나요?",
    "상대가 시간 약속을 잘 지켰나요?",
  ];
  const answerList = ["매우나쁨", "나쁨", "보통", "좋음", "매우좋음"];

  useEffect(() => {
    dispatch(auctionDetailData(auctionId));
  }, []);

  useEffect(() => {}, [auction]);

  const onCheckRadioBtn = (event) => {
    const { id, name } = event.target;
    let num = 0;

    switch (id) {
      case "매우나쁨":
        num = -2;
        break;
      case "나쁨":
        num = -1;
        break;
      case "보통":
        num = 0;
        break;
      case "좋음":
        num = 1;
        break;
      case "매우좋음":
        num = 2;
        break;
      default:
        break;
    }

    checked.value[name[name.length - 1]] = num;
    checked.isCheck[name[name.length - 1]] = true;
    setChecked(checked);

    if (!checked.isCheck.includes(false)) {
      setCheckedAll(true);
    }
  };

  // 경매 평가 저장 버튼 클릭
  const onClickSaveReview = () => {
    if (checkedAll) {
      if (window.confirm("평가를 완료하시겠습니까?")) {
        const valueSum = checked.value.reduce((a, b) => a + b);

        dispatch(
          reviewAuction({
            auctionId: auctionId,
            data: {
              trustPoint: valueSum,
            },
          }),
        );
        navigate("/myPage");
      }
    } else {
      window.alert("평가 항목을 전부 선택해주세요.");
    }
  };

  return (
    <AuctionReviewContainer>
      <Header
        back={true}
        pageName="평가하기"
        save={{ type: "완료", state: checkedAll }}
        onClickSave={onClickSaveReview}
      />

      <AuctionReviewContent isIOS={isIOS}>
        {/* 평가 경매 */}
        <ReviewItemWrap>
          <ReviewItemWrapTitle>평가하는 경매</ReviewItemWrapTitle>
          <ReviewItem>
            <img
              src={auction.multiImages ? auction.multiImages[0].imgUrl : ""}
              alt="auction-new-img"
              onClick={() => navigate(`/auctionDetail/${auctionId}`)}
            />
            <ReviewItemContent>
              <TagWrap>
                {auction?.delivery ? <span>택배</span> : null}
                {auction?.direct ? <span>직거래</span> : null}
                <TagRegion>{auction?.region}</TagRegion>
              </TagWrap>
              <ReviewItemTitle>{auction.title}</ReviewItemTitle>
              <ReviewItemPriceWrap>
                <span>최종낙찰가</span>
                <ReviewItemPrice>{finialPrice}원</ReviewItemPrice>
              </ReviewItemPriceWrap>
            </ReviewItemContent>
          </ReviewItem>
        </ReviewItemWrap>

        <QuestionList>
          {questionList.map((item, idx) => (
            <AnswerContainer key={idx}>
              <span>
                {idx + 1}. {item}
              </span>
              <AnswerList>
                {answerList.map((itemA, idxA) => (
                  <AnswerItem key={idxA}>
                    <AnswerRadioBtn
                      type="radio"
                      id={itemA.toString()}
                      name={`action-review-${idx}`}
                      onChange={(e) => onCheckRadioBtn(e)}
                    />
                    <span>{itemA}</span>
                  </AnswerItem>
                ))}
              </AnswerList>
            </AnswerContainer>
          ))}
        </QuestionList>
      </AuctionReviewContent>

      <Footer />
    </AuctionReviewContainer>
  );
};

export default AuctionReview;
