// @ts-check
const express = require("express");
const router = express.Router();
const db = require("../controllers/reviewController");
const fs = require("fs");

// 글 작성하기
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
  const addLikeResult = await db.addLike(req.params.no);
  res.send(JSON.stringify(addLikeResult));
});
// 카운트 + 1
router.post("/addCount/:no", async (req, res) => {
  const addCountResult = await db.addCount(req.params.no);
  res.send(JSON.stringify(addCountResult));
});

// 수정
// 게시글 수정
router.post("/modify/:reviewNo", async (req, res) => {
  const modifyResult = await db.modifyReview(req.params.reviewNo, req.body);
  res.send(modifyResult);
});

// 게시글 삭제
router.post("/delete/:reviewNo", async (req, res) => {
  console.log(req.params);
  const deleteResult = await db.deleteReview(req.params.reviewNo);
  res.send(deleteResult);
});

// // 댓글 가져오기
// router.get("/comment/get/:reviewNo", async (req, res) => {
//   const getCommentResult = await db.getCommentArticle(
//     parseInt(req.params.reviewNo)
//   );
//   res.send(getCommentResult);
// });

// 댓글 추가
router.post("/comment/add/:reviewNo", async (req, res) => {
  const addCommentResult = await db.commentArticle(
    parseInt(req.params.reviewNo),
    req.body
  );
  res.send(addCommentResult);
});

// 댓글 삭제
router.post("/comment/delete/:reviewNo", async (req, res) => {
  const deleteCommentResult = await db.deleteComment(
    parseInt(req.params.reviewNo),
    req.body.author,
    req.body.comment
  );
  res.send(deleteCommentResult);
});

module.exports = router;
