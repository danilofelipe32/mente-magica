import React from 'react';
import { Cell, Operation } from '../types';
import { NumberCell } from './NumberCell';

interface GameBoardProps {
  board: Cell[][];
  onDrop: (row: number, col: number, item: string) => void;
  targetSum: number;
  rowSums: (number | null)[];
  colSums: (number | null)[];
  operation: Operation;
  isLoading: boolean;
}

const OperationIcon: React.FC<{ op: Operation, className?: string }> = ({ op, className }) => {
    const symbol = {
        [Operation.ADD]: '+',
        [Operation.SUBTRACT]: '±',
        [Operation.MULTIPLY]: '×',
        [Operation.DIVIDE]: '÷',
    }[op];
    return <span className={className}>{symbol}</span>
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, onDrop, targetSum, rowSums, colSums, operation, isLoading }) => {
  if (board.length === 0 && !isLoading) return null;

  const gridSize = board.length || 3;

  return (
    <div className="flex-shrink-0 relative">
       {isLoading && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center gap-4">
             <svg className="animate-spin h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg text-slate-300">Gerando novo desafio...</p>
          </div>
        </div>
      )}
      <div className="relative p-2 sm:p-4 bg-slate-900/70 rounded-lg shadow-inner">
        <div 
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <NumberCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                onDrop={(item) => onDrop(rowIndex, colIndex, item)}
              />
            ))
          )}
        </div>
        
        {/* Row Sums */}
        {rowSums.map((sum, index) => {
          if (sum === null) return null;
          const isCorrect = Math.abs(sum - targetSum) < 0.001;
          const color = isCorrect ? 'text-green-400' : 'text-amber-400';
          return (
            <div key={`row-sum-${index}`} 
              className={`absolute -right-16 sm:-right-20 top-0 flex items-center justify-center font-bold text-xl sm:text-2xl transition-colors duration-300 ${color}`}
              style={{
                height: `${100 / gridSize}%`,
                top: `${(100 / gridSize) * index}%`,
              }}
            >
             <OperationIcon op={operation} className="text-sm mr-1 opacity-60" /> {sum}
            </div>
          );
        })}

        {/* Column Sums */}
        {colSums.map((sum, index) => {
           if (sum === null) return null;
          const isCorrect = Math.abs(sum - targetSum) < 0.001;
          const color = isCorrect ? 'text-green-400' : 'text-amber-400';
          return (
             <div key={`col-sum-${index}`} 
              className={`absolute -bottom-12 sm:-bottom-14 flex items-center justify-center font-bold text-xl sm:text-2xl transition-colors duration-300 ${color}`}
              style={{
                width: `${100/gridSize}%`,
                left: `${(100 / gridSize) * index}%`,
              }}
            >
              <OperationIcon op={operation} className="text-sm mr-1 opacity-60" /> {sum}
            </div>
          );
        })}
      </div>
    </div>
  );
};