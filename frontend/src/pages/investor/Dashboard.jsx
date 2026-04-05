import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function InvestorDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const { investments } = useSelector((state) => state.investments);

  const myInvestments = investments.filter((inv) => inv.investorId === user?.id);
  const totalInvested = myInvestments.reduce((acc, inv) => acc + inv.amount, 0);
  const uniqueProjects = new Set(myInvestments.map((inv) => inv.projectId)).size;

  const portfolioProjects = projects.filter((p) =>
    myInvestments.some((inv) => inv.projectId === p.id)
  );

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }} id="investor-dashboard">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 animate-fade-in-up">
          <div>
            <h1 style={{ fontWeight: 800, fontSize: '1.75rem' }}>
              Welcome back, {user?.name} 💰
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Track your investments and discover new opportunities
            </p>
          </div>
          <Link to="/projects" className="btn btn-accent mt-3 mt-md-0" id="explore-projects-btn">
            <i className="bi bi-compass me-2"></i>Explore Projects
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          {[
            {
              icon: 'bi-wallet-fill',
              label: 'Total Invested',
              value: `$${(totalInvested / 1000).toFixed(0)}K`,
              color: 'var(--accent-light)',
            },
            {
              icon: 'bi-briefcase-fill',
              label: 'Projects Funded',
              value: uniqueProjects,
              color: 'var(--primary-light)',
            },
            {
              icon: 'bi-graph-up',
              label: 'Investments Made',
              value: myInvestments.length,
              color: 'var(--warning)',
            },
            {
              icon: 'bi-check-circle-fill',
              label: 'Fully Funded',
              value: portfolioProjects.filter((p) => p.status === 'funded').length,
              color: 'var(--success)',
            },
          ].map((stat, idx) => (
            <div className="col-6 col-lg-3" key={idx}>
              <div className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${stat.color}15`,
                      color: stat.color,
                      fontSize: '1.25rem',
                    }}
                  >
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stat.value}</div>
                    <small style={{ color: 'var(--text-muted)' }}>{stat.label}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Portfolio */}
          <div className="col-lg-8">
            <div className="glass-card p-4 animate-fade-in-up delay-3">
              <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>
                <i className="bi bi-pie-chart-fill me-2" style={{ color: 'var(--primary-light)' }}></i>
                My Portfolio
              </h5>

              {portfolioProjects.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-search" style={{ fontSize: '3rem', color: 'var(--text-muted)' }}></i>
                  <h5 className="mt-3" style={{ color: 'var(--text-secondary)' }}>No investments yet</h5>
                  <p style={{ color: 'var(--text-muted)' }}>Explore startups and make your first investment</p>
                  <Link to="/projects" className="btn btn-accent">
                    <i className="bi bi-compass me-2"></i>Browse Projects
                  </Link>
                </div>
              ) : (
                <div className="row g-3">
                  {portfolioProjects.map((project) => {
                    const myInv = myInvestments
                      .filter((inv) => inv.projectId === project.id)
                      .reduce((acc, inv) => acc + inv.amount, 0);
                    const progress = Math.round(
                      (project.fundingRaised / project.fundingGoal) * 100
                    );
                    return (
                      <div className="col-md-6" key={project.id}>
                        <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div
                            className="p-3 h-100"
                            style={{
                              background: 'rgba(255,255,255,0.02)',
                              borderRadius: 'var(--border-radius-sm)',
                              border: '1px solid var(--border-color)',
                              transition: 'var(--transition)',
                            }}
                          >
                            <div className="d-flex align-items-center gap-3 mb-3">
                              <img
                                src={project.image}
                                alt={project.title}
                                style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover' }}
                              />
                              <div>
                                <h6 className="mb-0" style={{ fontWeight: 700 }}>{project.title}</h6>
                                <div className="d-flex gap-2 mt-1">
                                  <span className="badge-category" style={{ fontSize: '0.7rem' }}>{project.category}</span>
                                  <span
                                    className={`badge ${project.status === 'funded' ? 'badge-status-funded' : 'badge-status-active'}`}
                                    style={{ fontSize: '0.7rem' }}
                                  >
                                    {project.status}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between mb-1">
                              <small style={{ color: 'var(--text-muted)' }}>My Investment</small>
                              <small style={{ color: 'var(--accent-light)', fontWeight: 700 }}>
                                ${(myInv / 1000).toFixed(0)}K
                              </small>
                            </div>
                            <div className="progress mb-2">
                              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <small style={{ color: 'var(--text-muted)' }}>
                                ${(project.fundingRaised / 1000).toFixed(0)}K / ${(project.fundingGoal / 1000).toFixed(0)}K
                              </small>
                              <small style={{ color: 'var(--primary-light)', fontWeight: 600 }}>{progress}%</small>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Investment History */}
          <div className="col-lg-4">
            <div className="glass-card p-4 animate-fade-in-up delay-4">
              <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>
                <i className="bi bi-clock-history me-2" style={{ color: 'var(--accent-light)' }}></i>
                Recent Investments
              </h5>

              {myInvestments.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No investments yet</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {myInvestments
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 6)
                    .map((inv) => (
                      <div
                        key={inv.id}
                        className="d-flex align-items-start gap-3 pb-3"
                        style={{ borderBottom: '1px solid var(--border-color)' }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'rgba(79, 70, 229, 0.1)',
                            color: 'var(--primary-light)',
                            fontSize: '0.85rem',
                          }}
                        >
                          <i className="bi bi-arrow-up-right"></i>
                        </div>
                        <div>
                          <p className="mb-0" style={{ fontSize: '0.85rem' }}>
                            Invested{' '}
                            <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>
                              ${inv.amount.toLocaleString()}
                            </span>{' '}
                            in <strong>{inv.projectTitle}</strong>
                          </p>
                          <small style={{ color: 'var(--text-muted)' }}>{inv.date}</small>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorDashboard;
