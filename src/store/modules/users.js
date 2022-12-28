// 액션 타입(문자열)
const LOGIN = "users/LOGIN";
const LOGOUT = "users/LOGOUT";

// 초기 상태 설정
const initState = {
  userEmail: "",
  isLogin: false,
};

// 로그인, 로그아웃 액션 생성 함수
export function login(loginInfo) {
  return {
    type: LOGIN,
    payload: loginInfo,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}

// 리듀서
export default function users(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userEmail: action.payload.email,
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        userEmail: "",
        isLogin: false,
      };
    default:
      return state;
  }
}
