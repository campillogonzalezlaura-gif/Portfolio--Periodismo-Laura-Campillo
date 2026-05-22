import React, { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  Send, 
  Sparkles, 
  MessageSquare, 
  X, 
  ChevronRight, 
  FileText, 
  Menu, 
  ExternalLink, 
  ThumbsUp, 
  Award, 
  BookOpen, 
  Clock, 
  User, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Terminal, 
  PenTool, 
  Sparkle 
} from "lucide-react";
import { ARTICLES_DATA, RESUME_DATA } from "./data";
import { Article, Message } from "./types";

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Portfolio items filter and active reading
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  // Handle active section scrolling detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "habilidades", "experiencia", "formacion", "portfolio"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter articles based on categorization tab
  const filteredArticles = selectedCategory === "Todos" 
    ? ARTICLES_DATA 
    : ARTICLES_DATA.filter(art => art.category === selectedCategory);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark flex flex-col relative selection:bg-brand-secondary/20 selection:text-brand-primary">
      
      {/* Sticky Premium Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-brand-border sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-brand-secondary rounded-full animate-pulse"></div>
            <a href="#about" className="newsreader-font font-bold text-2xl tracking-tight text-brand-primary hover:text-brand-secondary transition-colors">
              Laura Campillo González
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#about" 
              className={`font-sans font-semibold text-xs tracking-wider uppercase transition-colors hover:text-brand-secondary ${activeSection === "about" ? "text-brand-secondary border-b-2 border-brand-secondary pb-1" : "text-brand-muted"}`}
            >
              Sobre mí
            </a>
            <a 
              href="#habilidades" 
              className={`font-sans font-semibold text-xs tracking-wider uppercase transition-colors hover:text-brand-secondary ${activeSection === "habilidades" ? "text-brand-secondary border-b-2 border-brand-secondary pb-1" : "text-brand-muted"}`}
            >
              Habilidades
            </a>
            <a 
              href="#experiencia" 
              className={`font-sans font-semibold text-xs tracking-wider uppercase transition-colors hover:text-brand-secondary ${activeSection === "experiencia" ? "text-brand-secondary border-b-2 border-brand-secondary pb-1" : "text-brand-muted"}`}
            >
              Experiencia
            </a>
            <a 
              href="#formacion" 
              className={`font-sans font-semibold text-xs tracking-wider uppercase transition-colors hover:text-brand-secondary ${activeSection === "formacion" ? "text-brand-secondary border-b-2 border-brand-secondary pb-1" : "text-brand-muted"}`}
            >
              Formación
            </a>
            <a 
              href="#portfolio" 
              className={`font-sans font-semibold text-xs tracking-wider uppercase transition-colors hover:text-brand-secondary ${activeSection === "portfolio" ? "text-brand-secondary border-b-2 border-brand-secondary pb-1" : "text-brand-muted"}`}
            >
              Portfolio
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-brand-primary"
            aria-label="Toggle Menu"
            id="mobile-menu-btn"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-brand-border animate-fadeIn">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-semibold text-sm text-brand-dark py-1"
              >
                Sobre mí
              </a>
              <a 
                href="#habilidades" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-semibold text-sm text-brand-dark py-1"
              >
                Habilidades
              </a>
              <a 
                href="#experiencia" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-semibold text-sm text-brand-dark py-1"
              >
                Experiencia
              </a>
              <a 
                href="#formacion" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-semibold text-sm text-brand-dark py-1"
              >
                Formación
              </a>
              <a 
                href="#portfolio" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-semibold text-sm text-brand-dark py-1"
              >
                Portfolio
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section id="about" className="relative overflow-hidden pt-24 pb-20 hero-pattern border-b border-brand-border">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-secondary px-4 py-1.5 rounded-full border border-blue-100 mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.15em]">Periodista &amp; Comunicadora</span>
            </div>
            
            <h2 className="newsreader-font text-5xl md:text-6xl font-bold tracking-tight text-brand-primary select-none mt-2 leading-[1.1]">
              Laura Campillo González
            </h2>
            
            <p className="hanken-font text-lg md:text-xl text-brand-muted mt-8 leading-relaxed max-w-3xl mx-auto font-light">
              Graduada en Periodismo con experiencia en redacción de contenidos para medios digitales. Especializada en optimización SEO y gestión de contenido en entornos online, con formación avanzada en Inteligencia Artificial y analítica de datos aplicada a la comunicación.
            </p>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <a 
                href="mailto:campillogonzalezlaura@gmail.com"
                id="hero-email-chip"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 text-brand-dark px-6 py-3 rounded-full border border-brand-border shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-secondary">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-sans text-sm font-semibold tracking-wide">campillogonzalezlaura@gmail.com</span>
              </a>

              <a 
                href="tel:654922657"
                id="hero-phone-chip"
                className="flex items-center gap-3 bg-white hover:bg-gray-50 text-brand-dark px-6 py-3 rounded-full border border-brand-border shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-brand-secondary">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-sans text-sm font-semibold tracking-wide">654922657</span>
              </a>
            </div>
          </div>

          <div className="absolute top-[10%] left-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
        </section>

        {/* Competencias, Habilidades e Idiomas Segment */}
        <section id="habilidades" className="py-20 bg-white border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h3 className="newsreader-font text-3xl font-bold text-brand-primary border-b-4 border-brand-secondary w-fit pb-2 ml-1">
                Competencias &amp; Perfil
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Competencias / Humano-Social */}
              <div id="card-competencias" className="bg-brand-bg p-8 rounded-2xl border border-brand-border bento-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="bg-blue-100/70 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-blue-200">
                    <PenTool className="text-brand-secondary w-6 h-6" />
                  </div>
                  <h4 className="newsreader-font text-2xl font-bold mb-4 text-brand-primary">Competencias</h4>
                  <ul className="space-y-3 font-sans text-brand-muted">
                    {RESUME_DATA.competencias.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full mt-2.5 flex-shrink-0"></div>
                        <span className="text-sm tracking-wide leading-relaxed">{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-slate-200/60 mt-6 flex justify-between items-center">
                  <span className="text-[10px] font-sans font-semibold tracking-widest text-[#a2b2c4] uppercase">Sólida Vocación Periodística</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Habilidades Técnicas */}
              <div id="card-habilidades-tecnicas" className="bg-brand-bg p-8 rounded-2xl border border-brand-border bento-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="bg-blue-100/70 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-blue-200">
                    <Terminal className="text-brand-secondary w-6 h-6" />
                  </div>
                  <h4 className="newsreader-font text-2xl font-bold mb-4 text-brand-primary">Habilidades Técnicas</h4>
                  <p className="font-sans text-xs text-brand-muted mb-4">Herramientas digitales y metodologías clave que implemento:</p>
                  <div className="flex flex-wrap gap-2.5">
                    {RESUME_DATA.habilidadesTecnicas.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white text-brand-primary border border-brand-border hover:border-brand-secondary hover:text-brand-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200/60 mt-6">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100/60 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                    <span className="font-sans text-xs text-brand-muted leading-tight">Especializada en <strong>SEO on-page</strong> y análisis analítico.</span>
                  </div>
                </div>
              </div>

              {/* Idiomas */}
              <div id="card-idiomas" className="bg-brand-bg p-8 rounded-2xl border border-brand-border bento-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="bg-blue-100/70 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-blue-200">
                    <Globe className="text-brand-secondary w-6 h-6" />
                  </div>
                  <h4 className="newsreader-font text-2xl font-bold mb-4 text-brand-primary">Idiomas</h4>
                  <div className="space-y-6">
                    {RESUME_DATA.idiomas.map((idioma, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="font-sans text-sm font-bold text-brand-primary">{idioma.name}</span>
                          <span className="font-sans text-xs text-brand-secondary font-bold bg-blue-50 border border-blue-100/60 px-2 py-0.5 rounded">{idioma.level}</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-brand-secondary h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${idioma.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-200/60 mt-6 text-center text-xs text-brand-muted font-sans font-semibold">
                  Internacionalización de redacción y traducciones
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Experiencia Profesional */}
        <section id="experiencia" className="py-20 bg-brand-bg border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
            
            <div className="md:col-span-4 lg:col-span-4">
              <div className="sticky top-28">
                <h3 className="newsreader-font text-3.5xl font-bold text-brand-primary leading-tight">
                  Experiencia Profesional
                </h3>
                <p className="font-sans text-brand-muted mt-4 pr-6 leading-relaxed text-sm">
                  Mi trayectoria se centra en la creación, curaduría y gestión estratégica de contenidos digitales, con un enfoque analítico, veraz y de alta rentabilidad de clics.
                </p>
                <div className="mt-8 border-l-2 border-brand-secondary pl-4 py-1 bg-white/40 rounded-r-lg max-w-sm">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-secondary">Entorno e Impacto</span>
                  <p className="font-sans text-xs text-brand-dark font-medium mt-1">Sólida capacidad autónoma y adaptación al ritmo de redacciones veloces.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 lg:col-span-8 space-y-12 pl-2">
              {RESUME_DATA.experiencia.map((job, idx) => (
                <div key={idx} className="relative pl-8 timeline-line active-dot group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h4 className="newsreader-font text-2.5xl font-bold text-brand-primary group-hover:text-brand-secondary transition-colors duration-200">
                        {job.role} <span className="text-brand-secondary font-medium">– '{job.company}'</span>
                      </h4>
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-muted mt-1.5 flex items-center gap-2">
                        <span className="bg-white border border-brand-border px-2.5 py-1 rounded">
                          {job.type}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span>{job.duration}</span>
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2.5 font-sans text-sm text-brand-muted list-none">
                    {job.highlights.map((highlight, hidx) => (
                      <li key={hidx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-1" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Educación y Formación */}
        <section id="formacion" className="py-20 bg-white border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="newsreader-font text-4xl font-bold text-brand-primary">Educación y Formación</h3>
              <div className="h-1.5 w-24 bg-brand-secondary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Grados Académicos */}
              <div className="space-y-8">
                <h4 className="font-sans text-xs font-bold text-brand-secondary uppercase tracking-[0.2em] border-b border-brand-border pb-3 flex items-center gap-2">
                  <GraduationCap className="w-4.5 h-4.5 text-brand-secondary" />
                  Grados Académicos
                </h4>
                
                {RESUME_DATA.educacion.grados.map((grad, idx) => (
                  <div key={idx} className="bg-brand-bg p-6 rounded-xl border border-brand-border shadow-xs border-l-4 border-l-brand-secondary hover:shadow-md transition-all">
                    <span className="font-sans text-xs font-semibold bg-brand-secondary text-white px-3 py-1 rounded-sm">
                      {grad.year}
                    </span>
                    <h5 className="newsreader-font text-2xl font-bold mt-4 text-brand-primary">
                      {grad.title}
                    </h5>
                    <p className="font-sans text-sm text-brand-muted mt-1 font-medium italic">
                      {grad.school}
                    </p>
                  </div>
                ))}
              </div>

              {/* Formación Complementaria */}
              <div className="space-y-8">
                <h4 className="font-sans text-xs font-bold text-brand-secondary uppercase tracking-[0.2em] border-b border-brand-border pb-3 flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-brand-secondary" />
                  Formación Complementaria
                </h4>

                {RESUME_DATA.educacion.complementaria.map((comp, idx) => (
                  <div key={idx} className="bg-brand-bg p-6 rounded-xl border border-brand-border shadow-xs border-l-4 border-l-[#00488d] hover:shadow-md transition-all">
                    <span className="font-sans text-xs font-semibold bg-blue-150 text-brand-primary border border-brand-border px-3 py-1 rounded-sm">
                      {comp.year}
                    </span>
                    <h5 className="newsreader-font text-2.5xl font-bold mt-4 text-brand-primary">
                      {comp.title}
                    </h5>
                    <p className="font-sans text-sm text-brand-muted mt-1 font-semibold">
                      {comp.school}
                    </p>
                    {comp.desc && (
                      <p className="font-sans text-xs text-brand-muted mt-3 italic leading-relaxed bg-white/60 p-3 rounded border border-slate-200/50">
                        {comp.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Dynamic & Interactive Portfolio Center with Real-Time Article Reading */}
        <section id="portfolio" className="py-20 bg-brand-bg border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-sans text-xs font-bold text-brand-secondary uppercase tracking-widest block mb-2">Artículos &amp; Redacción</span>
                <h3 className="newsreader-font text-3.5xl font-bold text-brand-primary">
                  Piezas Periodísticas Destacadas
                </h3>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
                {["Todos", "Prensa Digital", "Escritura Creativa"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                      selectedCategory === cat 
                        ? "bg-brand-primary text-white shadow-sm" 
                        : "bg-white text-brand-muted hover:text-brand-primary border border-brand-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredArticles.map((article) => {
                const isLiked = !!likedArticles[article.id];
                return (
                  <article 
                    key={article.id}
                    onClick={() => {
                      if (article.externalUrl) {
                        window.open(article.externalUrl, "_blank", "noopener,noreferrer");
                      } else {
                        setActiveArticle(article);
                      }
                    }}
                    className="bg-white rounded-2xl border border-brand-border shadow-xs hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-brand-primary/90 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                          {article.category}
                        </div>
                      </div>

                      {/* Content Panel */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-sans mb-3">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Lectura: {article.readTime}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>

                        <h4 className="newsreader-font text-xl font-bold text-brand-primary line-clamp-2 hover:text-brand-secondary transition-colors duration-200">
                          {article.title}
                        </h4>

                        <p className="font-sans text-xs text-brand-muted mt-3 line-clamp-3 leading-relaxed">
                          {article.snippet}
                        </p>
                      </div>
                    </div>

                    {/* Bottom action panel */}
                    <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                      {article.externalUrl ? (
                        <a 
                          href={article.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-brand-secondary font-bold flex items-center gap-1 hover:text-blue-800 transition-colors"
                        >
                          Leer artículo completo
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs text-brand-secondary font-bold flex items-center gap-1">
                          Leer artículo completo
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <button 
                        onClick={(e) => handleLike(article.id, e)}
                        className={`p-2 rounded-full border transition-all ${isLiked ? "bg-red-50 border-red-200 text-red-500" : "bg-slate-50 border-slate-200 text-slate-400 hover:text-red-500"}`}
                        title="Recomendar artículo"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center bg-white p-12 rounded-xl border border-brand-border">
                <p className="font-sans text-brand-muted">No se han encontrado proyectos en esta categoría temporalmente.</p>
              </div>
            )}
          </div>
        </section>

        {/* Read Article Modal / Overlay Drawer */}
        {activeArticle && (
          <div className="fixed inset-0 bg-brand-primary/40 backdrop-blur-xs flex justify-end z-50 animate-fadeIn" onClick={() => setActiveArticle(null)}>
            <div 
              className="bg-white w-full max-w-2xl h-full flex flex-col justify-between overflow-y-auto shadow-2xl animate-slideOver"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div>
                <div className="relative h-64 bg-slate-900 text-white">
                  <img 
                    src={activeArticle.imageUrl} 
                    alt={activeArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                  <button 
                    onClick={() => setActiveArticle(null)}
                    className="absolute top-6 right-6 bg-brand-primary hover:bg-slate-800 text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="absolute bottom-6 px-8 left-0 right-0">
                    <span className="bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                      {activeArticle.category}
                    </span>
                    <h3 className="newsreader-font text-2.5xl md:text-3xl font-bold mt-3 leading-tight text-white drop-shadow-sm">
                      {activeArticle.title}
                    </h3>
                  </div>
                </div>

                {/* Article body content */}
                <div className="p-8 font-sans max-w-prose mx-auto">
                  <div className="flex items-center gap-4 text-slate-400 text-xs pb-6 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Por Laura Campillo González</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeArticle.readTime} de lectura</span>
                    </div>
                    <span>•</span>
                    <span>{activeArticle.date}</span>
                  </div>

                  {/* Scientific and beautiful markdown simulation with gorgeous spacing */}
                  <div className="prose text-brand-dark/90 leading-relaxed text-base space-y-4 font-normal">
                    {activeArticle.content.split("\n\n").map((para, pIdx) => {
                      if (para.startsWith("###")) {
                        return (
                          <h4 key={pIdx} className="newsreader-font text-2xl font-bold text-brand-primary pt-6 pb-2">
                            {para.replace("###", "").trim()}
                          </h4>
                        );
                      }
                      if (para.startsWith("*")) {
                        return (
                          <ul key={pIdx} className="space-y-2.5 my-4 bg-slate-50 border-l-4 border-brand-secondary p-4 rounded-r-lg">
                            {para.split("\n").map((li, lidx) => (
                              <li key={lidx} className="flex items-start gap-2.5 text-sm text-brand-muted">
                                <span className="text-brand-secondary font-bold">•</span>
                                <div>{li.replace("*", "").trim()}</div>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (para.startsWith("1.") || para.startsWith("2.") || para.startsWith("3.")) {
                        return (
                          <div key={pIdx} className="pl-4 space-y-1 my-3 text-sm text-brand-muted">
                            {para.split("\n").map((li, lidx) => (
                              <p key={lidx} className="leading-relaxed">
                                {li.trim()}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return <p key={pIdx} className="hanken-font text-slate-700 font-light leading-relaxed text-[15px]">{para}</p>;
                    })}
                  </div>
                </div>
              </div>

              {/* Modal footer sharing/liking */}
              <div className="p-8 pt-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => handleLike(activeArticle.id, e)}
                    className={`px-5 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 ${
                      likedArticles[activeArticle.id] 
                        ? "bg-red-50 border-red-200 text-red-500" 
                        : "bg-white border-brand-border text-brand-muted hover:text-red-500"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {likedArticles[activeArticle.id] ? "¡Recomendado!" : "Recomendar esta pieza"}
                  </button>
                </div>
                <div className="inline-flex gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("¡Enlace dinámico copiado al portapapeles con éxito!");
                    }}
                    className="bg-white hover:bg-slate-150 border border-brand-border text-brand-muted px-4 py-2 rounded-lg text-xs font-semibold tracking-wide"
                  >
                    Copiar Enlace
                  </button>
                  <button 
                    onClick={() => setActiveArticle(null)}
                    className="bg-brand-primary text-white hover:bg-slate-800 px-5 py-2 rounded-lg text-xs font-bold"
                  >
                    Cerrar Lectura
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}



      </main>

      {/* Footer Exactly Matching Visual Reference color specifications */}
      <footer className="bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="newsreader-font text-3xl font-bold text-brand-primary">Laura Campillo González</h2>
            <p className="font-sans text-sm text-brand-muted mt-1.5 font-medium">Periodista &amp; Especialista en Contenido Digital</p>
          </div>
          
          <div className="flex flex-col md:items-end gap-1.5 text-left md:text-right font-sans">
            <a 
              href="mailto:campillogonzalezlaura@gmail.com" 
              className="text-xs font-bold text-brand-muted hover:text-brand-secondary underline transition-colors"
            >
              campillogonzalezlaura@gmail.com
            </a>
            <span className="text-xs font-bold text-brand-muted">654922657</span>
            <div className="flex gap-4 mt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-brand-muted hover:text-brand-secondary text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
              >
                LinkedIn
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pb-8 text-center md:text-left border-t border-slate-100 pt-6">
          <p className="font-sans text-xs text-brand-muted/70">
            © {new Date().getFullYear()} Laura Campillo González. Periodista • Todos los derechos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
