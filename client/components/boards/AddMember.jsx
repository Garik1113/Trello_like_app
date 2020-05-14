import React from "react";
import { connect } from "react-redux";
import {
  searchMembers,
  clearSearchResults,
  addMemberToCard,
} from "../../actions/cardActions";

class AddMembers extends React.Component {
  search = (e) => {
    const email = e.target.value;
    if (email.length > 3) {
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
          onChange={this.search}
        />
        <ul>
          {this.props.searchingMembers.map((e) => {
            return (
              <li
                key={e._id}
                className='searching-member'
                onClick={() =>
                  this.props.addMemberToCard(e, this.props.currentCard._id)
                }
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
