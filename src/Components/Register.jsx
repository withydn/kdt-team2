import React from "react";

export default function Register(username, id, password) {
  return (
    <div>
      <h1>회원가입</h1>
      <h2>이름</h2>
      <br />
      <input type={username} />
      <h2>ID</h2>
      <br />
      <input type={id} />
      <h2>PASSWORD</h2>
      <br />
      <input type={password} />
    </div>
  );
}
