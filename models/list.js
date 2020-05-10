const { model, Schema } = require("mongoose");

const list = new Schema({
  name: String,
  board_id: String,
  user_id: String,
  cards: [
    {
      cardName: String,
      description: String,
      members: [
        {
          memberEmail: String,
        },
      ],
    },
  ],
});

module.exports = model("list", list);
