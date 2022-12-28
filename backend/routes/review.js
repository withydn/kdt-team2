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

// 게시글 쓰기 페이지 이동
router.get("/write", (req, res) => {
  res.render("dbBoard_write");
});

// 수정
// 게시글 수정 페이지로 이동
router.get("/modify/:id", async (req, res) => {
  const findArticle = await db.getArticle(req.params.id);
  console.log(findArticle);
  if (findArticle) {
    res.render("dbBoard_modify", { selectedArticle: findArticle });
  }
});

// 게시글 수정
router.post("/modify/:id", async (req, res) => {
  if (req.body.title && req.body.content) {
    const modifyResult = await db.modifyArticle(req.params.id, req.body);
    if (modifyResult) {
      res.redirect("/review");
    } else {
      const err = new Error("내용 수정에 실패하였습니다.");
      throw err;
    }
  } else {
    const err = new Error("모두 작성하여 주십시오.");
    throw err;
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
