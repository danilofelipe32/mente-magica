// FIX: Import useEffect from React to resolve 'Cannot find name' error.
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Cell, Level, Puzzle, Operation } from '../types';
import { PUZZLES } from '../constants';
import { soundService } from '../services/sound';

type GameState = {
  board: Cell[][];
  bankNumbers: number[];
};

const getStaticPuzzle = (level: Level, operation: Operation): Puzzle => {
  const puzzlesForLevel = PUZZLES[level].filter(p => p.operation === operation);
  if (puzzlesForLevel.length === 0) {
    // Fallback to addition if no puzzle for the current operation exists
    const fallbackPuzzles = PUZZLES[level].filter(p => p.operation === Operation.ADD);
    return fallbackPuzzles[Math.floor(Math.random() * fallbackPuzzles.length)];
  }
  return puzzlesForLevel[Math.floor(Math.random() * puzzlesForLevel.length)];
};

export const useGameLogic = (initialLevel: Level, initialOperation: Operation) => {
  const [puzzle, setPuzzle] = useState<Puzzle>(() => getStaticPuzzle(initialLevel, initialOperation));
  const [history, setHistory] = useState<GameState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isWon, setIsWon] = useState(false);
  const prevSums = useRef<{ rowSums: (number|null)[]; colSums: (number|null)[] }>({ rowSums: [], colSums: [] });

  const { board, bankNumbers } = useMemo(() => {
    return history[historyIndex] || { board: [], bankNumbers: [] };
  }, [history, historyIndex]);

  const initializeBoard = useCallback((currentPuzzle: Puzzle) => {
    const initialBoard: Cell[][] = currentPuzzle.grid.map(row =>
      row.map(value => ({
        value,
        isFixed: value !== null,
      }))
    );
    
    const initialState: GameState = { board: initialBoard, bankNumbers: currentPuzzle.bankNumbers };
    setHistory([initialState]);
    setHistoryIndex(0);
    setIsWon(false);
  }, []);

  const startNewGame = useCallback((level: Level, operation: Operation) => {
    const staticPuzzle = getStaticPuzzle(level, operation);
    setPuzzle(staticPuzzle);
    initializeBoard(staticPuzzle);
    prevSums.current = { rowSums: [], colSums: [] };
  }, [initializeBoard]);
  
  const resetGame = useCallback(() => {
    initializeBoard(puzzle);
    prevSums.current = { rowSums: [], colSums: [] };
  }, [puzzle, initializeBoard]);

  const isBoardFull = useMemo(() => board.every(row => row.every(cell => cell.value !== null)), [board]);

  const { rowSums, colSums } = useMemo(() => {
    if (!board || board.length === 0) return { rowSums: [], colSums: [] };
    const numRows = board.length;
    const numCols = board[0].length;
    const rSums: (number | null)[] = Array(numRows).fill(null);
    const cSums: (number | null)[] = Array(numCols).fill(null);

    const isMultiplicative = puzzle.operation === Operation.MULTIPLY || puzzle.operation === Operation.DIVIDE;

    for (let i = 0; i < numRows; i++) {
      const row = board[i];
      if (row.every(cell => cell.value !== null)) {
        rSums[i] = row.reduce((acc, cell) => {
          const val = cell.value!;
          return isMultiplicative ? acc * val : acc + val;
        }, isMultiplicative ? 1 : 0);
      }
    }

    for (let j = 0; j < numCols; j++) {
      const col = board.map(row => row[j]);
      if (col.every(cell => cell.value !== null)) {
        cSums[j] = col.reduce((acc, cell) => {
          const val = cell.value!;
          return isMultiplicative ? acc * val : acc + val;
        }, isMultiplicative ? 1 : 0);
      }
    }
    
    return { rowSums: rSums, colSums: cSums };
  }, [board, puzzle.operation]);
  
  useEffect(() => {
    if (board.length === 0 || isWon) return;

    rowSums.forEach((sum, i) => {
      if (sum !== null && sum === puzzle.targetSum && prevSums.current.rowSums[i] !== puzzle.targetSum) {
        soundService.play('complete');
      }
    });

    colSums.forEach((sum, i) => {
       if (sum !== null && sum === puzzle.targetSum && prevSums.current.colSums[i] !== puzzle.targetSum) {
        soundService.play('complete');
      }
    });

    prevSums.current = { rowSums, colSums };
  }, [rowSums, colSums, puzzle.targetSum, board, isWon]);


  useEffect(() => {
    if (!isBoardFull || isWon) return;

    const allRowsCorrect = rowSums.every(sum => sum !== null && Math.abs(sum - puzzle.targetSum) < 0.001);
    const allColsCorrect = colSums.every(sum => sum !== null && Math.abs(sum - puzzle.targetSum) < 0.001);

    if (allRowsCorrect && allColsCorrect) {
      setTimeout(() => soundService.play('win'), 200);
      setIsWon(true);
    }
  }, [isBoardFull, rowSums, colSums, puzzle.targetSum, isWon]);

  const handleDrop = useCallback((row: number, col: number, item: string) => {
    const droppedNumber = parseFloat(item);
    if (isNaN(droppedNumber) || bankNumbers.indexOf(droppedNumber) === -1) {
      return;
    }

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    if (newBoard[row][col].value === null) {
      newBoard[row][col].value = droppedNumber;
      
      const newBankNumbers = bankNumbers.filter(n => n !== droppedNumber);
      const newHistory = history.slice(0, historyIndex + 1);
      const newState: GameState = { board: newBoard, bankNumbers: newBankNumbers };
      
      setHistory([...newHistory, newState]);
      setHistoryIndex(newHistory.length);
      soundService.play('place');
    }
  }, [board, bankNumbers, history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(prev => prev - 1);
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(prev => prev + 1);
    }
  }, [canRedo]);

  return {
    board,
    bankNumbers,
    targetSum: puzzle.targetSum,
    isWon,
    isBoardFull,
    rowSums,
    colSums,
    handleDrop,
    resetGame,
    startNewGame,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};