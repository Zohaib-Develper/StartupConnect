import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function FounderDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const { investments } = useSelector((state) => state.investments);

  const myProjects = projects.filter((p) => p.founderId === user?.id);
  const totalRaised = myProjects.reduce((acc, p) => acc + p.fundingRaised, 0);
  const totalGoal = myProjects.reduce((acc, p) => acc + p.fundingGoal, 0);
  const totalInvestors = new Set(
    myProjects.flatMap((p) => p.investors)
  ).size;

  const recentInvestments = investments
    .filter((inv) => myProjects.some((p) => p.id === inv.projectId))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }} id="founder-dashboard">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 animate-fade-in-up">
          <div>
            <h1 style={{ fontWeight: 800, fontSize: '1.75rem' }}>
              Welcome back, {user?.name} 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Manage your startups and track funding progress
            </p>
          </div>
          <Link
            to="/founder/create"
            className="btn btn-primary-custom mt-3 mt-md-0"
            id="create-project-btn"
          >
            <i className="bi bi-plus-lg me-2"></i>New Project
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          {[
            {
              icon: 'bi-folder-fill',
              label: 'Total Projects',
              value: myProjects.length,
              color: 'var(--primary-light)',
            },
            {
              icon: 'bi-cash-stack',
              label: 'Total Raised',
              value: `$${(totalRaised / 1000).toFixed(0)}K`,
              color: 'var(--accent-light)',
            },
            {
              icon: 'bi-people-fill',
              label: 'Total Investors',
              value: totalInvestors,
              color: 'var(--warning)',
            },
            {
              icon: 'bi-bullseye',
              label: 'Funding Goal',
              value: `$${(totalGoal / 1000).toFixed(0)}K`,
              color: 'var(--success)',
            },
          ].map((stat, idx) => (
            <div className="col-12 col-sm-6 col-lg-3" key={idx}>
              <div className="glass-card p-3 p-md-4 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
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
          {/* My Projects */}
          <div className="col-lg-8">
            <div className="glass-card p-4 animate-fade-in-up delay-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 style={{ fontWeight: 700 }}>
                  <i className="bi bi-kanban me-2" style={{ color: 'var(--primary-light)' }}></i>
                  My Projects
                </h5>
              </div>

              {myProjects.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-lightbulb" style={{ fontSize: '3rem', color: 'var(--text-muted)' }}></i>
                  <h5 className="mt-3" style={{ color: 'var(--text-secondary)' }}>No projects yet</h5>
                  <p style={{ color: 'var(--text-muted)' }}>Create your first startup project</p>
                  <Link to="/founder/create" className="btn btn-primary-custom">
                    <i className="bi bi-plus-lg me-2"></i>Create Project
                  </Link>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {myProjects.map((project) => {
                    const progress = Math.round(
                      (project.fundingRaised / project.fundingGoal) * 100
                    );
                    return (
                      <div
                        key={project.id}
                        className="d-flex flex-column flex-md-row align-items-start gap-3 p-3"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: 'var(--border-radius-sm)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: '100px',
                            height: '72px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                          }}
                        />
                        <div className="flex-grow-1 w-100">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1" style={{ fontWeight: 700 }}>{project.title}</h6>
                              <div className="d-flex gap-2">
                                <span className="badge-category">{project.category}</span>
                                <span
                                  className={`badge ${
                                    project.status === 'funded'
                                      ? 'badge-status-funded'
                                      : 'badge-status-active'
                                  }`}
                                >
                                  {project.status}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex gap-2">
                              <Link
                                to={`/founder/edit/${project.id}`}
                                className="btn btn-sm btn-outline-custom"
                                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <Link
                                to={`/projects/${project.id}`}
                                className="btn btn-sm btn-primary-custom"
                                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="d-flex justify-content-between mb-1">
                              <small style={{ color: 'var(--text-muted)' }}>
                                ${(project.fundingRaised / 1000).toFixed(0)}K / ${(project.fundingGoal / 1000).toFixed(0)}K
                              </small>
                              <small style={{ color: 'var(--primary-light)', fontWeight: 600 }}>{progress}%</small>
                            </div>
                            <div className="progress">
                              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-lg-4">
            <div className="glass-card p-4 animate-fade-in-up delay-4">
              <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>
                <i className="bi bi-activity me-2" style={{ color: 'var(--accent-light)' }}></i>
                Recent Activity
              </h5>

              {recentInvestments.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No recent activity
                </p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {recentInvestments.map((inv) => (
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
                          background: 'rgba(20, 184, 166, 0.1)',
                          color: 'var(--accent-light)',
                          fontSize: '0.85rem',
                        }}
                      >
                        <i className="bi bi-arrow-down-left"></i>
                      </div>
                      <div>
                        <p className="mb-0" style={{ fontSize: '0.85rem' }}>
                          <strong>{inv.investorName}</strong> invested{' '}
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

export default FounderDashboard;
