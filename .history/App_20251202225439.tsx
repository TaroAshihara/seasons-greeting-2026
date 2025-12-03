import React from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';
import { ArrowDown, ExternalLink, Globe, Smartphone, Zap, Box } from 'lucide-react';

// プロダクトのプレイスホルダーデータ
const products = [
  {
    id: 1,
    title: "Lumina Nexus",
    category: "AI Platform",
    description: "次世代の企業向けデータ解析プラットフォーム。シームレスな統合を実現。",
    image: "https://picsum.photos/600/400?random=10",
    icon: Globe
  },
  {
    id: 2,
    title: "EcoSmart Grid",
    category: "IoT Solution",
    description: "持続可能なエネルギー管理システム。都市の電力効率を最大化。",
    image: "https://picsum.photos/600/400?random=11",
    icon: Zap
  },
  {
    id: 3,
    title: "Nova Mobile",
    category: "Mobile App",
    description: "ユーザー体験を革新する、直感的なインターフェースデザイン。",
    image: "https://picsum.photos/600/400?random=12",
    icon: Smartphone
  },
  {
    id: 4,
    title: "Quantum Core",
    category: "Hardware",
    description: "処理速度を劇的に向上させる、新開発のプロセッサチップ。",
    image: "https://picsum.photos/600/400?random=13",
    icon: Box
  }
];

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-950 text-white relative selection:bg-gold-500/30 overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none z-[-1]" />
      
      {/* 既存のSnowfallコンポーネントを使用 */}
      <Snowfall />
      {/* 既存のMusicPlayerコンポーネントを使用 */}
      <MusicPlayer />

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center relative px-4">
        {/* Decorative Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[30%] -left-[10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="z-10 text-center space-y-8 animate-fade-in max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold-500/30 rounded-full bg-slate-900/40 backdrop-blur-md mb-6 animate-float">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-sparkle" />
            <span className="text-gold-100 text-xs md:text-sm tracking-[0.2em] uppercase font-serif">
              Season's Greetings {currentYear}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
            Lumina <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-amber-500">Innovations</span>
          </h1>
          
          <p className="text-lg md:text-xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
            輝かしい未来へ、共に歩んだ1年に感謝を込めて。<br className="hidden md:block"/>
            新しい年も、革新の光で世界を照らし続けます。
          </p>

          <div className="pt-16">
            <a 
              href="#greeting"
              className="inline-flex flex-col items-center gap-3 text-slate-400 hover:text-gold-300 transition-colors duration-500 group"
            >
              <span className="uppercase tracking-widest text-xs">Scroll Down</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-2 transition-transform duration-500 ease-in-out" />
            </a>
          </div>
        </div>
      </header>

      {/* Greetings Section */}
      <section id="greeting" className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative group order-2 md:order-1">
            <div className="absolute -inset-1 bg-gradient-to-tr from-gold-600 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-60 blur-xl transition-opacity duration-700" />
            <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/800/1000?grayscale" 
                alt="Office Atmosphere" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                <p className="font-serif text-gold-300 text-lg">Thank You</p>
                <p className="text-slate-300 text-sm mt-1">For your partnership</p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-10 order-1 md:order-2">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                年末のご挨拶
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-transparent" />
            </div>
            
            <div className="space-y-6 text-base md:text-lg text-slate-300 leading-loose font-light tracking-wide text-justify">
              <p>
                本年中は多大なるご厚情を賜り、誠にありがとうございました。
                皆様の温かいご支援のおかげで、私たちは多くの挑戦を乗り越え、
                技術革新という名の光を灯し続けることができました。
              </p>
              <p>
                2025年も、Lumina Innovationsは「想像を超える未来」を創造するため、
                社員一同、更なる高みを目指して邁進してまいります。
              </p>
              <p>
                皆様にとって、来る年が輝かしく、
                喜びに満ちた一年となりますよう心よりお祈り申し上げます。
              </p>
            </div>
            
            <div className="pt-8 flex items-center gap-6">
              <img src="https://picsum.photos/100/100" alt="CEO" className="w-16 h-16 rounded-full border border-gold-500/50 p-1 object-cover" />
              <div>
                <img className="h-8 opacity-80 mb-2 invert" src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" />
                <p className="text-gold-500 text-xs uppercase tracking-wider">Representative Director & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section (New!) */}
      <section className="py-32 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              Our Achievements <span className="text-gold-400">{currentYear}</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              本年リリースし、皆様のビジネスを変革した主要プロダクト
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md p-2 rounded-lg text-gold-300">
                    <product.icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <ExternalLink className="w-6 h-6 text-gold-400" />
                  </div>
                  
                  <div className="text-xs font-bold text-gold-500 tracking-wider uppercase mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-gold-200 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <h3 className="text-2xl font-serif text-white tracking-widest">LUMINA</h3>
             <p className="text-slate-500 text-xs mt-2 tracking-wide uppercase">Innovating for a brighter tomorrow.</p>
          </div>
          
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-gold-300 transition-colors">Corporate Site</a>
            <a href="#" className="hover:text-gold-300 transition-colors">Contact</a>
          </div>

          <div className="text-slate-600 text-xs">
            &copy; {currentYear} Lumina Innovations Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;