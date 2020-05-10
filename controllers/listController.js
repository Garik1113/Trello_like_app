const Lists = require("../models/list");
class ListController {
  create(req, res) {
    const user_id = req.user._id;
    const { name, board_id } = req.body;
    Lists.create({ name, board_id, user_id }, (err, list) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }
      return res.status(200).send(list);
    });
  }
  getLists(req, res) {
    const board_id = req.params.board_id;
    Lists.find({ board_id: board_id }, (err, data) => {
      if (err) {
        return res.send(500).send("Something wents wrong");
      }
      return res.status(200).send(data);
    });
  }
}

module.exports = new ListController();
