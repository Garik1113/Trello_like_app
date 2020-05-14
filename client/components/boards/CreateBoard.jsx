import React from "react";
import { connect } from "react-redux";
import { matchPath } from "react-router";
import history from "../../history";
import {
  toggleBoardCreateMenu,
  createNewBoard,
} from "../../actions/boardActions";
import { selectTeam } from "../../actions/teamActions";

class CreateBoard extends React.Component {
  state = {
    isTeamNamesOpen: false,
    boardName: "",
  };
  createNewBoard = () => {
    const { id } = matchPath(history.location.pathname, {
      path: "/teams/pages/:id",
      exact: true,
      strict: true,
    }).params;
    const { boardName } = this.state;
    const team_id = this.props.selectedTeam._id || id;
    if (boardName && team_id) {
      this.props.createNewBoard(boardName, team_id);
    }
  };
  render() {
    return (
      <div className='container-fluid board-wrapper'>
        <div className='row'>
          <div className='col-4 offset-4'>
            <div className='create-board-wrapper'>
              <input
                type='text'
                placeholder='Add board title'
                onChange={(e) => this.setState({ boardName: e.target.value })}
              />
              <span onClick={() => this.props.toggleBoardCreateMenu(false)}>
                &times;
              </span>
              <button
                className='current-team-name-btn'
                onClick={() =>
                  this.setState({
                    isTeamNamesOpen: !this.state.isTeamNamesOpen,
                  })
                }
              >
                {this.props.selectedTeam.name || this.props.currentTeam.name}
              </button>
              {this.state.isTeamNamesOpen && (
                <ul>
                  {this.props.teams.map((e) => (
                    <li key={e._id}>
                      <button
                        className='team-name-btn'
                        onClick={() => {
                          this.props.selectTeam(e._id);
                          return this.setState({ isTeamNamesOpen: false });
                        }}
                      >
                        {e.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className='create-board-btn'
                onClick={this.createNewBoard}
              >
                Create Board
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  teams: state.team.teams,
  currentTeam: state.team.currentTeam,
  selectedTeam: state.team.selectedTeam,
});
export default connect(mapStateToProps, {
  toggleBoardCreateMenu,
  selectTeam,
  createNewBoard,
})(CreateBoard);
