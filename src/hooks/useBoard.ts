import { useState } from 'react';

const emptyBoard = () =>
  Array(6)
    .fill(0)
    .map(() => Array(7).fill(null));

const clone = (x: any) => JSON.parse(JSON.stringify(x));
type Board = (number | null)[][];

export const useBoard = () => {
  const [board, setBoard] = useState<Board>(emptyBoard());
  const reset = () => {
    setBoard(emptyBoard());
  };

  const addPlayerToColumn = (player: number, column: number) => {
    const _board = clone(board);
    let row = null;
    for (var i = 5; i >= 0; --i) {
      if (!_board[i][column]) {
        board[i][column] = player;
        _board[i][column] = player;
        row = i;
        break;
      }
    }
    if (row !== null) setBoard(_board);
    return row;
  };
  const [player, setPlayer] = useState(1);
  const togglePlayer = () => setPlayer(player === 1 ? 2 : 1);
  const checkWinner = (row: number, col: number) => {
    const player = board[row][col];
    // diagonal 1
    let count = 0;
    for (var i = row, j = col; i >= 0 && j >= 0 && board[i][j] === player; --i, --j, ++count) {}
    for (var i = row, j = col; i < 6 && j < 7 && board[i][j] === player; ++i, ++j, ++count) {}
    --count;
    if (count >= 4) return player;

    // diagonal 2
    count = 0;
    for (var i = row, j = col; i >= 0 && j < 7 && board[i][j] === player; --i, ++j, ++count) {}
    for (var i = row, j = col; i < 6 && j >= 0 && board[i][j] === player; ++i, --j, ++count) {}
    --count;
    if (count >= 4) return player;

    // horizontal
    count = 0;
    for (let i = row, j = col; j >= 0 && board[i][j] === player; --j, ++count) {}
    for (let i = row, j = col; j < 7 && board[i][j] === player; ++j, ++count) {}
    --count;
    if (count >= 4) return player;

    // vertical
    count = 0;
    for (var i = row, j = col; i >= 0 && j >= 0 && board[i][j] === player; --i, ++count) {}
    for (var i = row, j = col; i < 6 && j < 7 && board[i][j] === player; ++i, ++count) {}
    --count;
    if (count >= 4) return player;
    return null;
  };
  const onClick = (column: number, player: number) => {
    const row = addPlayerToColumn(player, column);
    if (row !== null) {
      togglePlayer();
      const winner = checkWinner(row, column);
      if (winner)
        setTimeout(() => {
          alert(`Player ${winner} won! Restarting game...`);
          reset();
        }, 0); // give some time for latest board state to render
    }
  };
  return { board, player, onClick };
};
