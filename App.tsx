import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Layers, 
  Box, 
  Zap, 
  Globe, 
  Code, 
  Smartphone, 
  Layout, 
  Shield, 
  Menu, 
  X,
  ChevronRight,
  Sun,
  Moon,
  Palette
} from 'lucide-react';

// --- Global Styles for Fonts ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
    
    :root {
      --font-heading: 'Manrope', sans-serif;
      --font-body: 'Inter', sans-serif;
    }
    
    .font-heading { font-family: var(--font-heading); }
    .font-body { font-family: var(--font-body); }
  `}</style>
);

// --- Theme Context ---
const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });

const useTheme = () => useContext(ThemeContext);

// --- Utility Components ---

const MagneticButton = ({ children, className = "", onClick, variant = "primary" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isDark } = useTheme();

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Styles adjusted for the new beige/warm palette
  const getStyles = () => {
    if (variant === "primary") {
      return isDark 
        ? "bg-[#E7E5E4] text-[#1C1917] hover:bg-white" 
        : "bg-[#1C1917] text-[#FAFAF9] hover:bg-[#44403C]"; // Dark button on light bg
    }
    return isDark 
      ? "border border-[#E7E5E4]/20 text-[#E7E5E4] hover:bg-[#E7E5E4]/10 backdrop-blur-md" 
      : "border border-[#1C1917]/10 text-[#1C1917] hover:bg-[#1C1917]/5 backdrop-blur-md";
  };

  return (
    <motion.button
      ref={ref}
      className={`${className} ${getStyles()} transition-colors duration-300 font-heading font-semibold tracking-tight`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
};

// --- Section Components ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-body
        ${scrolled 
          ? (isDark ? 'py-4 bg-[#1C1917]/80 backdrop-blur-xl border-b border-[#E7E5E4]/10' : 'py-4 bg-[#F3F0E7]/80 backdrop-blur-xl border-b border-[#1C1917]/5') 
          : 'py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-heading font-bold flex items-center gap-2 ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isDark ? 'bg-[#E7E5E4] text-[#1C1917]' : 'bg-[#1C1917] text-[#FAFAF9]'}`}>
              <Layers size={18} strokeWidth={2.5} />
            </div>
            Layr.plus
          </motion.div>

          <div className={`hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
            {['Product', 'Solutions', 'Resources', 'Pricing'].map((item) => (
              <a key={item} href="#" className={`transition-colors relative group ${isDark ? 'hover:text-[#E7E5E4]' : 'hover:text-[#1C1917]'}`}>
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isDark ? 'bg-[#E7E5E4]' : 'bg-[#1C1917]'}`} />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-[#E7E5E4]' : 'hover:bg-black/5 text-[#1C1917]'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <MagneticButton className="px-6 py-2 rounded-full text-sm">
              Get Started
            </MagneticButton>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'} onClick={() => setIsOpen(true)}>
              <Menu strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[60] flex flex-col items-center justify-center font-heading ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}
          >
            <button className="absolute top-8 right-8" onClick={() => setIsOpen(false)}>
              <X size={32} strokeWidth={2} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {['Product', 'Solutions', 'Resources', 'Pricing'].map((item) => (
                <a key={item} href="#" className="text-4xl font-bold hover:opacity-50 transition-opacity">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const { isDark } = useTheme();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <section className={`relative h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}>
      
      {/* Background Gradients - Warm/Organic Blurs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] blur-[150px] rounded-full transition-colors duration-700 opacity-50 ${isDark ? 'bg-orange-900/20' : 'bg-orange-100/60'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] blur-[150px] rounded-full transition-colors duration-700 opacity-50 ${isDark ? 'bg-rose-900/20' : 'bg-amber-100/60'}`} />
      
      {/* Organic Grain Texture */}
      <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none`} />

      <div className="container mx-auto px-6 relative z-10 pt-40">
        <motion.div style={{ y: y1, opacity }} className="max-w-5xl">
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-extrabold text-5xl md:text-7xl leading-[1.1] mb-8 tracking-tight"
          >
            Stack your <br />
            <span className={`${isDark ? 'text-[#D6D3D1]' : 'text-[#78716C]'}`}>
              Ambition.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`font-body text-lg md:text-xl max-w-lg leading-relaxed mb-10 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}
          >
            The comprehensive suite for modern builders. 
            Concept. Design. Code. Deploy. <br />
            One seamless flow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton className="px-10 py-5 flex items-center gap-3 text-lg rounded-full">
              Start Building <ArrowRight size={20} strokeWidth={2} />
            </MagneticButton>
            <MagneticButton variant="secondary" className="px-10 py-5 text-lg rounded-full">
              View Showreel
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Abstract Monolithic Layers - Stone/Paper Texture feel */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-10 right-0 w-[600px] h-[600px] hidden lg:block pointer-events-none"
        >
             {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotateX: 55, rotateZ: -40, z: -100 }}
                  animate={{ opacity: 1, rotateX: 55, rotateZ: -40, z: 0 }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.15) }}
                  className={`absolute top-1/2 left-1/2 w-[350px] h-[450px] border transition-colors duration-700 rounded-2xl
                    ${isDark 
                        ? 'border-[#E7E5E4]/10 bg-[#292524]/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
                        : 'border-[#1C1917]/5 bg-[#FDFBF7]/50 shadow-[0_20px_50px_rgba(28,25,23,0.05)]'
                    }`}
                  style={{
                    transform: `translate(-50%, -50%) translateZ(${i * 60}px) translateY(${i * -60}px)`,
                    zIndex: 3 - i,
                    backdropFilter: 'blur(8px)'
                  }}
                />
             ))}
        </motion.div>
      </div>
    </section>
  );
};

const ValueProp = () => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  return (
    <section ref={containerRef} className={`py-32 transition-colors duration-700 ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#FDFBF7] text-[#1C1917]'}`}>
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="font-heading text-3xl md:text-5xl mb-6 font-bold tracking-tight">
            The Complete Stack.
          </h2>
          <div className={`w-full h-px ${isDark ? 'bg-[#E7E5E4]/10' : 'bg-[#1C1917]/10'}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Box, title: "Concept", desc: "Wireframe & prototype at the speed of thought." },
            { icon: Layout, title: "Design", desc: "Design systems that scale automatically." },
            { icon: Code, title: "Develop", desc: "Export clean, production-ready React code." },
            { icon: Zap, title: "Deploy", desc: "One-click deployment to global edge networks." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group p-10 rounded-3xl border transition-all duration-500 cursor-pointer relative overflow-hidden font-body
                ${isDark 
                    ? 'bg-[#292524]/20 border-[#E7E5E4]/5 hover:bg-[#292524]/40 hover:border-[#E7E5E4]/10' 
                    : 'bg-white border-[#1C1917]/5 hover:border-[#1C1917]/10 hover:shadow-xl hover:shadow-[#1C1917]/5'
                }`}
            >
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500
                    ${isDark ? 'bg-[#E7E5E4]/5 text-[#E7E5E4] group-hover:bg-[#E7E5E4] group-hover:text-[#1C1917]' : 'bg-[#1C1917]/5 text-[#1C1917] group-hover:bg-[#1C1917] group-hover:text-[#FAFAF9]'}`}>
                  <item.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight font-heading">{item.title}</h3>
                <p className={`leading-relaxed font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StickyScroll = () => {
  const ref = useRef(null);
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    {
      title: "Real-time Collaboration",
      desc: "Work together with your team in real-time. See cursors, leave comments, and resolve conflicts instantly.",
      gradientDark: "from-[#D97706] to-[#B45309]", // Amber
      gradientLight: "from-[#FEF3C7] to-[#FDE68A]",
    },
    {
      title: "AI-Powered Assistance",
      desc: "Layr's AI understands your design system. Ask it to generate components or refactor layouts.",
      gradientDark: "from-[#BE123C] to-[#9F1239]", // Rose
      gradientLight: "from-[#FFE4E6] to-[#FECDD3]",
    },
    {
      title: "Universal Export",
      desc: "Don't get locked in. Export your project to React, Vue, Svelte, or plain HTML/CSS.",
      gradientDark: "from-[#0F766E] to-[#0D9488]", // Teal/Stone feel
      gradientLight: "from-[#CCFBF1] to-[#99F6E4]",
    }
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const cardIndex = Math.min(
        cards.length - 1,
        Math.floor(latest * cards.length)
      );
      setActiveCard(cardIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={ref} className={`h-[300vh] transition-colors duration-700 relative ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-20 items-center">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 z-10 font-body">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0.2,
                  y: activeCard === index ? 0 : 20,
                  filter: activeCard === index ? 'blur(0px)' : 'blur(2px)'
                }}
                className={`transition-all duration-500 ${activeCard === index ? 'block' : 'hidden md:block'}`}
              >
                <h3 className="font-heading text-4xl md:text-6xl mb-6 font-bold tracking-tight">
                  {card.title}
                </h3>
                <p className={`text-xl leading-relaxed max-w-md font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  {card.desc}
                </p>
                {activeCard === index && (
                  <div className={`mt-8 flex items-center gap-2 font-semibold cursor-pointer group ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}>
                    Learn more <ChevronRight strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
                <div className="h-20" /> {/* Spacer */}
              </motion.div>
            ))}
          </div>

          {/* Visual Content */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-center justify-center">
            {/* Soft Ambient Glow */}
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 transition-colors duration-700
                ${isDark ? 'bg-orange-500/10' : 'bg-orange-200/30'}`} />
            
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0,
                  scale: activeCard === index ? 1 : 0.9,
                  rotate: activeCard === index ? 0 : -6,
                  zIndex: activeCard === index ? 10 : 0
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-2xl p-4 transition-colors duration-700
                    ${isDark ? 'bg-[#292524]' : 'bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]'}`}
              >
                <div className={`w-full h-full rounded-xl flex items-center justify-center relative overflow-hidden transition-colors duration-500
                    ${isDark ? 'bg-[#1C1917]' : 'bg-[#FDFBF7]'}`}>
                  
                  {/* Grain Texture */}
                  <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  
                  {/* Organic Abstract Shape */}
                  <div className={`w-48 h-48 rounded-full blur-[80px] opacity-60 bg-gradient-to-r ${isDark ? card.gradientDark : card.gradientLight}`} />
                  
                  <div className={`relative z-10 font-heading text-9xl font-extrabold select-none ${isDark ? 'text-[#E7E5E4]/10' : 'text-[#1C1917]/5'}`}>
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const { isDark } = useTheme();

  const cardClass = isDark 
    ? "bg-[#1C1917] border-[#E7E5E4]/10" 
    : "bg-white border-[#1C1917]/5 shadow-sm";

  return (
    <section className={`py-32 transition-colors duration-700 ${isDark ? 'bg-[#0C0A09] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-heading text-3xl md:text-5xl mb-6 font-bold tracking-tight">
            Three powerful layers
          </h2>
          <p className={`font-body text-xl font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
            Each tool designed to excel at what it does best, together forming the complete stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          {/* Card 1: Logora */}
          <motion.a 
            href="http://logora.design/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 0.99 }}
            className={`md:col-span-2 md:row-span-2 rounded-3xl p-12 border relative overflow-hidden group transition-colors duration-500 block ${cardClass}`}
          >
             <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] transition-colors opacity-30
                ${isDark ? 'bg-orange-500/20' : 'bg-orange-200/50'}`} />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-[#E7E5E4]/10 text-[#E7E5E4]' : 'bg-[#1C1917]/5 text-[#1C1917]'}`}>
                  <Palette size={20} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-3xl mb-4 font-bold">Logora</h3>
                <p className={`max-w-md text-lg mb-8 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  AI-powered logo and brand identity design that scales.
                </p>
                <div className={`flex items-center gap-2 font-semibold cursor-pointer group w-fit ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}>
                   Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              <div className={`mt-10 w-full h-64 rounded-xl border overflow-hidden flex items-center justify-center relative
                  ${isDark ? 'bg-[#292524] border-[#E7E5E4]/5' : 'bg-[#FDFBF7] border-[#1C1917]/5'}`}>
                 <div className="grid grid-cols-4 gap-4 opacity-80">
                    {[...Array(8)].map((_, i) => (
                        <motion.div 
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-16 h-16 rounded-full ${isDark ? 'bg-[#E7E5E4]/5' : 'bg-[#1C1917]/5'}`}
                            style={{ 
                                backgroundColor: [
                                    '#9A3412', '#EA580C', '#F97316', '#FB923C', // Warm/Orange spectrum
                                    '#78350F', '#92400E', '#B45309', '#D97706'  // Brown/Amber spectrum
                                ][i] 
                            }} 
                        />
                    ))}
                 </div>
              </div>
            </div>
          </motion.a>

          {/* Card 2: Deckr */}
          <motion.a 
             href="http://deckr.design/"
             target="_blank"
             rel="noopener noreferrer"
             whileHover={{ scale: 0.99 }}
             className={`rounded-3xl p-10 border relative overflow-hidden group flex flex-col justify-between transition-colors duration-500 block ${cardClass}`}
          >
             <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-[#E7E5E4]/10 text-[#E7E5E4]' : 'bg-[#1C1917]/5 text-[#1C1917]'}`}>
                  <Layout size={20} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-2xl mb-2 font-bold">Deckr</h3>
                <p className={`text-sm mb-4 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  Create stunning decks with smart templates.
                </p>
                <div className={`flex items-center gap-2 font-semibold cursor-pointer group w-fit text-sm ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}>
                   Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </div>
             
             <div className="mt-8 flex justify-center relative">
                 <div className={`w-40 h-28 rounded shadow-lg absolute top-0 -right-4 rotate-6 opacity-40 ${isDark ? 'bg-[#44403C]' : 'bg-[#D6D3D1]'}`} />
                 <div className={`w-40 h-28 rounded shadow-lg absolute top-2 -right-2 rotate-3 opacity-70 ${isDark ? 'bg-[#57534E]' : 'bg-[#E7E5E4]'}`} />
                 <div className={`w-40 h-28 rounded shadow-xl relative z-10 flex flex-col p-4 ${isDark ? 'bg-[#292524] border border-[#E7E5E4]/10' : 'bg-white border border-[#1C1917]/10'}`}>
                     <div className={`w-8 h-2 rounded-full mb-3 ${isDark ? 'bg-[#E7E5E4]/20' : 'bg-[#1C1917]/10'}`} />
                     <div className={`w-full h-12 rounded mb-3 ${isDark ? 'bg-[#E7E5E4]/10' : 'bg-[#1C1917]/5'}`} />
                 </div>
             </div>
          </motion.a>

          {/* Card 3: Buidl */}
          <motion.a 
             href="https://buidl.design/"
             target="_blank"
             rel="noopener noreferrer"
             whileHover={{ scale: 0.99 }}
             className={`md:col-span-1 rounded-3xl p-10 border relative overflow-hidden group transition-colors duration-500 block ${cardClass}`}
          >
             <div className={`absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px] transition-colors opacity-30
                 ${isDark ? 'bg-rose-500/20' : 'bg-rose-200/50'}`} />
             <div className="relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-[#E7E5E4]/10 text-[#E7E5E4]' : 'bg-[#1C1917]/5 text-[#1C1917]'}`}>
                  <Code size={20} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-2xl mb-2 font-bold">Buidl</h3>
                <p className={`text-sm mb-4 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  Build and deploy apps fast.
                </p>
                <div className={`flex items-center gap-2 font-semibold cursor-pointer group w-fit text-sm ${isDark ? 'text-[#E7E5E4]' : 'text-[#1C1917]'}`}>
                   Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                
                <div className={`mt-8 p-3 rounded font-mono text-xs flex items-center gap-2 w-fit
                    ${isDark ? 'bg-[#1C1917] border border-[#E7E5E4]/10 text-emerald-500' : 'bg-white border border-[#1C1917]/10 text-emerald-700'}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Deployed
                </div>
             </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const { isDark } = useTheme();
  return (
    <section className={`py-32 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#1C1917] text-[#E7E5E4]' : 'bg-[#F3F0E7] text-[#1C1917]'}`}>
      <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-orange-900/10' : 'from-orange-50/50'} to-transparent`} />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <h2 className="font-heading text-5xl md:text-7xl mb-8 font-extrabold tracking-tight">
              Start building <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-[#E7E5E4] to-[#A8A29E]' : 'from-[#1C1917] to-[#78716C]'}`}>
                the future.
              </span>
            </h2>
            <p className={`text-xl mb-12 max-w-2xl mx-auto font-normal font-body ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
              Join 50,000+ creators who are shipping faster with Layr.plus. 
              No credit card required for the free tier.
            </p>
            
            <div className="flex justify-center">
              <MagneticButton className="px-12 py-5 rounded-full text-lg font-semibold">
                Get Started for Free
              </MagneticButton>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { isDark } = useTheme();
  return (
    <footer className={`py-20 border-t transition-colors duration-700 font-body ${isDark ? 'bg-[#0C0A09] text-[#E7E5E4] border-[#E7E5E4]/5' : 'bg-[#FDFBF7] text-[#1C1917] border-[#1C1917]/5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <div className="mb-10 md:mb-0">
            <div className="flex items-center gap-2 text-2xl font-heading font-bold mb-6">
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isDark ? 'bg-[#E7E5E4] text-[#1C1917]' : 'bg-[#1C1917] text-[#FAFAF9]'}`}>
                <Layers size={18} strokeWidth={2.5} />
              </div>
              Layr.plus
            </div>
            <p className={`max-w-xs font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
              All the layers you need to build. <br/>
              San Francisco, CA.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            {[
              { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
              { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-6 tracking-wide text-sm uppercase">{col.title}</h4>
                <ul className={`space-y-4 font-normal ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  {col.links.map((link) => (
                    <li key={link} className={`cursor-pointer transition-colors ${isDark ? 'hover:text-[#E7E5E4]' : 'hover:text-[#1C1917]'}`}>
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`flex flex-col md:flex-row justify-between items-center text-sm font-normal pt-8 border-t ${isDark ? 'border-[#E7E5E4]/5 text-[#78716C]' : 'border-[#1C1917]/5 text-[#A8A29E]'}`}>
          <p>© 2024 Layr.plus Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {['Twitter', 'GitHub', 'Discord'].map(social => (
                <a key={social} href="#" className={`transition-colors ${isDark ? 'hover:text-[#E7E5E4]' : 'hover:text-[#1C1917]'}`}>{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Custom Cursor ---
const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
             if (['BUTTON', 'A', 'INPUT'].includes(e.target.tagName) || e.target.closest('button')) {
                 setIsHovering(true);
             } else {
                 setIsHovering(false);
             }
        }

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference bg-[#E7E5E4]`}
            animate={{
                x: mousePosition.x - (isHovering ? 16 : 8),
                y: mousePosition.y - (isHovering ? 16 : 8),
                scale: isHovering ? 3 : 1
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1
            }}
        />
    );
};

// --- Main App Component ---

const App = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <GlobalStyles />
      <div className={`min-h-screen font-body selection:bg-[#D97706] selection:text-white transition-colors duration-700 ${isDark ? 'bg-[#1C1917]' : 'bg-[#F3F0E7]'}`}>
        <Cursor />
        <Navigation />
        <main>
          <Hero />
          <ValueProp />
          <StickyScroll />
          <BentoGrid />
          <CTA />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
