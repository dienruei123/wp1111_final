import "../styles.css";
import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <button
        id={this.props.id}
        style={this.props.style}
        onClick={this.props.onclick}
        className={this.props.className}
      >
        {this.props.text}
      </button>
    );
  }
}
