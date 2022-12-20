const { MongoClient, ServerApiVersion } = require("mongodb");
const DB_URI_ATLAS =
  "mongodb+srv://team2:team2team2@cluster0.rsse3nu.mongodb.net/?retryWrites=true&w=majority";
const uri = DB_URI_ATLAS;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
module.exports = client;
