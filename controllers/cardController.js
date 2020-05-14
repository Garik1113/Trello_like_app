const Cards = require("../models/card");
const Teams = require("../models/team");
const Boards = require("../models/board");
class CardController {
  async create(req, res) {
    const { name, list_id, board_id } = req.body;
    Cards.create({ name, list_id, board_id }, (err, data) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }

      return res.status(200).send(data);
    });
  }
  getBoardCards(req, res) {
    const { board_id } = req.params;
    Cards.find({ board_id }, (err, data) => {
      if (err) {
        return res.status(500).send("Something sswents wrong");
      }

      return res.status(200).send(data);
    });
  }
  changeCardList(req, res) {
    const { card_id, list_id } = req.body;
    Cards.findByIdAndUpdate(card_id, { list_id: list_id }, (err, data) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }
      return res.send("ok");
    });
  }
  async searchMembers(req, res) {
    const { board_id, memberEmail } = req.body;
    // console.log(board_id);
    const board = await Boards.findById(board_id);
    // const team = await Teams.find(
    //   { _id: board.team_id },
    //   { members: { $elemMatch: { memberEmail: memberEmail } } }
    // );

    // const team = await Teams.findOne(
    //   { _id: board.team_id },
    //   {
    //     members: { $elemMatch: { memberEmail: { $in: memberEmail } } },
    //   }
    // );
    const team = await Teams.findOne(
      { _id: board.team_id },
      {
        members: { $elemMatch: { memberEmail: { $regex: memberEmail } } },
      }
    );
    if (team) {
      return res.status(200).send(team.members);
    }
  }

  async addMemberToCard(req, res) {
    const { member, card_id } = req.body;
    Cards.findByIdAndUpdate(
      card_id,
      { $push: { members: member } },
      (err, data) => {
        if (err) {
          return res.status(500).send("Something wents wrong");
        }
        return res.status(200).send("ok");
      }
    );
  }
}

module.exports = new CardController();
