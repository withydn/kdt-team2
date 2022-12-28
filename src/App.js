import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import KakaoRedirectHandler from "./Components/KakaoRedirectHandeler";
import Login from "./Components/Login";
import YesLogin from "./Components/YesLogin";

function App() {
  const isLogin = useSelector((state) => state.users.isLogin);
  return (
    // 각 주소에 따른 라우팅 처리
    <Routes>
      <Route path="/" element={isLogin ? <YesLogin /> : <Login />} />
      <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
    </Routes>
  );
}
export default App;
