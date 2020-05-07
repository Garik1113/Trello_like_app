import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../actions/userActions";

class UserMenu extends React.Component {
  render() {
    return (
      <div className="user-menu-wrapper">
        <button className="user-menu-btn" onClick={this.props.logOut}>
          Log Out
        </button>
        <button className="user-menu-btn">Sittings</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logOut })(UserMenu);
