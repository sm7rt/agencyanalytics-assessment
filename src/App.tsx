import { Component } from "react";
import "./App.less";
import { TabComponent } from "./components";

export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <TabComponent />
      </div>
    );
  }
}
