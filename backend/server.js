// 필요 모듈 설정
const express = require('express');
const cors = require('cors');

const PORT = 4500;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const loginRouter = require('./routes/login');
const signupRouter = require('./routes/register');
const reviewRouter = require('./routes/review');
const addLikeRouter = require('./routes/likes');

app.use('/login', loginRouter);
app.use('/register', signupRouter);
app.use('/review', reviewRouter);
app.use('/addLike', addLikeRouter);

app.listen(PORT, () => {
  console.log(`데이터 통신 서버가 ${PORT}에서 작동 중입니다!`);
});
