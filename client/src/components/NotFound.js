import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../assets/PageNotFound.png";
export class NotFound extends Component {
  render() {
    return (
      <div>
        <img
          src={PageNotFound}
          style={{
            width: 400,
            height: 400,
            display: "block",
            margin: "auto",
            position: "relative"
          }}
        />
        <center>
          <Link to="/">Return to Home Page</Link>
        </center>
      </div>
    );
  }
}

export default NotFound;
