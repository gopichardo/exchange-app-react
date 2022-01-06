import React, { Component } from "react";
import "../assets/css/Header.css";

class Header extends Component {
  render() {
    return (
      <a className="brand column is-size-1-mobile" href="/">
        Exchange
      </a>
    );
  }
}

export default Header;
