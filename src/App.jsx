import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring 
} from 'framer-motion';
import { 
  Globe, 
  User, 
  Layout, 
  PenTool, 
  BookOpen, 
  Database, 
  Smartphone, 
  MessageSquare, 
  ShieldAlert, 
  Lock, 
  Search, 
  Zap, 
  CloudLightning,
  ChevronRight, 
  Menu, 
  X, 
  Copy, 
  Check, 
  Phone, 
  Mail, 
  Instagram, 
  Linkedin, 
  CheckCircle,
  FileText,
  DollarSign,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Clock,
  Code
} from 'lucide-react';

import logoImg from './assets/logo.png';
import avatarImg from './assets/avatar.jpg';
import flyerImg from './assets/flyer.jpg';

// Typing effect phrases
const TYPING_PHRASES = [
  "Custom Web Applications",
  "High-Performance SaaS Products",
  "Premium Responsive Websites",
  "SEO & Speed Optimized Solutions"
];

function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Typing animation state
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const currentPhrase = TYPING_PHRASES[phraseIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === currentPhrase) {
      // Pause at full word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      setTypingSpeed(150);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  // Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formService, setFormService] = useState('Business Website Development');
  const [formDesc, setFormDesc] = useState('');
  const [formBudget, setFormBudget] = useState('');
  const [formTimeline, setFormTimeline] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Clipboard copies
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  // Submit contact form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formName.trim()) newErrors.name = 'Name is required';
    if (!formEmail.trim()) newErrors.email = 'Email is required';
    if (!formPhone.trim()) newErrors.phone = 'Phone number is required';
    if (!formDesc.trim()) newErrors.desc = 'Project description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    // Construct message
    const message = `Name: ${formName}
Email: ${formEmail}
Phone: ${formPhone}
Service: ${formService}
Project Description: ${formDesc}
Budget: ${formBudget || 'Not specified'}
Timeline: ${formTimeline || 'Not specified'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918807621978?text=${encodedMessage}`;
    
    setFormSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      // Reset form
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormDesc('');
      setFormBudget('');
      setFormTimeline('');
      setFormSubmitted(false);
    }, 1500);
  };

  // Smooth scroll helper
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setActiveSection(id);
  };

  // Nav scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'requirements', 'portfolio', 'product', 'why-choose-me', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Services list
  const services = [
    { icon: Globe, title: "Business Website Development", desc: "Tailored high-performance web systems representing your corporate identity and brand values with seamless client pathways." },
    { icon: User, title: "Portfolio Websites", desc: "Elegant personal websites designed to showcase your accomplishments, projects, and custom style to prospects." },
    { icon: Layout, title: "Personal Branding Websites", desc: "Bespoke digital architecture that amplifies your professional voice, publications, and authoritative presence online." },
    { icon: PenTool, title: "Landing Pages", desc: "Conversion-optimized, ultra-fast landing pages engineered to maximize campaigns, signups, and ROI." },
    { icon: BookOpen, title: "Blog Platforms", desc: "Interactive modern content layouts with custom CMS options, beautiful typography, and swift readability scores." },
    { icon: Database, title: "Custom Web Applications", desc: "End-to-end full-stack architectures built for scalability, complex databases, security, and smooth user flows." },
    { icon: Smartphone, title: "Responsive Design", desc: "Mobile-first layouts ensuring absolute aesthetic parity and fluidity across all screen widths and device frames." },
    { icon: MessageSquare, title: "Contact Forms", desc: "Intuitive interactive forms coupled with custom automation systems like email alerts, database logging, or WhatsApp routes." },
    { icon: ShieldAlert, title: "Admin Dashboards", desc: "Advanced operational control centers displaying analytics graphs, database operations, and multi-user controls." },
    { icon: Lock, title: "Authentication Systems", desc: "Highly secure login platforms implementing JWT, OAuth, or MFA protocols to guard private digital assets." },
    { icon: Search, title: "SEO Optimization", desc: "Structured semantic HTML combined with optimized meta configurations ensuring indexing and organic ranking superiority." },
    { icon: Zap, title: "Performance Optimization", desc: "Sub-second load times engineered via assets optimization, cache tuning, lightweight builds, and Lighthouse 90+ standard." },
    { icon: CloudLightning, title: "Hosting & Deployment", desc: "Hassle-free setup on global CDNs like Vercel, Netlify, AWS, or custom VPCs with custom domain SSL configurations." }
  ];

  // Requirements checklist
  const requirementsList = [
    { title: "Business Name", desc: "Your official or desired startup brand identity." },
    { title: "Business Description", desc: "Brief breakdown of what your company does and offers." },
    { title: "Website Goal", desc: "Lead generation, sales, branding, or showcasing work." },
    { title: "Target Audience", desc: "Details on your ideal users, customers, or visitors." },
    { title: "Design References", desc: "Competitors or websites with styling you appreciate." },
    { title: "Number of Pages", desc: "Estimated pages (e.g. Home, Services, Contact, Blog)." },
    { title: "Number of Products", desc: "For e-commerce, number of physical or digital inventory items." },
    { title: "Content Assets", desc: "Written copy, images, logo files, videos, documents." },
    { title: "Logo Files", desc: "Vector (.SVG) or high-res transparency logo layouts." },
    { title: "Features Required", desc: "Animations, authentication, payment checkout, forms." },
    { title: "Budget Scope", desc: "Proposed investment framework for alignment." },
    { title: "Timeline Expectation", desc: "Ideal deadlines or launch dates for the build." }
  ];

  // Why Choose Me list
  const choosingFactors = [
    { title: "Clean & Modern UI", desc: "Stripe-level aesthetics focusing on premium spacing, dark neon designs, and outstanding typography.", icon: Sparkles },
    { title: "Fully Responsive Design", desc: "Flawless desktop, tablet, and mobile layouts tailored using responsive viewport principles.", icon: Smartphone },
    { title: "Fast Delivery", desc: "Rapid scaffolding and production launch without sacrificing performance or design fidelity.", icon: Zap },
    { title: "Professional Communication", desc: "Regular, clear updates with complete transparency throughout the entire development cycle.", icon: MessageSquare },
    { title: "Scalable Code", desc: "Clean modular architecture prepared to connect with complex backend APIs and future database additions.", icon: Code },
    { title: "Ongoing Support", desc: "Reliable assistance post-launch to address tweaks, upgrades, performance audits, or domain migrations.", icon: Clock }
  ];

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-[#00AAFF]/30 selection:text-[#00AAFF]">
      
      {/* Scroll Progress Bar */}
      <motion.div id="scroll-progress" style={{ scaleX }} />

      {/* Glow Cursor on Desktop (only if screen supports hover) */}
      <div className="hidden lg:block">
        <motion.div 
          className="cursor-glow" 
          style={{ 
            left: cursorX, 
            top: cursorY 
          }} 
        />
      </div>

      {/* Floating Blobs Background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[20%] left-[15%] w-[300px] h-[300px] bg-[#00AAFF]/5 rounded-full blur-[90px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <img src={logoImg} alt="ARVITECH_AI Logo" className="h-10 w-10 object-contain rounded-md border border-[#00AAFF]/20" />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-[#00AAFF] bg-clip-text text-transparent">
              ARVITECH_AI
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {['home', 'services', 'portfolio', 'product', 'about', 'contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item)} 
                className={`hover:text-white capitalize transition-colors relative py-2 ${activeSection === item ? 'text-white font-semibold' : ''}`}
              >
                {item}
                {activeSection === item && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00AAFF]" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <button 
              onClick={() => scrollTo('contact')} 
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-[#00AAFF] hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,170,255,0.4)] transition-all duration-300 transform active:scale-95"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300 hover:text-white p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#030712]/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-3">
                {['home', 'services', 'portfolio', 'product', 'about', 'contact'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => scrollTo(item)} 
                    className={`block w-full text-left py-2 px-3 rounded-lg text-base font-medium capitalize hover:bg-white/5 ${activeSection === item ? 'text-[#00AAFF] bg-[#00AAFF]/5' : 'text-slate-300'}`}
                  >
                    {item}
                  </button>
                ))}
                <button 
                  onClick={() => scrollTo('contact')} 
                  className="block w-full text-center py-3 px-4 rounded-lg bg-[#00AAFF] text-black font-semibold text-sm hover:bg-cyan-400"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col text-left space-y-6"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#00AAFF] bg-[#00AAFF]/10 border border-[#00AAFF]/20 glow-text-blue animate-pulse-slow">
              <Sparkles size={14} />
              <span>Intelligence. Innovation. Impact.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Build Your <span className="bg-gradient-to-r from-[#00AAFF] via-cyan-400 to-blue-500 bg-clip-text text-transparent">Dream Website</span> Today <span className="inline-block animate-bounce">🚀</span>
            </h1>

            {/* Dynamic Typing Subheadline */}
            <div className="h-8 flex items-center">
              <p className="text-lg md:text-xl font-medium text-slate-300">
                Modern. Fast. Responsive.<br />
                <span className="text-[#00AAFF] font-semibold">{currentText}</span>
                <span className="animate-pulse font-extralight text-[#00AAFF] ml-0.5">|</span>
              </p>
            </div>
            
            <p className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
              Helping businesses, creators, and startups grow online. We engineer premium, Stripe-quality websites with sleek user interfaces and fluid animations designed to build client trust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => scrollTo('contact')} 
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-black bg-[#00AAFF] hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(0,170,255,0.4)] transition-all duration-300 active:scale-95"
              >
                Get Started
                <ArrowRight size={16} />
              </button>
              
              <a 
                href="https://wa.me/918807621978" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-slate-900 border border-white/10 hover:border-[#00AAFF]/50 hover:bg-slate-800 transition-all duration-300 active:scale-95"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00AAFF]" />
                <span className="text-xs font-semibold">Clean Code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00AAFF]" />
                <span className="text-xs font-semibold">Fast Load</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00AAFF]" />
                <span className="text-xs font-semibold">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#00AAFF]" />
                <span className="text-xs font-semibold">Grow Business</span>
              </div>
            </div>
          </motion.div>

          {/* Right Mockup Display Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00AAFF]/20 to-transparent rounded-3xl blur-3xl z-0" />
            
            {/* Mockup Frame Wrapper */}
            <div className="relative w-full max-w-md aspect-3/4 bg-[#0a1120] rounded-3xl p-3 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 transform hover:scale-[1.02] transition-transform duration-500">
              {/* Camera dot */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-1 h-1 bg-blue-900 rounded-full" />
              </div>

              {/* Inside Mockup Content */}
              <div className="w-full h-full overflow-hidden rounded-2xl border border-white/5 bg-[#030712] relative">
                <img 
                  src={flyerImg} 
                  alt="Premium Website Flyer Mockup" 
                  className="w-full h-full object-cover opacity-90 object-top" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
                
                {/* Floating Micro elements */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-[#00AAFF]/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Premium SaaS Build</h4>
                      <p className="text-[10px] text-slate-400">Next-gen performance web interface</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#00AAFF] px-2 py-1 bg-[#00AAFF]/10 rounded border border-[#00AAFF]/20">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 relative border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a1120]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#00AAFF] font-semibold text-sm uppercase tracking-widest">Expertise & Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Professional Web Services
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              We design, build, optimize, and deploy premium web interfaces engineered with cutting-edge UI standards. Each service is tailored to maximize your online footprint.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-panel-interactive p-8 rounded-2xl flex flex-col text-left space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00AAFF]/10 border border-[#00AAFF]/20 flex items-center justify-center text-[#00AAFF]">
                  <svc.icon size={22} className="glow-text-blue" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">{svc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-grow">{svc.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Client Requirement Checklist Section */}
      <section id="requirements" className="py-20 md:py-32 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#00AAFF] font-semibold text-sm uppercase tracking-widest">Getting Started Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              What I Need From You
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              To build a tailored experience for your brand, here is a complete checklist of components and parameters that we will align on.
            </p>
          </div>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirementsList.map((req, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-xl bg-slate-950/60 border border-white/5 flex gap-4 text-left hover:border-[#00AAFF]/30 transition-colors duration-300"
              >
                <div className="mt-1 text-[#00AAFF] flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">{req.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{req.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form CTA Box */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-950/30 via-[#00AAFF]/5 to-transparent border border-[#00AAFF]/20 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="text-xl font-extrabold text-white">Ready to fill your details?</h3>
              <p className="text-xs text-slate-400 mt-1">Submit your requirements directly via our official Google Forms to receive a structured draft proposal within 24 hours.</p>
            </div>
            <a 
              href="https://forms.gle/yWtxnNQphXPo1rRS7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-8 py-4 bg-[#00AAFF] text-black font-semibold text-sm rounded-full hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,170,255,0.2)] hover:shadow-[0_0_25px_rgba(0,170,255,0.4)] transition-all duration-300 whitespace-nowrap"
            >
              Fill Requirement Form
              <ExternalLink size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 border-t border-white/5 bg-gradient-to-b from-[#0a1120]/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#00AAFF] font-semibold text-sm uppercase tracking-widest">Case Studies</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              My Featured Work
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Explore custom websites built for startups, educators, and organizations. We focus on modern layouts, high interactivity, and performance.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-[#00AAFF]/20 transition-all duration-500 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Visual Section */}
                <div className="md:col-span-6 bg-slate-900/60 p-8 flex items-center justify-center relative overflow-hidden min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00AAFF]/10 to-transparent pointer-events-none" />
                  
                  {/* Decorative Project Mockup */}
                  <div className="relative w-full aspect-video bg-[#030712] rounded-xl border border-white/10 overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500 flex flex-col">
                    <div className="h-6 bg-slate-950 border-b border-white/5 flex items-center px-3 gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center items-center p-4 bg-gradient-to-br from-[#0a1120] to-[#030712]">
                      <Globe size={32} className="text-[#00AAFF] animate-pulse" />
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">Pydantic Platform</span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-center text-left space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00AAFF]">Vercel Deploy</span>
                  <h3 className="text-2xl font-extrabold text-white">Educational Platform</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A modern, fast, and interactive education platform designed to make learning content highly structured and accessible. Features a clean curriculum layout and sleek responsive tables.
                  </p>
                  <div className="pt-4 flex items-center">
                    <a 
                      href="https://pydantic-gules.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00AAFF] hover:text-cyan-300 transition-colors"
                    >
                      Visit Educational Website
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="product" className="py-20 md:py-32 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#00AAFF] font-semibold text-sm uppercase tracking-widest">Proprietary AI SaaS</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              LinkedPen
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Explore our proprietary platform built to accelerate professional personal brands on LinkedIn.
            </p>
          </div>

          <div className="max-w-5xl mx-auto glass-panel p-8 md:p-16 rounded-3xl border border-[#00AAFF]/20 relative overflow-hidden">
            {/* Background blur highlight */}
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#00AAFF]/10 rounded-full blur-[80px]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-950/40 border border-cyan-800/40 text-xs font-semibold text-[#00AAFF] rounded-full">
                  <Sparkles size={12} />
                  <span>AI growth platform</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white">LinkedIn Growth Platform</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  <strong>LINKEDPEN</strong> is an AI-powered LinkedIn growth platform that helps professionals create, schedule, and optimize content effortlessly. It learns your writing style, generates high-performing posts, suggests ideas, and tracks engagement — all in one place, so you can stay consistent and grow your personal brand faster.
                </p>

                {/* Key features checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-slate-300 text-xs">
                    <CheckCircle2 size={14} className="text-[#00AAFF]" />
                    <span>AI Writing Style Learning</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-xs">
                    <CheckCircle2 size={14} className="text-[#00AAFF]" />
                    <span>Auto Post Generation</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-xs">
                    <CheckCircle2 size={14} className="text-[#00AAFF]" />
                    <span>Engaging Topic Prompts</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-xs">
                    <CheckCircle2 size={14} className="text-[#00AAFF]" />
                    <span>Engagement Analytics</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href="https://linkedpen.insforge.site" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#00AAFF] text-black font-semibold text-sm rounded-full hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,170,255,0.2)] hover:shadow-[0_0_25px_rgba(0,170,255,0.4)] transition-all duration-300"
                  >
                    Explore LinkedPen
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Graphic Mockup Area */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full aspect-4/3 bg-slate-900/60 rounded-2xl border border-white/10 p-4 shadow-2xl flex flex-col justify-center items-center">
                  <Laptop size={48} className="text-[#00AAFF] mb-2 animate-bounce" style={{ animationDuration: '3s' }} />
                  <span className="text-sm font-extrabold text-white">LinkedPen Dashboard</span>
                  <span className="text-[10px] text-slate-400 mt-1">linkedpen.insforge.site</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Me Section */}
      <section id="why-choose-me" className="py-20 md:py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a1120]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#00AAFF] font-semibold text-sm uppercase tracking-widest">Professional Standards</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Why Choose Me?
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              We stand for premium code execution, responsive parity, and timely launch. Here is how we ensure project success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {choosingFactors.map((factor, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-8 rounded-2xl bg-[#0a1120]/40 border border-white/5 flex flex-col text-left space-y-4 hover:border-[#00AAFF]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center text-[#00AAFF] group-hover:text-cyan-300 transition-colors">
                  <factor.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-wide">{factor.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{factor.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Avatar Visual Column */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="absolute inset-0 bg-[#00AAFF]/20 rounded-full blur-3xl" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-2 bg-slate-950 border border-white/10 shadow-2xl overflow-hidden group">
                <img 
                  src={avatarImg} 
                  alt="Freelancer Profile" 
                  className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-[#00AAFF] font-semibold text-sm uppercase tracking-widest">About the Creator</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Hi, I am a Developer
              </h2>
              <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
                <p>
                  I am a freelance developer focused on creating modern digital experiences, high-performance websites, and scalable web applications.
                </p>
                <p>
                  I help startups, creators, and businesses establish a strong online presence through modern design systems and clean coding practices. Let's make your brand look premium and function flawlessly.
                </p>
              </div>

              {/* Stats/Badges */}
              <div className="pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-2xl font-black text-white">Modern UI</h4>
                  <p className="text-[10px] uppercase text-slate-400 tracking-widest mt-1">Stripe-style layouts</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">Full Stack</h4>
                  <p className="text-[10px] uppercase text-slate-400 tracking-widest mt-1">SaaS architectures</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">SEO & Performance</h4>
                  <p className="text-[10px] uppercase text-slate-400 tracking-widest mt-1">Under 1s load standard</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Contact & Lead Form Section */}
      <section id="contact" className="py-20 md:py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0a1120]/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#00AAFF] font-semibold text-sm uppercase tracking-widest">Collaborate</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Get In Touch
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Have an idea? Let's discuss your project scope. Fill out the contact form below or reach out via direct social links.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 max-w-6xl mx-auto">
            
            {/* Quick Contacts Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Direct Communication</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click to copy or directly initiate chats with the coordinates below. We respond within 12 hours.
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00AAFF]/10 text-[#00AAFF] flex items-center justify-center">
                        <Mail size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">Email</span>
                        <a href="mailto:aravindakumar12@gmail.com" className="text-xs font-bold text-white hover:text-[#00AAFF] transition-colors">aravindakumar12@gmail.com</a>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('aravindakumar12@gmail.com', 'email')}
                      className="text-slate-400 hover:text-white p-2"
                      title="Copy email"
                    >
                      {copiedEmail ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00AAFF]/10 text-[#00AAFF] flex items-center justify-center">
                        <Phone size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">Phone</span>
                        <a href="tel:8807621978" className="text-xs font-bold text-white hover:text-[#00AAFF] transition-colors">8807621978</a>
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('8807621978', 'phone')}
                      className="text-slate-400 hover:text-white p-2"
                      title="Copy phone number"
                    >
                      {copiedPhone ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-4 pt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect on Socials</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://wa.me/918807621978" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 hover:border-[#00AAFF]/50 text-white flex items-center justify-center hover:bg-[#00AAFF]/10 transition-all"
                  >
                    <MessageSquare size={18} />
                  </a>
                  <a 
                    href="https://www.instagram.com/arvitech_ai/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 hover:border-[#00AAFF]/50 text-white flex items-center justify-center hover:bg-[#00AAFF]/10 transition-all"
                  >
                    <Instagram size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/arvitech-ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 hover:border-[#00AAFF]/50 text-white flex items-center justify-center hover:bg-[#00AAFF]/10 transition-all"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Form Column */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-8 md:p-10 rounded-2xl border border-white/5 relative">
                
                <h3 className="text-xl font-bold text-white mb-6 text-left">Project Proposal Form</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00AAFF]/60 transition-colors" 
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address *</label>
                      <input 
                        type="email" 
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00AAFF]/60 transition-colors" 
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Phone Number *</label>
                      <input 
                        type="tel" 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="8807621978"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00AAFF]/60 transition-colors" 
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Service selection dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Select Service</label>
                    <select 
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00AAFF]/60 transition-colors cursor-pointer"
                    >
                      <option value="Business Website Development">Business Website Development</option>
                      <option value="Portfolio Websites">Portfolio Websites</option>
                      <option value="Personal Branding Websites">Personal Branding Websites</option>
                      <option value="Landing Pages">Landing Pages</option>
                      <option value="Blog Platforms">Blog Platforms</option>
                      <option value="Custom Web Applications">Custom Web Applications</option>
                      <option value="SEO & Performance Optimization">SEO & Performance Optimization</option>
                    </select>
                  </div>

                  {/* Project description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Project Description *</label>
                    <textarea 
                      rows="4" 
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Outline features, target audience, page expectations..."
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00AAFF]/60 transition-colors resize-none"
                    ></textarea>
                    {errors.desc && <p className="text-red-500 text-[10px] mt-1">{errors.desc}</p>}
                  </div>

                  {/* Budget & Timeline Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Estimated Budget</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 text-xs">
                          <DollarSign size={14} />
                        </div>
                        <input 
                          type="text" 
                          value={formBudget}
                          onChange={(e) => setFormBudget(e.target.value)}
                          placeholder="e.g. $1500"
                          className="w-full bg-slate-950 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00AAFF]/60 transition-colors" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Timeline expectation</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 text-xs">
                          <Calendar size={14} />
                        </div>
                        <input 
                          type="text" 
                          value={formTimeline}
                          onChange={(e) => setFormTimeline(e.target.value)}
                          placeholder="e.g. 3 weeks"
                          className="w-full bg-slate-950 border border-white/10 rounded-lg pl-8 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#00AAFF]/60 transition-colors" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full py-4 bg-[#00AAFF] hover:bg-cyan-400 text-black font-extrabold text-sm rounded-lg shadow-[0_0_20px_rgba(0,170,255,0.2)] hover:shadow-[0_0_25px_rgba(0,170,255,0.4)] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {formSubmitted ? (
                        <>
                          <Check size={16} className="animate-pulse" />
                          <span>Generating WhatsApp Message...</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare size={16} />
                          <span>Submit via WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Form submit success layer */}
                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-950/90 rounded-2xl flex flex-col items-center justify-center p-8 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#00AAFF]/10 text-[#00AAFF] border border-[#00AAFF]/20 flex items-center justify-center mb-4 animate-bounce">
                        <CheckCircle size={32} />
                      </div>
                      <h4 className="text-xl font-bold text-white">Redirecting to WhatsApp...</h4>
                      <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                        We are launching your WhatsApp application. Please send the prefilled text message to complete proposal review!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Floating WhatsApp Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/918807621978" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-14 h-14 rounded-full bg-slate-950 hover:bg-[#00AAFF] text-[#00AAFF] hover:text-black border border-[#00AAFF]/40 hover:border-[#00AAFF] flex items-center justify-center shadow-[0_4px_20px_rgba(0,170,255,0.3)] hover:shadow-[0_0_25px_rgba(0,170,255,0.5)] transition-all duration-300 group relative animate-pulse-slow"
        >
          {/* Inner pulsating glow */}
          <span className="absolute inset-0 rounded-full border-2 border-[#00AAFF]/10 animate-ping" />
          <MessageSquare size={26} className="transform group-hover:scale-110 transition-transform duration-300" />
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 py-16 text-slate-400 relative overflow-hidden z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/5">
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
                <img src={logoImg} alt="ARVITECH_AI Logo" className="h-8 w-8 object-contain rounded-md" />
                <span className="font-extrabold text-lg tracking-tight text-white">
                  ARVITECH_AI
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Premium bespoke digital design, high-speed website engineering, and LinkedIn growth platforms. Intelligence. Innovation. Impact.
              </p>
              
              <div className="pt-2 flex gap-4 text-slate-500 text-xs">
                <a href="https://www.instagram.com/arvitech_ai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://www.linkedin.com/company/arvitech-ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn Company</a>
                <a href="https://www.linkedin.com/in/aravindakumars/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn Founder</a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-2.5 text-xs">
                {['home', 'services', 'portfolio', 'product', 'about', 'contact'].map((item) => (
                  <li key={item}>
                    <button onClick={() => scrollTo(item)} className="hover:text-white capitalize transition-colors text-left">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Featured Services</h4>
              <ul className="space-y-2.5 text-xs">
                <li><button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Business Website Development</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Custom SaaS Platforms</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Landing Page Optimization</button></li>
                <li><button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Speed & SEO Audits</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
            <span>© {new Date().getFullYear()} ARVITECH_AI. All Rights Reserved.</span>
            <div className="flex gap-6">
              <span>Built for high performance</span>
              <span>Lighthouse 90+ Standard</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
