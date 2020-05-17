import React from "react";
import PropTypes from "prop-types";
import { createNewCard, changeCardList } from "../../../actions/cardActions";
import { connect } from "react-redux";

class Droppable extends React.Component {
  state = {
    addCardInputOpen: true,
    cardName: "",
  };
  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    const card_id = e.dataTransfer.getData("card_id");
    const list_id = this.props.list_id;
    this.props.changeCardList(card_id, list_id);

    e.target.appendChild(document.getElementById(data));
  };
  allowDrop = (e) => {
    e.preventDefault();
  };
  addCard = () => {
    const name = this.state.cardName;
    const list_id = this.props.list_id;
    const board_id = this.props.board_id;
    if (name && list_id) {
      this.props.createNewCard(name, list_id, board_id);
      this.setState({ cardName: "", addCardInputOpen: true });
    }
  };
  render() {
    return (
      <div
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        className='col-3 mr-2 droppable-wrapper'
      >
        <h4 className='text-center'>{this.props.name}</h4>
        {this.props.children}
        {this.state.addCardInputOpen === true ? (
          <button
            // onDrop={(e) => console.log(e.target)}

            className='select-input-btn'
            onClick={() => this.setState({ addCardInputOpen: false })}
          >
            <span>+</span>Add a card
          </button>
        ) : (
          <div className='add-list-input-wrapper'>
            <div>
              <input
                type='text'
                onChange={(e) => this.setState({ cardName: e.target.value })}
              />
              <span onClick={() => this.setState({ addCardInputOpen: true })}>
                &times;
              </span>
            </div>
            <button
              className='add-list-btn'
              onClick={this.addCard}
              onDrop={(e) => e.preventDefault()}
            >
              Add Card
            </button>
          </div>
        )}
      </div>
    );
  }
}

Droppable.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
  list_id: PropTypes.string,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createNewCard, changeCardList })(
  Droppable
);
