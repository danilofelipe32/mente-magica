import React, { useState } from 'react';
import { Cell } from '../types';

interface NumberCellProps {
  cell: Cell;
  onDrop: (item: string) => void;
}

export const NumberCell: React.FC<NumberCellProps> = ({ cell, onDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!cell.value && !cell.isFixed) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!cell.value && !cell.isFixed) {
      const item = e.dataTransfer.getData('text/plain');
      onDrop(item);
    }
  };

  const baseClasses = 'aspect-square w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-md text-3xl sm:text-4xl font-extrabold transition-all duration-200';

  if (cell.isFixed) {
    return (
      <div className={`${baseClasses} bg-slate-700/50 text-slate-300 shadow-inner ring-1 ring-slate-600`}>
        {cell.value}
      </div>
    );
  }

  if (cell.value !== null) {
    return (
       <div className={`${baseClasses} bg-cyan-600 text-white shadow-lg scale-105`}>
        {cell.value}
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${baseClasses} ${isDragOver ? 'bg-sky-500/50 ring-2 ring-sky-400 scale-105' : 'bg-slate-800/80'}`}
    >
    </div>
  );
};