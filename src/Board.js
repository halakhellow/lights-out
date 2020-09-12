import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    rowsNum: 5,
    colsNum: 5,
    chanceLightOn: 0.25,
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
    this.flipCells = this.flipCells.bind(this);
  }

  flipCells(coordinates) {
    let { rowsNum, colsNum } = this.props;
    let board = this.state.board;
    let [x, y] = coordinates.split("-").map(Number);

    function flipSelectedCell(x, y) {
      if (x >= 0 && x < rowsNum && y >= 0 && y < colsNum) {
        board[x][y] = !board[x][y];
      }
    }
    flipSelectedCell(x, y);
    flipSelectedCell(x - 1, y);
    flipSelectedCell(x + 1, y);
    flipSelectedCell(x, y - 1);
    flipSelectedCell(x, y + 1);

    let hasWon = board.every((row) => row.every((cell) => !cell));
    this.setState({ board: board, hasWon: hasWon });
  }
  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.rowsNum; i++) {
      let row = [];
      for (let j = 0; j < this.props.colsNum; j++) {
        row.push(Math.random() < this.props.chanceLightOn);
      }
      board.push(row);
    }
    return board;
  }

  makeTable() {
    let tableBoard = [];
    for (let i = 0; i < this.props.rowsNum; i++) {
      let row = [];
      for (let j = 0; j < this.props.colsNum; j++) {
        let coordinates = `${i}-${j}`;
        row.push(
          <Cell
            key={coordinates}
            isLit={this.state.board[i][j]}
            flipCells={this.flipCells.bind(this, coordinates)}
          />
        );
      }
      tableBoard.push(<tr key={i}>{row}</tr>);
    }
    return tableBoard;
  }

  render() {
    return this.state.hasWon ? (
      <h1 className="Board-win">YOU WON !!</h1>
    ) : (
      <div>
        <h1 className="Board-title">LIGHTS OUT </h1>
        <table className="Board">
          <tbody>{(this, this.makeTable())}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
