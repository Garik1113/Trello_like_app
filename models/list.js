const { model, Schema } = require("mongoose");

const list = new Schema({
  name: String,
  board_id: String,
  user_id: String,
});

module.exports = model("list", list);
