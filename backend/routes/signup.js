// @ts-check

const express = require("express");
const router = express.Router();
const db = require("../controllers/mongoController");

// 회원가입 페이지
router.get("/signup", (req, res) => {
  res.render("signup");
});

// 회원가입
router.post("/signup", async (req, res) => {
  const signupInfo = req.body;
  const result = await db.signup(signupInfo);
  res.send(JSON.stringify(result));
});
