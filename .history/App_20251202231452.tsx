import React, { useState, useEffect } from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';

// 3つのメインビジュアル画像
// 画像パスはご提示いただいたものを使用しています。
// 実際のファイルが public/img/ フォルダ等にあることを確認してください。
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
    <div className="relative h-screen w-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-gold-500/30">
      
      {/* --- 背景レイヤー（画像スライドショー） --- */}
      {visualHighlights.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          {/* 画像（アクティブ時にゆっくりズームする演出付き） */}
          <div className={`relative w-full h-full transform transition-transform duration-[10000ms] ease-linear ${
             index === currentIndex ? 'scale-110' : 'scale-100'
          }`}>
             <img 
               src={item.image} 
               alt={item.title} 
               className="w-full h-full object-cover"
             />
             {/* 視認性を高めるための黒いオーバーレイ */}
             <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
      ))}

      {/* --- エフェクトレイヤー --- */}
      <Snowfall />
      {/* 画面周辺を少し暗くするビネット効果 */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />
      <MusicPlayer />

      {/* --- メインコンテンツレイヤー（中央固定） --- */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        
        {/* Season's Greetings ラベル */}
        <div className="mb-8 animate-fade-in">
           <span className="text-gold-300 tracking-[0.3em] uppercase text-xs md:text-sm border-b border-gold-500/30 pb-2">
             Season's Greetings
           </span>
        </div>
        
        {/* メインタイトル */}
        <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight drop-shadow-2xl mb-6">
          Happy Holiday
        </h1>
        
        {/* 社名・サブタイトル */}
        <p className="text-sm md:text-xl font-light text-slate-200 tracking-[0.2em] uppercase mb-16">
          TARO ASHIHARA ARCHITECTS
        </p>

        {/* --- 画像ごとのキャプション（下部で切り替わる） --- */}
        <div className="absolute bottom-24 left-0 right-0 text-center px-4">
          <div key={currentIndex} className="animate-fade-in transition-opacity duration-1000">
             <div className="flex items-center justify-center gap-3 mb-2 text-gold-400/80 text-xs tracking-widest uppercase">
                <span className="w-8 h-[1px] bg-gold-400/50"></span>
                {visualHighlights[currentIndex].label}
                <span className="w-8 h-[1px] bg-gold-400/50"></span>
             </div>
             <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 text-shadow">
               {visualHighlights[currentIndex].title}
             </h2>
             <p className="text-sm md:text-base text-slate-300 font-light tracking-wider">
               {visualHighlights[currentIndex].description}
             </p>
          </div>
        </div>
      </div>

      {/* --- フッター --- */}
      <footer className="absolute bottom-4 w-full text-center z-20">
        <p className="text-slate-500 text-[10px] tracking-widest uppercase">
          &copy; {currentYear} 芦原太郎建築事務所 All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default App;