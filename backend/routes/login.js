// @ts-check

const express = require("express");
const router = express.Router();
const db = require("../controllers/mongoController");

// 로그인 페이지
router.get("/login", (req, res) => {
  res.render("login");
});

// 로그인 연결
router.post("/login", async (req, res) => {
  const loginInfo = req.body;
  const result = await db.login(loginInfo);
  res.send(JSON.stringify(result));
});

module.exports = router;
