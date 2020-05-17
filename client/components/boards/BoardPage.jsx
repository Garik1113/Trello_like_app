import React from "react";
import Header from "../Header.jsx";
import { connect } from "react-redux";
import CreateTeam from "../teams/CreateTeam.jsx";
import UserMenu from "../userComponents/UserMenu.jsx";
import { addNewList, getLists } from "../../actions/listActions";
import { getAllBoardCards, toggleCurrentCard } from "../../actions/cardActions";
import { getCurrentBoard } from "../../actions/boardActions";
import { matchPath } from "react-router";
import Draggable from "../Dnd/Draggable/index";
import Droppable from "../Dnd/Droppable/index";
import history from "../../history";
import styled from "styled-components";
import CardSettings from "./CardSettings.jsx";
const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
  margin: 0.3rem;
  cursor: pointer;
`;
const droppableStyle = {
  backgroundColor: "#555",
  width: "250px",
  padding: "15px",
};

class BoardPage extends React.Component {
  state = {
    addListToggle: "btn",
    listName: "",
    board_id: "",
  };
  componentDidMount() {
    const { id } = matchPath(history.location.pathname, {
      path: "/boards/pages/:id",
      exact: true,
      strict: true,
    }).params;
    this.setState({
      board_id: id,
    });
    this.props.getAllBoardCards(id);
    this.props.getCurrentBoard(id);

    return this.props.getLists(id);
  }

  addList = () => {
    const name = this.state.listName;
    const { id } = matchPath(history.location.pathname, {
      path: "/boards/pages/:id",
      exact: true,
      strict: true,
    }).params;
    if (name && id) {
      this.props.addNewList(name, id);
      this.setState({ addListToggle: "btn" });
    }
  };
  render() {
    const board_id = matchPath(history.location.pathname, {
      path: "/boards/pages/:id",
      exact: true,
      strict: true,
    }).params.id;
    const { backgroundPath } = this.props.currentBoard;
    return (
      <div>
        <Header />
        {this.props.isTeamWindowOpen && (
          <div className='dark'>
            <CreateTeam />
          </div>
        )}
        <div
          style={{
            background: `url(${backgroundPath}) no-repeat`,
            width: "auto",
            height: "800px",
          }}
        >
          <div className='col-3 offset-9 mt-2'>
            {this.props.userMenuOpen && <UserMenu />}
          </div>
          <div className='row d-flex justify-content-start flex-wrap'>
            {this.props.lists.map((e, i) => {
              return (
                <div key={e._id}>
                  <Droppable name={e.name} list_id={e._id} board_id={board_id}>
                    {this.props.cards.map((c, i) => {
                      if (c.list_id === e._id) {
                        return (
                          <Draggable id={c._id} key={c._id} card_id={c._id}>
                            <Item
                              onClick={() => {
                                this.props.toggleCurrentCard(c._id, true);
                              }}
                            >
                              {c.name}
                              <br />

                              {c.imgSrc && (
                                <img
                                  src={c.imgSrc}
                                  draggable='false'
                                  alt=''
                                  style={{ width: "200px" }}
                                />
                              )}
                            </Item>
                          </Draggable>
                        );
                      }
                    })}
                  </Droppable>
                </div>
              );
            })}

            <div className='add-list-wrapper'>
              {this.state.addListToggle === "btn" ? (
                <button
                  className='select-input-btn'
                  onClick={() => this.setState({ addListToggle: "input" })}
                >
                  <span>+</span>Add another list
                </button>
              ) : (
                <div className='add-list-input-wrapper'>
                  <div>
                    <input
                      type='text'
                      placeholder='List name'
                      onChange={(e) =>
                        this.setState({ listName: e.target.value })
                      }
                    />
                    <span
                      onClick={() => this.setState({ addListToggle: "btn" })}
                    >
                      &times;
                    </span>
                  </div>
                  <button className='add-list-btn' onClick={this.addList}>
                    Add List
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {this.props.currentCard && (
          <div className='row'>
            <CardSettings
              close={() => {
                this.props.toggleCurrentCard(false);
                this.props.getAllBoardCards(this.state.board_id);
              }}
              currentCard={this.props.currentCard}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToprops = (state) => ({
  currentBoard: state.boards.currentBoard,
  isTeamWindowOpen: state.team.isTeamWindowOpen,
  userMenuOpen: state.user.userMenuOpen,
  lists: state.list.lists,
  cards: state.card.cards,
  currentCard: state.card.currentCard,
});
export default connect(mapStateToprops, {
  addNewList,
  getLists,
  getAllBoardCards,
  toggleCurrentCard,
  getCurrentBoard,
})(BoardPage);
