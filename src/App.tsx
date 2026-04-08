import { useEffect, useState } from 'react'
import './index.css'
import { Board } from '@/components/Board'
import type { Player } from '@/types/game';

const INITIAL_PLAYER_1: Player = { name: "Player 1", symbol: "X", moves: [] };
const INITIAL_PLAYER_2: Player = { name: "Player 2", symbol: "O", moves: [] };

function App() {
  const [dimension, setDimension] = useState(5);
  const [player1, setPlayer1] = useState<Player>(INITIAL_PLAYER_1);
  const [player2, setPlayer2] = useState<Player>(INITIAL_PLAYER_2);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(INITIAL_PLAYER_1);
  const [boardVersion, setBoardVersion] = useState(0);
  const [isAnActiveGame, setIsAnActiveGame] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
    
  useEffect(() => {
    let winner: Player | null = null;
    if (player1.moves.length >= dimension || player2.moves.length >= dimension) {
      // Check rows
      for (let i = 0; i < dimension; i++) {
        const player1RowMoves = player1.moves.filter(move => move.row === i);
        const player2RowMoves = player2.moves.filter(move => move.row === i);
        if (player1RowMoves.length === dimension) {
          winner = player1;
          break;
        } else if (player2RowMoves.length === dimension) {
          winner = player2;
          break;
        }
      }
      // Check columns
      for (let j = 0; j < dimension; j++) {
        const player1ColMoves = player1.moves.filter(move => move.col === j);
        const player2ColMoves = player2.moves.filter(move => move.col === j);
        if (player1ColMoves.length === dimension) {
          winner = player1;
          break;
        } else if (player2ColMoves.length === dimension) {
          winner = player2;
          break;
        }
      }
      // Check diagonals
      const player1Diagonal1Moves = player1.moves.filter(move => move.row === move.col);
      const player2Diagonal1Moves = player2.moves.filter(move => move.row === move.col);
      if (player1Diagonal1Moves.length === dimension) {
        winner = player1;
      } else if (player2Diagonal1Moves.length === dimension) {
        winner = player2;
      }
      const player1Diagonal2Moves = player1.moves.filter(move => move.row + move.col === dimension - 1);
      const player2Diagonal2Moves = player2.moves.filter(move => move.row + move.col === dimension - 1);
      if (player1Diagonal2Moves.length === dimension) {
        winner = player1;
      } else if (player2Diagonal2Moves.length === dimension) {
        winner = player2;
      }
    }
    setWinner(winner);
    if (winner || (player1.moves.length + player2.moves.length === dimension * dimension)) {
      setIsGameOver(true);
    }
  }, [player1.moves, player2.moves]);

  const savePlayerMove = (row: number, col: number) => {
    setIsAnActiveGame(true);
    const move = { row, col };
    if (currentPlayer.symbol === player1.symbol) {
      setPlayer1(prev => ({ ...prev, moves: [...prev.moves, move] }));
      setCurrentPlayer(player2);
    } else {
      setPlayer2(prev => ({ ...prev, moves: [...prev.moves, move] }));
      setCurrentPlayer(player1);
    }
  }

  const resetGame = () => {
    setPlayer1(INITIAL_PLAYER_1);
    setPlayer2(INITIAL_PLAYER_2);
    setCurrentPlayer(INITIAL_PLAYER_1);
    setBoardVersion(prev => prev + 1);
    setIsAnActiveGame(false);
    setIsGameOver(false);
  }

  const renderTitle = <div className='p-10 bg-amber-600 w-full'>
    <h1 className="font-bold font-display text-5xl text-center text-white">
      Tic Tac Toe
    </h1>
  </div>;

  const renderPlayer = <div className='mt-10 text-lg text-blue-900'>
    <b>Who is playing?</b> {currentPlayer.name} with symbol <span className={`font-bold ${currentPlayer.symbol === "X" ? "text-amber-600" : "text-blue-900"}`}>{currentPlayer.symbol}</span>
  </div>;

  const renderOptionsGame = <form className='mt-10'>
    <label className='font-display text-lg text-blue-900 font-semibold' htmlFor="dimension">Dimension:</label>
    <input className='mx-3 bg-amber-500 text-justify text-white rounded-xl px-4 py-2' type="number" id="dimension" name="dimension" min="3" max="10" value={dimension} onChange={(e) => setDimension(Number(e.target.value))} disabled={isAnActiveGame} />
    <button type="button" onClick={resetGame} className='bg-blue-900 px-4 py-2 text-amber-600 font-semibold border-0 rounded-xl cursor-pointer'>Reset Game</button>
  </form>

  const renderWinner = winner ? <div className='mt-10 text-lg text-blue-900'>
    <span className='text-amber-600 font-bold'>Winner:</span> {winner.name} with symbol <span className={`font-bold ${winner.symbol === "X" ? "text-amber-600" : "text-blue-900"}`}>{winner.symbol}</span>
  </div> : null;

  const renderStatusGame = isGameOver ? <div className='mt-10 text-lg text-amber-600'>
    <b>Game Over!</b>
  </div> : null;

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100">
      {renderTitle}
      {renderOptionsGame}
      <Board key={boardVersion} dimension={dimension} currentPlayer={currentPlayer} playerMove={savePlayerMove} isGameOver={isGameOver} />
      {renderPlayer}
      {renderWinner}
      {renderStatusGame}
    </div>
  )
}

export default App
