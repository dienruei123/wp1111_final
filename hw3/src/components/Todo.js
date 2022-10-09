// import logo from "./logo.svg";
import "../styles.css";
import React, { Component } from "react";
import pic from "../images/x.png";

export default class Todo extends Component {
  isCompleted = () => {
    if (this.props.completed === true) {
      return "todo-app__item-done";
    }
  };
  render() {
    return (
      <li className="todo-app__item">
        <div className="todo-app__checkbox">
          <input
            type="checkbox"
            id={this.props.id}
            defaultChecked={this.props.completed}
            onClick={this.props.onclickComplete}
          ></input>
          <label htmlFor={this.props.id}></label>
        </div>
        <h1 className={"todo-app__item-detail " + this.isCompleted()}>
          {this.props.todo}
        </h1>
        <img
          src={pic}
          alt="remove"
          className="todo-app__item-x"
          onClick={this.props.onclickRemove}
        />
      </li>
    );
  }
}
