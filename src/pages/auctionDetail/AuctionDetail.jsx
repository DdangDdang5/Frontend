import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//components
import Header from "../../components/header/Header";

//reducer
import { useSelector, useDispatch } from "react-redux";
import { auctionDetailData } from "../../redux/modules/AuctionSlice";
import { deleteAuctionItem } from "../../redux/modules/AuctionListSlice";

//styled
import styled from "styled-components";
import { Close, Next } from "../../shared/images";
import Slider from "../../components/auction/Slider";
import AuctionJoinModal from "../../components/modal/AuctionJoinModal";
import Button from "../../elements/button/Button";

const AuctionDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const data = useSelector((state) => state.auction.auction);

  const imgList = data.multiImages;

  console.log(imgList);

  const [joinVisible, setJoinVisible] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!params?.auctionId) {
      return <></>;
    } else {
      dispatch(auctionDetailData(+params?.auctionId));
    }
  }, [params?.auctionId]);

  if (!data) {
    return navigate(-1);
  }

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteAuctionItem(data.id)).unwrap();
      if (response) {
        return navigate(-1, { replace: true });
      }
    } catch {}
  };

  return (
    <>
      <AuctionDetailLayout>
        <Header
          back={true}
          share={true}
          menu={true}
          handleDelete={handleDelete}
        />

      <DetailBodyWrap>
        <ItemImgContainer>
          {/* {data?.multiImages?.[0]?.imgUrl && (
            <img src={data.multiImages[0].imgUrl} alt="" />
          )} */}
          <Slider data={imgList} />
        </ItemImgContainer>

          <DetailBodyContainer>
            <DetailBodyProfileBox>
              <DetailBodyProfileImg>
                <img src={data.profileImgUrl} alt="" />
              </DetailBodyProfileImg>
              <div className="DetailBodyProfile">
                <DetailBodyProfileContent>
                  <div className="nickName">{data.member.nickName}</div>
                  <div className="trustCount">신뢰도</div>
                </DetailBodyProfileContent>
                <div>신고</div>
              </div>
            </DetailBodyProfileBox>

            <DetailBodyTitle>{data.title}</DetailBodyTitle>

            <DetailBodySelectTag>
              {data.direct ? <div>택배</div> : ""}
              {data.delivery ? <div>직거래</div> : ""}
              {data.region ? <div>{data.region}</div> : ""}
            </DetailBodySelectTag>

            <DetailBodyContent>{data.content}</DetailBodyContent>
            <DetailBodyViewTag>
              <div>관심 10</div>
              <div>조회 {data.viewerCnt}</div>
            </DetailBodyViewTag>
            <DetailBodyItemTag></DetailBodyItemTag>
          </DetailBodyContainer>

          <CommentCountContainer
            onClick={() =>
              navigate("/chat/roomId", { state: { isDetail: true } })
            }
          >
            <CommentCountWrap>
              <CommentCountTitle>실시간 채팅방</CommentCountTitle>
              <p>{data.participantCnt}명 참여중</p>
            </CommentCountWrap>
            <Next />
          </CommentCountContainer>

          {/* <DetailCommentContainer>
          <CommentFormBox>
            <div className="inputBox">
              <textarea placeholder="댓글을 입력해주세요." rows="" cols="" />
              <button>댓글 작성</button>
            </div>
          </CommentFormBox>
        </DetailCommentContainer> */}
        </DetailBodyWrap>

        <DetailFooterWrap>
          <DetailFooterTimeContainer>
            <p>남은 시간</p>
            <h3>{data.createdAt}</h3>
          </DetailFooterTimeContainer>
          <DetailFooterContainer>
            <FooterLeftBox>
              <div className="presentPrice">{`시작가 ${data.startPrice}원`}</div>
              <div className="price">{`현재가 ${data.nowPrice}원`}</div>
            </FooterLeftBox>
            <FooterRightBox>
              <button onClick={() => setJoinVisible(true)}>입찰하기</button>
            </FooterRightBox>
          </DetailFooterContainer>
        </DetailFooterWrap>
      </AuctionDetailLayout>

      <AuctionJoinModal visible={joinVisible} setVisible={setJoinVisible}>
        <AuctionJoinModalContent>
          <AuctionJoinIcon>
            <img src="/maskable.png" alt="auction-join" />
          </AuctionJoinIcon>

          <AuctionJoinCloseWrap>
            <Close onClick={() => setJoinVisible(false)} />
          </AuctionJoinCloseWrap>
          <AuctionNowPriceWrap>
            <span>현재 최고가</span>
            <AuctionNowPrice>50000원</AuctionNowPrice>
          </AuctionNowPriceWrap>
          <AuctionJoinInfo>
            입찰 후에는 금액을 수정하거나 취소할 수 없습니다.
          </AuctionJoinInfo>
          <AuctionJoinInput
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="입찰 가격을 입력해주세요."
          />
          {price <= Math.max(data.startPrice, data.nowPrice) ? (
	          <AuctionJoinInputInfo>
	            현재 최고가보다 낮은 호가입니다.
	          </AuctionJoinInputInfo>
          ) : (
						<AuctionJoinInputInfo></AuctionJoinInputInfo>
          )}
          <ButtonContainer>
            <Button
              type={"submit"}
              text={"입찰하기"}
              style={{
                width: "100%",
                height: "56px",
                ft_size: "18px",
                color: "#FFFFFF",
                bg_color: "#4D71FF",
              }}
            />
          </ButtonContainer>
        </AuctionJoinModalContent>
      </AuctionJoinModal>
    </>
  );
};

const AuctionDetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const DetailBodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  height: calc(100vh - 185px);
  overflow: scroll;
`;
const ItemImgContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 390px;
  }
`;
const DetailBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;
const DetailBodyProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  margin-bottom: 24px;
  .DetailBodyProfile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
const DetailBodyProfileImg = styled.div`
  display: flex;
  img {
    height: 48px;
    width: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    margin-right: 11px;
  }
`;
const DetailBodyProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .nickName {
    font-size: 16px;
    font-weight: 700;
  }
  .trustCount {
    font-size: 16px;
    font-weight: 400;
  }
`;

const DetailBodyTitle = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  word-break: break-all;
  margin-bottom: 16px;
`;
const DetailBodySelectTag = styled.div`
  display: flex;
  margin-bottom: 16px;
  div {
    display: flex;
    border-radius: 20px;
    background-color: #dedede;
    padding: 1px 6px;
    margin-right: 6px;
  }
`;
const DetailBodyContent = styled.div`
  display: flex;
  word-break: break-all;
  font-size: 20px;
  height: 100%;
`;
const DetailBodyViewTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 49px;
  gap: 0 9px;

  div {
    font-size: 16px;
    font-weight: 400;
    color: #9b9b9b;
  }
`;

const DetailBodyItemTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 8px;
  height: 22px;
  margin-bottom: 40px;
  div {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    justify-content: center;

    padding: 2px 6px;
    border-radius: 100px;
    background-color: #9b9b9b;
    color: white;
  }
`;

const CommentCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 57px;
  padding: 0px 20px;
  border-top: 1px solid #dedede;
  gap: 8px;
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: #9b9b9b;
  }

  img {
    width: 16px;
    height: 16px;
  }

  svg {
    width: 10px;
    height: 18px;
    path {
      fill: ${(props) => props.theme.colors.Gray3};
    }
  }
`;

const CommentCountWrap = styled.div`
  display: flex;
  gap: 12px;
`;

const CommentCountTitle = styled.p`
  font-weight: 700 !important;
  color: black !important;
`;

const DetailCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CommentFormBox = styled.form`
  display: flex;
  justify-content: center;
  height: 180px;
  background-color: #dedede;
  .inputBox {
    display: flex;
    flex-direction: column;
    width: 350px;
    gap: 16px;
    textarea {
      display: flex;
      border-radius: 8px;
      border: 1px solid #bcbcbc;
      margin-top: 20px;
      width: 100%;
      height: 68px;
      resize: none;

      box-sizing: border-box;
      padding: 13px 16px;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: -0.05em;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      border: none;
      background-color: #bcbcbc;
      width: 100%;
      height: 56px;

      font-size: 18px;
      font-weight: 400;
      color: #6d6d6d;
    }
  }
`;

const DetailFooterWrap = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 116px;
  flex-direction: column;
  position: absolute;
  bottom: 0;
`;
const DetailFooterTimeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 42px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  gap: 0 8px;
  p {
    font-size: 14px;
    font-weight: 400;
  }
  h3 {
    font-size: 20px;
    font-weight: 700;
  }
`;
const DetailFooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FooterLeftBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 9px 0px 11px 20px;
  .presentPrice {
    display: flex;
    font-size: 14px;
    color: #bcbcbc;
  }
  .price {
    display: flex;
    font-size: 24px;
    font-weight: 700;
  }
`;
const FooterRightBox = styled.div`
  display: flex;
  margin: 13px 20px 14px 0px;
  button {
    display: flex;
    width: 165px;
    height: 47px;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 2% auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuctionJoinIcon = styled.div`
  width: 104px;
  height: 104px;

  background-color: ${(props) => props.theme.colors.White};
  border-radius: 50%;

  position: absolute;
  top: -30%;
  right: 50%;
  transform: translate(50%, 50%);

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 82px;
    height: 82px;

    border-radius: 50%;
  }
`;

const AuctionJoinModalContent = styled.div`
  padding: 20px;
  /* background-color: aliceblue; */
`;

const AuctionJoinCloseWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const AuctionNowPriceWrap = styled.div`
  margin-top: 45px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  span {
    color: ${(props) => props.theme.colors.Black};
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

const AuctionNowPrice = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xl} !important;
  font-weight: ${(props) => props.theme.fontWeights.medium} !important;
`;

const AuctionJoinInfo = styled.p`
  margin-top: 1px;

  color: ${(props) => props.theme.colors.Gray3};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};

  text-align: center;
`;

const AuctionJoinInput = styled.input`
  width: calc(100% - 30px);
  height: 22px;
  margin-top: 20px;
  padding: 16px 15px;

  background: ${(props) => props.theme.colors.White};
  border: 1px solid ${(props) => props.theme.colors.Gray1};
  border-radius: 8px;
`;

const AuctionJoinInputInfo = styled.p`
	height: 20px;
  margin-top: 8px;

  color: ${(props) => props.theme.colors.Red};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: ${(props) => props.theme.fontWeights.normal};
`;

export default AuctionDetail;
