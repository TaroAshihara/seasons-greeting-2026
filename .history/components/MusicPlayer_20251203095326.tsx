import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ▼ ここで音楽のURLを指定しています。
  // 明るい雰囲気のBGMに変更しました (Upbeat Christmas tune)
  const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/01/12/audio_458e3e4d41.mp3?filename=joyful-christmas-129676.mp3"; 

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
        audioRef.current.volume = 0.3; // 音量はここで調整 (0.0 〜 1.0)
        audioRef.current.loop = true;
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />
      <button
        onClick={togglePlay}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 border border-gold-500/30 ${
          isPlaying 
            ? 'bg-gold-500/20 text-gold-300 hover:bg-gold-500/30' 
            : 'bg-slate-900/50 text-slate-400 hover:bg-slate-900/70'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium hidden sm:block">On Air</span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:block">Play Music</span>
          </>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;