import React, { useState, useEffect } from "react";
import "./RateMaze.scss";
import Node from "../Node/Node";
import ratInMaze from "../../RatinmazeAlgo";

const RateMaze = () => {
  const [state, setState] = useState({
    grid: [],
  });

  const n = 5;
  const START_NODE_ROW = 0;
  const START_NODE_COL = 0;
  const FINISH_NODE_ROW = n - 1;
  const FINISH_NODE_COL = n - 1;

  useEffect(() => {
    const grid = generateGrid();
    setState({ grid: grid });
  }, []);

  const generateGrid = () => {
    let grid = [];
    for (let row = 0; row < n; row++) {
      let temp = [];
      for (let col = 0; col < n; col++) {
        temp.push(createNode(row, col));
      }
      grid.push(temp);
    }
    return grid;
  };

  const createNode = (row, col) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      isWall: false,
      isPath: false,
    };
  };
  const handleMouseUp = (row, col) => {
    const node = grid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    grid[row][col] = newNode;
    setState({ grid: grid });
  };

  const algoRat = () => {
    const { grid } = state;
    const algo = ratInMaze(grid, 0, 0, n);
    if (algo === null) {
      alert("Path not found ");
      return;
    }

    const [first] = algo;
    const str = first;
    let row = 0;
    let col = 0;
    for (let i = 0; i < str.length; i++) {
      setTimeout(() => {
        const pos = str[i];
        if (pos === "D") {
          const node = grid[row + 1][col];
          const newNode = {
            ...node,
            isPath: true,
          };
          grid[row + 1][col] = newNode;
          row = row + 1;
        } else if (pos === "U") {
          const node = grid[row - 1][col];
          const newNode = {
            ...node,
            isPath: true,
          };
          grid[row - 1][col] = newNode;
          row = row - 1;
        } else if (pos === "R") {
          const node = grid[row][col + 1];
          const newNode = {
            ...node,
            isPath: true,
          };
          grid[row][col + 1] = newNode;
          col = col + 1;
        } else if (pos === "L") {
          const node = grid[row][col - 1];
          const newNode = {
            ...node,
            isPath: true,
          };
          grid[row][col - 1] = newNode;
          col = col - 1;
        }
        setState({ grid: grid });
      }, 500 * i);
    }
  };
  const { grid } = state;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="dzovi">
        {grid &&
          grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, colIndex) => {
                  const { row, col, isFinish, isPath, isStart, isWall } = node;
                  return (
                    <Node
                      key={colIndex}
                      row={row}
                      col={col}
                      isFinish={isFinish}
                      isPath={isPath}
                      isStart={isStart}
                      isWall={isWall}
                      onMouseUp={handleMouseUp}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
      <button onClick={algoRat} className="button-1">
        Start
      </button>
      <div className="info">
        Please be aware of the following :
        <ul>
          <li>if you want to restart just refresh the page.</li>
          <li>
            before starting you can make walls by pressing on an empty square.
          </li>
          <li>if there is no path found you will be alerted.</li>
          <li>
            sometimes even when there is a path it bugs so just refresh the page
            and try again and it will work.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RateMaze;
