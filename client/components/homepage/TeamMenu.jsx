import React from "react";

export default class TeamMenu extends React.Component {
  render() {
    return (
      <div className="team-menu-wrapper">
        <div className="team-menu-item d-flex justify-content-center align-items-center">
          <p className="team-menu-heart">&#9825;</p>
          Boards
        </div>
        <div className="team-menu-item d-flex justify-content-center align-items-center">
          <p className="team-menu-heart">&#9825;</p>
          Members
        </div>
        <div className="team-menu-item d-flex justify-content-center align-items-center">
          <p className="team-menu-heart">&#9825;</p>
          Sittings
        </div>
      </div>
    );
  }
}
