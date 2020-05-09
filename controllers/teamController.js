const Teams = require("../models/team");
const Boards = require("../models/board");
class TeamController {
  create(req, res) {
    const team = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      adminEmail: req.user.email,
      members: [],
    };
    Teams.create(team, (err, team) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }
      return res.status(200).send(team);
    });
  }

  async getCurrentTeams(req, res) {
    const email = req.user.email;
    const teams = await Teams.find({ adminEmail: email });
    res.status(200).send(teams);
  }
  async getTeamData(req, res) {
    const { id } = req.params;
    const boards = await Boards.find({ team_id: id });
    Teams.findById(id, (err, data) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }
      res.status(200).send({ team: data, boards });
    });
  }
}

module.exports = new TeamController();
