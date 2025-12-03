import React, { useState, useEffect } from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';

// 3つのメインビジュアル画像
const visualHighlights = [
  {
    id: 1,
    label: "2024 REVIEW",
    title: "Global Impact",
    image: "./img/bg-city.jpg",
    description: "世界を変えた、私たちの革新。"
  },
  {
    id: 2,
    label: "GRATITUDE",
    title: "Shared Moments",
    image: "./img/bg-newyear.jpg",
    description: "皆様との絆に、心からの感謝を。"
  },
  {
    id: 3,
    label: "2025 VISION",
    title: "New Horizons",
    image: "./img/bg-winter.jpg",
    description: "まだ見ぬ未来へ、共に。"
  }
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentYear = new Date().getFullYear();

  // 6秒ごとに画像を切り替えるタイマー
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % visualHighlights.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-white text-white overflow-hidden font-sans">
      
      {/* --- 背景レイヤー（画像スライドショー） --- */}
      {visualHighlights.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          {/* 画像（明るさを活かすため、過度な黒オーバーレイを削除） */}
          <div className={`relative w-full h-full transform transition-transform duration-[10000ms] ease-linear ${
             index === currentIndex ? 'scale-105' : 'scale-100'
          }`}>
             <img 
               src={item.image} 
               alt={item.title} 
               className="w-full h-full object-cover"
             />
             {/* 文字の視認性を確保するための、ごく薄い上下グラデーションのみ適用 */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </div>
        </div>
      ))}

      {/* --- エフェクトレイヤー --- */}
      <Snowfall />
      <MusicPlayer />

      {/* --- 1. 左上：ロゴプレースホルダー --- */}
      <div className="absolute top-8 left-8 z-30 animate-fade-in">
        <div className="border-white/50 bg-white/10 backdrop-blur-md px-6 py-3 min-w-[120px] text-center">
                           <img src="https://www.t-ashihara.co.jp/res/file/interface/h1-logo.png" alt="TARO ASHIHARA ARCHITECTS"></img>

        </div>
      </div>

      {/* --- 2. 中央：メインメッセージ --- */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <div className="drop-shadow-lg space-y-4">
            <p className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-white/90">
                Season's Greetings
            </p>
            <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tight drop-shadow-xl">
                Happy Holidays
            </h1>
            <p className="text-sm md:text-lg font-light text-white/90 tracking-[0.2em] uppercase mt-4">
                TARO ASHIHARA ARCHITECTS
            </p>
        </div>
      </div>

      {/* --- 3. 右下：キャプションエリア --- */}
      <div className="absolute bottom-10 right-10 z-20 text-right max-w-md animate-fade-in">
        <div key={currentIndex} className="space-y-2 transition-all duration-1000 transform translate-y-0 opacity-100">
             <div className="flex items-center justify-end gap-3 text-white/80 text-xs tracking-widest uppercase mb-1">
                <span className="w-8 h-[1px] bg-white/60"></span>
                {visualHighlights[currentIndex].label}
             </div>
             
             <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-md">
               {visualHighlights[currentIndex].title}
             </h2>
             
             <p className="text-sm md:text-base text-white/90 font-light tracking-wide leading-relaxed bg-black/10 backdrop-blur-sm p-2 rounded inline-block">
               {visualHighlights[currentIndex].description}
             </p>
        </div>
      </div>

      {/* --- 4. 左下：Copyright --- */}
      <footer className="absolute bottom-10 left-10 z-20 text-left">
        <p className="text-white/60 text-[10px] tracking-widest uppercase font-light">
          &copy; {currentYear} 芦原太郎建築事務所 All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default App;