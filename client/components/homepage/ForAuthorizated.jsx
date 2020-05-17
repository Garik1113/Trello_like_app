import React from "react";
import { Link } from "react-router-dom";
import CreateTeam from "../teams/CreateTeam.jsx";
import UserMenu from "../userComponents/UserMenu.jsx";
import {
  openCreateTeamWindow,
  getTeams,
  openTeamMenu,
} from "../../actions/teamActions";
import { getUserBoadrs } from "../../actions/boardActions";
import { connect } from "react-redux";
import TeamMenu from "./TeamMenu.jsx";
class ForAuthorizated extends React.Component {
  state = {
    isOpen: false,
    ok: false,
  };
  componentDidMount() {
    this.props.getTeams();
    this.props.getUserBoadrs();
  }
  render() {
    return (
      <div className='for-authorizated-wrapper'>
        {this.props.isTeamWindowOpen && <CreateTeam />}
        {this.props.userMenuOpen && <UserMenu />}
        <div className='container-fluid'>
          <div className='row d-flex mt-5'>
            <div className='col-2 offset-3'>
              <div className='home-team-title-wrapper d-flex align-items-center justify-content-between mt-5'>
                <p className='home-team-title'>Teams</p>
                <button
                  className='header-auth-add-btn'
                  onClick={() => this.props.openCreateTeamWindow()}
                >
                  +
                </button>
              </div>
              {this.props.teams.map((e, i) => {
                return (
                  <div key={i} onClick={() => this.props.openTeamMenu(e._id)}>
                    <div className='team-name-item d-flex justify-content-start align-items-center'>
                      <p>&#9825;</p>
                      <span>{e.name}</span>
                    </div>
                    {e.isOpenMenu && <TeamMenu team_id={e._id} />}
                  </div>
                );
              })}
            </div>

            {this.props.userBoards.length > 0 && (
              <div className='col-6'>
                <h3 className='text-center mt-4'>Your Team Boards</h3>
                <div className='d-flex align-items-center justify-content-center flex-wrap'>
                  {this.props.userBoards.map((e, i) => {
                    return (
                      <div className='mr-2 mb-2' key={e._id}>
                        <Link
                          to={`/boards/pages/${e._id}`}
                          className='normal-link'
                        >
                          <div
                            className='board-card'
                            style={{
                              background: `url(${e.backgroundPath})`,
                            }}
                          >
                            <h3>{e.name}</h3>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isTeamWindowOpen: state.team.isTeamWindowOpen,
  teams: state.team.teams,
  userMenuOpen: state.user.userMenuOpen,
  userBoards: state.boards.userBoards,
});

export default connect(mapStateToProps, {
  openCreateTeamWindow,
  getTeams,
  openTeamMenu,
  getUserBoadrs,
})(ForAuthorizated);
