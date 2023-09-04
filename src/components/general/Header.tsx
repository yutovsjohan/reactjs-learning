import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <div className="header-nav">
        <a className="active">Task Management</a>
      </div>
    );
  }
}
