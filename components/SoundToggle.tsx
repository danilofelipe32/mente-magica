
import React, { useState } from 'react';
import { soundService } from '../services/sound';

const SpeakerOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

const SpeakerOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2L17 8m2 2l2 2" />
  </svg>
);


export const SoundToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundService.getMutedState());

  const handleToggle = () => {
    soundService.userInteraction();
    const newMutedState = soundService.toggleMute();
    setIsMuted(newMutedState);
  };
  
  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-full transition-colors transform hover:scale-105 shadow-lg"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
    </button>
  );
};
