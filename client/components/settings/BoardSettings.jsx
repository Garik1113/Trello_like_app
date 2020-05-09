import React from "react";

export default class BoardSettings extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          {this.props.boards &&
            this.props.boards.map((e) => {
              return (
                <div className='col-3 mt-2' key={e._id}>
                  <div className='board-card'>
                    <h3>{e.name}</h3>
                  </div>
                </div>
              );
            })}

          <div className='col-3 mt-2'>
            <div className='create-new-board'>
              <h3>Create New Board</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
