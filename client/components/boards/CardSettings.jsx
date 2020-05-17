import React from "react";
import { connect } from "react-redux";
import AddMembers from "./AddMember.jsx";
import AddAtachment from "./AddAtachment.jsx";
import { addCardDescription } from "../../actions/cardActions";

class CardSettings extends React.Component {
  state = {
    isOpenDescriptionTextarea: false,
    toggleAddMemberWindow: false,
    toggeleAddAttachment: false,
    toggeleCurrentCardDescription: false,
    cardDescription: "",
  };

  addCardDescription = () => {
    this.props.addCardDescription(this.state.cardDescription);
  };
  render() {
    return (
      <div className='container-fluid card-settings-wrapper'>
        <div className='card-settings'>
          {this.props.currentCard.imgSrc && (
            <div className='card-img-wrapper'>
              <img
                src={this.props.currentCard.imgSrc}
                className='card-img'
                alt=''
              />
            </div>
          )}
          <div className='d-flex'>
            <div className='card-settings-main'>
              <div className='card-title-wrapper'>
                <h2 className='card-title'>{this.props.currentCard.name}</h2>
              </div>
              {this.props.currentCard.members.length > 0 && (
                <div className='card-member-list-wrapper'>
                  <h5>Members</h5>
                  <ul className='card-settings-members'>
                    {this.props.currentCard.members.map((e, i) => {
                      return <li key={i}>{e.memberEmail[0].toUpperCase()}</li>;
                    })}
                  </ul>
                </div>
              )}
              <div className='card-description-wrapper'>
                <h3 className='card-title'>Description</h3>
                {this.props.currentCard.description && (
                  <span onClick={this.toggeleCurrentCardDescription}>
                    {this.props.currentCard.description}
                  </span>
                )}

                {!this.props.currentCard.description && (
                  <div>
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
                          onChange={(e) =>
                            this.setState({ cardDescription: e.target.value })
                          }
                        ></textarea>
                        <button
                          className='des-save-btn'
                          onClick={() => this.addCardDescription()}
                        >
                          Save
                        </button>
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
          </div>

          {this.state.toggleAddMemberWindow && <AddMembers />}
          {this.state.toggeleAddAttachment && (
            <AddAtachment
              card_id={this.props.currentCard._id}
              closeAttachmentWindow={() =>
                this.setState({ toggeleAddAttachment: false })
              }
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentCard: state.card.currentCard,
});
export default connect(mapStateToProps, { addCardDescription })(CardSettings);
