import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  activateBoardsSetting,
  activateMembersSetting,
  activateSettingsSetting,
} from "../../actions/teamActions";
class TeamMenu extends React.Component {
  render() {
    return (
      <div className='team-menu-wrapper'>
        <div className='team-menu-item d-flex justify-content-center align-items-center'>
          <Link
            to={`/teams/pages/${this.props.team_id}`}
            onClick={() => this.props.activateBoardsSetting()}
            className='team-menu-item normal-link d-flex justify-content-center align-items-center'
          >
            <p className='team-menu-heart'>&#9825;</p>
            Boards
          </Link>
        </div>
        <div className='team-menu-item d-flex justify-content-center align-items-center'>
          <Link
            to={`/teams/pages/${this.props.team_id}`}
            onClick={() => this.props.activateMembersSetting()}
            className='team-menu-item normal-link d-flex justify-content-center align-items-center'
          >
            <p className='team-menu-heart'>&#9825;</p>
            Members
          </Link>
        </div>
        <div className='team-menu-item d-flex justify-content-center align-items-center'>
          <Link
            to={`/teams/pages/${this.props.team_id}`}
            onClick={() => this.props.activateSettingsSetting()}
            className='team-menu-item normal-link d-flex justify-content-center align-items-center'
          >
            <p className='team-menu-heart'>&#9825;</p>
            Settings
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  activateBoardsSetting,
  activateMembersSetting,
  activateSettingsSetting,
})(TeamMenu);
