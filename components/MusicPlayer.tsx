import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed top-8 right-8 z-50">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border border-white/20 ${
          isPlaying 
            ? 'bg-gold-500/20 text-gold-300 hover:bg-gold-500/30' 
            : 'bg-white/10 text-white/70 hover:bg-white/20'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium hidden sm:block font-serif tracking-widest">ON AIR</span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:block font-serif tracking-widest">MUSIC OFF</span>
          </>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;