// @ts-check

const mongoClient = require("./mongoConnect");
const _client = mongoClient.connect();

// 회원가입ß
const Users = {
  register: async (registerInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    const signupUser = {
      name: registerInfo.name,
      email: registerInfo.email,
      password: registerInfo.password,
      region: registerInfo.region,
      likes: [],
    };

    const duplicated = await db.findOne({ email: signupUser.email });
    if (duplicated)
      return { result: false, msg: "동일한 이메일을 가진 회원이 존재합니다." };

    const result = await db.insertOne(signupUser);
    if (result.acknowledged) {
      return {
        result: true,
        msg: "앞다투어에 오신 것을 환영합니다! 로그인 페이지로 이동 합니다. :)",
      };
    } else {
      return {
        result: false,
        msg: "알 수 없는 에러 발생",
      };
    }
  },

  // 로그인 처리
  login: async (loginInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    const findID = await db.findOne({ email: loginInfo.email });
    if (findID) {
      if (findID.password === loginInfo.password) {
        return {
          result: true,
          email: findID.email,
          msg: "로그인 성공!",
        };
      } else {
        return {
          result: false,
          msg: "비밀번호가 틀렸습니다.",
        };
      }
    } else {
      return {
        result: false,
        msg: "해당 E-Mail을 찾을 수 없습니다!",
      };
    }
  },

  deleteArticle: async (id) => {
    const client = await mongoClient.connect();
    const board = client.db("kdt4").collection("board");
    const deleteResult = await board.deleteOne({ _id: ObjectId(id) });
    if (!deleteResult.acknowledged) throw new Error("삭제 실패");
    return true;
  },

  // 찜추가, 제거
  addLike: async (loginInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    const findID = await db.findOne({ email: loginInfo.email });

    if (findID) {
      if (!findID.likes.includes(loginInfo.contentId)) {
        const addLikeResult = await db.updateOne(
          { email: loginInfo.email },
          { $push: { likes: loginInfo.contentId } }
        );
        return { msg: "구독취소" };
      } else {
        const deleteLikeResult = await db.updateOne(
          { email: loginInfo.email },
          { $pull: { likes: loginInfo.contentId } }
        );
        return { msg: "구독하기" };
      }
    }
  },

  // 찜했는지 안했는지 체크
  isCheck: async (loginInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    const findID = await db.findOne({ email: loginInfo.email });

    if (findID) {
      if (findID.likes.includes(loginInfo.contentId)) {
        return { msg: "구독취소" };
      } else {
        return { msg: "구독하기" };
      }
    }
  },
};

module.exports = Users;
