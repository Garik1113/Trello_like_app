const { model, Schema } = require("mongoose");
const team = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  adminEmail: { type: String, required: true },
  description: { type: String },
  members: [{ memberEmail: String }],
});

module.exports = model("teams", team);
