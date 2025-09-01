import React, { useState, useCallback, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { NumberBank } from './components/NumberBank';
import { useGameLogic } from './hooks/useGameLogic';
import { Level, Operation } from './types';
import { WinModal } from './components/WinModal';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { soundService } from './services/sound';

const App: React.FC = () => {
  const [level, setLevel] = useState<Level>(Level.EASY);
  const [operation, setOperation] = useState<Operation>(Operation.ADD);

  const {
    board,
    bankNumbers,
    targetSum,
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
  } = useGameLogic(level, operation);

  const handleLevelChange = useCallback((newLevel: Level) => {
    soundService.userInteraction();
    setLevel(newLevel);
    startNewGame(newLevel, operation);
  }, [startNewGame, operation]);
  
  const handleOperationChange = useCallback((newOperation: Operation) => {
    soundService.userInteraction();
    setOperation(newOperation);
    startNewGame(level, newOperation);
  }, [startNewGame, level]);

  const handleReset = useCallback(() => {
    soundService.userInteraction();
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    startNewGame(level, operation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <Header />

        <main className="mt-6 w-full p-4 sm:p-6 bg-slate-800/50 rounded-2xl shadow-2xl ring-1 ring-white/10">
          <Controls
            currentLevel={level}
            currentOperation={operation}
            onLevelChange={handleLevelChange}
            onOperationChange={handleOperationChange}
            onReset={handleReset}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
          
          <div className="mt-8 flex flex-col items-center justify-center gap-8">
            <div className="flex w-full justify-center flex-col sm:flex-row gap-8 items-start">
              <GameBoard
                board={board}
                onDrop={handleDrop}
                targetSum={targetSum}
                rowSums={rowSums}
                colSums={colSums}
                operation={operation}
              />
              <div className="w-full sm:w-auto p-6 bg-slate-900/70 rounded-lg text-center min-w-[10rem]">
                <h3 className="text-lg font-bold text-cyan-400">Alvo</h3>
                <p className="text-5xl font-bold tracking-tight mt-1">{targetSum}</p>
              </div>
            </div>
            <NumberBank
              numbers={bankNumbers}
              isBoardFull={isBoardFull}
            />
          </div>
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm max-w-2xl">
          <p>Arraste os números para as casas vazias. O objetivo é fazer com que o resultado de cada linha e coluna seja igual ao Alvo, usando a operação selecionada.</p>
        </footer>
      </div>

      <WinModal
        isOpen={isWon}
        onNextLevel={() => handleLevelChange(level === Level.EASY ? Level.MEDIUM : Level.HARD)}
        onRestart={() => startNewGame(level, operation)}
        currentLevel={level}
      />
    </div>
  );
};

export default App;