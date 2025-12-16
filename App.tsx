import React, { useState, useEffect, useRef } from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';
import RotatePrompt from './components/RotatePrompt';
import { Play } from 'lucide-react';

// 画像データとキャプション情報
const visualHighlights = [
  {
    id: 1,
    image: "./img/07-2.jpg",
    label: "Kagawa, 2025-03",
    title: "カトーレック高松工場",
  },
  {
    id: 2,
    image: "./img/09.jpg",
    label: "Kagawa, 2025-03",
    title: "カトーレック高松工場",
  },
  // {
  //   id: 3,
  //   image: "./img/08.jpg",
  //   label: "Kagawa, 2025-03",
  //   title: "カトーレック高松工場",
  // },
  {
    id: 4, 
    image: "./img/03.jpg",
    label: "Tokyo, 2025-03",
    title: "駒沢体育館",
  },
  {
    id: 5,
    image: "./img/04.jpg",
    label: "Tokyo, 2025-03",
    title: "駒沢体育館",
  },
  {
    id: 6,
    image: "./img/05.jpg",
    label: "Tokyo, 2025-03",
    title: "駒沢体育館",
  }
];

// アプリケーションの状態定義
type AppPhase = 'loading' | 'intro' | 'standby' | 'active';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('loading');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentYear = new Date().getFullYear();

  const MUSIC_URL = "./audio/to-my-precious-person-291357.mp3"; 
  const LOGO_URL = "./img/00.png"; 

  // 画像プリロード処理
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        ...visualHighlights.map((item) => item.image),
        LOGO_URL
      ];

      const promises = imageUrls.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; 
        });
      });

      try {
        await Promise.all(promises);
        setTimeout(() => {
          setPhase('intro');
        }, 800);
      } catch (error) {
        console.error("Image preload failed", error);
        setPhase('intro'); 
      }
    };

    preloadImages();
  }, []);

  const handleEnter = () => {
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Playback failed:", e));
    }

    setTimeout(() => {
      setPhase('standby'); 
    }, 200);

    setTimeout(() => {
      setPhase('active'); 
    }, 4000);
  };

  const toggleAudio = () => {
    if (phase === 'intro') {
      setIsSoundEnabled(!isSoundEnabled);
    } else {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          setIsSoundEnabled(false);
        } else {
          audioRef.current.play().catch(e => console.error(e));
          setIsPlaying(true);
          setIsSoundEnabled(true); 
        }
      }
    }
  };

  useEffect(() => {
    if (phase !== 'active') return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % visualHighlights.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="relative h-screen w-screen bg-white text-slate-800 overflow-hidden font-sans">
      
      <RotatePrompt />
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      {/* --- 0. ローディング画面 (最前面 z-100: 黒背景) --- */}
      <div 
        className={`fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center transition-opacity duration-[1500ms] ease-in-out ${
          phase === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-gold-300 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-xs text-slate-500 tracking-[0.3em] font-serif animate-pulse">
            LOADING
          </p>
        </div>
      </div>

      {/* --- 1. イントロ画面 (z-40: 黒背景) --- */}
      <div 
        className={`fixed inset-0 z-40 bg-black text-white flex flex-col items-center justify-center px-4 transition-opacity duration-[3000ms] ease-in-out ${
          phase === 'loading' || phase === 'intro' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center space-y-8 max-w-lg animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-serif text-white">
            BGMが再生されます。
          </h2>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
            音量にご注意ください。
          </p>
          
          <button
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-500 mt-8 rounded-sm overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <Play className="w-4 h-4 fill-current text-gold-300" />
            <span className="font-serif tracking-[0.2em] text-sm relative z-10">ENTER SITE</span>
          </button>
        </div>
      </div>

      {/* --- 2. Standby画面 (z-30: 黒背景 + タイトルのみ) --- */}
      <div 
        className={`fixed inset-0 z-30 bg-black flex flex-col items-center justify-center px-4 pointer-events-none transition-opacity duration-[3000ms] ease-in-out ${
          // 修正箇所: phase === 'standby' の時だけ表示し、activeになったら消える（delayさせてクロスフェード）
          phase === 'standby' ? 'opacity-100' : (phase === 'active' ? 'opacity-0 delay-[1000ms]' : 'opacity-0')
        }`}
      >
        <div className="space-y-6 animate-fade-in w-full max-w-4xl flex flex-col items-center">
            <h1 className="text-3xl md:text-6xl font-serif text-green-700 tracking-tight drop-shadow-2xl leading-none w-full whitespace-nowrap text-center">
                Happy Holidays
            </h1>
            <div className="w-1/2 max-w-sm px-4 md:px-0">
              <img 
                src={LOGO_URL}
                alt="Logo" 
                className="w-full h-auto object-contain mx-auto opacity-90"
              />
            </div>
        </div>
      </div>

      {/* --- 3. メインレイアウト (Active時: 白背景 + マージン付き画像) --- */}
      <div 
        className={`relative flex flex-col h-full p-4 md:p-12 transition-opacity duration-[4000ms] ease-in-out ${
          phase === 'active' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* ヘッダーエリア */}
        <header 
          className={`flex flex-col items-center justify-center pt-6 pb-12 space-y-2 z-50 transform transition-all duration-[3000ms] ease-in-out ${
             phase === 'active' ? 'translate-y-0 scale-100' : 'translate-y-[35vh] scale-110'
          }`}
        >
            <h1 className="text-3xl md:text-5xl font-serif text-green-700 tracking-tight drop-shadow-sm leading-none whitespace-nowrap text-center">
                Happy Holidays
            </h1>
            <div className="w-1/2 max-w-[200px] px-4 md:px-0">
                <img 
                src={LOGO_URL}
                alt="Logo" 
                className="w-full h-auto object-contain mx-auto opacity-80 mix-blend-multiply"
                />
            </div>
        </header>

        {/* 画像表示エリア (中央・黒背景のフレーム) */}
        <main className="relative flex-1 w-full bg-black overflow-hidden shadow-2xl z-0">
            {visualHighlights.map((item, index) => {
                const isActive = index === currentIndex;
                return (
                    <div
                        key={item.id}
                        className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${
                            isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        <div 
                            className={`relative w-full h-full transform-gpu transition-all duration-[4000ms] ease-out will-change-transform ${
                                isActive ? 'scale-105 blur-0' : 'scale-115 blur-md'
                            }`}
                        >
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                        </div>
                    </div>
                );
            })}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <Snowfall />
            </div>
        </main>

        {/* フッター＆キャプションエリア */}
        <div className="relative h-16 mt-4 flex items-start justify-between">
            <div className="text-slate-400 text-[10px] tracking-widest uppercase font-light pt-2">
                &copy; {currentYear} 芦原太郎建築事務所
            </div>
            <div className="text-right z-30">
                {visualHighlights.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`absolute top-0 right-0 w-full min-w-[200px] transition-opacity duration-[4000ms] ease-in-out ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="flex flex-col items-end space-y-1">
                            <p className="text-[9px] tracking-[0.2em] uppercase text-slate-400 font-light">
                                {item.label}
                            </p>
                            <h2 className="text-sm md:text-base font-sans text-slate-700 tracking-wider font-medium">
                                {item.title}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* サウンドボタン */}
      <div className={`transition-opacity duration-1000 ${phase === 'loading' ? 'opacity-0' : 'opacity-100'}`}>
        <div className={`${phase === 'active' ? 'text-slate-600' : 'text-gold-300'}`}>
            <MusicPlayer 
            isPlaying={phase === 'intro' ? isSoundEnabled : isPlaying} 
            onToggle={toggleAudio} 
            />
        </div>
      </div>

    </div>
  );
};

export default App;