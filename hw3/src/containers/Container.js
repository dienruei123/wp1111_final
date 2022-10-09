// import logo from "./logo.svg";
import "../styles.css";
import React, { Component } from "react";
import Todo from "../components/Todo";

export default class Container extends Component {
  todos() {
    let { props } = this;
    let { total, show, todos } = props;
    if (total !== todos.length) {
      console.error("Fatal Error: todos length not equal to todos total");
      alert("Fatal Error: todos length not equal to todos total");
      return;
    }
    let todosRender = [];
    todos.forEach((e) => {
      if (
        show === "All" ||
        (show === "Completed" && e.completed === true) ||
        (show === "Active" && e.completed === false)
      )
        todosRender.push(
          <Todo
            id={e.id}
            todo={e.todo}
            completed={e.completed}
            onclickComplete={(event) => props.onclickComplete(e.id, event)}
            onclickRemove={() => props.onclickRemove(e.id)}
            key={e.id}
          />
        );
    });
    return todosRender;
  }
  render() {
    return (
      <ul className="todo-app__list" id="todo-list">
        {this.todos()}
      </ul>
    );
  }
}
