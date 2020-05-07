const { model, Schema } = require("mongoose");
const team = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  adminEmail: { type: String, required: true },
  description: { type: String },
  members: [{ name: String, email: String }],
});

module.exports = model("teams", team);
