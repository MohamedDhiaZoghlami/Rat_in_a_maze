let possiblePaths = new Set();
const ratInMaze = (grid, x, y, N) => {
  let vis = matrix(N);
  possiblePaths = new Set();
  solve(grid, x, y, N, vis, "");
  let arr = [];
  for (let element of possiblePaths) {
    arr.push(element);
  }
  arr.sort();
  if (possiblePaths.size === 0) {
    return null;
  }
  return arr;
};

export default ratInMaze;

const solve = (grid, x, y, N, vis, path) => {
  if (x === N - 1 && y === N - 1 && grid[x][y].isFinish) {
    possiblePaths.add(path);
    return;
  }
  if (vis[x][y] === 1) return;

  vis[x][y] = 1;
  if (isSafe(x + 1, y, grid, N, vis)) {
    path = path + "D";
    solve(grid, x + 1, y, N, vis, path);
    path = path.substring(0, path.length - 1);
  }
  if (isSafe(x - 1, y, grid, N, vis)) {
    path = path + "U";
    solve(grid, x - 1, y, N, vis, path);
    path = path.substring(0, path.length - 1);
  }
  if (isSafe(x, y + 1, grid, N, vis)) {
    path = path + "R";
    solve(grid, x, y + 1, N, vis, path);
    path = path.substring(0, path.length - 1);
  }
  if (isSafe(x, y - 1, grid, N, vis)) {
    path = path + "L";
    solve(grid, x, y - 1, N, vis, path);
    path = path.substring(0, path.length - 1);
  }
  vis[x][y] = 0;
};

const isSafe = (row, col, grid, n, visited) => {
  if (
    row === -1 ||
    row === n ||
    col === -1 ||
    col === n ||
    visited[row][col] ||
    grid[row][col].isWall
  ) {
    return false;
  }
  return true;
};

const matrix = (N) => {
  let result = [];
  for (let i = 0; i < N; i++) {
    result.push(new Array(N).fill(0));
  }
  return result;
};
