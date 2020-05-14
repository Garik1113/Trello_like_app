import React from "react";
import { connect } from "react-redux";
import { inviteMembers } from "../../actions/teamActions";

class MemberSettings extends React.Component {
  state = {
    memberEmail: "",
    successMsg: "",
    errorMsg: "",
  };
  inviteMembers = () => {
    const { memberEmail } = this.state;
    const { team_id } = this.props;
    if (
      memberEmail.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      team_id
    ) {
      this.props.inviteMembers(memberEmail, team_id);
      this.setState({
        memberEmail: "",
        successMsg: "Member has been added successfully",
        errorMsg: "",
      });
    } else {
      this.setState({
        successMsg: "",
        errorMsg: "Something wents wrong",
      });
    }
  };
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-6 offset-3 mt-2 members-add-wrapper'>
            <h3 className='members-add-title'>Invite Your Team</h3>
            {this.state.successMsg ? (
              <h6 className='text-center mt-2'>{this.state.successMsg}</h6>
            ) : (
              <h6 className='text-center mt-2'>{this.state.errorMsg}</h6>
            )}
            <p className='members-add-text'>
              Trello makes teamwork your best work. Invite your new team members
              to get going!
            </p>
            <input
              type='text'
              placeholder='Member Email'
              className='members-add-input'
              onChange={(e) => this.setState({ memberEmail: e.target.value })}
            />
            <small className='members-under-input'>
              Paste as many emails here as needed
            </small>
            <br />
            <button className='members-add-btn' onClick={this.inviteMembers}>
              Invite to team
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { inviteMembers })(MemberSettings);
