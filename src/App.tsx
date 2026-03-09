import { motion } from 'motion/react';
import { Download, Github, Mail, Globe, Shield, Smartphone, Lock, Eye, Palette, Zap, RefreshCw, Phone } from 'lucide-react';

export default function App() {
  const apkLink = "https://github.com/israrxy/mavlon/releases/download/v0.1.0-beta1/Mavlon-v0.1.0-beta1.apk";
  const githubLink = "https://github.com/israrxy/mavlon";
  const portfolioLink = "https://israrxy.k.vu";
  const emailLink = "mailto:hi@israrxy.k.vu";

  const features = [
    { icon: <Smartphone className="w-5 h-5" />, title: "Modern Experience", desc: "A clean, custom Android UI inspired by Material 3." },
    { icon: <Lock className="w-5 h-5" />, title: "PIN App Lock", desc: "Keep your conversations secure with native app locking." },
    { icon: <Eye className="w-5 h-5" />, title: "Typing Indicators", desc: "Real-time awareness of when others are responding." },
    { icon: <Palette className="w-5 h-5" />, title: "Customization", desc: "Global appearance settings and per-chat personalization." },
    { icon: <Zap className="w-5 h-5" />, title: "UnifiedPush", desc: "Battery-efficient, decentralized push notifications." },
    { icon: <Phone className="w-5 h-5" />, title: "Native Calls", desc: "Groundwork laid for seamless audio and video communication." },
    { icon: <Globe className="w-5 h-5" />, title: "In-App Web", desc: "Open links smoothly without leaving your conversation." },
    { icon: <RefreshCw className="w-5 h-5" />, title: "Background Sync", desc: "Stay up to date silently with reliable background updates." },
  ];

  return (
    <div className="min-h-screen bg-black text-ivory font-sans relative overflow-x-hidden selection:bg-gold/30 selection:text-ivory">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-espresso/40 blur-[150px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-display font-semibold tracking-wide text-ivory"
        >
          Mavlon<span className="text-gold">.</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-6"
        >
          <a href={githubLink} target="_blank" rel="noreferrer" className="text-ivory-muted hover:text-gold transition-colors duration-300">
            <Github className="w-5 h-5" />
          </a>
        </motion.div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-medium tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              Beta
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight mb-6">
              Private conversations,<br />
              <span className="text-gradient-gold font-serif italic pr-2">designed with intention.</span>
            </h1>
            <p className="text-lg sm:text-xl text-ivory-muted font-light leading-relaxed mb-10 max-w-xl">
              Mavlon is a Matrix-based messenger for Android. A warmer, cleaner, and more focused way to communicate.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href={apkLink}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]"
              >
                <Download className="w-5 h-5" />
                Download for Android
              </a>
              <a 
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-espresso hover:bg-espresso-light border border-gold/10 text-ivory px-8 py-4 rounded-xl font-medium transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
            <p className="mt-4 text-xs text-ivory-muted/60 font-mono">v0.1.0-beta1 • Android Only</p>
          </motion.div>

          {/* Hero Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent blur-2xl rounded-full"></div>
            <div className="relative glass-panel rounded-[2.5rem] p-3 shadow-2xl border border-gold/20">
              <div className="rounded-[2rem] overflow-hidden bg-espresso aspect-[9/19] relative">
                <img 
                  src="/assetschat.png" 
                  alt="Mavlon Home Screen" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/darkui/800/1600?blur=2";
                  }}
                />
                {/* Simulated UI overlay if image is missing/loading */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* App Showcase Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-espresso/30 border-y border-gold/5"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Crafted for clarity.</h2>
              <p className="text-ivory-muted max-w-2xl mx-auto">Every pixel is considered. Mavlon strips away the noise to focus on what matters: your conversations.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center"
              >
                <div className="glass-panel rounded-[2rem] p-2 mb-6 w-full max-w-[320px] shadow-xl transform transition-transform hover:-translate-y-2 duration-500">
                  <div className="rounded-[1.5rem] overflow-hidden bg-black aspect-[9/19]">
                    <img 
                      src="assets/chat.png" 
                      alt="Mavlon Chat List" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://picsum.photos/seed/chatlist/800/1600";
                      }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gold font-medium uppercase tracking-widest mb-2">The Inbox</p>
                <p className="text-ivory-muted text-center max-w-xs">A serene overview of your active conversations, organized and accessible.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col items-center md:mt-24"
              >
                <div className="glass-panel rounded-[2rem] p-2 mb-6 w-full max-w-[320px] shadow-xl transform transition-transform hover:-translate-y-2 duration-500">
                  <div className="rounded-[1.5rem] overflow-hidden bg-black aspect-[9/19]">
                    <img 
                      src="/assets/message.png" 
                      alt="Mavlon Chat Interface" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://picsum.photos/seed/chatview/800/1600";
                      }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gold font-medium uppercase tracking-widest mb-2">The Conversation</p>
                <p className="text-ivory-muted text-center max-w-xs">Immersive, distraction-free chat interface with per-chat personalization.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Uncompromising features.</h2>
            <p className="text-ivory-muted max-w-2xl">Built on the robust Matrix protocol, enhanced with thoughtful Android-native capabilities.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 rounded-2xl hover:bg-espresso/80 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-ivory-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Mavlon Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-espresso/20 to-transparent"></div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <Shield className="w-12 h-12 text-gold mx-auto mb-8 opacity-80" />
            <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight">
              "Communication should feel like a private room, not a public square."
            </h2>
            <p className="text-lg text-ivory-muted leading-relaxed max-w-2xl mx-auto">
              Mavlon was built from a desire for a quieter, more intentional messaging experience. 
              We believe your data belongs to you, your interface should respect your attention, 
              and your conversations deserve a beautiful, secure home.
            </p>
          </div>
        </section>

        {/* Download CTA Section */}
        <section className="py-32 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto glass-panel rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gold/10 blur-[100px] pointer-events-none"></div>
            
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6 relative z-10">Ready to try Mavlon?</h2>
            <p className="text-ivory-muted mb-10 max-w-xl mx-auto relative z-10">
              Join the beta today. Experience a new standard for Android messaging.
            </p>
            
            <div className="flex flex-col items-center gap-4 relative z-10">
              <a 
                href={apkLink}
                className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black px-10 py-5 rounded-xl font-medium text-lg transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] hover:-translate-y-1"
              >
                <Download className="w-6 h-6" />
                Download APK
              </a>
              <div className="flex items-center gap-3 text-sm text-ivory-muted/60 font-mono mt-2">
                <span>v0.1.0-beta1</span>
                <span>•</span>
                <span>Android Only</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gold/10 bg-black pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <div className="text-2xl font-display font-semibold tracking-wide text-ivory mb-2">
              Mavlon<span className="text-gold">.</span>
            </div>
            <p className="text-sm text-ivory-muted/60 max-w-xs">
              A beta Matrix-based messenger for Android, designed with intention.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 md:justify-end">
            <a href={portfolioLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-ivory-muted hover:text-gold transition-colors">
              <Globe className="w-4 h-4" />
              Portfolio
            </a>
            <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-ivory-muted hover:text-gold transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a href={emailLink} className="flex items-center gap-2 text-sm text-ivory-muted hover:text-gold transition-colors">
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory-muted/40 font-mono border-t border-gold/5 pt-8">
          <p>&copy; {new Date().getFullYear()} Israr. All rights reserved.</p>
          <p>Designed for Android.</p>
        </div>
      </footer>
    </div>
  );
}
