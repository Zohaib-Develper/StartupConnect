import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const { projects } = useSelector((state) => state.projects);
  const totalFunded = projects.reduce((acc, p) => acc + p.fundingRaised, 0);
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const fundedProjects = projects.filter((p) => p.status === 'funded').length;

  return (
    <div id="home-page">
      {/* Hero Section */}
      <section
        className="position-relative d-flex align-items-center"
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%), var(--bg-primary)',
          overflow: 'hidden',
        }}
      >
        {/* Floating orbs */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse',
            pointerEvents: 'none',
          }}
        />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="animate-fade-in-up">
                <span
                  className="badge mb-3"
                  style={{
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: 'var(--primary-light)',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}
                >
                  <i className="bi bi-stars me-1"></i> #1 Startup Funding Platform
                </span>
                <h1
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: '1.5rem',
                  }}
                >
                  Where{' '}
                  <span
                    style={{
                      background: 'var(--primary-gradient)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Great Ideas
                  </span>{' '}
                  Meet{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Smart Money
                  </span>
                </h1>
                <p
                  style={{
                    fontSize: '1.15rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    maxWidth: '520px',
                  }}
                >
                  Connect with investors who believe in your vision. Launch your startup,
                  secure funding, and build the future — all from one platform.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link to="/register" className="btn btn-primary-custom btn-lg px-4 py-3" id="hero-get-started">
                    <i className="bi bi-rocket-takeoff me-2"></i>Get Started Free
                  </Link>
                  <Link to="/projects" className="btn btn-outline-custom btn-lg px-4 py-3" id="hero-explore">
                    Explore Startups <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6 animate-fade-in-up delay-2">
              <div
                className="glass-card p-4"
                style={{
                  animation: 'pulse-glow 4s ease-in-out infinite',
                }}
              >
                <div className="row g-3">
                  {projects.slice(0, 3).map((project, idx) => (
                    <div className="col-12" key={project.id}>
                      <div
                        className="d-flex align-items-center gap-3 p-3"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          borderRadius: 'var(--border-radius-sm)',
                          border: '1px solid var(--border-color)',
                          animationDelay: `${idx * 0.15}s`,
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '10px',
                            objectFit: 'cover',
                          }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0" style={{ fontSize: '0.9rem' }}>{project.title}</h6>
                          <small style={{ color: 'var(--text-muted)' }}>{project.category}</small>
                        </div>
                        <div className="text-end">
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-light)' }}>
                            ${(project.fundingRaised / 1000).toFixed(0)}K
                          </div>
                          <small style={{ color: 'var(--text-muted)' }}>raised</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3 animate-fade-in-up delay-1">
              <div className="stat-card">
                <div className="stat-number">{projects.length}</div>
                <div className="stat-label">Total Startups</div>
              </div>
            </div>
            <div className="col-6 col-md-3 animate-fade-in-up delay-2">
              <div className="stat-card">
                <div className="stat-number">${(totalFunded / 1000000).toFixed(1)}M</div>
                <div className="stat-label">Funds Raised</div>
              </div>
            </div>
            <div className="col-6 col-md-3 animate-fade-in-up delay-3">
              <div className="stat-card">
                <div className="stat-number">{activeProjects}</div>
                <div className="stat-label">Active Projects</div>
              </div>
            </div>
            <div className="col-6 col-md-3 animate-fade-in-up delay-4">
              <div className="stat-card">
                <div className="stat-number">{fundedProjects}</div>
                <div className="stat-label">Fully Funded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three simple steps to bring your startup to life</p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: 'bi-person-plus-fill',
                title: 'Create Your Profile',
                desc: 'Sign up as a founder or investor. Set up your profile and tell us about your goals.',
                color: 'var(--primary-light)',
              },
              {
                icon: 'bi-lightbulb-fill',
                title: 'Share Your Idea',
                desc: 'Founders post detailed startup pitches with funding goals. Investors browse and discover opportunities.',
                color: 'var(--accent-light)',
              },
              {
                icon: 'bi-cash-stack',
                title: 'Secure Funding',
                desc: 'Investors fund promising startups securely through Stripe. Track progress in real-time.',
                color: 'var(--warning)',
              },
            ].map((step, idx) => (
              <div className="col-md-4" key={idx}>
                <div
                  className="glass-card p-4 text-center h-100 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: `rgba(99, 102, 241, 0.1)`,
                      fontSize: '1.75rem',
                      color: step.color,
                    }}
                  >
                    <i className={`bi ${step.icon}`}></i>
                  </div>
                  <div
                    className="mb-2"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--primary-light)',
                      letterSpacing: '2px',
                    }}
                  >
                    STEP {idx + 1}
                  </div>
                  <h5 className="mb-2" style={{ fontWeight: 700 }}>{step.title}</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section
        className="py-5"
        style={{
          background: 'var(--bg-secondary)',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Featured Startups</h2>
            <p className="section-subtitle">Discover innovative projects seeking investment</p>
          </div>

          <div className="row g-4">
            {projects.slice(0, 4).map((project, idx) => {
              const progress = Math.round((project.fundingRaised / project.fundingGoal) * 100);
              return (
                <div className="col-md-6 col-lg-3" key={project.id}>
                  <div className="glass-card h-100 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-100"
                      style={{
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
                      }}
                    />
                    <div className="p-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge-category">{project.category}</span>
                        <span className={`badge ${project.status === 'funded' ? 'badge-status-funded' : 'badge-status-active'}`}>
                          {project.status === 'funded' ? 'Funded' : 'Active'}
                        </span>
                      </div>
                      <h6 className="mb-1" style={{ fontWeight: 700 }}>{project.title}</h6>
                      <p className="mb-2" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {project.description.substring(0, 80)}...
                      </p>
                      <div className="progress mb-2">
                        <div
                          className="progress-bar"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between" style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>
                          ${(project.fundingRaised / 1000).toFixed(0)}K raised
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>{progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <Link to="/projects" className="btn btn-outline-custom" id="view-all-projects-btn">
              View All Startups <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* For Founders & Investors */}
      <section className="py-5" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 animate-fade-in-up">
              <div
                className="glass-card p-5"
                style={{ borderLeft: '4px solid var(--primary-light)' }}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: 'var(--primary-light)',
                      fontSize: '1.5rem',
                    }}
                  >
                    <i className="bi bi-lightbulb-fill"></i>
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: 0 }}>For Founders</h3>
                </div>
                <ul className="list-unstyled d-flex flex-column gap-2">
                  {[
                    'Showcase your startup to thousands of investors',
                    'Track your funding progress in real-time',
                    'Manage your projects with an intuitive dashboard',
                    'Get email notifications on new investments',
                  ].map((item, i) => (
                    <li key={i} className="d-flex align-items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <i className="bi bi-check-circle-fill mt-1" style={{ color: 'var(--success)', fontSize: '0.85rem' }}></i>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="btn btn-primary-custom mt-3">
                  Start as Founder <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>

            <div className="col-lg-6 animate-fade-in-up delay-2">
              <div
                className="glass-card p-5"
                style={{ borderLeft: '4px solid var(--accent)' }}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: 'rgba(20, 184, 166, 0.15)',
                      color: 'var(--accent-light)',
                      fontSize: '1.5rem',
                    }}
                  >
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: 0 }}>For Investors</h3>
                </div>
                <ul className="list-unstyled d-flex flex-column gap-2">
                  {[
                    'Discover curated startup opportunities',
                    'Invest securely through Stripe payments',
                    'Track your portfolio performance',
                    'Diversify across multiple categories',
                  ].map((item, i) => (
                    <li key={i} className="d-flex align-items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <i className="bi bi-check-circle-fill mt-1" style={{ color: 'var(--success)', fontSize: '0.85rem' }}></i>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="btn btn-accent mt-3">
                  Start as Investor <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(20, 184, 166, 0.1) 100%)',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        }}
      >
        <div className="container">
          <div className="animate-fade-in-up">
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: '1rem',
              }}
            >
              Ready to Build the Future?
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.15rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
              }}
            >
              Join hundreds of founders and investors already on Startup Connect.
              Your next big opportunity is just a click away.
            </p>
            <Link to="/register" className="btn btn-primary-custom btn-lg px-5 py-3" id="cta-signup">
              <i className="bi bi-rocket-takeoff me-2"></i>Join Now — It's Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
