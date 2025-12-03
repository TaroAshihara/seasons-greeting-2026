import React, { useState, useEffect, useRef } from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';
import { Play } from 'lucide-react';

// 画像データとキャプション情報
const visualHighlights = [
  {
    id: 1,
    image: "./img/bg-city.jpg",
    label: "Kagawa, JPN",
    title: "カトーレック高松工場",
  },
  {
    id: 2,
    image: "./img/bg-newyear.jpg",
    label: "Kagawa, JPN",
    title: "カトーレック高松工場 (2025)",
  },
  {
    id: 3,
    image: "./img/bg-winter.jpg",
    label: "Kagawa, JPN",
    title: "カトーレック高松工場 (2025)",
  },
  {
    id: 4,
    image: "./img/03.jpg",
    label: "Tokyo, JPN",
    title: "駒沢体育館 (2025)",
  },
  {
    id: 3,
    image: "./img/04.jpg",
    label: "Tokyo, JPN",
    title: "駒沢体育館 (2025)",
  },
  {
    id: 3,
    image: "./img/05.jpg",
    label: "Tokyo, JPN",
    title: "駒沢体育館 (2025)",
  }
];

// アプリケーションの状態定義
type AppPhase = 'intro' | 'standby' | 'active';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentYear = new Date().getFullYear();

  // BGM URL
  const MUSIC_URL = "audio/to-my-precious-person-291357.mp3"; 

  // ENTERボタンが押された時の処理
  const handleEnter = () => {
    // 音楽再生を試みる
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Playback failed:", e));
    }

    // フェーズを 'standby' (黒画面+テキスト) に移行
    setPhase('standby');

    // 3秒後に 'active' (画像フェードイン) に移行
    setTimeout(() => {
      setPhase('active');
    }, 3000);
  };

  // サウンドボタン用トグル処理
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 6秒ごとに画像を切り替える（activeフェーズのみ）
  useEffect(() => {
    if (phase !== 'active') return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % visualHighlights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden font-sans">
      
      {/* --- オーディオ要素 (非表示) --- */}
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      {/* --- 1. イントロ画面 (音出し確認) --- */}
      {phase === 'intro' && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-fade-in px-4">
          <div className="text-center space-y-8 max-w-lg">
            
            <h2 className="text-2xl md:text-3xl font-serif text-white">
              BGMが再生されます。
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
音量にご注意ください
。            </p>
            
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
      )}

      {/* --- 背景レイヤー（画像スライドショー） --- */}
      {/* phaseが 'active' になるまで opacity-0 で隠しておく */}
      <div className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
        phase === 'active' ? 'opacity-100' : 'opacity-0'
      }`}>
        {visualHighlights.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div 
                className={`relative w-full h-full transform transition-all duration-[2500ms] ease-out ${
                  isActive ? 'scale-105 blur-0' : 'scale-115 blur-lg'
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

      {/* --- エフェクトレイヤー (Snowfall) --- */}
      {/* 雪も 'active' になるまで隠す */}
      <div className={`relative z-20 pointer-events-none transition-opacity duration-[3000ms] ${
        phase === 'active' ? 'opacity-100' : 'opacity-0'
      }`}>
        <Snowfall />
      </div>

      {/* --- UIレイヤー (常時表示したい要素) --- */}
      {/* standbyフェーズ以降で表示 */}
      {phase !== 'intro' && (
        <>
          {/* サウンドボタン */}
          <MusicPlayer isPlaying={isPlaying} onToggle={toggleAudio} />

          {/* 1. 左上：ロゴプレースホルダー (コメントアウトのまま維持) */}
          {/* <div className="absolute top-8 left-8 z-30 animate-fade-in">...</div> */}

          {/* 2. 中央：メインタイトル */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <div className="space-y-4 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-serif text-green-90 tracking-tight drop-shadow-2xl">
                    Happy Holidays
                </h1>
                <div className="w-10 bg-white/40 mx-auto my-3" />
                {/* <p className="text-[10px] md:text-2xl font-light text-white tracking-[0.25em] uppercase">
                    TARO ASHIHARA ARCHITECTS
                </p> */}
                <img  src='./img/00.png' />
            </div>
          </div>

          {/* 3. 右下：キャプションエリア (active時のみ表示) */}
          <div className={`absolute bottom-8 right-8 z-30 text-right transition-opacity duration-[2000ms] ${
             phase === 'active' ? 'opacity-100' : 'opacity-0'
          }`}>
            {visualHighlights.map((item, index) => (
               <div 
                 key={item.id} 
                 className={`absolute bottom-0 right-0 w-full min-w-[250px] transition-opacity duration-[2500ms] ease-in-out ${
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
        </>
      )}

    </div>
  );
};

export default App;