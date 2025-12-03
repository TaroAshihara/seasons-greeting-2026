import React, { useState, useEffect, useRef } from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';
import RotatePrompt from './components/RotatePrompt';
import { Play, Loader2 } from 'lucide-react';

// 画像データとキャプション情報
const visualHighlights = [
  {
    id: 1,
    image: "./img/06.jpg",
    label: "Kagawa, 2025-03",
    title: "カトーレック高松工場",
  },
  {
    id: 2,
    image: "./img/07.jpg",
    label: "Kagawa, 2025-03",
    title: "カトーレック高松工場",
  },
  {
    id: 3,
    image: "./img/08.jpg",
    label: "Kagawa, 2025-03",
    title: "カトーレック高松工場",
  },
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

  // ▼▼▼ 画像プリロード処理 ▼▼▼
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
  // ▲▲▲▲▲▲

  const handleEnter = () => {
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Playback failed:", e));
    }

    // 変更点: 即座に遷移せず、2000ms(2秒)待ってからフェードアウトを開始する
    setTimeout(() => {
      setPhase('standby'); 
    }, 200);

    // 変更点: 待機(2s) + フェードアウト(3s) + 余韻(1s) = 6000ms後に背景を表示
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
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden font-sans">
      
      <RotatePrompt />
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      {/* --- 0. ローディング画面 (最前面 z-100) --- */}
      <div 
        className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-[1500ms] ease-in-out ${
          phase === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-xs text-slate-500 tracking-[0.3em] font-serif animate-pulse">
            LOADING
          </p>
        </div>
      </div>

      {/* --- 1. イントロ画面 (z-40) --- */}
      {/* 変更点: duration-[1500ms] -> duration-[3000ms] (3秒かけてゆっくり消える) */}
      <div 
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center px-4 transition-opacity duration-[3000ms] ease-in-out ${
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
            <Play className="w-4 h-4 fill-current text-white" />
            <span className="font-serif tracking-[0.2em] text-sm relative z-10">ENTER SITE</span>
          </button>
        </div>
      </div>

      {/* --- 背景レイヤー（画像スライドショー） --- */}
      <div className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
        phase === 'active' ? 'opacity-100' : 'opacity-0'
      }`}>
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
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
              </div>
            </div>
          );
        })}
      </div>

      <div className={`relative z-20 pointer-events-none transition-opacity duration-[3000ms] ${
        phase === 'active' ? 'opacity-100' : 'opacity-0'
      }`}>
        <Snowfall />
      </div>

      {/* サウンドボタン */}
      <div className={`transition-opacity duration-1000 ${phase === 'loading' ? 'opacity-0' : 'opacity-100'}`}>
        <MusicPlayer 
          isPlaying={phase === 'intro' ? isSoundEnabled : isPlaying} 
          onToggle={toggleAudio} 
        />
      </div>

      {/* --- UIレイヤー (z-30) --- */}
      <div className={`transition-opacity duration-1000 ${phase === 'loading' ? 'opacity-0' : 'opacity-100'}`}>
        {/* 2. 中央：メインタイトル */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <div className="space-y-6 animate-fade-in w-full max-w-4xl flex flex-col items-center">
              <h1 className="text-3xl md:text-6xl font-serif text-white tracking-tight drop-shadow-2xl leading-none w-full whitespace-nowrap text-center">
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

        {/* 3. 右下：キャプションエリア */}
        <div className={`absolute bottom-8 right-8 z-30 text-right transition-opacity duration-[2000ms] ${
            phase === 'active' ? 'opacity-100' : 'opacity-0'
        }`}>
          {visualHighlights.map((item, index) => (
              <div 
                key={item.id} 
                className={`absolute bottom-0 right-0 w-full min-w-[250px] transition-opacity duration-[4000ms] ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex flex-col items-end space-y-1">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-light">
                      {item.label}
                  </p>
                  <h2 className="text-lg md:text-xl font-sans text-white tracking-wider drop-shadow-md">
                    {item.title}
                  </h2>
                </div>
              </div>
          ))}
        </div>

        {/* 4. 左下：Copyright */}
        <footer className="absolute bottom-8 left-8 z-30 text-left">
          <p className="text-white/40 text-[10px] tracking-widest uppercase font-light">
            &copy; {currentYear} 芦原太郎建築事務所
          </p>
        </footer>
      </div>

    </div>
  );
};

export default App;