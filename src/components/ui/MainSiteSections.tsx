import React, { useState, useEffect } from 'react';
import { PersonCard, PersonItem } from './PersonCard';
import { soundManager } from '../../lib/audio';

// Incharges Data
const INCHARGES_DATA: PersonItem[] = [
  {
    name: 'Dr. Tejashree V. Shanbhag',
    role: 'I/C Principal, K.C. College',
    photo: '/images/people/dr-tejashree-v-shanbhag.jpg',
    initials: 'TS'
  },
  {
    name: 'Dr. Hemlata K. Baghla',
    role: 'Vice Chancellor, HSNC University',
    photo: '/images/people/dr-hemlata-k-baghla.jpg',
    initials: 'HB'
  },
  {
    name: 'Dr. Shalini R. Sinha',
    role: 'Vice-Principal',
    photo: '/images/people/dr-shalini-r-sinha.jpg',
    initials: 'SS'
  },
  {
    name: 'Dr. Rajesh Samant',
    role: 'Vice-Principal',
    photo: '/images/people/dr-rajesh-samant.jpg',
    initials: 'RS'
  },
  {
    name: 'Dr. Ritika Pathak',
    role: 'Vice-Principal',
    photo: '/images/people/dr-ritika-pathak.jpg',
    initials: 'RP'
  },
  {
    name: 'Ms. Geeta Brijwani',
    role: 'Coordinator for BCA',
    photo: '/images/people/ms-geeta-brijwani.jpg',
    initials: 'GB'
  }
];

// Teaching Faculty
const TEACHING_FACULTY: PersonItem[] = [
  {
    name: 'Divya Menon',
    role: 'Teaching Faculty',
    photo: '/images/people/divya-menon.jpg',
    initials: 'DM'
  },
  {
    name: 'Shahid Ansari',
    role: 'Teaching Faculty',
    photo: '/images/people/shahid-ansari.jpg',
    initials: 'SA'
  },
  {
    name: 'Maunash Jani',
    role: 'Teaching Faculty',
    photo: '/images/people/maunash-jani.jpg',
    initials: 'MJ'
  },
  {
    name: 'Ismail H.P',
    role: 'Teaching Faculty',
    photo: '/images/people/ismail-h-p.jpg',
    initials: 'IH'
  }
];

// Non-Teaching Faculty
const NON_TEACHING_FACULTY: PersonItem[] = [
  {
    name: 'Ashsih Gawde',
    role: 'Non-Teaching Faculty',
    photo: '/images/people/ashsih-gawde.jpg',
    initials: 'AG'
  },
  {
    name: 'Rakesh Sharma',
    role: 'Non-Teaching Faculty',
    photo: '/images/people/rakesh-sharma.jpg',
    initials: 'RS'
  },
  {
    name: 'Aditya Pandey',
    role: 'Non-Teaching Faculty',
    photo: '/images/people/aditya-pandey.jpg',
    initials: 'AP'
  }
];

// Head Team Leaders
const HEAD_TEAM: PersonItem[] = [
  {
    name: 'Pratham Shikotra',
    role: 'Core Member',
    photo: '/images/people/aadil-khan.jpg',
    initials: 'AK'
  },
  {
    name: 'Yashvi Mehta',
    role: 'Core Member',
    photo: '/images/people/khushi-parmar.jpg',
    initials: 'KP'
  },
  {
    name: 'Sumaiya Khan',
    role: 'Core Member',
    photo: '/images/people/rukaiya-mithaiwala.jpg',
    initials: 'RM'
  },
  {
    name: 'Shreya Chindarkar',
    role: 'Core Member',
    photo: '/images/people/kritika-penta.jpg',
    initials: 'KP'
  }
];

// Heads of Department
const HODS_DATA: PersonItem[] = [
  { name: 'Zafreen Pithawala', role: 'Social Media', photo: '/images/people/zafreen-pithawala.jpg', initials: 'ZP' },
  { name: 'Mayuresh Pandey', role: 'Social Media', photo: '/images/people/mayuresh-pandey.jpg', initials: 'MP' },
  { name: 'Shania Gomez', role: 'Technical', photo: '/images/people/shania-gomez.jpg', initials: 'SG' },
  { name: 'Samuel Bhowmik', role: 'Technical', photo: '/images/people/samuel-bhowmik.jpg', initials: 'SB' },
  { name: 'Riya Ramane', role: 'Decor', photo: '/images/people/riya-ramane.jpg', initials: 'RR' },
  { name: 'Kainaat Sayyed', role: 'Administration', photo: '/images/people/kainaat-sayyed.jpg', initials: 'KS' },
  { name: 'Vedant Darji', role: 'Security', photo: '/images/people/vedant-darji.jpg', initials: 'VD' },
  { name: 'Sanjivani Pandey', role: 'Security', photo: '/images/people/sanjivani-pandey.jpg', initials: 'SP' },
  { name: 'Aditya Erande', role: 'Security', photo: '/images/people/aditya-erande.jpg', initials: 'AE' },
  { name: 'Aafridi Choudhari', role: 'Logistics', photo: '/images/people/aafridi-choudhari.jpg', initials: 'AC' },
  { name: 'Majid Shaikh', role: 'Logistics', photo: '/images/people/majid-shaikh.jpg', initials: 'MS' },
  { name: 'Anas Ansari', role: 'Logistics', photo: '/images/people/anas-ansari.jpg', initials: 'AA' },
  { name: 'Rabab Kanwarsaheb', role: 'Hospitality', photo: '/images/people/rabab-kanwarsaheb.jpg', initials: 'RK' },
  { name: 'Arpit Choubey', role: 'Editing and Graphic Designing', photo: '/images/people/arpit-choubey.jpg', initials: 'AC' },
  { name: 'Uddish Bakshi', role: 'Editing and Graphic Designing', photo: '/images/people/uddish-bakshi.jpg', initials: 'UB' },
  { name: 'Kavyam Shah', role: 'Marketing and PR', photo: '/images/people/kavyam-shah.jpg', initials: 'KS' },
  { name: 'Anchal Kaur', role: 'Marketing and PR', photo: '/images/people/anchal-kaur.jpg', initials: 'AK' },
  { name: 'Riya Raisinghani', role: 'Creative Writing', photo: '/images/people/riya-raisinghani.jpg', initials: 'RR' },
  { name: 'Ishaan Keluskar', role: 'Coverage', photo: '/images/people/ishaan-keluskar.jpg', initials: 'IK' },
  { name: 'Shreyash Toraskar', role: 'Coverage', photo: '/images/people/shreyash-toraskar.jpg', initials: 'ST' },
  { name: 'Pushkar Umesh Modak', role: 'Editing', photo: '/images/people/pushkar-umesh-modak.jpg', initials: 'PM' }
];

export const MainSiteSections: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    soundManager.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <div className="w-full relative z-10">
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" onClick={handleNavClick} className="brand">
          <span className="logo">B.</span>
          <span>
            BitCA <small>TECH CLUB v2.4</small>
          </span>
        </a>

        <button
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
          className="menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home" onClick={handleNavClick}>Home</a>
          <a href="#about" onClick={handleNavClick}>About</a>
          <a href="#incharges" onClick={handleNavClick}>Incharges</a>
          <a href="#faculty" onClick={handleNavClick}>Faculty</a>
          <a href="#team" onClick={handleNavClick}>Head Team</a>
          <a href="#departments" onClick={handleNavClick}>HODs</a>
          <a href="#universes" onClick={handleNavClick}>Events</a>
        </nav>

        <a href="#universes" onClick={handleNavClick} className="button nav-button hidden sm:inline-block">
          Enter Multiverse ↗
        </a>
      </header>

      {/* HERO SECTION (CENTERED LAYOUT WITHOUT HEAVY 3D GLOBE) */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="tag">Visionexa 2025 & 2026</span>
          <h1>MULTIVERSE 404</h1>
          <h2 className="subtitle">
            REALITY <span>NOT FOUND.</span>
          </h2>
          <p>
            In a world where AI can generate content and predict behavior, how do we preserve our individuality?
            Explore the intersection of tech, culture, and humanity.
          </p>
          <p className="hero-subtext">When your mirror starts thinking, is it still a reflection?</p>
          <div className="hero-buttons">
            <a href="#universes" onClick={() => soundManager.playClick()} className="button">
              Explore the 7 Dimensions ↗
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (EDITORIAL SIDE-LABEL) */}
      <section className="section about-section" id="about">
        <div className="section-heading">
          <span className="eyebrow">01 / ABOUT BITCA</span>
          <h2>
            Where innovation meets <span>collaboration.</span>
          </h2>
        </div>
        <div className="about-content">
          <div aria-hidden="true" className="about-side-label">
            BITCA / 2.4
          </div>
          <div className="about-copy">
            <p>
              BitCA v2.4 is the official tech club of the Department of Computer Applications at K.C. College, under HSNC University.
              We are a community of passionate tech enthusiasts dedicated to exploring the ever-evolving world of technology, with a primary
              focus on Artificial Intelligence, emerging technologies, and hands-on technical learning.
            </p>
            <p>
              We regularly organize interactive workshops, seminars, and events on topics like AI, Cybersecurity, Web Development, and Data Science.
              At BitCA, we encourage innovation and knowledge sharing to prepare students for the tech-driven future.
              Whether you&apos;re a beginner or an advanced learner, BitCA is the place for you to innovate, explore, and create.
            </p>
          </div>
        </div>
      </section>

      {/* INCHARGES SECTION (OUR GUIDES) */}
      <section className="section features-section guides-section layout-portrait" id="incharges">
        <div className="section-heading">
          <span className="eyebrow">02 / OUR GUIDES</span>
          <h2>
            The <span>Guiding Hands</span> of our club
          </h2>
        </div>
        <div className="person-grid">
          {INCHARGES_DATA.map((person, idx) => (
            <PersonCard key={idx} person={person} />
          ))}
        </div>
      </section>

      {/* FACULTY SECTION (TEACHING & NON-TEACHING) */}
      <section className="section faculty-section layout-faculty" id="faculty">
        <div className="section-heading">
          <span className="eyebrow">03 / OUR FACULTY</span>
          <h2>
            The people who <span>support our learning.</span>
          </h2>
          <p>Meet the teaching and non-teaching faculty who support the Department of Computer Applications.</p>
        </div>

        {/* Teaching Faculty */}
        <div className="faculty-group">
          <div className="faculty-group-heading">
            <span className="faculty-index">03.1</span>
            <div>
              <h3>Teaching Faculty</h3>
              <p>Guidance, knowledge, and learning.</p>
            </div>
          </div>
          <div className="person-grid faculty-grid">
            {TEACHING_FACULTY.map((person, idx) => (
              <PersonCard key={idx} person={person} />
            ))}
          </div>
        </div>

        {/* Non-Teaching Faculty */}
        <div className="faculty-group non-teaching-group">
          <div className="faculty-group-heading">
            <span className="faculty-index">03.2</span>
            <div>
              <h3>Non-Teaching Faculty</h3>
              <p>The people who help everything run smoothly.</p>
            </div>
          </div>
          <div className="person-grid faculty-grid">
            {NON_TEACHING_FACULTY.map((person, idx) => (
              <PersonCard key={idx} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* HEAD TEAM LEADERSHIP */}
      <section className="section team-section layout-leadership" id="team">
        <div className="section-heading">
          <span className="eyebrow">04 / HEAD TEAM</span>
          <h2>
            The <span>Leaders</span> of the club
          </h2>
        </div>
        <div className="person-grid">
          {HEAD_TEAM.map((person, idx) => (
            <PersonCard key={idx} person={person} />
          ))}
        </div>
      </section>

      {/* HEADS OF DEPARTMENT (HODs DIRECTORY) */}
      <section className="section department-heads-section layout-directory" id="departments">
        <div className="section-heading">
          <span className="eyebrow">05 / HEADS OF DEPARTMENT</span>
          <h2>
            Teams with <span>purpose.</span>
          </h2>
          <p>The student leads and department teams that help bring BitCA activities to life.</p>
        </div>
        <div className="person-grid department-heads-grid">
          {HODS_DATA.map((person, idx) => (
            <PersonCard key={idx} person={person} />
          ))}
        </div>
      </section>
    </div>
  );
};
