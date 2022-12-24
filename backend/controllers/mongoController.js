// @ts-check

const mongoClient = require("./mongoConnect");
const _client = mongoClient.connect();

// 회원가입
const Users = {
  register: async (signupInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    let signupUser = {};
    signupUser = {
      name: signupInfo.name,
      type: signupInfo.type,
      email: signupInfo.email,
      password: signupInfo.password,
      interstedLi: signupInfo.interstedLi,
    };

    const result = await db.insertOne(signupUser);
    if (result.acknowledged) {
      return {
        duplicated: false,
        msg: "회원 가입 성공! 로그인 페이지로 이동 합니다.",
      };
    } else {
      throw new Error("통신 이상");
    }
  },

  // 로그인 페이지
  login: async (loginInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    const findID = await db.findOne({ email: loginInfo.email });
    if (findID) {
      if (findID.password === loginInfo.password) {
        return {
          result: true,
          email: findID.email,
          name: findID.name,
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
};

module.exports = Users;
