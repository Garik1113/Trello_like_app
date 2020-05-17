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
    const backgroundPath = req.body.backgroundPath;
    const newBoard = { team_id, user_id, name, backgroundPath };
    Boards.create(newBoard, (err, board) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }
      return res.status(200).send(board);
    });
  }
  getCurrentBoard(req, res) {
    const { board_id } = req.params;
    Boards.findById(board_id, (err, board) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }
      return res.status(200).send(board);
    });
  }
  getUserBoards(req, res) {
    const user_id = req.user._id;
    Boards.find({ user_id: user_id }, (err, data) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }
      return res.status(200).send(data);
    }).limit(4);
  }
}

module.exports = new BoardController();
