import React from 'react';
import { Level, Operation } from '../types';
import { SoundToggle } from './SoundToggle';

interface ControlsProps {
  currentLevel: Level;
  currentOperation: Operation;
  onLevelChange: (level: Level) => void;
  onOperationChange: (operation: Operation) => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const levelOptions = [Level.EASY, Level.MEDIUM, Level.HARD];
const operationOptions = [Operation.ADD, Operation.SUBTRACT, Operation.MULTIPLY, Operation.DIVIDE];

const OperationIcon: React.FC<{ op: Operation }> = ({ op }) => {
    switch (op) {
        case Operation.ADD:
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
        case Operation.SUBTRACT:
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>;
        case Operation.MULTIPLY:
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
        case Operation.DIVIDE:
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M8 7a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    }
}

const UndoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8a5 5 0 000-10H9" />
    </svg>
);
  
const RedoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 15l3-3m0 0l-3-3m3 3H5a5 5 0 000 10h1" />
    </svg>
);


export const Controls: React.FC<ControlsProps> = ({ currentLevel, currentOperation, onLevelChange, onOperationChange, onReset, onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2 bg-slate-900/70 p-1 rounded-full">
            {operationOptions.map(op => (
              <button
                key={op}
                onClick={() => onOperationChange(op)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  currentOperation === op
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-transparent text-slate-300 hover:bg-slate-700/50'
                }`}
                aria-label={op}
              >
                <OperationIcon op={op} />
              </button>
            ))}
        </div>
        <div className="flex items-center gap-2 bg-slate-900/70 p-1 rounded-full">
            {levelOptions.map(level => (
            <button
                key={level}
                onClick={() => onLevelChange(level)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
                currentLevel === level
                    ? 'bg-fuchsia-600 text-white shadow-md'
                    : 'bg-transparent text-slate-300 hover:bg-slate-700/50'
                }`}
            >
                {level}
            </button>
            ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
         <div className="flex items-center gap-2 bg-slate-900/70 p-1 rounded-full">
            <button onClick={onUndo} disabled={!canUndo} className="p-2 rounded-full text-slate-300 enabled:hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Undo"><UndoIcon /></button>
            <button onClick={onRedo} disabled={!canRedo} className="p-2 rounded-full text-slate-300 enabled:hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Redo"><RedoIcon /></button>
        </div>
        <button
          onClick={onReset}
          className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-full transition-transform transform hover:scale-105 shadow-lg"
        >
          Reiniciar
        </button>
        <SoundToggle />
      </div>
    </div>
  );
};