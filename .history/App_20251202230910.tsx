import React from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';
import { ArrowDown } from 'lucide-react';

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
    image: "./img/bg-newyear.jpg",
    description: "まだ見ぬ未来へ、共に。"
  }
];

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950 text-white relative selection:bg-gold-500/30 overflow-hidden font-sans">
      {/* 背景エフェクト */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-[-1]" />
      <Snowfall />
      <MusicPlayer />

      {/* 1. ヒーローセクション（導入） */}
      <header className="h-screen flex flex-col items-center justify-center relative px-4">
        {/* 装飾的な光 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="z-10 text-center space-y-8 animate-fade-in relative">
          <div className="inline-block mb-4">
             <span className="text-gold-300 tracking-[0.3em] uppercase text-sm border-b border-gold-500/30 pb-2">
               Season's Greetings
             </span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tight drop-shadow-2xl">
            Season's Greeting
          </h1>
          
          <p className="text-lg md:text-xl font-light text-slate-400 tracking-widest uppercase">
            Innovations
          </p>

          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="text-white/30 w-6 h-6" />
          </div>
        </div>
      </header>

      {/* 2. メインビジュアルセクション（3つの画像） */}
      <main>
        {visualHighlights.map((item, index) => (
          <section key={item.id} className="relative h-screen w-full overflow-hidden group">
            {/* 画像背景 */}
            <div className="absolute inset-0">
               <img 
                 src={item.image} 
                 alt={item.title}
                 className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
               />
               {/* 画像を暗くして文字を読みやすくするオーバーレイ */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
            </div>

            {/* コンテンツ（中央配置） */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 space-y-6">
              {/* 番号とラベル */}
              <div className="overflow-hidden">
                <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out delay-100 flex items-center gap-4 text-gold-400 font-serif">
                   <span className="text-sm tracking-widest">0{index + 1}</span>
                   <span className="w-12 h-[1px] bg-gold-400"></span>
                   <span className="text-sm tracking-widest">{item.label}</span>
                </div>
              </div>

              {/* タイトル */}
              <div className="overflow-hidden">
                <h2 className="text-5xl md:text-8xl font-serif text-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out delay-200">
                  {item.title}
                </h2>
              </div>

              {/* 短いキャプション（日本語） */}
              <div className="overflow-hidden">
                 <p className="text-lg md:text-2xl text-slate-200 font-light translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out delay-300">
                   {item.description}
                 </p>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* 3. フッター */}
      <footer className="bg-black py-12 text-center relative z-10 border-t border-white/10">
        <h3 className="text-2xl font-serif text-white mb-4">芦原太郎建築事務所</h3>
        <p className="text-slate-500 text-xs tracking-widest uppercase">
          &copy; {currentYear} All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;