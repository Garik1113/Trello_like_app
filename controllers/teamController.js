const Team = require("../models/team");
class TeamController {
  create(req, res) {
    const team = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      adminEmail: req.user.email,
      members: [],
    };
    Team.create(team, (err) => {
      if (err) {
        return res.status(500).send("Something wents wrong");
      }
      return res.end();
    });
  }

  async getCurrentTeams(req, res) {
    const email = req.user.email;
    const teams = await Team.find({ adminEmail: email });
    res.status(200).send(teams);
  }
}

module.exports = new TeamController();
