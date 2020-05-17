const Cards = require("../models/card");
const Teams = require("../models/team");
const Boards = require("../models/board");
const fs = require("fs");
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
    const board = await Boards.findById(board_id);
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
  async addImage(req, res) {
    const { card_id } = req.params;
    if (req.file) {
      const card = await Cards.findById(card_id);
      const oldImagePath = card.imgSrc;
      if (oldImagePath) {
        fs.unlink("public" + oldImagePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      const { filename } = req.file;
      const filePath = "/uploads/" + filename;
      Cards.findByIdAndUpdate(card_id, { imgSrc: filePath }, (err, data) => {
        if (err) {
          return res.status(500).send("Something wents wrong");
        }
        return res.status(200).send(filePath);
      });
    }
  }
  addDescription(req, res) {
    const { card_id, text } = req.body;
    if (text && card_id) {
      Cards.findByIdAndUpdate(card_id, { description: text }, (err) => {
        if (err) {
          return res.status(500).send("Something wents wrong");
        }
        return res.status(200).send("Ok");
      });
    }
  }
}

module.exports = new CardController();
