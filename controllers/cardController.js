const Cards = require("../models/card");
class CardController {
  create(req, res) {
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
}

module.exports = new CardController();
