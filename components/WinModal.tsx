import React from 'react';
import { Level } from '../types';

interface WinModalProps {
  isOpen: boolean;
  onNextLevel: () => void;
  onRestart: () => void;
  currentLevel: Level;
}

export const WinModal: React.FC<WinModalProps> = ({ isOpen, onNextLevel, onRestart, currentLevel }) => {
  if (!isOpen) return null;

  const handleNextLevelClick = () => {
    onNextLevel();
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-green-500/50">
        <h2 className="text-4xl font-extrabold text-green-400">Parabéns!</h2>
        <p className="mt-2 text-slate-300">Você resolveu o desafio!</p>
        
        <div className="mt-8 flex flex-col gap-4">
          {currentLevel !== Level.HARD && (
            <button
              onClick={handleNextLevelClick}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
            >
              Próximo Nível
            </button>
          )}
          <button
            onClick={onRestart}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
          >
            Jogar Novamente ({currentLevel})
          </button>
        </div>
      </div>
    </div>
  );
};