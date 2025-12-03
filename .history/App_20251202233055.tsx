import React, { useState, useEffect } from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';

// 画像データ
const visualHighlights = [
  {
    id: 1,

    image: "./img/bg-city.jpg",
  },
  {
    id: 2,

    image: "./img/bg-newyear.jpg",

  },
  {
    id: 3,

    image: "./img/bg-winter.jpg",
    description: "まだ見ぬ未来へ、共に。"
  }
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentYear = new Date().getFullYear();

  // 6秒ごとに画像を切り替える
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % visualHighlights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    // ベース背景を黒にすることで、クロスフェード時の「白飛び（フラッシュ）」を防止
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden font-sans">
      
      {/* --- 背景レイヤー（画像スライドショー） --- */}
      {visualHighlights.map((item, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-[2500ms] ease-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* モダンな遷移の核となる部分:
               isActive時は「scale-105 & blur-0」でピントが合っている状態。
               非アクティブ時は「scale-115 & blur-md」で少し拡大してボケている状態。
               これにより「ボケた拡大画像が、スッとピントが合いながら定位置に収まる」演出になります。
            */}
            <div 
              className={`relative w-full h-full transform transition-all duration-[2500ms] ease-out ${
                isActive ? 'scale-105 blur-0' : 'scale-115 blur-xl'
              }`}
            >
               <img 
                 src={item.image} 
                 alt={item.title} 
                 className="w-full h-full object-cover"
               />
               {/* 文字の可読性を確保する最小限のグラデーション */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
            </div>
          </div>
        );
      })}

      {/* --- エフェクトレイヤー --- */}
      {/* Snowfallのz-indexを画像より上(20)に設定 */}
      <div className="relative z-20 pointer-events-none">
        <Snowfall />
      </div>
      <MusicPlayer />

      {/* --- 1. 左上：ロゴプレースホルダー --- */}
      <div className="absolute top-8 left-8 z-30 animate-fade-in">
        <div className="border border-white/30 bg-white/5 backdrop-blur-md px-6 py-3 min-w-[120px] text-center shadow-lg transition-colors hover:bg-white/10 cursor-default">
            <span className="text-white font-serif tracking-widest text-sm uppercase">
                Company Logo
            </span>
        </div>
      </div>

      {/* --- 2. 中央：メインメッセージ --- */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none mix-blend-screen">
        <div className="space-y-6">
            <p className="text-sm md:text-base font-medium tracking-[0.4em] uppercase text-white/80 animate-fade-in">
                Season's Greetings
            </p>
            <h1 className="text-6xl md:text-6xl font-serif text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-fade-in">
                Happy Holidays
            </h1>
            <div className="h-[1px] w-24 bg-white/50 mx-auto my-4" />
            <p className="text-xs md:text-sm font-light text-white/80 tracking-[0.3em] uppercase animate-fade-in">
                TARO ASHIHARA ARCHITECTS
            </p>
        </div>
      </div>

      {/* --- 3. 右下：キャプションエリア --- */}
      <div className="absolute bottom-12 right-12 z-30 text-right max-w-md">
        {visualHighlights.map((item, index) => (
           <div 
             key={item.id} 
             className={`absolute bottom-0 right-0 transition-all duration-1000 transform ${
               index === currentIndex 
                 ? 'opacity-100 translate-y-0 delay-500' // 画像より少し遅れて文字が出る
                 : 'opacity-0 translate-y-8 pointer-events-none'
             }`}
             style={{ width: 'max-content' }}
           >
             <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center gap-3 text-gold-300/90 text-xs tracking-[0.2em] uppercase">
                   <span className="w-6 h-[1px] bg-gold-300/50"></span>
                   {item.label}
                </div>
                
                <h2 className="text-3xl md:text-5xl font-serif text-white drop-shadow-lg">
                  {item.title}
                </h2>
                
                <p className="text-sm md:text-base text-white/90 font-light tracking-wider bg-black/20 backdrop-blur-sm px-4 py-2 rounded-sm border-r-2 border-white/30 mt-2">
                  {item.description}
                </p>
             </div>
           </div>
        ))}
      </div>

      {/* --- 4. 左下：Copyright --- */}
      <footer className="absolute bottom-12 left-12 z-30 text-left">
        <p className="text-white/50 text-[10px] tracking-widest uppercase font-light">
          &copy; {currentYear} 芦原太郎建築事務所 All Rights Reserved.
        </p>
      </footer>

    </div>
  );
};

export default App;