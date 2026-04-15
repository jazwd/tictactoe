import { Cell } from "@/components/Cell";
import type { Player } from "@/types/game";
import { useEffect } from "react";

interface BoardProps {
  dimension: number;
  currentPlayer: Player;
  playerMove: (row: number, col: number) => void;
  isGameOver?: boolean;
}

export function Board({ dimension, currentPlayer, playerMove, isGameOver }: BoardProps) {
  useEffect(() => {
  }, [dimension, currentPlayer]);

  const cells = [];
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      cells.push(<Cell key={`${i}-${j}`} value={currentPlayer.symbol} row={i} col={j} onClick={() => handlerPlayerMove(i, j)} isGameOver={isGameOver} />);
    }
  }
  const handlerPlayerMove = (row: number, col: number) => {
    if (!isGameOver) {
      playerMove(row, col);
    }
  }

  return (
    <div className="grid gap-4 mt-5" style={{ gridTemplateColumns: `repeat(${dimension}, 1fr)`, gridTemplateRows: `repeat(${dimension}, 1fr)` }}>
      {cells}
    </div>
  );
}
