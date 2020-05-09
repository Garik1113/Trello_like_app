const Boards = require("../models/board");
class BoardController {
  getTeamBoards(req, res) {
    const { team_id } = req.params;
    Boards.find({ team_id: team_id }, (err, data) => {
      if (err) {
        return res.status(500).send("Something Wents wrong");
      }
      return res.status(200).send(data);
    });
  }
}

module.exports = new BoardController();
