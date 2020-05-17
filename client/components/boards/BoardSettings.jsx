import React from "react";
import { Link } from "react-router-dom";
export default class BoardSettings extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          {this.props.boards &&
            this.props.boards.map((e) => {
              return (
                <div className='col-3 mt-2' key={e._id}>
                  <Link to={`/boards/pages/${e._id}`} className='normal-link'>
                    <div
                      className='board-card'
                      style={{ background: `url(${e.backgroundPath})` }}
                    >
                      <h3>{e.name}</h3>
                    </div>
                  </Link>
                </div>
              );
            })}

          <div className='col-3 mt-2' onClick={this.props.openBoardCreateMenu}>
            <div className='create-new-board'>
              <h3>Create New Board</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
