import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    let name = this.props.isLit ? "Cell-lit" : "Cell-unlit";
    return <td className={`Cell ${name}`} onClick={this.props.flipCells}></td>;
  }
}

export default Cell;
