// @ts-check
const express = require("express");
const router = express.Router();
const db = require("../controllers/reviewController");

router.post("/write", async (req, res) => {
  const postInfo = req.body;
  const result = await db.reviewWrite(postInfo);
  res.send(JSON.stringify(result));
});

// const POST = [
//   {
//     items: "제주",
//     content: "제주도 겨울여행!",
//     reviewer: "pororo",
//     regidate: { type: Date, default: new Date() },
//     recommend: 0,
//     comment: [
//       {
//         username: String, // 댓글 작성자 이름
//         comment: String, // 댓글 내용
//         date: { type: Date, default: new Date() }, // 작성 시간
//       },
//     ],
//   },
// ];

// // 현재 localhost:4500/board
// router.get("/", (req, res) => {
//   res.render("board", { POST, postCounts: POST.length });
// });

// // localhost:4500/board
// // 목록 보여주기
// router.get("/", (req, res) => {
//   res.send(POST);
// });

// // 정보 조회
// router.get("/content/:content", (req, res) => {
//   const findpost = POST.find((post) => {
//     console.log(post);
//     return post.content === req.params.content;
//   });
//   if (findpost) {
//     res.send(findpost);
//   } else {
//     const err = new Error("게시글을 찾을수 없습니다");
//     throw err;
//   }
// });

// // 새로운 POST 등록 @@
// router.post("/", (req, res) => {
//   if (req.body) {
//     if (req.body.items && req.body.content) {
//       const newPost = {
//         items: req.body.items,
//         content: req.body.content,
//         reviewer: req.body.reviewer,
//         regidate: req.body.regidate,
//         recommend: req.body.recommend,
//       };
//       POST.push(newPost);
//       res.redirect("/board");
//     } else {
//       console.log(2);
//       const err = new Error("Unexpected query");
//       throw err;
//     }
//   } else {
//     console.log(2);
//     const err = new Error("no data");
//     throw err;
//   }
// });

// // 댓글 달기
// router.post("/comment/add", async (req, res) => {
//   let user = await Users.findOne({ reviewer: req.body.reviewer }); // 댓글 작성할 유저
//   let comment = await Comment.findOne({ comment: req.body.comment });

//   comment.comment.push({
//     username: user.name,
//     content: req.body.content,
//   });
//   try {
//     await comment.save(); //
//     return res.status(200).json({ message: "success" });
//   } catch (e) {
//     return res.status(500).json({ message: "Fail" });
//   }
// });

// // 댓글 삭제하기
// router.delete("/comment/add", (req, res) => {});

module.exports = router;
