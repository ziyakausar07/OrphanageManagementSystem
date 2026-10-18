import React from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="front-page-container">
      {/* ===== STICKY GLASS NAVBAR ===== */}
      <header className="front-navbar">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-logo-icon">🏡</div>
          <div>
            <h1 className="brand-name">SUSHANTI CHILDREN HOME</h1>
            <p className="brand-tagline">Nurturing Hope, Transforming Young Lives</p>
          </div>
        </div>

        <nav className="nav-links-desktop">
          <a href="#about">About</a>
          <a href="#impact">Our Impact</a>
          <a href="#programs">Programs</a>
          <a href="#testimonials">Stories</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button className="btn-nav-login" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button className="btn-nav-cta" onClick={() => navigate("/signup")}>
            Get Involved ✨
          </button>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="trust-pill animate-fade-in">
            <span className="heart-pulse">❤️</span> Serving & Protecting Over 250+ Children
          </div>

          <h1 className="hero-heading animate-slide-up">
            Every Child Deserves Love, Dignity & A <span className="highlight-text">Brighter Future</span>
          </h1>

          <p className="hero-subtitle animate-slide-up">
            At Sushanti Children Home, we believe no child should grow up without warmth, education, and safety. Together with generous hearts like yours, we turn vulnerability into strength and despair into opportunity.
          </p>

          <div className="hero-buttons-group">
            <button className="btn-hero-primary" onClick={() => navigate("/signup")}>
              Join Our Mission 🤝
            </button>
            <button className="btn-hero-secondary" onClick={() => navigate("/login")}>
              Donor & Staff Portal ➔
            </button>
          </div>

          <div className="hero-trust-row">
            <div className="trust-item">
              <span className="trust-check">✓</span> 100% Transparent Care
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span> Certified Child Welfare
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span> Loving Family Environment
            </div>
          </div>
        </div>

        {/* Hero Visual Collage */}
        <div className="hero-visual-wrapper">
          <div className="visual-card-large">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=700&q=80"
              alt="Happy learning children"
              className="visual-img"
            />
            <div className="floating-badge badge-top-right">
              <span className="badge-icon">🎓</span>
              <div>
                <strong>98%</strong>
                <small>School Attendance</small>
              </div>
            </div>
          </div>

          <div className="visual-card-small">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=80"
              alt="Caring smile"
              className="visual-img"
            />
            <div className="floating-badge badge-bottom-left">
              <span className="badge-icon">🍲</span>
              <div>
                <strong>3 Healthy Meals</strong>
                <small>Daily Nutrition</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT METRICS STRIP ===== */}
      <section id="impact" className="impact-section">
        <div className="impact-grid">
          <div className="impact-card">
            <span className="impact-number">50+</span>
            <span className="impact-label">Children in Care</span>
            <p className="impact-sub">Sheltered with safe beds, clean clothes & round-the-clock love</p>
          </div>
          <div className="impact-card">
            <span className="impact-number">150+</span>
            <span className="impact-label">Generous Donors</span>
            <p className="impact-sub">Compassionate individuals & groups making everyday miracles possible</p>
          </div>
          <div className="impact-card">
            <span className="impact-number">35+</span>
            <span className="impact-label">Happy Adoptions</span>
            <p className="impact-sub">Legally and ethically matched into caring permanent families</p>
          </div>
          <div className="impact-card">
            <span className="impact-number">24/7</span>
            <span className="impact-label">Dedicated Staff</span>
            <p className="impact-sub">Caregivers, educators, cooks and mentors nurturing every step</p>
          </div>
        </div>
      </section>

      {/* ===== OUR CORE PILLARS ===== */}
      <section id="programs" className="programs-section">
        <div className="section-header">
          <span className="section-tag">What We Provide</span>
          <h2 className="section-title">Holistic Support Designed For Every Child</h2>
          <p className="section-desc">We go beyond simple shelter to offer complete physical, emotional, and intellectual enrichment.</p>
        </div>

        <div className="programs-grid">
          <div className="program-card">
            <div className="program-icon-box bg-orange">🏡</div>
            <h3 className="program-title">Safe & Loving Home</h3>
            <p className="program-text">
              Comfortable dormitories, 24/7 adult supervision, clean sanitization, and a peaceful environment where children sleep with peace of mind.
            </p>
          </div>

          <div className="program-card">
            <div className="program-icon-box bg-teal">📚</div>
            <h3 className="program-title">Quality Formal Education</h3>
            <p className="program-text">
              School admissions in accredited institutions, individualized tutoring, computer literacy labs, and library resources to secure bright careers.
            </p>
          </div>

          <div className="program-card">
            <div className="program-icon-box bg-amber">🥗</div>
            <h3 className="program-title">Wholesome Nutrition & Health</h3>
            <p className="program-text">
              Custom pediatric nutrition charts, regular medical checkups, immunizations, and emotional counseling for complete well-being.
            </p>
          </div>

          <div className="program-card">
            <div className="program-icon-box bg-rose">🤝</div>
            <h3 className="program-title">Transparent Adoption & Care</h3>
            <p className="program-text">
              Strict compliance with legal adoption protocols to ensure prospective parents are vetted and children find true, enduring love.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW YOU CAN HELP ===== */}
      <section id="about" className="help-section">
        <div className="help-banner">
          <div className="help-banner-content">
            <h2 className="help-heading">Ready To Bring A Real Smile?</h2>
            <p className="help-text">
              Whether you choose to sponsor an educational kit, donate clothes or meals, or begin an adoption journey — your touch creates ripples of lasting hope.
            </p>
            <div className="help-actions">
              <button className="btn-hero-primary" onClick={() => navigate("/signup")}>
                Become A Donor Today 💝
              </button>
              <button className="btn-banner-white" onClick={() => navigate("/login")}>
                Inquire For Adoption 🏡
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VOICES OF LOVE (TESTIMONIALS) ===== */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <span className="section-tag">Heartwarming Stories</span>
          <h2 className="section-title">Words From Those Who Walk With Us</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Seeing how meticulously and lovingly Sushanti Home manages every donation makes you realize the power of honesty and genuine compassion. The children radiate so much joy!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div>
                <strong>Anita Sharma</strong>
                <small>Monthly Education Sponsor</small>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "The adoption process was transparent, respectful, and put our little daughter’s best interests first. Today our home is complete, and we owe endless gratitude."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: '#0d9488' }}>R</div>
              <div>
                <strong>Rajesh & Priya Verma</strong>
                <small>Adoptive Parents</small>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              "Working as a caregiver here isn't just a job; it's a calling. Watching a child heal from trauma and thrive in their studies is the greatest reward in the world."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: '#ea580c' }}>S</div>
              <div>
                <strong>Sunita Devi</strong>
                <small>Senior Child Caretaker</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="contact" className="front-footer">
        <div className="footer-content">
          <div className="footer-col-main">
            <div className="nav-brand" style={{ marginBottom: '12px' }}>
              <div className="brand-logo-icon">🏡</div>
              <h3 className="brand-name" style={{ color: '#ffffff' }}>Sushanti Children Home</h3>
            </div>
            <p className="footer-about">
              A recognized haven dedicated to the protection, education, and moral upbringing of parentless children. Registered Non-Profit Organization.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About Our Mission</a></li>
              <li><a href="#programs">Child Care Programs</a></li>
              <li><a href="#impact">Impact Report</a></li>
              <li><span onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>Staff / Admin Login</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Reach Out</h4>
            <p className="footer-contact-item">📍 Main Campus, Sushanti Enclave</p>
            <p className="footer-contact-item">📞 +91 98765 43210 / (020) 2456-7890</p>
            <p className="footer-contact-item">✉️ care@sushantichildrenhome.org</p>
            <p className="footer-contact-item">🕒 Visiting Hours: 10:00 AM – 5:00 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sushanti Children Home. All rights reserved. Built with love & dedication.</p>
        </div>
      </footer>

      {/* ===== SCOPED CSS ===== */}
      <style>{`
        .front-page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          overflow-x: hidden;
        }

        /* Navbar */
        .front-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 48px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(254, 215, 170, 0.7);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.05);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .brand-logo-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 8px 18px rgba(249, 115, 22, 0.35);
        }

        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-size: 19px;
          font-weight: 800;
          color: #7c2d12;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .brand-tagline {
          font-size: 11px;
          font-weight: 600;
          color: #9a3412;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .nav-links-desktop {
          display: flex;
          gap: 28px;
        }

        .nav-links-desktop a {
          color: #475569;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .nav-links-desktop a:hover {
          color: #f97316;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-nav-login {
          padding: 8px 20px;
          background: transparent;
          border: 1.5px solid #fed7aa;
          color: #ea580c;
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-nav-login:hover {
          background: #fff7ed;
          border-color: #f97316;
        }

        .btn-nav-cta {
          padding: 9px 22px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(249, 115, 22, 0.35);
          transition: all 0.2s;
        }

        .btn-nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(249, 115, 22, 0.45);
        }

        /* Hero */
        .hero-section {
          padding: 70px 48px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }

        .trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 30px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #9a3412;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 22px;
        }

        .heart-pulse {
          animation: floatSoft 2s ease-in-out infinite;
        }

        .hero-heading {
          font-size: 52px;
          line-height: 1.15;
          color: #1e293b;
          margin-bottom: 22px;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .highlight-text {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 17px;
          color: #475569;
          line-height: 1.65;
          margin-bottom: 32px;
          max-width: 560px;
        }

        .hero-buttons-group {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          padding: 15px 32px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(249, 115, 22, 0.4);
          transition: all 0.25s ease;
        }

        .btn-hero-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px rgba(249, 115, 22, 0.5);
        }

        .btn-hero-secondary {
          padding: 15px 28px;
          background: #ffffff;
          color: #1e293b;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-hero-secondary:hover {
          border-color: #f97316;
          color: #ea580c;
          transform: translateY(-2px);
          background: #fff7ed;
        }

        .hero-trust-row {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          font-weight: 600;
          color: #64748b;
        }

        .trust-check {
          color: #10b981;
          font-weight: 800;
        }

        /* Hero Visual Collage */
        .hero-visual-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .visual-card-large {
          width: 320px;
          height: 420px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.35);
          position: relative;
          border: 6px solid #ffffff;
        }

        .visual-card-small {
          width: 220px;
          height: 260px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.25);
          position: absolute;
          bottom: -30px;
          left: -40px;
          border: 5px solid #ffffff;
        }

        .visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .visual-card-large:hover .visual-img,
        .visual-card-small:hover .visual-img {
          transform: scale(1.05);
        }

        .floating-badge {
          position: absolute;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 10px 16px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(254, 215, 170, 0.8);
        }

        .badge-top-right {
          top: 20px;
          right: -20px;
        }

        .badge-bottom-left {
          bottom: 20px;
          right: 15px;
        }

        .badge-icon {
          font-size: 24px;
        }

        .floating-badge strong {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          color: #7c2d12;
          line-height: 1.1;
        }

        .floating-badge small {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
        }

        /* Impact Section */
        .impact-section {
          background: linear-gradient(180deg, #fffaf5 0%, #fff1f2 100%);
          padding: 60px 48px;
          border-top: 1px solid #fed7aa;
          border-bottom: 1px solid #fed7aa;
        }

        .impact-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 28px;
        }

        .impact-card {
          background: #ffffff;
          padding: 30px 24px;
          border-radius: 20px;
          border: 1px solid rgba(254, 215, 170, 0.8);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.1);
          text-align: center;
          transition: transform 0.25s ease;
        }

        .impact-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 35px -5px rgba(249, 115, 22, 0.2);
        }

        .impact-number {
          display: block;
          font-family: 'Outfit', sans-serif;
          font-size: 44px;
          font-weight: 800;
          color: #ea580c;
          margin-bottom: 4px;
          line-height: 1;
        }

        .impact-label {
          display: block;
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .impact-sub {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.4;
          margin: 0;
        }

        /* Programs Section */
        .programs-section {
          padding: 90px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 50px auto;
        }

        .section-tag {
          display: inline-block;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #f97316;
          background: #fff7ed;
          padding: 4px 14px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .section-title {
          font-size: 36px;
          color: #1e293b;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }

        .section-desc {
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
        }

        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 28px;
        }

        .program-card {
          background: #ffffff;
          padding: 32px 26px;
          border-radius: 22px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          transition: all 0.25s ease;
        }

        .program-card:hover {
          transform: translateY(-6px);
          border-color: #fdba74;
          box-shadow: 0 16px 36px -6px rgba(249, 115, 22, 0.15);
        }

        .program-icon-box {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          margin-bottom: 20px;
        }

        .bg-orange { background: #ffedd5; }
        .bg-teal   { background: #ccfbf1; }
        .bg-amber  { background: #fef3c7; }
        .bg-rose   { background: #ffe4e6; }

        .program-title {
          font-size: 20px;
          color: #1e293b;
          margin-bottom: 10px;
        }

        .program-text {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }

        /* Help Section Banner */
        .help-section {
          padding: 20px 48px 80px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .help-banner {
          background: linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #c2410c 100%);
          border-radius: 30px;
          padding: 60px 48px;
          color: white;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(154, 52, 18, 0.45);
          position: relative;
          overflow: hidden;
        }

        .help-banner::after {
          content: '💖';
          position: absolute;
          font-size: 180px;
          opacity: 0.08;
          right: -20px;
          bottom: -40px;
        }

        .help-banner-content {
          max-width: 680px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .help-heading {
          font-size: 38px;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .help-text {
          font-size: 16.5px;
          color: #ffedd5;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .help-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-banner-white {
          padding: 15px 30px;
          background: #ffffff;
          color: #9a3412;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-banner-white:hover {
          background: #ffedd5;
          transform: translateY(-2px);
        }

        /* Testimonials */
        .testimonials-section {
          background: #fffaf5;
          padding: 80px 48px;
          border-top: 1px solid #fed7aa;
        }

        .testimonials-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }

        .testimonial-card {
          background: #ffffff;
          padding: 32px 28px;
          border-radius: 22px;
          border: 1px solid rgba(254, 215, 170, 0.7);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .testimonial-quote {
          font-size: 15px;
          color: #334155;
          font-style: italic;
          line-height: 1.65;
          margin-bottom: 24px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .author-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #f97316;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 17px;
        }

        .testimonial-author strong {
          display: block;
          font-size: 14.5px;
          color: #1e293b;
        }

        .testimonial-author small {
          font-size: 12px;
          color: #64748b;
        }

        /* Footer */
        .front-footer {
          background: #1c1917;
          color: #a8a29e;
          padding: 60px 48px 30px 48px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: 50px;
          padding-bottom: 40px;
          border-bottom: 1px solid #292524;
        }

        .footer-about {
          font-size: 14px;
          line-height: 1.6;
          max-width: 380px;
          color: #a8a29e;
        }

        .footer-heading {
          font-size: 16px;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 10px;
        }

        .footer-links a {
          color: #a8a29e;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #f97316;
        }

        .footer-contact-item {
          font-size: 13.5px;
          margin-bottom: 8px;
          color: #d6d3d1;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 20px auto 0 auto;
          text-align: center;
          font-size: 13px;
          color: #78716c;
        }

        @media (max-width: 960px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 40px 24px;
          }

          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons-group, .hero-trust-row {
            justify-content: center;
          }

          .hero-visual-wrapper {
            margin-top: 40px;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .nav-links-desktop {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FrontPage;
