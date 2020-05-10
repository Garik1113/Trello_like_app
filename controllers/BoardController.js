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
  createNewBoard(req, res) {
    const team_id = req.body.team_id;
    const user_id = req.user._id;
    const name = req.body.boardName;
    const newBoard = { team_id, user_id, name };
    Boards.create(newBoard, (err, board) => {
      if (err) {
        return res.status(500).send("Somethin wents wrong");
      }
      return res.status(200).send(board);
    });
  }
}

module.exports = new BoardController();
