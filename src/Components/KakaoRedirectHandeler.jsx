// import { application } from "express";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/modules/users";

export default function KakaoRedirectHandeler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get("code");
    // LbOmXwZ7vgo-zJyAYa_ccFu_Sxj3BFs2DZYNaP2zShnrf0K-_RUFxnNXTq_Xxuwv6EeBkQopcBQAAAGFI0vRTg
    // searchParams 물음표뒤의 값들을 불러옴
    const GRANT_TYPE = "authorization_code";
    const KAKAO_CLIENT_ID = "71fc8b830aac0622e9954140782b4cf4";
    const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

    console.log("카카오 코드", CODE);

    async function loginFetch() {
      const tokenResponse = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      if (tokenResponse.status === 200) {
        const tokenData = await tokenResponse.json();

        console.log("카카오 토큰", tokenData);

        const userDataResponese = await fetch(
          `https://kapi.kakao.com/v2/user/me`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        if ((userDataResponese.statue = 200)) {
          const userData = await userDataResponese.json();
          console.log("카카오 유저 정보", userData);
          const loginInfo = {
            email: userData.kakao_account.email,
            type: "kakao",
          };
          // 회원 가입 처리
          const registerResponse = await fetch(
            "http://localhost:4000/users/register",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(loginInfo),
            }
          );

          if (registerResponse.status === 200) {
            //   로그인
            dispatch(login(loginInfo));
            navigate("/");
          } else {
            alert("받아오기 실패");
          }
        } else {
          alert("토큰 발행 실패");
        }
      }
    }
    loginFetch();
  }, []);
}
