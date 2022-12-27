// @ts-check
const express = require("express");
const router = express.Router();
const db = require("../controllers/reviewController");
const fs = require("fs");

router.post("/write", async (req, res) => {
  const postInfo = req.body;
  console.log(postInfo);
  const result = await db.reviewWrite(postInfo);
  res.send(JSON.stringify(result));
});
// 모든 게시글 데이터를 받아오는 라우터
router.get("/getAll", async (req, res) => {
  const allReview = await db.getAllArticles();
  res.send(allReview);
});
router.get("/:no", async (req, res) => {
  const review = await db.getArticle(req.params.no);
  res.send(review);
});
// 좋아요 + 1
router.post("/addLike/:no", async (req, res) => {
  const addLiseResult = await db.addLike(req.params.no);
  res.send(JSON.stringify(addLiseResult));
});
// 게시글 쓰기 페이지 이동
router.get("/write", (req, res) => {
  res.render("dbBoard_write");
});
// 게시글 수정 페이지로 이동
router.get("/modify/:id", async (req, res) => {
  const findArticle = await db.getArticle(req.params.id);
  console.log(findArticle);
  if (findArticle) {
    res.render("dbBoard_modify", { selectedArticle: findArticle });
  }
});
// 게시글 삭제
router.delete("/delete/:id", async (req, res) => {
  if (req.params.id) {
    const deleteResult = await db.deleteArticle(req.params.id);
    if (deleteResult) {
      res.send("삭제 완료");
    } else {
      const err = new Error("글 삭제 실패");
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error("ID 파라미터 값이 없습니다!");
    err.statusCode = 404;
    throw err;
  }
});
module.exports = router;
