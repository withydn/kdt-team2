// @ts-check

const express = require("express");
const router = express.Router();

const POST = [
  {
    상품종류: "제주",
    제목: "제주도 겨울여행!",
    작성자: "pororo",
    등록일: "2022.12.22",
    추천수: 0,
  },
];

// 현재 localhost:4500/review
router.get("/", (req, res) => {
  res.render("review", { POST, postCounts: POST.length });
});

// localhost:4500/review/list
// 목록 보여주기
router.get("/", (req, res) => {
  res.send(POST);
});

// 정보 조회
router.get("/title/:title", (req, res) => {
  const findpost = POST.find((post) => {
    console.log(post);
    return post.title === req.params.title;
  });
  if (findpost) {
    res.send(findpost);
  } else {
    const err = new Error("TITLE을 찾을수 없습니다!");
    throw err;
  }
});

// 새로운 POST 등록 @@
router.post("/", (req, res) => {
  if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        상품종류: req.body.상품종류,
        제목: req.body.제목,
        작성자: req.body.작성자,
        등록일: req.body.등록일,
        추천수: req.body.추천수,
      };
      POST.push(newPost);
      res.redirect("/review");
    } else {
      console.log(2);
      const err = new Error("Unexpected query");
      throw err;
    }
  } else {
    console.log(2);
    const err = new Error("no data");
    throw err;
  }
});

// post 삭제하기
router.delete("/:title", (req, res) => {
  const arrIndex = POST.findIndex((post) => post.title === req.body.title);
  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.send("POST 삭제 완료");
  } else {
    const err = new Error("POST를 찾을수 없습니다!");
    throw err;
  }
});

module.exports = router;
