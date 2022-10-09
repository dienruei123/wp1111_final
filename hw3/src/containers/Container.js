// import logo from "./logo.svg";
import "../styles.css";
import React, { Component } from "react";
import Todo from "../components/Todo";

export default class Container extends Component {
  todos() {
    let { show } = this.props;
    if (this.props.total !== this.props.todos.length) {
      console.error("Fatal Error: todos length not equal to todos total");
      alert("Fatal Error: todos length not equal to todos total");
      return;
    }
    let todos = [];
    this.props.todos.forEach((e) => {
      if (
        show === "All" ||
        (show === "Completed" && e.completed === true) ||
        (show === "Active" && e.completed === false)
      )
        todos.push(
          <Todo
            id={e.id}
            todo={e.todo}
            completed={e.completed}
            onclickComplete={(event) => this.props.onclickComplete(e.id, event)}
            onclickRemove={() => this.props.onclickRemove(e.id)}
            key={e.id}
          />
        );
    });
    return todos;
  }
  render() {
    return (
      <ul className="todo-app__list" id="todo-list">
        {this.todos()}
      </ul>
    );
  }
}
