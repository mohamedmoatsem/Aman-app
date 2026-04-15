import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DURATIONS = [25000, 30000, 35000, 30000];

const Act1Problem = () => {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 9000),
      setTimeout(() => setPhase(4), 14000),
      setTimeout(() => setPhase(5), 19000),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      key="act1"
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#050810]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background noise and drifting particles */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #1a2035 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="z-10 text-center px-8">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
        >
          أزمة صامتة
        </motion.h1>

        <motion.p
          className="text-2xl md:text-4xl text-gray-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          في السودان والعالم العربي
        </motion.p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {['قلق', 'اكتئاب', 'صدمات', 'صعوبة الوصول للرعاية'].map((word, i) => (
            <motion.div
              key={word}
              className="px-6 py-3 border border-red-500/30 rounded-full text-xl text-red-200 bg-red-900/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.5, duration: 0.8 }}
            >
              {word}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Act2Solution = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 6000),
      setTimeout(() => setPhase(3), 12000),
      setTimeout(() => setPhase(4), 18000),
      setTimeout(() => setPhase(5), 24000),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      key="act2"
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0F1E]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)',
          filter: 'blur(100px)',
        }}
        animate={{ rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      
      <div className="z-10 text-center px-8 w-full max-w-4xl">
        <motion.div
          className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#10B981] mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          أمان 🌿
        </motion.div>
        <motion.p
          className="text-3xl text-white/80 mb-16"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          مساحتك الآمنة، في جيبك دايماً
        </motion.p>

        <div className="grid grid-cols-2 gap-8 text-right">
          {[
            { title: 'مساعد ذكي', desc: 'باللهجة السودانية' },
            { title: 'ركن الطوارئ', desc: 'للتدخل السريع' },
            { title: 'تدخلات ذكية', desc: 'في الوقت المناسب (JITAI)' },
            { title: 'تتبع المزاج', desc: 'لفهم مشاعرك' }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, x: -30 }}
              animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: i * 0.8, duration: 1 }}
            >
              <h3 className="text-2xl font-bold text-[#0EA5E9] mb-2">{feature.title}</h3>
              <p className="text-xl text-white/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Act3Features = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 8000),
      setTimeout(() => setPhase(3), 16000),
      setTimeout(() => setPhase(4), 24000),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const features = [
    { icon: '🌿', title: 'ذكاء اصطناعي محلي', desc: 'يتحدث بلهجتك، يفهم ثقافتك، ويدرك سياقك.' },
    { icon: '🆘', title: 'تمارين TIPP للطوارئ', desc: 'تدخلات سريعة لخفض التوتر الحاد فوراً.' },
    { icon: '🧠', title: 'صندوق القلق MCT', desc: 'أداة علاجية لتأجيل القلق وتفريغ الأفكار.' },
    { icon: '📊', title: 'نظام التوقيت الذكي', desc: 'اكتشاف انخفاض المزاج وتقديم الدعم استباقياً.' },
  ];

  return (
    <motion.div
      key="act3"
      className="absolute inset-0 flex items-center justify-center bg-[#0A0F1E]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full max-w-5xl px-8 relative h-[600px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase >= 1 && phase < 5 && (
            <motion.div
              key={phase}
              className="absolute w-full max-w-2xl bg-gradient-to-br from-[#0EA5E9]/20 to-[#10B981]/20 p-12 rounded-3xl border border-white/20 backdrop-blur-md text-center"
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -40, rotateX: -20 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-8xl mb-8">{features[phase - 1]?.icon}</div>
              <h2 className="text-4xl font-bold text-white mb-6">{features[phase - 1]?.title}</h2>
              <p className="text-2xl text-white/80 leading-relaxed">{features[phase - 1]?.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Act4Impact = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 6000),
      setTimeout(() => setPhase(3), 12000),
      setTimeout(() => setPhase(4), 18000),
      setTimeout(() => setPhase(5), 24000),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      key="act4"
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0F1E]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="grid grid-cols-2 gap-12 max-w-4xl w-full text-center px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="p-8 border border-[#0EA5E9]/30 rounded-3xl bg-[#0EA5E9]/5"
        >
          <div className="text-6xl font-black text-[#0EA5E9] mb-4">+10,000</div>
          <div className="text-xl text-white/80">مستخدم في العام الأول</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="p-8 border border-[#10B981]/30 rounded-3xl bg-[#10B981]/5"
        >
          <div className="text-6xl font-black text-[#10B981] mb-4">40%</div>
          <div className="text-xl text-white/80">انخفاض في تصعيد الأزمات</div>
        </motion.div>
      </div>

      <motion.div
        className="flex gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      >
        <div className="px-6 py-3 rounded-full bg-white/10 text-white text-xl">وصول 24/7</div>
        <div className="px-6 py-3 rounded-full bg-white/10 text-white text-xl">مجاني تماماً</div>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.5 }}
      >
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#10B981] mb-6">
          أمان 🌿
        </div>
        <div className="text-3xl text-white/90">مساحتك الآمنة، في جيبك دايماً</div>
      </motion.div>
    </motion.div>
  );
};

export default function AmanVideo() {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    // Inject Noto Sans Arabic globally if not present
    if (!document.getElementById('noto-sans-arabic')) {
      const link = document.createElement('link');
      link.id = 'noto-sans-arabic';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const advanceScene = () => {
      setCurrentScene((prev) => (prev + 1) % 4);
      timer = setTimeout(advanceScene, DURATIONS[(currentScene + 1) % 4]);
    };
    
    timer = setTimeout(advanceScene, DURATIONS[currentScene]);
    return () => clearTimeout(timer);
  }, [currentScene]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[#0A0F1E]"
      dir="rtl"
      style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
    >
      <AnimatePresence mode="wait">
        {currentScene === 0 && <Act1Problem key="scene0" />}
        {currentScene === 1 && <Act2Solution key="scene1" />}
        {currentScene === 2 && <Act3Features key="scene2" />}
        {currentScene === 3 && <Act4Impact key="scene3" />}
      </AnimatePresence>
    </div>
  );
}
