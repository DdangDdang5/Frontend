// React import
import React, { useEffect } from "react";

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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auctionDetailData } from "../../redux/modules/AuctionSlice";

const AuctionReview = () => {
  const dispatch = useDispatch();

  const { auctionId } = useParams();
  console.log(auctionId);

  const auction = useSelector((state) => state.auction.auction);

  useEffect(() => {
    dispatch(auctionDetailData(auctionId));
    console.log(auction);
  }, [JSON.stringify(auction)]);

  const answerList = ["매우나쁨", "나쁨", "보통", "좋음", "매우좋음"];

  return (
    <AuctionReviewContainer>
      <Header back={true} pageName="평가하기" save={{ type: "완료" }} />

      <AuctionReviewContent>
        {/* 평가 경매 */}
        <ReviewItemWrap>
          <ReviewItemWrapTitle>평가하는 경매</ReviewItemWrapTitle>
          <ReviewItem>
            <img src={auction?.multiImages[0].imgUrl} alt="auction-new-img" />
            <ReviewItemContent>
              <TagWrap>
                {auction?.delivery ? <span>택배</span> : null}
                {auction?.direct ? <span>직거래</span> : null}
                <TagRegion>{auction?.region}</TagRegion>
              </TagWrap>
              <ReviewItemTitle>{auction.title}</ReviewItemTitle>
              <ReviewItemPriceWrap>
                <span>최종낙찰가</span>
                <ReviewItemPrice>{auction.nowPrice}원</ReviewItemPrice>
              </ReviewItemPriceWrap>
            </ReviewItemContent>
          </ReviewItem>
        </ReviewItemWrap>

        <QuestionList>
          {Array.from({ length: 5 }, (_, i) => (
            <AnswerContainer key={i}>
              <span>
                {i + 1}. {i + 1}번째 질문. 임시 텍스트입니다.
              </span>
              <AnswerList>
                {answerList.map((item, idx) => {
                  const inputName = `action-review-${i}`;
                  return (
                    <AnswerItem key={idx}>
                      <AnswerRadioBtn type="radio" id={item} name={inputName} />
                      <span>{item}</span>
                    </AnswerItem>
                  );
                })}
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
