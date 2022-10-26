import React, { Component } from "react";
import "./style.less";

export default class Loader extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    );
  }
}
