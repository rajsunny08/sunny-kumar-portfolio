import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Download, ExternalLink,
  Github, Globe, Linkedin, Mail, Menu, Moon, Send, Sun, X, Braces, Layers3,
  Terminal, BriefcaseBusiness, MapPin, Sparkles
} from 'lucide-react';

const socials = [
  { label: 'GitHub', href: 'https://github.com/rajsunny08', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajsunny08/', icon: Linkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/u/iamsunnykumar0008/', icon: Code2 },
  { label: 'Freelancer', href: 'https://www.freelancer.in/u/sunnyk0008', icon: BriefcaseBusiness }
];

const projects = [
  {
    number: '01',
    name: 'SamadhanHub',
    category: 'COMMUNITY PLATFORM',
    description: 'A community problem-solving platform where people can share real-world problems, contribute solutions, and follow progress from open to solved.',
    stack: ['React / Web UI', 'Express.js', 'SQLite'],
    status: 'In development',
    note: 'Verified: homepage, problem listing, submission, details, status persistence, registration/login, and mobile layout. Other features need further verification.',
    symbol: 'S.'
  },
  {
    number: '02',
    name: 'VELORA FASHION',
    category: 'E-COMMERCE CONCEPT',
    description: 'A fashion storefront project exploring a polished shopping experience, product presentation, and responsive customer-facing pages.',
    stack: ['React', 'Node.js', 'CSS'],
    status: 'Feature status to verify',
    note: 'Add a live demo, repository, and a verified feature list before presenting this as a completed product.',
    symbol: 'V.'
  },
  {
    number: '03',
    name: 'Pinora Studio',
    category: 'DIGITAL RESOURCES',
    description: 'A digital resource website concept for discovering AI tools, Canva resources, useful digital products, and creative ideas.',
    stack: ['Web development', 'Content design', 'Digital products'],
    status: 'Feature status to verify',
    note: 'Project summary is based on the concept shared. Confirm current implementation and add a demo link when available.',
    symbol: 'P.'
  }
];

const skills = [
  { name: 'Java', group: 'LANGUAGE', icon: Braces },
  { name: 'JavaScript', group: 'LANGUAGE', icon: Code2 },
  { name: 'React', group: 'FRONTEND', icon: Layers3 },
  { name: 'Node.js', group: 'BACKEND', icon: Terminal },
  { name: 'HTML & CSS', group: 'WEB', icon: Globe },
  { name: 'SQL', group: 'DATABASE', icon: Code2 }
];

const articles = [
  { tag: 'BUILD IN PUBLIC', title: 'What I’m learning while building a community platform', excerpt: 'Notes on turning a product idea into a practical web application, one feature at a time.', date: 'Draft idea' },
  { tag: 'DEVELOPER NOTES', title: 'A simple checklist before calling a feature complete', excerpt: 'A practical reminder to test persistence, errors, responsive layouts, and real user flows.', date: 'Draft idea' },
  { tag: 'CAREER', title: 'Building projects that explain how you think', excerpt: 'Why a clear case study can show more than a list of technologies on a resume.', date: 'Draft idea' }
];

function SectionHeading({ eyebrow, title, description }) {
  return <div className="section-heading reveal">
    <div className="eyebrow"><span className="eyebrow-line" />{eyebrow}</div>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('sunny-theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [formState, setFormState] = useState({ type: '', message: '' });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('sunny-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function submitContact(event) {
    event.preventDefault();
    setSending(true);
    setFormState({ type: '', message: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to send your message.');
      setFormState({ type: 'success', message: 'Message saved successfully. Sunny can review it on the development server.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormState({ type: 'error', message: error.message || 'Could not reach the contact API. Make sure the backend is running.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#home" className="wordmark" onClick={closeMenu} aria-label="Sunny Kumar home"><span className="wordmark-icon">s<span>.</span></span><span className="wordmark-name">SUNNY KUMAR</span></a>
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {[['About', '#about'], ['Work', '#work'], ['Skills', '#skills'], ['Writing', '#writing'], ['Contact', '#contact']].map(([label, href]) =>
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          )}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a>
        </nav>
        <div className="header-actions">
          <button className="icon-button theme-button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="icon-button menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="pulse-dot" /> OPEN TO OPPORTUNITIES <span className="availability-divider">/</span> INDIA</div>
            <h1>Building useful<br />things for the <span className="gradient-text">web<span className="period">.</span></span></h1>
            <p className="hero-lead">Hey, I’m <strong>Sunny Kumar</strong> — a full stack developer and B.Tech graduate who enjoys turning ideas into practical digital experiences.</p>
            <p className="hero-secondary">I’m focused on building web applications, strengthening my engineering skills, and collaborating on meaningful projects.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowRight size={16} /></a>
              <a className="button button-secondary" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
            </div>
            <div className="social-row">
              {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}><Icon size={17} /></a>)}
              <span className="social-note">Find me around the web</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="profile-card">
              <div className="profile-card-top"><span>PROFILE / 001</span><span className="profile-card-status"><span className="pulse-dot" /> AVAILABLE</span></div>
              <div className="avatar-placeholder"><div className="avatar-ring"><span>SK</span></div><span className="avatar-plus">+</span></div>
              <div className="profile-name">Sunny Kumar</div>
              <div className="profile-role">FULL STACK DEVELOPER</div>
              <div className="profile-divider" />
              <div className="profile-detail"><span>BASED IN</span><strong>India</strong></div>
              <div className="profile-detail"><span>FOCUS</span><strong>Web applications</strong></div>
              <div className="profile-detail"><span>STATUS</span><strong className="status-text">Building & learning</strong></div>
              <div className="profile-card-bottom"><Code2 size={15} /><span>Ideas → Interfaces → Impact</span><Sparkles size={15} /></div>
            </div>
            <div className="floating-chip chip-code"><Code2 size={15} /> Clean code, clear intent</div>
            <div className="floating-chip chip-stack"><span className="mini-stack">JS</span> Full stack journey</div>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="intro-strip">
          <div className="section-wrap intro-strip-inner"><span className="mono-label">CURRENTLY EXPLORING</span><div className="intro-strip-items"><span>Full Stack Development</span><i /> <span>Product Thinking</span><i /> <span>Real-world Projects</span></div></div>
        </section>

        <section className="section-wrap section-block" id="about">
          <SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Curiosity first.<br /><span className="muted-heading">Build with purpose.</span></>} description="I like learning by making things that solve real problems." />
          <div className="about-grid">
            <div className="about-story reveal">
              <p className="large-copy">I’m a B.Tech graduate (2025) building my path as a <span className="text-accent">full stack developer</span>.</p>
              <p>I enjoy working across the frontend and backend, understanding how a product fits together, and improving it through iteration. My current portfolio includes projects around community problem-solving, fashion storefront experiences, and digital resources.</p>
              <p>I’m also interested in the product side of software: choosing useful features, listening to users, and keeping the experience simple and accessible.</p>
              <a className="text-link" href="#contact">Have a project in mind? <ArrowUpRight size={15} /></a>
            </div>
            <div className="about-facts reveal">
              <div className="fact-card"><span className="fact-number">01</span><div><h3>Build</h3><p>Turn ideas into usable interfaces and application flows.</p></div></div>
              <div className="fact-card"><span className="fact-number">02</span><div><h3>Learn</h3><p>Improve through hands-on development and problem solving.</p></div></div>
              <div className="fact-card"><span className="fact-number">03</span><div><h3>Iterate</h3><p>Test, refine, and make each project more reliable.</p></div></div>
            </div>
          </div>
        </section>

        <section className="section-wrap section-block" id="work">
          <SectionHeading eyebrow="SELECTED WORK" title={<>Projects in progress.<br /><span className="muted-heading">Ideas taking shape.</span></>} description="A selection of projects and product ideas. Status notes are included so the scope stays transparent." />
          <div className="project-grid">
            {projects.map((project) => <article className="project-card reveal" key={project.name}>
              <div className="project-card-top"><span className="project-number">{project.number} / PROJECT</span><span className="project-symbol">{project.symbol}</span></div>
              <div className={`project-art project-art-${project.number}`}><div className="art-grid" /><div className="art-window"><div className="art-window-bar"><i /><i /><i /></div><div className="art-window-content"><span className="art-line art-line-long" /><span className="art-line art-line-medium" /><div className="art-pills"><i /><i /><i /></div><span className="art-line art-line-short" /></div></div><span className="art-index">{project.number}</span></div>
              <div className="project-content">
                <div className="project-category">{project.category}</div><h3>{project.name}</h3><p className="project-description">{project.description}</p>
                <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-status"><span className="status-dot" />{project.status}</div>
                <p className="project-note">{project.note}</p>
                <a className="text-link" href={project.name === 'SamadhanHub' ? 'https://github.com/rajsunny08' : '#contact'} target={project.name === 'SamadhanHub' ? '_blank' : undefined} rel={project.name === 'SamadhanHub' ? 'noreferrer' : undefined}>{project.name === 'SamadhanHub' ? 'Explore GitHub profile' : 'Ask about this project'} <ArrowUpRight size={15} /></a>
              </div>
            </article>)}
          </div>
          <div className="project-footer reveal"><span>More projects will be added as they’re ready to share.</span><a href="https://github.com/rajsunny08" target="_blank" rel="noreferrer" className="button button-secondary">Visit GitHub <Github size={16} /></a></div>
        </section>

        <section className="skills-section" id="skills"><div className="section-wrap section-block">
          <SectionHeading eyebrow="TOOLS & TECHNOLOGIES" title={<>My current <span className="muted-heading">toolkit.</span></>} description="Technologies I’m working with and developing further. This list reflects the skills you supplied." />
          <div className="skills-grid">{skills.map(({ name, group, icon: Icon }, index) => <div className="skill-card reveal" key={name}><div className="skill-top"><span className="skill-icon"><Icon size={19} /></span><span className="skill-index">0{index + 1}</span></div><h3>{name}</h3><span className="skill-group">{group}</span><div className="skill-bottom"><span>IN MY TOOLKIT</span><ArrowUpRight size={14} /></div></div>)}</div>
          <div className="learning-note reveal"><Sparkles size={18} /><p><strong>Always learning.</strong> I’m continuing to strengthen my foundations by building, debugging, and reviewing real application workflows.</p></div>
        </div></section>

        <section className="section-wrap section-block" id="journey">
          <SectionHeading eyebrow="THE JOURNEY SO FAR" title={<>Learning by <span className="muted-heading">doing.</span></>} description="A concise overview of my education and current development focus." />
          <div className="timeline">
            <div className="timeline-item reveal"><div className="timeline-marker"><span /></div><div className="timeline-date">2025</div><div className="timeline-content"><div className="timeline-top"><h3>B.Tech graduate</h3><span className="timeline-pill">EDUCATION</span></div><p>Completed a Bachelor of Technology degree. I’m applying my technical foundation through continued software development practice.</p></div></div>
            <div className="timeline-item reveal"><div className="timeline-marker"><span /></div><div className="timeline-date">2026 — NOW</div><div className="timeline-content"><div className="timeline-top"><h3>Independent project development</h3><span className="timeline-pill">BUILDING</span></div><p>Working on portfolio projects including SamadhanHub, while developing web application skills and exploring practical product ideas.</p></div></div>
            <div className="timeline-item reveal"><div className="timeline-marker"><span /></div><div className="timeline-date">NEXT</div><div className="timeline-content"><div className="timeline-top"><h3>Collaborate & grow</h3><span className="timeline-pill">OPEN</span></div><p>Looking for opportunities to contribute to software teams, learn from real projects, and collaborate with clients on clearly scoped work.</p></div></div>
          </div>
        </section>

        <section className="services-section"><div className="section-wrap section-block">
          <SectionHeading eyebrow="HOW I CAN HELP" title={<>Let’s make something <span className="muted-heading">useful.</span></>} description="Potential areas of collaboration. Scope, timelines, and technical fit can be discussed before a project begins." />
          <div className="services-grid">
            <article className="service-card reveal"><span className="service-icon"><Layers3 size={20} /></span><span className="service-number">01</span><h3>Frontend development</h3><p>Responsive web interfaces with clear layouts, reusable components, and attention to usability.</p><a href="#contact" className="text-link">Discuss a project <ArrowUpRight size={14} /></a></article>
            <article className="service-card reveal"><span className="service-icon"><Terminal size={20} /></span><span className="service-number">02</span><h3>Full stack web apps</h3><p>Help planning and building web application features across the user interface and API layer.</p><a href="#contact" className="text-link">Discuss a project <ArrowUpRight size={14} /></a></article>
            <article className="service-card reveal"><span className="service-icon"><Braces size={20} /></span><span className="service-number">03</span><h3>Project improvements</h3><p>Work through bugs, improve existing UI flows, and make project behaviour easier to understand and test.</p><a href="#contact" className="text-link">Discuss a project <ArrowUpRight size={14} /></a></article>
          </div>
        </div></section>

        <section className="section-wrap section-block" id="writing">
          <SectionHeading eyebrow="NOTES FROM THE BUILD" title={<>Writing & <span className="muted-heading">ideas.</span></>} description="Potential article topics for sharing lessons from projects. These are draft ideas, not published articles." />
          <div className="article-grid">{articles.map((article, index) => <article className="article-card reveal" key={article.title}><div className="article-meta"><span>{article.tag}</span><span>{article.date}</span></div><div className="article-number">0{index + 1}</div><h3>{article.title}</h3><p>{article.excerpt}</p><span className="article-draft"><span className="status-dot" /> Topic idea</span></article>)}</div>
        </section>

        <section className="contact-section" id="contact"><div className="section-wrap section-block contact-grid">
          <div className="contact-copy reveal"><div className="eyebrow"><span className="eyebrow-line" /> GET IN TOUCH</div><h2>Have an idea?<br /><span className="muted-heading">Let’s talk.</span></h2><p>I’m open to suitable developer opportunities, freelance projects, and thoughtful collaborations. Share a little about what you’re building.</p><a className="contact-email" href="mailto:hello@example.com"><Mail size={18} /> hello@example.com <ArrowUpRight size={15} /></a><div className="contact-socials">{socials.map(({ label, href, icon: Icon }) => <a href={href} target="_blank" rel="noreferrer" key={label}>{label}<ArrowUpRight size={13} /></a>)}</div></div>
          <form className="contact-form reveal" onSubmit={submitContact}>
            <div className="form-heading"><span>START A CONVERSATION</span><span className="form-live"><span className="pulse-dot" /> API FORM</span></div>
            <div className="form-row"><label>Your name<input name="name" value={form.name} onChange={updateField} placeholder="Jane Smith" minLength="2" maxLength="80" required /></label><label>Email address<input type="email" name="email" value={form.email} onChange={updateField} placeholder="jane@example.com" maxLength="160" required /></label></div>
            <label>Subject<input name="subject" value={form.subject} onChange={updateField} placeholder="Project inquiry / Job opportunity" maxLength="120" required /></label>
            <label>What would you like to build?<textarea name="message" value={form.message} onChange={updateField} placeholder="A little context about your idea, goals, and timeline..." rows="5" minLength="10" maxLength="3000" required /></label>
            <button className="button button-primary submit-button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} {sending ? <span className="spinner" /> : <Send size={15} />}</button>
            {formState.message && <p className={`form-feedback ${formState.type}`} role="status">{formState.type === 'success' ? <Check size={16} /> : <X size={16} />}{formState.message}</p>}
            <p className="form-privacy">This demo stores submissions on the local API server. It does not send email yet.</p>
          </form>
        </div></section>
      </main>

      <footer className="site-footer"><div className="section-wrap footer-top"><a href="#home" className="wordmark"><span className="wordmark-icon">s<span>.</span></span><span className="wordmark-name">SUNNY KUMAR</span></a><p>Built with curiosity, code, and a lot of iteration.</p><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a></div><div className="section-wrap footer-bottom"><span>© {new Date().getFullYear()} Sunny Kumar</span><span>REACT <i /> NODE.JS <i /> MADE TO GROW</span><a href="/sunny-kumar-resume.txt" download><Download size={14} /> Download resume</a></div></footer>
    </div>
  );
}
