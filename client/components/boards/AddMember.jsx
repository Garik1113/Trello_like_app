import React from "react";
import { connect } from "react-redux";
import {
  searchMembers,
  clearSearchResults,
  addMemberToCard,
} from "../../actions/cardActions";

class AddMembers extends React.Component {
  state = {
    email: "",
  };
  search = (e) => {
    this.setState({ email: e.target.value });
    const email = this.state.email;
    if (email.length >= 2) {
      this.props.searchMembers(email, this.props.currentCard.board_id);
    }
    if (email.length < 3) {
      this.props.clearSearchResults();
    }
  };
  render() {
    return (
      <div className='card-add-member-wrapper'>
        <h4 className='text-center mt-2'>Members</h4>
        <hr />
        <input
          type='text'
          placeholder='Search members'
          value={this.state.email}
          onChange={this.search}
        />
        <ul>
          {!this.props.searchingMembers.length && this.state.email.length > 2 && (
            <div className='team-members-not-exist'>
              <span>There is no team members added yet</span>
            </div>
          )}
          {this.props.searchingMembers.map((e) => {
            return (
              <li
                key={e._id}
                className='searching-member'
                onClick={() => {
                  this.props.addMemberToCard(e, this.props.currentCard._id);
                  this.setState({ email: "" });
                  this.props.clearSearchResults();
                }}
              >
                {e.memberEmail}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentCard: state.card.currentCard,
  searchingMembers: state.card.searchingMembers,
});
export default connect(mapStateToProps, {
  searchMembers,
  clearSearchResults,
  addMemberToCard,
})(AddMembers);
