import React from "react";
import Header from "../Header.jsx";
import { connect } from "react-redux";
import CreateTeam from "../createTeam/CreateTeam.jsx";
import UserMenu from "../userComponents/UserMenu.jsx";
import { addNewList, getLists } from "../../actions/listActions";
import { matchPath } from "react-router";
import Draggable from "../Dnd/Draggable/index";
import Droppable from "../Dnd/Droppable/index";
import history from "../../history";
import styled from "styled-components";
const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
  margin: 0.3rem;
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
  };
  componentDidMount() {
    const { id } = matchPath(history.location.pathname, {
      path: "/boards/pages/:id",
      exact: true,
      strict: true,
    }).params;
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
      console.log(this.state.addListToggle);
      this.setState({ addListToggle: "btn" });
      console.log(this.state.addListToggle);
    }
  };
  render() {
    return (
      <div className='container-fluid'>
        <Header />
        {this.props.isTeamWindowOpen && <CreateTeam />}
        <div className='col-3 offset-9 mt-2'>
          {this.props.userMenuOpen && <UserMenu />}
        </div>
        <div className='row d-flex align-items-center justify-content-center'>
          {this.props.lists.map((e, i) => {
            return (
              <div className='col-3 mt-2 ml-2' key={e._id}>
                <Droppable style={droppableStyle} name={e.name}>
                  <Draggable id={e._id}>
                    <Item>Card</Item>
                  </Draggable>
                </Droppable>
              </div>
            );
          })}

          <div className='col-3'>
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
      </div>
    );
  }
}
const mapStateToprops = (state) => ({
  currentBoard: state.boards.currentBoard,
  isTeamWindowOpen: state.team.isTeamWindowOpen,
  userMenuOpen: state.user.userMenuOpen,
  lists: state.list.lists,
});
export default connect(mapStateToprops, { addNewList, getLists })(BoardPage);
