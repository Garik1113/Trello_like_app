import React from "react";
import CreateTeam from "../createTeam/CreateTeam.jsx";
import UserMenu from "../userComponents/UserMenu.jsx";
import {
  openCreateTeamWindow,
  getCurrentTeams,
  openTeamMenu,
} from "../../actions/teamActions";
import { connect } from "react-redux";
import TeamMenu from "./TeamMenu.jsx";
class ForAuthorizated extends React.Component {
  state = {
    isOpen: false,
    ok: false,
  };
  componentDidMount() {
    this.props.getCurrentTeams();
  }
  render() {
    return (
      <div className="for-authorizated-wrapper">
        {this.props.isTeamWindowOpen && <CreateTeam />}
        {this.props.userMenuOpen && <UserMenu />}
        <div className="container-fluid">
          <div className="row d-flex">
            <div className="col-2 offset-3">
              <div className="home-team-title-wrapper d-flex align-items-center justify-content-between mt-5">
                <p className="home-team-title">Teams</p>
                <button
                  className="header-auth-add-btn"
                  onClick={() => this.props.openCreateTeamWindow()}
                >
                  +
                </button>
              </div>
              {this.props.currentTeams.map((e, i) => {
                return (
                  <div
                    key={e._id}
                    onClick={() => this.props.openTeamMenu(e._id)}
                  >
                    <div className="team-name-item d-flex justify-content-center align-items-center">
                      <p>&#9825;</p>
                      <span>{e.name}</span>
                    </div>
                    {e.isOpenMenu && <TeamMenu />}
                  </div>
                );
              })}
            </div>
            <div className="col-6">
              <h2>Your Team Boards</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isTeamWindowOpen: state.team.isTeamWindowOpen,
  currentTeams: state.team.currentTeams,
  userMenuOpen: state.user.userMenuOpen,
});

export default connect(mapStateToProps, {
  openCreateTeamWindow,
  getCurrentTeams,
  openTeamMenu,
})(ForAuthorizated);
