import React from "react";
import { connect } from "react-redux";
import AddMembers from "./AddMember.jsx";
import AddAtachment from "./AddAtachment.jsx";

class CardSettings extends React.Component {
  state = {
    isOpenDescriptionTextarea: false,
    toggleAddMemberWindow: false,
    toggeleAddAttachment: false,
  };
  render() {
    return (
      <div className='container-fluid card-settings-wrapper'>
        <div className='col-6 offset-3 card-settings d-flex'>
          <div style={{ width: "80%" }}>
            {/* <img src='/images/login-bg.jpg' alt='' className='card-img' /> */}
            <div className='card-title-wrapper'>
              <h2 className='card-title'>Card Title</h2>
            </div>
            <div className='card-description-wrapper'>
              <h3 className='card-title'>Description</h3>
              {!this.state.isOpenDescriptionTextarea && (
                <button
                  className='card-description-btn'
                  onClick={() =>
                    this.setState({ isOpenDescriptionTextarea: true })
                  }
                >
                  Add more detailed description
                </button>
              )}

              {this.state.isOpenDescriptionTextarea && (
                <div className='text-wrapper'>
                  <textarea
                    className='card-description-text'
                    placeholder='Add more detailed description'
                  ></textarea>
                  <button className='des-save-btn'>Save</button>
                  <span
                    className='des-close-btn'
                    onClick={() =>
                      this.setState({ isOpenDescriptionTextarea: false })
                    }
                  >
                    &times;
                  </span>
                </div>
              )}
            </div>
            <span className='close-card-settings' onClick={this.props.close}>
              &times;
            </span>
          </div>
          <div className='card-settings-sidebar'>
            <h5>Add to card</h5>
            <button
              className='sidebar-btns'
              onClick={() =>
                this.setState({
                  toggleAddMemberWindow: !this.state.toggleAddMemberWindow,
                  toggeleAddAttachment: false,
                })
              }
            >
              Members
            </button>
            <button
              className='sidebar-btns'
              onClick={() =>
                this.setState({
                  toggeleAddAttachment: !this.state.toggeleAddAttachment,
                  toggleAddMemberWindow: false,
                })
              }
            >
              Attachment
            </button>
            <button className='sidebar-btns'>Archive</button>
          </div>
          {this.state.toggleAddMemberWindow && <AddMembers />}
          {this.state.toggeleAddAttachment && <AddAtachment />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentCard: state.card.currentCard,
});
export default connect(mapStateToProps)(CardSettings);
