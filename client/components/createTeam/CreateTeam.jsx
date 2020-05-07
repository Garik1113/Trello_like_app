import React from "react";
import { connect } from "react-redux";
import { createTeam, closeCreateTeamWindow } from "../../actions/teamActions";

// import { browserHistory } from "react-router";
import { createBrowserHistory } from "history";
class CreateTeam extends React.Component {
  state = {
    name: "",
    type: "",
    description: "",
    errorMsg: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createNewTeam = () => {
    const { name, type, description } = this.state;
    if (!name) {
      return this.setState({ errorMsg: "Name is required" });
    }
    if (!type) {
      return this.setState({ errorMsg: "Type is required" });
    }
    this.setState({ errorMsg: "" });

    const team = { name, type, description };
    const history = createBrowserHistory({ forceRefresh: true });
    console.log(history);
    this.props.createTeam(team, history);

    return;
  };
  render() {
    return (
      <div className="create-team-wrapper">
        <header>
          <h3 className="create-team-title">Create new Team</h3>
          <span
            className="close-create-team-window"
            onClick={this.props.closeCreateTeamWindow}
          >
            &times;
          </span>
        </header>
        <main className="create-team-main">
          <small className="error-msg">{this.state.errorMsg}</small>
          <input
            type="text"
            name="name"
            placeholder="Team Name"
            className="create-team-input"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Team Type"
            className="create-team-input"
            onChange={this.handleChange}
          />
          <textarea
            name="description"
            placeholder="Team Description"
            className="create-team-textarea"
            rows="5"
            onChange={this.handleChange}
          ></textarea>
          <button
            className="create-new-team-btn"
            disabled={false}
            onClick={() => {
              this.createNewTeam();
            }}
          >
            Continue
          </button>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isOpen: state.team.isTeamWindowOpen,
});

export default connect(mapStateToProps, { createTeam, closeCreateTeamWindow })(
  CreateTeam
);
