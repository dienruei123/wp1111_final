/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, newFlagNum) => {
  if (x < 0 || x >= board.length || y < 0 || y >= board.length)
    return { board, newNonMinesCount, newFlagNum };
  if (board[x][y].revealed === true)
    return { board, newNonMinesCount, newFlagNum };
  board[x][y].revealed = true;
  if (board[x][y].flagged) {
    board[x][y].flagged = false;
    newFlagNum++;
  }
  newNonMinesCount--;

  // Advanced TODO: reveal cells in a more intellectual way.
  // Useful Hint: If the cell is already revealed, do nothing.
  //              If the value of the cell is not 0, only show the cell value.
  //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
  //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
  if (board[x][y].value !== 0) return { board, newNonMinesCount, newFlagNum };
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let e = revealed(board, x + i, y + j, newNonMinesCount, newFlagNum);
      newNonMinesCount = e.newNonMinesCount;
      newFlagNum = e.newFlagNum;
    }
  }

  return { board, newNonMinesCount, newFlagNum };
};
