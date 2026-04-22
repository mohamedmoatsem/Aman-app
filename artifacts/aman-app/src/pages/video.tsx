import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// توقيتات المشاهد (بالملي ثانية)
const DURATIONS = [25000, 30000, 35000, 35000];

const CONTENT = {
  act1: {
    title: { ar: 'أزمة صامتة', en: 'A Silent Crisis' },
    subtitle: { ar: 'في السودان والعالم العربي', en: 'Across Sudan and the Arab world' },
    tags: [
      { ar: 'قلق', en: 'Anxiety' },
      { ar: 'اكتئاب', en: 'Depression' },
      { ar: 'صدمات', en: 'Trauma' },
      { ar: 'صعوبة الوصول للرعاية', en: 'Limited access to care' },
    ],
  },
  act2: {
    brand: { ar: 'أمان 🌿', en: 'Aman 🌿' },
    tagline: {
      ar: 'مساحتك الآمنة، في جيبك دايماً',
      en: 'Your safe space, always in your pocket',
    },
    features: [
      { title: { ar: 'مساعد ذكي', en: 'AI Assistant' }, desc: { ar: 'باللهجة السودانية', en: 'In Sudanese Arabic' } },
      { title: { ar: 'ركن الطوارئ', en: 'Emergency Corner' }, desc: { ar: 'للتدخل السريع', en: 'For fast support' } },
      { title: { ar: 'تدخلات ذكية', en: 'Smart Interventions' }, desc: { ar: 'في الوقت المناسب (JITAI)', en: 'At the right time (JITAI)' } },
      { title: { ar: 'تتبع المزاج', en: 'Mood Tracking' }, desc: { ar: 'لفهم مشاعرك', en: 'To better understand your feelings' } },
    ],
  },
  act3: {
    features: [
      {
        icon: '🌿',
        title: { ar: 'ذكاء اصطناعي محلي', en: 'Localized AI' },
        desc: {
          ar: 'يتحدث بلهجتك، يفهم ثقافتك، ويدرك سياقك.',
          en: 'Speaks your dialect, understands your culture, and respects your context.',
        },
      },
      {
        icon: '🆘',
        title: { ar: 'تمارين TIPP للطوارئ', en: 'Emergency TIPP Exercises' },
        desc: {
          ar: 'تدخلات سريعة لخفض التوتر الحاد فوراً.',
          en: 'Fast interventions to reduce acute distress immediately.',
        },
      },
      {
        icon: '🧠',
        title: { ar: 'صندوق القلق MCT', en: 'MCT Worry Box' },
        desc: {
          ar: 'أداة علاجية لتأجيل القلق وتفريغ الأفكار.',
          en: 'A therapeutic tool to postpone worry and unload racing thoughts.',
        },
      },
      {
        icon: '📊',
        title: { ar: 'نظام التوقيت الذكي', en: 'Smart Timing System' },
        desc: {
          ar: 'اكتشاف انخفاض المزاج وتقديم الدعم استباقياً.',
          en: 'Detects mood drops and offers proactive support.',
        },
      },
    ],
  },
  act4: {
    stat1: { value: '+10,000', ar: 'مستخدم في العام الأول', en: 'Users in year one' },
    stat2: { value: '40%', ar: 'انخفاض في تصعيد الأزمات', en: 'Reduction in crisis escalation' },
    chips: [
      { ar: 'وصول 24/7', en: '24/7 access' },
      { ar: 'مجاني تماماً', en: 'Completely free' },
    ],
    brand: { ar: 'أمان 🌿', en: 'Aman 🌿' },
    tagline: {
      ar: 'مساحتك الآمنة، في جيبك دايماً',
      en: 'Your safe space, always in your pocket',
    },
    credit: {
      ar: 'تم التطوير بمساعدة تقنيات Google & Gemma 4',
      en: 'Built with the support of Google & Gemma 4 technology'
    }
  },
};

const EnglishText = ({ children, className = '' }) => (
  <div
    dir="ltr"
    className={`font-medium tracking-wide text-white/75 ${className}`}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    {children}
  </div>
);

const BilingualText = ({ ar, en, arClassName = '', enClassName = '', wrapperClassName = '', as = 'div' }) => {
  const Tag = as;
  return (
    <div className={wrapperClassName}>
      <Tag className={arClassName}>{ar}</Tag>
      <EnglishText className={enClassName}>{en}</EnglishText>
    </div>
  );
};

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
      <div className="z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        >
          <BilingualText
            ar={CONTENT.act1.title.ar}
            en={CONTENT.act1.title.en}
            as="h1"
            arClassName="text-5xl md:text-7xl font-bold text-white mb-3"
            enClassName="text-xl md:text-3xl mb-8"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          <BilingualText
            ar={CONTENT.act1.subtitle.ar}
            en={CONTENT.act1.subtitle.en}
            arClassName="text-2xl md:text-4xl text-gray-300 mb-2"
            enClassName="text-lg md:text-2xl mb-6 text-gray-400"
          />
        </motion.div>
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {CONTENT.act1.tags.map((item, i) => (
            <motion.div
              key={item.ar}
              className="px-6 py-4 border border-red-500/30 rounded-2xl text-xl text-red-200 bg-red-900/10 min-w-[180px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.5, duration: 0.8 }}
            >
              <div className="text-2xl mb-2">{item.ar}</div>
              <EnglishText className="text-sm md:text-base text-red-100/70">{item.en}</EnglishText>
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
      <div className="z-10 text-center px-8 w-full max-w-4xl">
        <motion.div
          className="mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        >
          <BilingualText
            ar={CONTENT.act2.brand.ar}
            en={CONTENT.act2.brand.en}
            arClassName="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#10B981] mb-2"
            enClassName="text-2xl md:text-3xl mb-4"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        >
          <BilingualText
            ar={CONTENT.act2.tagline.ar}
            en={CONTENT.act2.tagline.en}
            arClassName="text-3xl text-white/80 mb-3"
            enClassName="text-lg md:text-2xl mb-16"
          />
        </motion.div>
        <div className="grid grid-cols-2 gap-8 text-right">
          {CONTENT.act2.features.map((feature, i) => (
            <motion.div
              key={feature.title.ar}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, x: -30 }}
              animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: i * 0.8, duration: 1 }}
            >
              <h3 className="text-2xl font-bold text-[#0EA5E9] mb-1">{feature.title.ar}</h3>
              <EnglishText className="text-sm md:text-base mb-3 text-[#7DD3FC]">{feature.title.en}</EnglishText>
              <p className="text-xl text-white/70 mb-1">{feature.desc.ar}</p>
              <EnglishText className="text-sm md:text-base text-white/55">{feature.desc.en}</EnglishText>
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
          {phase >= 1 && phase <= 4 && (
            <motion.div
              key={phase}
              className="absolute w-full max-w-2xl bg-gradient-to-br from-[#0EA5E9]/20 to-[#10B981]/20 p-12 rounded-3xl border border-white/20 backdrop-blur-md text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
            >
              <div className="text-8xl mb-8">{CONTENT.act3.features[phase - 1]?.icon}</div>
              <h2 className="text-4xl font-bold text-white mb-2">{CONTENT.act3.features[phase - 1]?.title.ar}</h2>
              <EnglishText className="text-lg md:text-xl mb-6 text-[#BAE6FD]">{CONTENT.act3.features[phase - 1]?.title.en}</EnglishText>
              <p className="text-2xl text-white/80 leading-relaxed mb-3">{CONTENT.act3.features[phase - 1]?.desc.ar}</p>
              <EnglishText className="text-base md:text-lg text-white/65">{CONTENT.act3.features[phase - 1]?.desc.en}</EnglishText>
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
          className="p-8 border border-[#0EA5E9]/30 rounded-3xl bg-[#0EA5E9]/5"
        >
          <div className="text-6xl font-black text-[#0EA5E9] mb-4">{CONTENT.act4.stat1.value}</div>
          <div className="text-xl text-white/80 mb-2">{CONTENT.act4.stat1.ar}</div>
          <EnglishText className="text-sm md:text-base">{CONTENT.act4.stat1.en}</EnglishText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          className="p-8 border border-[#10B981]/30 rounded-3xl bg-[#10B981]/5"
        >
          <div className="text-6xl font-black text-[#10B981] mb-4">{CONTENT.act4.stat2.value}</div>
          <div className="text-xl text-white/80 mb-2">{CONTENT.act4.stat2.ar}</div>
          <EnglishText className="text-sm md:text-base">{CONTENT.act4.stat2.en}</EnglishText>
        </motion.div>
      </div>

      <motion.div
        className="flex gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      >
        {CONTENT.act4.chips.map((chip) => (
          <div key={chip.ar} className="px-6 py-4 rounded-2xl bg-white/10 text-white text-xl text-center min-w-[180px]">
            <div>{chip.ar}</div>
            <EnglishText className="text-sm md:text-base mt-2">{chip.en}</EnglishText>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.5 }}
      >
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#10B981] mb-2">
          {CONTENT.act4.brand.ar}
        </div>
        <EnglishText className="text-xl md:text-3xl mb-6">{CONTENT.act4.brand.en}</EnglishText>
        <div className="text-3xl text-white/90 mb-2">{CONTENT.act4.tagline.ar}</div>
        <EnglishText className="text-lg md:text-2xl mb-12">{CONTENT.act4.tagline.en}</EnglishText>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={phase >= 5 ? { opacity: 1 } : { opacity: 0 }}
          className="mt-8 p-4 border-t border-white/10"
        >
          <p className="text-gray-400 text-sm mb-1">تم التطوير بمساعدة تقنيات</p>
          <p className="text-white font-bold tracking-widest text-lg">Google & Gemma 4</p>
          <EnglishText className="text-xs text-gray-500 mt-1">{CONTENT.act4.credit.en}</EnglishText>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function AmanVideo() {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    if (!document.getElementById('aman-bilingual-fonts')) {
      const link = document.createElement('link');
      link.id = 'aman-bilingual-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Noto+Sans+Arabic:wght@400;700;900&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCurrentScene((prev) => (prev + 1) % 4);
    }, DURATIONS[currentScene]);
    return () => clearTimeout(timer);
  }, [currentScene]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[#0A0F1E]"
      dir="rtl"
      style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}
    >
      <audio src="/music.mp3" autoPlay loop />
      <AnimatePresence mode="wait">
        {currentScene === 0 && <Act1Problem key="scene0" />}
        {currentScene === 1 && <Act2Solution key="scene1" />}
        {currentScene === 2 && <Act3Features key="scene2" />}
        {currentScene === 3 && <Act4Impact key="scene3" />}
      </AnimatePresence>
    </div>
  );
}
