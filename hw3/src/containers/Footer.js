import "../styles.css";
import Button from "../components/Button";
import React, { Component } from "react";

export default class Footer extends Component {
  showCount = () => {
    if (this.props.show === "Completed") {
      return this.props.completed_items + " completed";
    }
    return this.props.total - this.props.completed_items + " left";
  };
  buttonVisible = () => {
    if (this.props.completed_items === 0) return 0;
    return 1;
  };
  buttonSelectable = () => {
    if (this.props.completed_items === 0) return "none";
    return "auto";
  };
  buttonSelect = (btn) => {
    // console.log(this.props.show);
    if (btn === this.props.show) {
      return "todo-app__view-buttons-current";
    }
    return "";
  };
  render() {
    return (
      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">
          <span id="todo-count">{this.showCount()}</span>
        </div>
        <ul className="todo-app__view-buttons">
          <li>
            <Button
              id="todo-all"
              text="All"
              onclick={() => {
                this.props.onclick("All");
              }}
              className={this.buttonSelect("All")}
            />
          </li>
          <li>
            <Button
              id="todo-active"
              text="Active"
              onclick={() => {
                this.props.onclick("Active");
              }}
              className={this.buttonSelect("Active")}
            />
          </li>
          <li>
            <Button
              id="todo-completed"
              text="Completed"
              onclick={() => {
                this.props.onclick("Completed");
              }}
              className={this.buttonSelect("Completed")}
            />
          </li>
        </ul>
        <div className="todo-app__clean">
          <Button
            id="todo-clear-complete"
            style={{
              opacity: this.buttonVisible(),
              pointerEvents: this.buttonSelectable(),
              userSelect: this.buttonSelectable(),
            }}
            text="Clear completed"
            onclick={this.props.onclickClear}
          />
        </div>
      </footer>
    );
  }
}
