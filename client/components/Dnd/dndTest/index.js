import React from "react";
import styled from "styled-components";
import Draggable from "../Draggable";
import Droppable from "../Droppable";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`;
const droppableStyle = {
  backgroundColor: "#555",
  width: "250px",
  height: "400px",
  margin: "32px",
};

class DndTest extends React.Component {
  render() {
    if (!this.props.user.isAuthorizated) {
      return <Redirect to='/login' />;
    }

    return (
      <Wrapper>
        <Droppable id='dr1' style={droppableStyle}>
          <Draggable id='item1' style={{ margin: "8px" }}>
            <Item>Some text</Item>
          </Draggable>
          <Draggable id='item2' style={{ margin: "8px" }}>
            <Item>Some other text</Item>
          </Draggable>
        </Droppable>
        <Droppable id='dr2' style={droppableStyle}></Droppable>
        <Droppable id='dr3' style={droppableStyle}></Droppable>
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.userState,
});

export default connect(mapStateToProps)(DndTest);
