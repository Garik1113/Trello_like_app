const { model, Schema } = require("mongoose");
const card = new Schema({
  name: String,
  list_id: String,
  board_id: String,
  team_id: String,
  description: String,
  imgSrc: String,
  members: [
    {
      memberEmail: String,
    },
  ],
});

module.exports = model("card", card);
