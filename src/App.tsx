import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, MonitorPlay, Layers, Sparkles, Quote, Instagram, Send, X } from 'lucide-react';

const VideoCard = ({ video, idx, isShort }: { video: any, idx: number, isShort?: boolean, key?: any }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isLocal = video.id.endsWith('.mp4');
  const isInstagram = video.type === 'instagram';

  return (
    <motion.div
      onMouseEnter={(e) => {
        setIsHovered(true);
        const iframe = e.currentTarget.querySelector('iframe');
        if (iframe) {
          iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
          iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
        const v = e.currentTarget.querySelector('video');
        if (v) {
          v.muted = false;
          v.play().catch(() => { });
        }
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        const iframe = e.currentTarget.querySelector('iframe');
        if (iframe) {
          iframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
          iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
        const v = e.currentTarget.querySelector('video');
        if (v) {
          v.pause();
          v.currentTime = 0;
          v.muted = true;
        }
      }}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
      className={`relative ${isShort ? 'aspect-[9/16]' : 'aspect-video'} rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(59,82,217,0.15)] border-[8px] border-white hover:border-zinc-50 transition-colors duration-500 group cursor-pointer`}
    >
      <div className={`absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none group-hover:bg-transparent transition-colors duration-700 z-10 ${isHovered ? 'hidden' : ''}`}></div>
      {isLocal ? (
        <video
          className={`absolute inset-0 w-full h-full ${isShort ? 'object-contain bg-black' : 'object-cover'} relative z-0`}
          src={`/${video.id}`}
          muted
          loop
          playsInline
        />
      ) : isInstagram ? (
        <iframe
          className="absolute inset-0 w-full h-full relative z-0"
          src={`https://www.instagram.com/reels/${video.id}/embed`}
          title={video.title}
          allowFullScreen>
        </iframe>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full relative z-0"
          src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&rel=0&modestbranding=1&controls=0&showinfo=0&playlist=${video.id}&loop=1&mute=1&autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen>
        </iframe>
      )}
      {!isInstagram && (
        <div className={`absolute inset-0 z-20 pointer-events-none bg-black/10 group-hover:bg-transparent transition-all duration-500 flex items-center justify-center ${isHovered ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}>
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
            <MonitorPlay className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'motion' | 'video'>('motion');
  const [activeSubCategory, setActiveSubCategory] = useState<'short' | 'long'>('long');

  const portfolioData = {
    motion: {
      short: [
        { id: "my-short1.mp4", title: "Premium Motion Short" },
        { id: "my-short2.mp4", title: "Premium Motion Short 2" },
      ],
      long: [
        { id: "y_ZSTHMi1rs", title: "Dynamic Motion Showcase" },
        { id: "bk4zZmtV9jA", title: "Complex Visual Elements" },
        { id: "pHtGQzevNts", title: "High-Impact Animation" },
      ]
    },
    video: {
      short: [
        { id: "zMOcQpYH6QI", title: "High-Impact Short" },
        { id: "J7FkQhbWxwk", title: "Dynamic Visual Edit" },
        { id: "my-short3.mp4", title: "Dynamic Visual Edit" },
      ],
      long: [
        { id: "YsiKbj7eoH0", title: "Cinematic Long-form Showcase" },
      ]
    }
  };

  const currentVideos = portfolioData[activeCategory][activeSubCategory];

  return (
    <div className="min-h-screen w-full overflow-x-hidden selection:bg-primary selection:text-white bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-white">

        {/* Background "PORTFOLIO" Outline */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 w-full px-4 md:px-12">
          <div className="relative w-full flex justify-center">
            {/* "My" Brush Text */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20, rotate: -25 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -top-[15%] left-[5%] md:-top-[25%] md:left-[12%] z-40"
            >
              <span className="font-marker text-[25vw] md:text-[14vw] lg:text-[160px] xl:text-[200px] text-dark drop-shadow-md block leading-none">My</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[22vw] md:text-[16vw] lg:text-[180px] xl:text-[240px] font-display font-medium text-outline-thin leading-none uppercase tracking-tighter select-none w-full text-center"
            >
              Portfolio
            </motion.h1>
          </div>
        </div>

        {/* Background "Akshit" Brush Text */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -15 }}
          animate={{ opacity: 0.07, x: 0, rotate: -5 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-[2%] md:bottom-[5%] left-[2%] md:left-[10%] z-0 pointer-events-none"
        >
          <span className="font-marker text-[18vw] md:text-[12vw] lg:text-[140px] xl:text-[180px] text-zinc-900 block leading-none whitespace-nowrap">Maatoori Akshith</span>
        </motion.div>

        <div className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center pointer-events-none">
          {/* Person Image (Blended to look transparent) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 h-[70%] md:h-[85%] w-full flex items-end justify-center pointer-events-none"
          >
            <div className="h-full relative flex items-end justify-center">
              <img
                src="/hero-person.png"
                alt="Maatoori Akshith"
                className="h-full w-auto object-contain object-bottom mix-blend-multiply opacity-95 transition-all duration-300"
                style={{ maskImage: 'linear-gradient(to top, transparent 0%, black 15%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)' }}
              />
            </div>
          </motion.div>

          {/* Name Text on the Right */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="absolute right-[5%] md:right-[10%] bottom-[15%] md:bottom-[25%] z-30 text-left max-w-[200px] md:max-w-xs pointer-events-auto"
          >
            <h3 className="text-xl md:text-3xl lg:text-4xl font-sans font-light text-zinc-800 leading-[1.1] mb-2 tracking-tight">
              <span className="font-medium text-dark block md:inline">Maatoori</span> <span className="font-medium text-primary block md:inline">Akshith</span>
            </h3>
            <p className="text-[10px] md:text-[11px] font-sans text-zinc-500 uppercase tracking-widest leading-relaxed">
              Video Editor | Motion Graphics <br className="hidden md:block" />
              AI Tools Enthusiast | Passionate Learner
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, scale: 0.98, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 md:py-32 px-6 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="flex flex-col items-start max-w-5xl mx-auto relative pt-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-light mb-2 text-zinc-800 tracking-wide"
          >
            My Name is <span className="text-primary font-medium">Akshith</span> and I am a Freelance
          </motion.h3>

          <div className="relative w-full">
            {/* Main Word Container aligned to start from the last letter */}
            <div className="relative inline-block">
              {/* Huge Main Word */}
              <motion.h4
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-[26vw] md:text-[22vw] lg:text-[240px] xl:text-[280px] font-display font-black text-[#383838] leading-[0.8] tracking-tighter -ml-2 select-none"
              >
                Video
              </motion.h4>

              {/* Overlapping Script Word starting directly on the last letter */}
              <motion.span
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: -7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute top-[40%] md:top-[30%] left-[75%] md:left-[80%] font-marker text-[24vw] md:text-[24vw] lg:text-[240px] xl:text-[300px] text-primary drop-shadow-[0_4px_8px_rgba(59,82,217,0.2)] z-20 leading-none select-none"
              >
                editor.
              </motion.span>
            </div>

            {/* About Me Text underneath the big word */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-6 md:mt-8 w-full md:max-w-md z-30 relative"
            >
              <p className="text-dark font-normal mb-2 text-lg">About <span className="text-primary font-medium">Me</span></p>
              <p className="text-zinc-700 leading-[1.8] text-sm font-light text-justify">
                I am a video editor with confidence in my abilities and the capacity to work effectively under tight deadlines. My passion lies in creating social media visuals, motion graphics, and video editing projects. Each day, I strive to push the boundaries of my creativity and deliver outstanding cinematic results.
              </p>
            </motion.div>


          </div>
        </div>
      </motion.section>

      {/* Experience & Skills Section */}
      {/* Experience & Skills Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative py-24 md:py-40 bg-white px-6 border-y border-zinc-100 overflow-hidden"
      >
        {/* Background Image Layer (Matching Contact Section Vibe) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/experience-bg.jpg"
            alt="Experience Background"
            className="w-full h-full object-cover md:object-[50%_40%] opacity-80 grayscale"
          />
          {/* Subtle gradient overlays to blend edges and protect text legibility */}
          <div className="absolute inset-y-0 left-0 w-1/2 md:w-1/3 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-zinc-50 opacity-90 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-50 via-zinc-50/50 to-transparent pointer-events-none"></div>
        </div>

        {/* Soft Ambient Background Orbs */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply z-0"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply z-0"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">

          {/* Left Column: Massive Title Area */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-7xl font-sans font-black text-dark tracking-tighter uppercase mb-6 leading-[0.9] break-words"
            >
              Experience<span className="text-primary">.</span>
            </motion.h2>
            <p className="text-zinc-800 text-sm md:text-base font-medium leading-relaxed mb-12 max-w-sm drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              A comprehensive timeline of my professional journey, highlighting my core competencies and the specialized software tools I use to bring cinematic visions to life.
            </p>

            {/* Personal Info Box (Elevated White Card) */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 mt-auto hover:border-primary/30 transition-colors duration-500 shadow-sm hover:shadow-xl group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

              <h5 className="text-sm uppercase tracking-widest font-bold text-dark mb-6 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-primary group-hover:w-10 transition-all duration-300"></span> Personal Info
              </h5>
              <div className="space-y-5 text-sm">
                <div className="flex justify-between border-b border-zinc-100 pb-3">
                  <span className="text-zinc-500 font-medium">Name</span>
                  <span className="font-bold text-dark text-right">Maatoori Akshith</span>
                </div>
                <div className="flex justify-between border-b border-zinc-100 pb-3">
                  <span className="text-zinc-500 font-medium">Vocation</span>
                  <span className="font-bold text-dark text-right">Video Editor</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-zinc-500 font-medium">Email</span>
                  <a href="mailto:akshithhh1904@gmail.com" className="font-bold text-primary hover:text-dark transition-colors text-right break-all ml-4">akshithhh1904@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

            {/* Timeline Column */}
            <div className="flex flex-col gap-12">
              <div>
                <h4 className="text-2xl font-bold font-sans text-dark mb-8 flex items-center gap-4 uppercase tracking-wide">
                  <span className="w-8 h-[2px] bg-primary"></span> History
                </h4>

                <div className="space-y-12 border-l-2 border-zinc-100 ml-2 pl-8 relative">
                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[41px] top-1 ring-4 ring-zinc-50 group-hover:scale-125 transition-all duration-300 shadow-sm"></div>
                    <span className="text-[11px] font-black tracking-widest uppercase text-white mb-2 block drop-shadow-md">1.5 years</span>
                    <h6 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors drop-shadow-md">Freelance Video Editor & Motion Graphics Designer</h6>
                    <p className="text-sm font-bold text-white mb-4 drop-shadow-md">Self-Employed</p>
                    <ul className="text-sm text-white/90 space-y-2 font-medium list-disc pl-4 group-hover:text-white transition-colors drop-shadow-md">
                      <li>Collaborated with diverse clients across tech and creator industries.</li>
                      <li>Delivered engaging content maintaining strict brand quality.</li>
                    </ul>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative group">
                    <div className="absolute w-4 h-4 bg-zinc-300 rounded-full -left-[41px] top-1 ring-4 ring-zinc-50 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 shadow-sm"></div>
                    <span className="text-[11px] font-black tracking-widest uppercase text-white/80 group-hover:text-white transition-colors mb-2 block drop-shadow-md">2026 jan - 2026 march</span>
                    <h6 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors drop-shadow-md">Video Editor Intern</h6>
                    <p className="text-sm font-bold text-white mb-4 drop-shadow-md">KANMA Media</p>
                    <ul className="text-sm text-white/90 space-y-2 font-medium list-disc pl-4 group-hover:text-white transition-colors drop-shadow-md">
                      <li>Spearheaded post-production for high-impact social media campaigns and commercial videos.</li>
                      <li>Integrated AI workflows to reduce rendering times by 30%.</li>
                    </ul>
                  </motion.div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold font-sans text-dark mb-8 flex items-center gap-4 uppercase tracking-wide">
                  <span className="w-8 h-[2px] bg-primary"></span> Education
                </h4>
                <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                  <span className="text-[11px] font-black tracking-widest uppercase text-primary mb-2 block pl-2 drop-shadow-sm">Currently Pursuing</span>
                  <h6 className="text-xl font-bold text-dark mb-1 pl-2 drop-shadow-sm">B.Tech</h6>
                  <p className="text-sm font-bold text-zinc-800 pl-2 drop-shadow-sm">Engineering & Innovation</p>
                </div>
              </div>
            </div>

            {/* Competencies & Skills Column */}
            <div className="flex flex-col gap-12">
              <div>
                <h4 className="text-2xl font-bold font-sans text-dark mb-8 flex items-center gap-4 uppercase tracking-wide">
                  <span className="w-8 h-[2px] bg-primary"></span> Expertise
                </h4>
                <div className="flex flex-col gap-4">
                  {[
                    "Video Editing & Color Grading",
                    "Motion Graphics & Visual Effects",
                    "AI-Powered Content Creation",
                    "Innovation & Branding"
                  ].map((skill, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-5 group cursor-default">
                      <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <div className="w-2 h-2 rounded-full bg-zinc-300 group-hover:bg-white transition-colors duration-300"></div>
                      </div>
                      <span className="text-[15px] font-bold text-dark drop-shadow-[0_1px_2px_rgba(255,255,255,1)] group-hover:text-primary transition-colors">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold font-sans text-dark mb-8 flex items-center gap-4 uppercase tracking-wide">
                  <span className="w-8 h-[2px] bg-primary"></span> Software
                </h4>
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center gap-4 border border-zinc-200 hover:border-primary hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-16 h-16 rounded-2xl bg-[#00005b] flex items-center justify-center text-[#9999FF] font-black text-2xl shadow-md group-hover:scale-110 transition-all duration-300">Pr</div>
                    <span className="text-[13px] font-bold text-zinc-800 tracking-wide group-hover:text-primary transition-colors">Premiere</span>
                  </div>
                  <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center gap-4 border border-zinc-200 hover:border-[#9999FF] hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-16 h-16 rounded-2xl bg-[#00005b] flex items-center justify-center text-[#9999FF] font-black text-2xl shadow-md group-hover:scale-110 transition-all duration-300">Ae</div>
                    <span className="text-[13px] font-bold text-zinc-800 tracking-wide group-hover:text-[#9999FF] transition-colors">After Effects</span>
                  </div>
                  <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center gap-4 border border-zinc-200 hover:border-[#31A8FF] hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-16 h-16 rounded-2xl bg-[#001e36] flex items-center justify-center text-[#31A8FF] font-black text-2xl shadow-md group-hover:scale-110 transition-all duration-300">Ps</div>
                    <span className="text-[13px] font-bold text-zinc-800 tracking-wide group-hover:text-[#31A8FF] transition-colors">Photoshop</span>
                  </div>
                  <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center gap-4 border border-zinc-200 hover:border-zinc-800 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:scale-110 transition-all duration-300">AI</div>
                    <span className="text-[13px] font-bold text-zinc-800 tracking-wide group-hover:text-zinc-900 transition-colors">Gen-AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative py-24 md:py-32 bg-zinc-50 overflow-hidden"
      >
        {/* Background "Expertise" Brush Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 w-full">
          <span className="font-marker text-[25vw] md:text-[20vw] lg:text-[220px] xl:text-[260px] text-zinc-200/50 leading-none select-none">
            Expertise
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 mt-8"
          >
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-dark tracking-wide uppercase">
              SERVICES.
            </h2>
            <p className="mt-4 text-zinc-500 font-light max-w-2xl mx-auto">
              Delivering high-end visual solutions tailored for modern digital platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Motion Graphics",
                desc: "Custom lower thirds, kinetic typography, and complex visual element animation to elevate any narrative.",
                icon: <Layers className="w-8 h-8 text-primary" strokeWidth={1.5} />,
              },
              {
                title: "Long-Form",
                desc: "Cinematic documentaries, YouTube essays, and podcasts with clean pacing and storytelling mastery.",
                icon: <MonitorPlay className="w-8 h-8 text-primary" strokeWidth={1.5} />,
              },
              {
                title: "Short-Form",
                desc: "High-retention Reels, TikToks, and Shorts optimized for maximum viewer engagement and fast-paced delivery.",
                icon: <Smartphone className="w-8 h-8 text-primary" strokeWidth={1.5} />,
              },
              {
                title: "Video Editing",
                desc: "I provide high-quality video editing services for various platforms, including YouTube, Instagram, and TikTok.",
                icon: <Sparkles className="w-8 h-8 text-primary" strokeWidth={1.5} />,
              },
            ].map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  {srv.icon}
                </div>
                <h4 className="text-xl font-medium text-dark mb-3">{srv.title}</h4>
                <p className="text-zinc-500 font-light text-sm leading-relaxed">
                  {srv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Showreel Intro Section - CINEMATIC DARK MODE */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden bg-white"
      >
        {/* Cinematic Ambient Glow Orbs */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -40, 80, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none opacity-40 z-0"
        />
        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 40, -80, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none opacity-30 z-0"
        />

        {/* Background "Showcase" Brush Text (Light Ghosting) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 w-full"
        >
          <span className="font-sans font-black text-[18vw] text-zinc-100 leading-none select-none whitespace-nowrap uppercase tracking-tighter">
            Showcase
          </span>
        </motion.div>

        {/* Main "SHOWREEL." Container */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-[1400px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, letterSpacing: "-0.05em", y: 40 }}
            whileInView={{ opacity: 1, letterSpacing: "-0.02em", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "circOut" }}
            className="text-7xl md:text-[8rem] lg:text-[10rem] font-sans font-black text-dark tracking-tighter uppercase mb-4 text-center relative pointer-events-none"
          >
            Best <span className="text-primary italic font-serif  tracking-normal">WORKS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-zinc-500 font-sans font-bold uppercase tracking-[0.4em] text-[10px] md:text-sm mb-20 text-center"
          >
            Elevating stories through <span className="text-primary">cinematic</span> precision
          </motion.p>

          {/* Category Tabs */}
          <div className="flex flex-col items-center gap-6 mb-16 z-20">
            {/* Primary Categories */}
            <div className="flex items-center gap-4 p-2 bg-white/50 backdrop-blur-xl rounded-full border border-zinc-100 shadow-xl">
              <button
                onClick={() => setActiveCategory('motion')}
                className={`relative px-10 py-5 rounded-full font-sans font-black text-[13px] uppercase tracking-widest transition-all duration-500 overflow-hidden group ${activeCategory === 'motion'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-dark'
                  }`}
              >
                {activeCategory === 'motion' && (
                  <motion.div layoutId="category-bg" className="absolute inset-0 bg-primary z-0 shadow-2xl" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative z-10">Motion Graphics</span>
              </button>
              <button
                onClick={() => setActiveCategory('video')}
                className={`relative px-10 py-5 rounded-full font-sans font-black text-[13px] uppercase tracking-widest transition-all duration-500 overflow-hidden group ${activeCategory === 'video'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-dark'
                  }`}
              >
                {activeCategory === 'video' && (
                  <motion.div layoutId="category-bg" className="absolute inset-0 bg-primary z-0 shadow-2xl" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative z-10">Video Editing</span>
              </button>
            </div>

            {/* Sub-Categories (Long/Short Form) */}
            <div className="flex items-center gap-3 p-1.5 bg-zinc-50 rounded-full border border-zinc-100 shadow-inner">
              <button
                onClick={() => setActiveSubCategory('long')}
                className={`px-6 py-2 rounded-full font-sans font-bold text-[11px] uppercase tracking-widest transition-all duration-300 ${activeSubCategory === 'long'
                  ? 'bg-white text-dark shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600'
                  }`}
              >
                Long-Form
              </button>
              <button
                onClick={() => setActiveSubCategory('short')}
                className={`px-8 py-2.5 rounded-full font-sans font-bold text-[11px] uppercase tracking-widest transition-all duration-300 ${activeSubCategory === 'short'
                  ? 'bg-white text-dark shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600'
                  }`}
              >
                Short-Form
              </button>
            </div>
          </div>

          {/* Main Showreel Videos - Categorized Grid */}
          <div className="w-full px-6 md:px-12 z-20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + activeSubCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`grid gap-10 lg:gap-16 ${activeSubCategory === 'short'
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 lg:grid-cols-2"
                  }`}
              >
                {currentVideos.map((video, idx) => (
                  <VideoCard key={video.id + idx} video={video} idx={idx} isShort={activeSubCategory === 'short'} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Drive Link Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 z-20"
          >
            <a
              href="https://drive.google.com/drive/folders/18Wm3omR07tU9DkwZO5AZ0VRV4yJrvvBN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-dark text-white rounded-full font-sans font-medium hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
            >
              <span className="text-[15px]">View Previous Projects on Drive</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative py-24 md:py-32 px-6 bg-zinc-50 border-t border-zinc-100 overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-dark tracking-wide uppercase">
              Client Testimonials.
            </h2>
            <p className="mt-4 text-zinc-500 font-light max-w-2xl mx-auto">
              Don't just take my word for it—here is what my clients and collaborators have to say about our work together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Akshith transformed our raw footage into an incredibly engaging launch video. His attention to pacing and motion graphics elevated the entire project beyond our expectations.",
                name: "Nandha Kishore",
                role: "Marketing Director",
                initials: "NK"
              },
              {
                text: "Fast, reliable, and incredibly creative. He understood exactly what tone we needed for our short-form content and delivered spotless edits that boosted our engagement drastically.",
                name: "Krishgumber",
                role: "Content Creator",
                initials: "KG"
              },
              {
                text: "Working with Akshith is a breeze. His VFX and color grading skills brought a cinematic quality to our documentary that we simply couldn't have achieved without him.",
                name: "Naveen Kumar",
                role: "Independent Filmmaker",
                initials: "NK"
              },
            ].map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative bg-white p-10 rounded-3xl border border-zinc-200 hover:border-primary/30 flex flex-col justify-between group transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <div>
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-zinc-100 group-hover:text-primary/10 transition-colors duration-500 rotate-180" />
                  <p className="text-zinc-600 font-medium leading-relaxed mb-8 relative z-10 text-[15px] italic">
                    "{test.text}"
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-4 z-10">
                  {/* Gradient Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold tracking-wider shadow-md shrink-0">
                    {test.initials}
                  </div>
                  <div>
                    <h5 className="font-bold text-dark text-lg capitalize">{test.name}</h5>
                    <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider group-hover:text-primary transition-colors">{test.role}</p>
                  </div>
                </div>

                {/* Hover Glow Effect Layer (Subtle for Light Mode) */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 bg-gradient-to-br from-primary to-purple-600 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section - Full Screen Image Background */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, scale: 0.98, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative min-h-[100dvh] w-full flex flex-col justify-between pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white border-t border-zinc-100"
      >
        {/* Full Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/contact-img.png"
            alt="Akshith Contact"
            className="w-full h-full object-cover md:object-[center_80%] opacity-100 mix-blend-multiply"
          />
          {/* Subtle gradient overlay from top to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/50 to-transparent pointer-events-none"></div>
          {/* Subtle gradient overlay from bottom to frame the floor/rocks */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/60 to-transparent pointer-events-none"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-between min-h-[80vh]">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-auto"
          >
            <h2 className="text-4xl md:text-7xl font-sans font-black tracking-tighter uppercase mb-4 text-dark drop-shadow-sm">
              Let's <span className="text-primary">Connect</span>.
            </h2>
            <p className="text-zinc-600 max-w-xl mx-auto font-medium md:text-lg leading-relaxed drop-shadow-sm mix-blend-multiply">
              Ready to create something amazing? Reach out to me directly or connect across platforms. I'm always looking for exciting new projects!
            </p>
          </motion.div>

          {/* 2 Column Grid framing the subject in the middle */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-auto w-full justify-between items-end pb-12 lg:pb-0">

            {/* Column 1: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-center space-y-8 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white max-w-sm"
            >
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">Email Me</h4>
                <a href="mailto:akshithhh1904@gmail.com" className="text-xl md:text-2xl font-medium hover:text-primary transition-colors text-dark break-words">
                  akshithhh1904<br className="hidden lg:block" />@gmail.com
                </a>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">Call Me</h4>
                <a href="tel:8341072526" className="text-xl md:text-2xl font-medium hover:text-primary transition-colors text-dark block">
                  83410 72526
                </a>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">Location</h4>
                <p className="text-xl md:text-2xl font-medium text-dark">
                  Hyderabad, India
                </p>
              </div>
            </motion.div>

            {/* Column 2: Social Links / Actionable buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-center space-y-4 lg:ml-auto w-full lg:max-w-sm"
            >
              <a href="https://wa.me/+918341072526" target="_blank" rel="noopener noreferrer" className="overflow-hidden relative group rounded-2xl border border-white/40 bg-white/70 backdrop-blur-md p-5 flex items-center justify-between hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col">
                  <span className="font-bold text-lg text-dark">WhatsApp</span>
                  <span className="text-xs font-semibold text-zinc-600 mt-1">Send a quick message</span>
                </div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-primary transition-colors shadow-sm border border-zinc-100 group-hover:border-primary">
                  <svg className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/maatoori-akshith-917862354/" target="_blank" rel="noopener noreferrer" className="overflow-hidden relative group rounded-2xl border border-white/40 bg-white/70 backdrop-blur-md p-5 flex items-center justify-between hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col">
                  <span className="font-bold text-lg text-dark">LinkedIn</span>
                  <span className="text-xs font-semibold text-zinc-600 mt-1">Professional Network</span>
                </div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm border border-zinc-100 group-hover:border-blue-600">
                  <svg className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
              </a>

              <a href="mailto:akshithhh1904@gmail.com" className="overflow-hidden relative group rounded-2xl border border-white/40 bg-white/70 backdrop-blur-md p-5 flex items-center justify-between hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col">
                  <span className="font-bold text-lg text-dark">Gmail</span>
                  <span className="text-xs font-semibold text-zinc-600 mt-1">Direct to inbox</span>
                </div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-red-500 transition-colors shadow-sm border border-zinc-100 group-hover:border-red-500">
                  <svg className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </a>

              {/* Social Icons Row */}
              <div className="flex items-center justify-center lg:justify-end gap-6 pt-4">
                <a href="https://www.instagram.com/aksshithhh/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-zinc-600 hover:text-pink-600 hover:bg-white transition-all duration-300 shadow-lg border border-white/40 hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://t.me/IAMAKSHITH19" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-zinc-600 hover:text-blue-500 hover:bg-white transition-all duration-300 shadow-lg border border-white/40 hover:scale-110">
                  <Send className="w-6 h-6 translate-x-[-1px] translate-y-[1px]" />
                </a>
                <a href="https://x.com/Akshith1904" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-zinc-600 hover:text-dark hover:bg-white transition-all duration-300 shadow-lg border border-white/40 hover:scale-110">
                  <X className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer Area */}
      <footer className="py-8 bg-white text-center border-t border-zinc-100">
        <p className="text-zinc-400 text-xs font-light uppercase tracking-widest">
          © {new Date().getFullYear()} Maatoori Akshith. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
