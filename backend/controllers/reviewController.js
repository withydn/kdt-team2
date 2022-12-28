// @ts-check
const { ObjectId } = require("mongodb");
const mongoClient = require("./mongoConnect");
const _client = mongoClient.connect();
const Reviews = {
  reviewWrite: async (review) => {
    const client = await _client;
    const db = client.db("review").collection("review");
    const reviewCursor = db.find({});
    const reviews = await reviewCursor.toArray();
    const numOfReviews = reviews.length;
    const reviewPost = {
      no: numOfReviews + 1,
      item: review.item,
      title: review.title,
      content: review.content,
      author: review.email,
      counts: 0,
      like: 0,
      registerTime: new Date(),
    };
    const result = await db.insertOne(reviewPost);
    if (result.acknowledged) {
      return {
        result: true,
        msg: "게시글이 등록되었습니다",
      };
    } else {
      return {
        result: false,
        msg: "등록 실패",
      };
    }
  },
  // 모든 글 정보 가져오기
  getAllArticles: async () => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const allArticlesCursor = board.find({});
    const allArticles = await allArticlesCursor.toArray();
    return allArticles;
  },
  // 새로운 글 작성하기
  writeArticle: async (newArticle) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const writeResult = await board.insertOne(newArticle);
    if (!writeResult.acknowledged) throw new Error("글 쓰기 실패");
    return true;
  },
  // 특정 ID를 가지는 게시글 찾기
  getArticle: async (no) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const findArticle = await board.findOne({ no: parseInt(no) });
    if (!findArticle) return false;
    return findArticle;
  },
  //특정 No를 가지는 게시글 좋아요 + 1
  addLike: async (no) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const addLikeResult = await board.updateOne(
      { no: parseInt(no) },
      {
        $inc: {
          like: 1,
        },
      }
    );
    if (addLikeResult.acknowledged) {
      return "업데이트 성공";
    } else {
      return "업데이트 실패";
    }
  },
  // 카운트 +1
  addCount: async (no) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const addCountResult = await board.updateOne(
      { no: parseInt(no) },
      {
        $inc: {
          counts: 1,
        },
      }
    );
    if (addCountResult.acknowledged) {
      return "업데이트 성공";
    } else {
      return "업데이트 실패";
    }
  },
  // 특정 ID를 가지는 게시글 수정하기
  modifyArticle: async (id, modifyArticle, img) => {
    try {
      const client = await mongoClient.connect();
      const board = client.db("review").collection("review");
      const finalModifyArticle = {
        TITLE: modifyArticle.title,
        CONTENT: modifyArticle.content,
      };
      if (img !== undefined) finalModifyArticle.IMAGE = img?.filename;
      const updateResult = await board.updateOne(
        { _id: ObjectId(id) },
        {
          $set: finalModifyArticle,
        }
      );
      if (!updateResult.acknowledged) throw new Error("게시글 수정 실패");
      return true;
    } catch (err) {
      console.log(err);
    }
  },
  // 특정 ID를 가지는 게시글 삭제하기
  deleteArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const deleteResult = await board.deleteOne({ _id: ObjectId(id) });
    if (!deleteResult.acknowledged) throw new Error("게시글 삭제 실패");
    return true;
  },

  commentArticle: async (no, comment) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const addComentResult = await board.updateOne(
      { no: no },
      { $push: { comments: comment } }
    );
    if (addComentResult.acknowledged) {
      return {
        result: true,
        msg: "댓글 등록 성공",
      };
    } else {
      return {
        result: false,
        msg: "댓글 등록 실패",
      };
    }
  },

  deleteComment: async (no, author, comment) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const deleteCommentResult = await board.updateOne(
      { no: no },
      { $pull: { comments: { author: author, comment: comment } } }
    );
    if (deleteCommentResult.acknowledged) {
      return {
        result: true,
        msg: "댓글 삭제 성공",
      };
    } else {
      return {
        result: false,
        msg: "댓글 삭제 실패",
      };
    }
  },

  // getCommentArticle: async (no) => {
  //   const client = await mongoClient.connect();
  //   const board = client.db("review").collection("review");
  //   const findReview = await board.findOne({ no: no });
  //   if (findReview) {
  //     return {
  //       result: true,
  //       comments: findReview.comments,
  //     };
  //   } else {
  //     return {
  //       result: false,
  //       msg: "해당 넘버의 리뷰가 없습니다",
  //     };
  //   }
  // },
};
module.exports = Reviews;
