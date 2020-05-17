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
    board_bg_paths: [
      "/images/board-bg-1.jpg",
      "/images/board-bg-2.jpg",
      "/images/board-bg-3.jpg",
      "/images/board-bg-4.jpg",
      "/images/board-bg-5.jpg",
      "/images/board-bg-6.jpg",
      "/images/board-bg-7.jpg",
      "/images/board-bg-8.jpg",
      "/images/board-bg-9.jpg",
    ],
    activeBackground: "",
  };
  componentDidMount() {
    this.setState({ activeBackground: this.state.board_bg_paths[0] });
  }
  createNewBoard = () => {
    const { id } = matchPath(history.location.pathname, {
      path: "/teams/pages/:id",
      exact: true,
      strict: true,
    }).params;
    const { boardName, activeBackground } = this.state;
    const team_id = this.props.selectedTeam._id || id;
    if (boardName && team_id) {
      this.props.createNewBoard(boardName, team_id, activeBackground);
    }
  };

  changeBackground = (e) => {
    this.setState({ activeBackground: e });
  };
  render() {
    return (
      <div className='container-fluid board-wrapper'>
        <div className='row d-flex '>
          <div className='col-4 offset-3'>
            <div
              className='create-board-wrapper'
              style={{ background: `url(${this.state.activeBackground})` }}
            >
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
          <div className='col-2'>
            <div
              className='create-board-images-wrapper'
              style={{
                marginTop: "20px",
                width: "130px",
                marginLeft: "-10px",
                // background: "#3b383abd",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {this.state.board_bg_paths.map((e, i) => {
                return (
                  <img
                    key={i}
                    src={e}
                    ref={(e) => (this.image = e)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "5px",
                      margin: "2px",
                      cursor: "pointer",
                    }}
                    onClick={() => this.changeBackground(e)}
                    alt=''
                  />
                );
              })}
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
