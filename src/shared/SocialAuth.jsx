const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = "https://sysgood.shop/member/kakao/callback";
export const KAKAO_OAUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
