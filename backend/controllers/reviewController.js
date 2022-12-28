// @ts-check
const { ObjectId } = require("mongodb");
const mongoClient = require("./mongoConnect");
const _client = mongoClient.connect();
const Reviews = {
  reviewWrite: async (review) => {
    const client = await _client;
    const countDB = client.db("review").collection("count");
    const incCountResult = await countDB.updateOne(
      { id: "count" },
      { $inc: { count: 1 } }
    );

    if (incCountResult.acknowledged) {
      const countData = await countDB.findOne({ id: "count" });
      if (!countData)
        return {
          result: false,
          msg: "등록 실패",
        };
      const reviewPost = {
        no: countData.count,
        item: review.item,
        title: review.title,
        content: review.content,
        author: review.email,
        counts: 0,
        like: 0,
        registerTime: new Date(),
      };
      const db = client.db("review").collection("review");
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
  // 특정 revireNo 가지는 review 수정하기
  modifyReview: async (no, modifyReview) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const modifyResult = await board.updateOne(
      { no: parseInt(no) },
      {
        $set: {
          title: modifyReview.title,
          content: modifyReview.content,
          item: modifyReview.item,
        },
      }
    );
    if (modifyResult.acknowledged) {
      return { result: true, msg: "리뷰 수정 성공" };
    } else {
      return { result: false, msg: "리뷰 수정 실패" };
    }
  },

  // 특정 reviewNo를 가지는 게시글 삭제하기
  deleteReview: async (no) => {
    const client = await mongoClient.connect();
    const board = client.db("review").collection("review");
    const deleteResult = await board.deleteOne({ no: parseInt(no) });
    if (deleteResult.acknowledged) {
      return {
        result: true,
        msg: "리뷰 삭제 성공",
      };
    } else {
      return {
        result: false,
        msg: "리뷰 삭제 실패",
      };
    }
  },

  // 댓글 작성하기
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

  // 댓글 삭제하기
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
