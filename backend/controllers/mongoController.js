const mongoClient = require("./mongoConnect");
const _client = mongoClient.connect();

const Users = {
  register: async (registerInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    let registerUser = {};
    registerUser = {
      type: registerInfo.type,
      email: registerInfo.email,
      nickName: registerInfo.nickName,
    };
    const result = await db.insertOne(registerUser);
    if (result.acknowledged) {
      return {
        duplicated: false,
        msg: "회원 가입 성공! 로그인 페이지로 이동 합니다.",
      };
    } else {
      throw new Error("통신 이상");
    }
  },

  login: async (loginInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    const findID = await db.findOne({ email: loginInfo.email });
    if (findID) {
      if (findID.password === loginInfo.password) {
        return {
          result: true,
          email: findID.email,
          nickName: findID.nickName,
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

  register: async (registerInfo) => {
    const client = await _client;
    const db = client.db("login").collection("users");
    const duplicated = await db.findOne({ email: registerInfo.email });
    if (!duplicated) {
      const registerUser = {
        type: registerInfo.type,
        email: registerInfo.email,
      };
      const registerResult = await db.insertOne(registerUser);

      if (registerResult.acknowledged) {
        return {
          duplicated: false,
          msg: "회원 가입 완료!",
        };
      } else {
        throw new Error("DB문제 발생");
      }
    } else {
      return {
        duplicated: true,
        msg: "이미 가입 된 회원입니다.",
      };
    }
  },
};

module.exports = Users;
