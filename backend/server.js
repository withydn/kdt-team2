// 필요 모듈 설정
const express = require("express");
const cors = require("cors");

const PORT = 4500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const userRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const boardRouter = require("./routes/board");

app.use("/login", userRouter);
app.use("/register", signupRouter);
app.use("/board", boardRouter);

app.listen(PORT, () => {
  console.log(`데이터 통신 서버가 ${PORT}에서 작동 중입니다!`);
});
