import React from 'react';
import Snowfall from './components/Snowfall';
import MusicPlayer from './components/MusicPlayer';
import GreetingGenerator from './components/GreetingGenerator';
import { Calendar, Gift, Star, ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-900 text-white relative selection:bg-gold-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black pointer-events-none z-[-1]" />
      <Snowfall />
      <MusicPlayer />

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="z-10 text-center space-y-8 animate-fade-in max-w-4xl mx-auto">
          <div className="inline-block p-2 border border-gold-500/30 rounded-full bg-slate-900/30 backdrop-blur-sm mb-4 animate-float">
            <span className="px-4 py-1 text-gold-300 text-sm tracking-widest uppercase">
              Season's Greetings {currentYear}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight drop-shadow-2xl">
            Lumina <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-300">Innovations</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-slate-300 max-w-2xl mx-auto font-sans">
            Reflecting on a year of brilliance and looking forward to a future shining bright.
          </p>

          <div className="pt-12">
            <a 
              href="#greeting"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 group"
            >
              <span className="uppercase tracking-widest text-sm">View Our Message</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </header>

      {/* CEO Message / Main Content */}
      <section id="greeting" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-gold-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-500" />
            <img 
              src="https://picsum.photos/600/800?grayscale" 
              alt="Holiday Atmosphere" 
              className="relative rounded-xl shadow-2xl w-full object-cover h-[500px]"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-md p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-gold-500/20 rounded-full text-gold-300">
                    <Star className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="font-serif text-lg text-white">Year in Review</h4>
                   <p className="text-sm text-gray-400">Celebrating our shared milestones</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Warm Wishes for a <br/>
              <span className="text-gold-300 font-script text-6xl block mt-2">Bright New Year</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
              <p>
                As the year draws to a close, we find ourselves reflecting on the journey we've shared. It has been a year of challenges met with resilience and milestones achieved through collaboration.
              </p>
              <p>
                We want to extend our deepest gratitude for your continued trust and partnership. You are the spark that ignites our innovation.
              </p>
              <p>
                May your holidays be filled with joy, peace, and time spent with loved ones. Here is to a prosperous and groundbreaking {currentYear + 1}.
              </p>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <img src="https://picsum.photos/100/100" alt="CEO" className="w-16 h-16 rounded-full border-2 border-gold-500 object-cover" />
              <div>
                <p className="font-serif text-lg text-white">Alexandra Sterling</p>
                <p className="text-gold-500 text-sm uppercase tracking-wider">Chief Executive Officer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Gallery */}
      <section className="py-24 bg-slate-800/30 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">Moments of Joy</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: "Annual Summit", img: "https://picsum.photos/400/300?random=1" },
              { icon: Gift, title: "Charity Gala", img: "https://picsum.photos/400/300?random=2" },
              { icon: Star, title: "Team Retreat", img: "https://picsum.photos/400/300?random=3" }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <item.icon className="w-8 h-8 text-gold-300 mb-2" />
                  <h3 className="font-serif text-xl text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Interactive Section */}
      <GreetingGenerator />

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
             <h3 className="text-2xl font-serif text-white">Lumina</h3>
             <p className="text-slate-500 text-sm mt-1">Illuminating the future.</p>
          </div>
          
          <div className="flex gap-8 text-slate-400 text-sm">
            <a href="#" className="hover:text-gold-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-300 transition-colors">Contact</a>
          </div>

          <div className="text-slate-600 text-sm">
            &copy; {currentYear} Lumina Innovations. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;