import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 明るい雰囲気のBGM (Upbeat Christmas tune)
  const MUSIC_URL = "./audio/"; 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if(audioRef.current) {
        audioRef.current.volume = 0.3; // 音量調整
        audioRef.current.loop = true;
    }
  }, []);

  return (
    // 配置を「右上 (top-8 right-8)」に変更してキャプションとの重なりを回避
    <div className="fixed top-8 right-8 z-50">
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
      <button
        onClick={togglePlay}
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