// @ts-check

const mongoClient = require("./mongoConnect");
const _client = mongoClient.connect();

const Reviews = {
  reviewWrite: async (review) => {
    const client = await _client;
    const db = client.db("review").collection("review");
    const reviewPost = {
      item: review.item,
      title: review.title,
      content: review.content,
      email: review.email,
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
};

module.exports = Reviews;
