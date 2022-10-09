import logo from "./logo.svg";
// import "./App.css";
import "./styles.css";
import React, { Component } from "react";
import Container from "./containers/Container";
import Footer from "./containers/Footer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      idCount: 0,
      show: "All",
      completed_items: 0,

      // todos:[{id: 0, todo: "(string)", completed: false}]
      todos: [],
    };
  }
  // Container
  handleInput = (event) => {
    if (event.keyCode === 13 && event.target.value !== "") {
      let { total, idCount, todos } = this.state;
      todos.push({ id: idCount++, todo: event.target.value, completed: false });
      total++;
      event.target.value = "";
      this.setState({ total: total, idCount: idCount, todos: todos });
    }
  };
  handleRemove = (id) => {
    let { total, todos } = this.state;
    let completedClear = 0;
    for (let i = 0; i < total; i++) {
      if (todos[i].id === id) {
        if (todos[i].completed === true) {
          completedClear++;
        }
        todos.splice(i, 1);
        break;
      }
    }
    // console.log(id, todos, total);
    this.setState((state) => ({
      total: state.total - 1,
      completed_items: state.completed_items - completedClear,
      todos: todos,
    }));
    this.footerAll();
  };
  handleComplete = (id, event) => {
    let { total, todos, completed_items } = this.state;
    for (let i = 0; i < total; i++) {
      if (todos[i].id === id) {
        todos[i].completed = event.target.checked;
        completed_items = completed_items + (event.target.checked ? 1 : -1);
        break;
      }
    }
    this.setState({ completed_items: completed_items, todos: todos });
  };

  // Footer
  showFooter = () => {
    let { total, show, completed_items } = this.state;
    // console.log(total);
    if (total !== 0) {
      return (
        <Footer
          total={total}
          show={show}
          completed_items={completed_items}
          onclick={this.filterShow}
          onclickClear={this.handleClear}
        />
      );
    }
  };
  filterShow = (category) => {
    this.setState({ show: category });
  };
  handleClear = () => {
    let { todos } = this.state;
    let clearId = [];
    todos.forEach((e) => {
      if (e.completed === true) {
        clearId.push(e.id);
      }
    });
    clearId.forEach((e) => {
      this.handleRemove(e);
    });
    this.footerAll();
    // console.log(this.state.total, todos);
    // this.setState((state) => ({ total: state.total, todos: state.todos }));
  };
  footerAll = () => {
    if (this.state.todos.length === 0) this.setState({ show: "All" });
  };

  render() {
    return (
      <div id="root" className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <section className="todo-app__main">
          <input
            id="todo-input"
            className="todo-app__input"
            placeholder="What needs to be done?"
            onKeyUp={this.handleInput}
          />
          <Container
            todos={this.state.todos}
            total={this.state.total}
            show={this.state.show}
            onclickComplete={this.handleComplete}
            onclickRemove={this.handleRemove}
          />
        </section>
        {this.showFooter()}
      </div>
    );
  }
}
