// @ts-check

const express = require("express");
const router = express.Router();
const db = require("../controllers/userController");

// 회원가입
router.post("/", async (req, res) => {
  const registerInfo = req.body;
  const result = await db.register(registerInfo);
  res.send(JSON.stringify(result));
});

module.exports = router;
