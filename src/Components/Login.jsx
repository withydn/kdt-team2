import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/modules/users";

export default function Login() {
  const KAKAO_CLIENT_ID = "71fc8b830aac0622e9954140782b4cf4";
  const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const userEmailInput = useRef();
  const userPasswordInput = useRef();
  const dispatch = useDispatch();

  async function loginUser() {
    const loginInfo = {
      email: userEmailInput.current.value,
      password: userPasswordInput.current.value,
    };
    if (loginInfo.email !== "" && loginInfo.password !== "") {
      const loginResponse = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      if (loginResponse.status === 200) {
        const result = await loginResponse.json();
        console.log(result);
        //로그인 처리 하기
        if (result.result) {
          dispatch(login(result));
        }
      } else {
        throw new Error("로그인 실패");
      }
    } else {
      alert("이메일 또는 비밀번호를 입력해주세요.");
    }
  }

  return (
    <div className="App">
      <span>EMAIL</span>
      <input ref={userEmailInput} />
      <br />
      <span>PASSWORD</span>
      <input ref={userPasswordInput} />
      <br />
      <button onClick={() => loginUser()}>로그인</button>
      <br />
      <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
    </div>
  );
}
