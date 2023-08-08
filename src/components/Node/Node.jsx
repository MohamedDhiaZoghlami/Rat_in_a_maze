import React from "react";

const Node = ({ row, col, isFinish, isStart, isPath, isWall, onMouseUp }) => {
  const extraClass = isFinish
    ? "nodeFinish"
    : isStart
    ? "nodeStart"
    : isPath
    ? "nodePath"
    : isWall
    ? "nodeWall"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClass}`}
      onMouseUp={() => onMouseUp(row, col)}
    ></div>
  );
};

export default Node;
