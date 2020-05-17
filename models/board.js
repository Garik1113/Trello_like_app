const { model, Schema } = require("mongoose");

const board = new Schema({
  name: String,
  team_id: String,
  user_id: String,
  backgroundPath: String,
});

module.exports = model("Boards", board);
