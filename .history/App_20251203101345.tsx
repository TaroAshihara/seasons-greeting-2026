import React, { useState, useEffect } from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';

// 画像データとキャプション情報
// description（長い文章）を削除し、事実情報のみにしました
const visualHighlights = [
  {
    id: 1,
    image: "./img/bg-city.jpg",
    label: "Kagawa, JPN", // 場所やカテゴリーなどの補足
    title: "カトーレック高松工場", // プロジェクト名
  },
  {
    id: 2,
    image: "./img/bg-newyear.jpg",
    label: "Kagaza, JPN",
    title: "カトーレック高松工場",
  },
  {
    id: 3,
    image: "./img/bg-winter.jpg",
    label: "Kagawa, JPN",
    title: "カトーレック高松工場",
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
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden font-sans">
      
      {/* --- 背景レイヤー（画像スライドショー） --- */}
      {visualHighlights.map((item, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* 画像：ブラー演出付きでゆっくり動く */}
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
               {/* 文字の可読性確保のための極薄いグラデーション */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
            </div>
          </div>
        );
      })}

      {/* --- エフェクトレイヤー --- */}
      <div className="relative z-20 pointer-events-none">
        <Snowfall />
      </div>
      <MusicPlayer />

      {/* --- 1. 左上：ロゴプレースホルダー --- */}
      {/* <div className="absolute top-8 left-8 z-30 animate-fade-in">
        <div className="border border-white/30 bg-white/5 backdrop-blur-md px-5 py-2 min-w-[100px] text-center shadow-lg transition-colors hover:bg-white/10 cursor-default">
            <span className="text-white font-serif tracking-widest text-xs uppercase">
                Company Logo
            </span>
        </div>
      </div> */}

      {/* --- 2. 中央：メインタイトル --- */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none mix-blend-screen">
        <div className="space-y-4">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-white/70 animate-fade-in">
                Season's Greetings
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight drop-shadow-2xl animate-fade-in">
                Happy Holidays
            </h1>
            <div className="h-[1px] w-12 bg-white/40 mx-auto my-3" />
            <p className="text-[10px] md:text-2xl font-light text-white/200 tracking-[0.25em] uppercase animate-fade-in">
                TARO ASHIHARA ARCHITECTS
            </p>
        </div>
      </div>

      {/* --- 3. 右下：キャプションエリア（シンプル・小型化） --- */}
      <div className="absolute bottom-8 right-8 z-30 text-right">
        {visualHighlights.map((item, index) => (
           <div 
             key={item.id} 
             // 画像のduration(2500ms)に合わせてテキストもフェード
             className={`absolute bottom-0 right-0 w-full min-w-[250px] transition-opacity duration-[2500ms] ease-in-out ${
               index === currentIndex ? 'opacity-100' : 'opacity-0'
             }`}
           >
             <div className="flex flex-col items-end space-y-1">
                {/* 補足ラベル（場所など） */}
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-light">
                   {item.label}
                </p>
                {/* プロジェクトタイトル */}
                <h2 className="text-lg md:text-xl font-serif text-white tracking-wider drop-shadow-md">
                  {item.title}
                </h2>
             </div>
           </div>
        ))}
      </div>

      {/* --- 4. 左下：Copyright --- */}
      <footer className="absolute bottom-8 left-8 z-30 text-left">
        <p className="text-white/40 text-[10px] tracking-widest uppercase font-light">
          &copy; {currentYear} 芦原太郎建築事務所
        </p>
      </footer>

    </div>
  );
};

export default App;
