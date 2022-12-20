const express = require("express");
const router = express.Router();
const db = require("../controllers/mongoController");

router.post("/login", async (req, res) => {
  const loginInfo = req.body;
  const result = await db.login(loginInfo);
  res.send(JSON.stringify(result));
});

router.post("/register", async (req, res) => {
  const registerInfo = req.body;
  const result = await db.register(registerInfo);
  res.send(JSON.stringify(result));
});

module.exports = router;
