// @ts-check

const express = require("express");
const router = express.Router();
const db = require("../controllers/userController");

// 로그인 요청처리
router.post("/", async (req, res) => {
  const loginResult = await db.login(req.body);
  res.send(loginResult);
});

module.exports = router;
