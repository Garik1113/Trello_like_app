import React from "react";
import Header from "../Header.jsx";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileData } from "../../actions/userActions";
import ForUnAuthorizated from "./ForUnAuthorizated.jsx";
import ForAuthorizated from "./ForAuthorizated.jsx";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getProfileData();
  }
  render() {
    return (
      <div
        className={
          this.props.isTeamWindowOpen
            ? "dark homepage-wrapper"
            : "homepage-wrapper"
        }
      >
        <Header />
        {!this.props.isAuthorizated && <ForUnAuthorizated />}
        {this.props.isAuthorizated && <ForAuthorizated />}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthorizated: state.user.isAuthorizated,
  isTeamWindowOpen: state.team.isTeamWindowOpen,
});
const mapDispatchToProps = {
  getProfileData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
