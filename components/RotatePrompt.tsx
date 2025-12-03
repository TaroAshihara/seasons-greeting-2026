import React from 'react';
import { Smartphone } from 'lucide-react';

const RotatePrompt: React.FC = () => {
  return (
    // portrait:flex -> 縦向きの時は表示 (flex)
    // landscape:hidden -> 横向きの時は非表示
    // md:hidden -> タブレット/PCサイズ以上では表示しない（スマホのみ対象）
    <div className="fixed inset-0 z-[1000] bg-black text-white hidden portrait:flex md:hidden flex-col items-center justify-center p-8 text-center">
      
      {/* 回転アニメーションするスマホアイコン */}
      <div className="relative mb-8">
        <Smartphone 
          className="w-16 h-16 text-white/80 animate-[spin_3s_ease-in-out_infinite]" 
          strokeWidth={1.5}
        />
        {/* 回転の矢印などをCSSで表現しても良いですが、
            シンプルにアイコン自体を回すか、あるいは以下のように「横向き」アイコンへの遷移を表現します */}
      </div>

      <div className="space-y-4 animate-pulse">
        <h3 className="text-xl font-serif tracking-widest text-gold-300">
          PLEASE ROTATE
        </h3>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          このサイトは横画面で最適化されています。<br/>
          端末を横にしてお楽しみください。<br/>
          PCブラウザは全画面表示でご覧ください。
        </p>
      </div>

      {/* アニメーション用のスタイル調整（Tailwindの設定外の動きが必要な場合） */}
      <style>{`
        @keyframes rotate-phone {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(90deg); }
          75% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default RotatePrompt;