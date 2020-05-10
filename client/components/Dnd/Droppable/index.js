import React from "react";
import PropTypes from "prop-types";

export default class Droppable extends React.Component {
  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    e.target.appendChild(document.getElementById(data));
  };
  allowDrop = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        className='droppable-wrapper'
      >
        <h4 className='text-center'>{this.props.name}</h4>
        {this.props.children}
      </div>
    );
  }
}

Droppable.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};
