'use client';

import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

const Github = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import styles from './ResumeShowcase.module.css';

export default function ResumeShowcase() {
  const currentYear = new Date().getFullYear();

  // Projects data
  const projects: {
    title: string;
    subtitle: string;
    tech: string[];
    bullets: string[];
    link?: string;
    demoLink?: string;
  }[] = [
    {
      title: 'ReliefChain',
      subtitle: 'Decentralized Disaster Relief Governance',
      tech: ['Next.js', 'Solidity', 'Polygon L2', 'IPFS', 'Claude API'],
      bullets: [
        'Built a transparent fund distribution system with milestone-based smart contracts, reducing admin overhead by 40–60%.',
        'Implemented AI fraud detection (Claude API) and geo-verification with a Sybil-resistant DAO voting system.',
        'Enabled account abstraction for zero-crypto-knowledge payments (UPI-to-USDC), WhatsApp verification, and IPFS audit trails.'
      ]
    },
    {
      title: 'AgroMind',
      subtitle: 'Precision Agriculture AI Platform',
      tech: ['Python', 'PyTorch', 'React', 'FastAPI'],
      bullets: [
        'Built an IoT-ML platform featuring 7 intelligent AI modules designed for modern smart agriculture.',
        'Developed prediction and optimization models for automated irrigation, crop health, and disease detection.',
        'Achieved high accuracy (91–94%), improved water efficiency by ~35%, and displayed insights via a multilingual dashboard.'
      ],
      link: 'https://github.com/rajdipmondal800-prog/Smart-Farming'
    },
    {
      title: '3D Animation Web Experience',
      subtitle: 'IGNITIA-26',
      tech: ['React.js', 'Three.js', 'GSAP', 'Vite'],
      bullets: [
        'Designed and developed the official technical festival portal featuring interactive 3D particle systems and custom camera paths.',
        'Created high-performance scroll-driven and mouse-reactive animations using GSAP ScrollTrigger and Three.js.',
        'Optimized bundle size and asset loading pipelines, resulting in instantaneous rendering and smooth 60fps interaction.'
      ],
      link: 'https://github.com/jiyasarkar582-ops/IGNITIA-26-Website',
      demoLink: 'https://ignitia-26-website.vercel.app'
    }
  ];

  // Experience data
  const experience = [
    {
      role: 'Bio Signal Processing & Machine Learning Intern',
      company: 'IEDC Cell',
      date: 'Dec 2025 - Jan 2026',
      bullets: [
        'Trained and evaluated machine learning classification models on EMG signal datasets to detect muscle activity patterns.',
        'Implemented advanced data visualization techniques to plot and interpret EMG signals, supporting model performance analysis.',
        'Optimized Python classification pipelines for biological signal processing in healthcare domains.'
      ]
    },
    {
      role: 'Web Developer Intern',
      company: 'MyJobGrow',
      date: 'Nov 2025 - Jan 2026',
      bullets: [
        'Developed and optimized responsive web pages to enhance user interface experiences.',
        'Collaborated with engineering teams to deploy frontend logic in real-world environments.',
        'Debugged web app performance bottlenecks, optimizing page-load and rendering efficiency.'
      ]
    }
  ];

  // Skills dataset
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 size={18} />,
      skills: ['Java', 'Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'Matlab']
    },
    {
      title: 'Frontend & Design',
      icon: <Layers size={18} />,
      skills: ['React.js', 'Next.js', 'Tailwind CSS', 'CSS Modules', 'Three.js', 'GSAP']
    },
    {
      title: 'Backend & Data',
      icon: <Database size={18} />,
      skills: ['RESTful APIs', 'SpringBoot', 'JPA', 'MySQL', 'MongoDB', 'FastAPI', 'Node.js']
    },
    {
      title: 'Tools & Protocols',
      icon: <Cpu size={18} />,
      skills: ['Git', 'GitHub', 'IPFS', 'Solidity', 'Polygon L2', 'Claude API']
    }
  ];

  // Certifications data
  const certifications = [
    {
      title: 'Programming in Java (Elite Silver - Score: 91%)',
      provider: 'NPTEL Online Certification | IIT Kharagpur',
    },
    {
      title: 'Cyber Security Fundamentals',
      provider: 'Credential ID ANKTO9PNKTTR',
    },
    {
      title: 'Advanced System Security Topics',
      provider: 'Credential ID PRO5Y6MT8HR1',
    },
    {
      title: 'Introduction to Programming with MATLAB',
      provider: 'Credential ID GOT021DPSYGE',
    },
    {
      title: 'Artificial Intelligence Fundamentals',
      provider: 'IBM Certification',
    }
  ];

  // Achievements data
  const achievements = [
    { rank: 'Finalist', event: 'Genspark 2.0', desc: 'National-level student hackathon competition' },
    { rank: 'Runner Up', event: 'Genovate 2025', desc: '1st Runner-up at innovation pitch' },
    { rank: 'Finalist', event: 'Srijan’26', desc: 'Annual national techno-management summit' },
    { rank: '2nd Place', event: 'Ureckon Coding Challenge', desc: 'International competitive programming challenge' },
    { rank: 'Top 6', event: 'AURORA\'26', desc: 'National level ideathon and prototyping hack' },
    { rank: 'Runner Up', event: 'Cyber Canvas', desc: 'Graphics 2nd Runner-up' },
    { rank: '1st Place', event: 'EV Skilling Ecosystem', desc: 'Graphics & idea pitch competition winner' },
    { rank: 'Exceptional', event: 'ENERGIA 2026 Ideathon', desc: 'Outstanding solution at India Energy Week' },
    { rank: '3rd Place', event: 'IntelliVerse Poster', desc: 'Poster competition on Gen AI app building' },
    { rank: 'Presented', event: 'Ideathon 2024', desc: 'Pitch presentation and solution showcase' }
  ];

  return (
    <section id="showcase" className={styles.showcaseContainer}>
      {/* Glow overlays to maintain warm/cool cinematic vibe */}
      <div className={styles.bgGlowOrange} />
      <div className={styles.bgGlowBlue} />

      <div className={styles.showcaseContent}>
        {/* Section Header */}
        <header className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Selected Profile</div>
          <h2 className={styles.sectionTitle}>Craft & Credentials</h2>
        </header>

        {/* Technical Skills Section */}
        <div className={styles.skillsSection}>
          <h3 className={styles.columnTitle}>
            Technical Expertise
          </h3>
          <div className={styles.skillsCategoryGrid}>
            {skillCategories.map((category, index) => (
              <div key={index} className={styles.skillsCard}>
                <div className={styles.categoryTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {category.icon}
                  <span>{category.title}</span>
                </div>
                <div className={styles.skillPillsList}>
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className={styles.skillPill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects and History Grid */}
        <div className={styles.mainGrid}>
          {/* Projects Column */}
          <div className={styles.projectsColumn}>
            <h3 className={styles.columnTitle}>
              Featured Productions
            </h3>
            {projects.map((project, idx) => (
              <article key={idx} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <div>
                    <h4 className={styles.projectTitle}>{project.title}</h4>
                    <p style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontWeight: 500 }}>
                      {project.subtitle}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialBtn}
                        style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', gap: '6px' }}
                        aria-label={`View ${project.title} project code on GitHub`}
                      >
                        Code <ExternalLink size={12} />
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialBtn}
                        style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', gap: '6px', background: 'rgba(255, 118, 27, 0.15)', borderColor: 'var(--accent-orange)', color: 'var(--accent-orange)' }}
                        aria-label={`View ${project.title} live demo`}
                      >
                        Live <ArrowRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
                
                <ul className={styles.projectBullets}>
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className={styles.projectBullet}>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className={styles.projectTech}>
                  {project.tech.map((techItem, tIdx) => (
                    <span key={tIdx} className={styles.techPill}>
                      {techItem}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            {/* Achievements Section */}
            <div className={styles.achievementsSection}>
              <h3 className={styles.columnTitle}>
                <Award size={20} style={{ color: 'var(--accent-orange)' }} /> Achievements
              </h3>
              <div className={styles.achievementsList}>
                {achievements.map((ach, idx) => (
                  <div key={idx} className={styles.achievementRow}>
                    <div className={styles.achievementBadge}>
                      <span className={styles.trophyEmoji}>🏆</span> {ach.rank}
                    </div>
                    <div className={styles.achievementDetails}>
                      <h4 className={styles.achievementEvent}>{ach.event}</h4>
                      <p className={styles.achievementDesc}>{ach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* History Column */}
          <div className={styles.historyColumn}>
            {/* Experience Timeline */}
            <div>
              <h3 className={styles.columnTitle} style={{ marginBottom: '24px' }}>
                <Briefcase size={20} style={{ color: 'var(--accent-orange)' }} /> History
              </h3>
              <div className={styles.timeline}>
                {experience.map((exp, idx) => (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={styles.timelineNode} />
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineDate}>{exp.date}</span>
                      <h4 className={styles.timelineTitle}>{exp.role}</h4>
                      <span className={styles.timelineSubtitle}>{exp.company}</span>
                    </div>
                    <ul className={styles.timelineContent}>
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className={styles.timelineBullet}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className={styles.columnTitle} style={{ marginBottom: '24px' }}>
                <GraduationCap size={20} style={{ color: 'var(--accent-orange)' }} /> Education
              </h3>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineNode} />
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelineDate}>2024 - 2028</span>
                    <h4 className={styles.timelineTitle}>B.Tech in Computer Science (Internet of Things)</h4>
                    <span className={styles.timelineSubtitle}>Institute Of Engineering and Management, Kolkata</span>
                  </div>

                </div>
              </div>
            </div>

            {/* Certifications list */}
            <div>
              <h3 className={styles.columnTitle} style={{ marginBottom: '24px' }}>
                <Award size={20} style={{ color: 'var(--accent-orange)' }} /> Certifications
              </h3>
              <div className={styles.certsList}>
                {certifications.map((cert, idx) => (
                  <div key={idx} className={styles.certCard}>
                    <div className={styles.certBadge}>
                      <Award size={18} />
                    </div>
                    <div className={styles.certInfo}>
                      <span className={styles.certTitle}>{cert.title}</span>
                      <span className={styles.certProvider}>{cert.provider}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <footer className={styles.footerSection}>
          <div className={styles.contactGlass}>
            <h3 className={styles.contactTitle}>Let's Build Something Together</h3>
            <p className={styles.contactText}>
              I'm always open to discussing web application engineering, IoT integrations, and machine learning projects. Feel free to reach out!
            </p>
            <div className={styles.contactButtons}>
              <a
                href="mailto:jiyasarkar582@gmail.com"
                className={`${styles.socialBtn} ${styles.emailBtn}`}
              >
                <Mail size={16} /> Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/jiya-sarkar-872883322/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/jiyasarkar582-ops"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
          <div className={styles.copyright}>
            &copy; {currentYear} Jiya Sarkar. Designed with cinematic motion.
          </div>
        </footer>
      </div>
    </section>
  );
}
