// @ts-check

const express = require("express");
const router = express.Router();
const db = require("../controllers/userController");
const jwt = require("jsonwebtoken");

// 로그인 요청처리
router.post("/", async (req, res) => {
  const loginResult = await db.login(req.body);
  const token = jwt.sign({ email: loginResult.email }, "apdatour");
  console.log("loginResult", loginResult);
  const data = {
    ...loginResult,
    token,
  };
  res.send(loginResult);
});

module.exports = router;
