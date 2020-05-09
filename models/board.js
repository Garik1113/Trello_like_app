const { model, Schema } = require("mongoose");

const board = new Schema({
  name: String,
  team_id: String,
  user_id: String,
  lists: [
    {
      listName: String,
      cards: [{ cardName: String, members: [{ memberEmail: String }] }],
    },
  ],
});

module.exports = model("Boards", board);
