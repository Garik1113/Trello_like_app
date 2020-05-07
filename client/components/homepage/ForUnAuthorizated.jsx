import React from "react";
import { Link } from "react-router-dom";
export default class ForUnAuthorizated extends React.Component {
  render() {
    return (
      <main className="homepage-main">
        <div className="left-content">
          <div className="left-content-title-wrapper">
            <h1 className="left-content-title">
              Trello lets you work more collaboratively and get more done
            </h1>
          </div>
          <div className="home-signup-btn-wrapper">
            <Link to="/signup">
              <button className="home-signup-btn">Sign Up it's Free</button>
            </Link>
          </div>
        </div>
        <div className="right-content">
          <img src="/images/home-content.svg" alt="" />
        </div>
      </main>
    );
  }
}
