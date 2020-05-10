import React from "react";
import { connect } from "react-redux";
import Header from "../Header.jsx";
import UserMenu from "../userComponents/UserMenu.jsx";
import CreateTeam from "../createTeam/CreateTeam.jsx";
import styled from "styled-components";
import history from "../../history";
import {
  getCurrentTeam,
  activateBoardsSetting,
  activateMembersSetting,
  activateSettingsSetting,
  getTeams,
} from "../../actions/teamActions";

import { matchPath } from "react-router";
import {
  getTeamBoards,
  toggleBoardCreateMenu,
} from "../../actions/boardActions";
import BoardSettings from "../boards/BoardSettings.jsx";
import CreateBoard from "../boards/CreateBoard.jsx";
const TeamSittingsHeader = styled.div`
  width: 100%;
  height: auto;
  background-color: #f4f5f7;
  padding-top: 30px;
  border-bottom: 2px solid #888;
`;
const TeamLogo = styled.div`
  width: 100px;
  height: 100px;
  background-color: #999;
  text-align: center;
`;
class CreateTeamPage extends React.Component {
  componentDidMount() {
    const { id } = matchPath(history.location.pathname, {
      path: "/teams/pages/:id",
      exact: true,
      strict: true,
    }).params;
    this.props.getCurrentTeam(id);
    this.props.getTeamBoards(id);
    this.props.getTeams();
  }

  render() {
    const { name } = this.props.currentTeam;
    return (
      <div>
        <Header />
        {this.props.BoardCreateMenuOpen && <CreateBoard />}
        <div className='col-2 offset-10'>
          {this.props.userMenuOpen && <UserMenu />}
        </div>
        {this.props.isTeamWindowOpen && <CreateTeam />}
        <div>
          <TeamSittingsHeader>
            <div className='col-3 offset-3 d-flex align-items-start'>
              <TeamLogo>
                <span className='material-icons team-name-icon'>group</span>
              </TeamLogo>
              <h2 className='team-name'>{name}</h2>
            </div>
            <div className='d-flex justify-content-center'>
              <button
                onClick={() => this.props.activateBoardsSetting()}
                className={
                  this.props.activeSetting === "boards"
                    ? "team-page-btns mr-2 mt-5 active-setting "
                    : "team-page-btns mr-2 mt-5"
                }
              >
                Boards
              </button>
              <button
                onClick={() => this.props.activateMembersSetting()}
                className={
                  this.props.activeSetting === "members"
                    ? "team-page-btns mr-2 mt-5 active-setting "
                    : "team-page-btns mr-2 mt-5"
                }
              >
                Members
              </button>
              <button
                onClick={() => this.props.activateSettingsSetting()}
                className={
                  this.props.activeSetting === "settings"
                    ? "team-page-btns mr-2 mt-5 active-setting "
                    : "team-page-btns mr-2 mt-5"
                }
              >
                Settings
              </button>
            </div>
          </TeamSittingsHeader>
        </div>
        <div className='mt-4'>
          <BoardSettings
            boards={this.props.boards}
            openBoardCreateMenu={() => this.props.toggleBoardCreateMenu(true)}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isTeamWindowOpen: state.team.isTeamWindowOpen,
  userMenuOpen: state.user.userMenuOpen,
  currentTeam: state.team.currentTeam,
  boards: state.boards.teamBoards,
  BoardCreateMenuOpen: state.boards.isCreatBoardMenuOpen,
  errors: state.errors,
  activeSetting: state.team.activeSetting,
  teams: state.team.teams,
});

export default connect(mapStateToProps, {
  getCurrentTeam,
  getTeamBoards,
  activateBoardsSetting,
  activateMembersSetting,
  activateSettingsSetting,
  toggleBoardCreateMenu,
  getTeams,
})(CreateTeamPage);
