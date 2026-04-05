import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Projects() {
  const { projects } = useSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All' || project.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }} id="projects-page">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in-up">
          <h1 className="section-title">Explore Startups</h1>
          <p className="section-subtitle">
            Discover innovative projects and investment opportunities
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-4 animate-fade-in-up delay-1" id="project-filters">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label">
                <i className="bi bi-search me-1"></i>Search
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="search-input"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">
                <i className="bi bi-grid me-1"></i>Category
              </label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                id="category-filter"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">
                <i className="bi bi-funnel me-1"></i>Status
              </label>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                id="status-filter"
              >
                <option value="All">All</option>
                <option value="active">Active</option>
                <option value="funded">Funded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="d-flex justify-content-between align-items-center mb-3 animate-fade-in-up delay-2">
          <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProjects.length}</strong> startups
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-search" style={{ fontSize: '3rem', color: 'var(--text-muted)' }}></i>
            <h4 className="mt-3" style={{ color: 'var(--text-secondary)' }}>No startups found</h4>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProjects.map((project, idx) => {
              const progress = Math.round(
                (project.fundingRaised / project.fundingGoal) * 100
              );
              return (
                <div className="col-md-6 col-lg-4" key={project.id}>
                  <Link
                    to={`/projects/${project.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      className="glass-card h-100 animate-fade-in-up"
                      style={{ animationDelay: `${idx * 0.08}s` }}
                    >
                      <div className="position-relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-100"
                          style={{
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
                          }}
                        />
                        <span
                          className={`badge position-absolute ${
                            project.status === 'funded'
                              ? 'badge-status-funded'
                              : 'badge-status-active'
                          }`}
                          style={{ top: '12px', right: '12px', padding: '6px 12px' }}
                        >
                          {project.status === 'funded' ? '✓ Funded' : '● Active'}
                        </span>
                      </div>

                      <div className="p-4">
                        <span className="badge-category mb-2 d-inline-block">
                          {project.category}
                        </span>
                        <h5 className="mb-2" style={{ fontWeight: 700 }}>
                          {project.title}
                        </h5>
                        <p
                          className="mb-3"
                          style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                          }}
                        >
                          {project.description.substring(0, 100)}...
                        </p>

                        <div className="mb-2">
                          <div className="d-flex justify-content-between mb-1">
                            <small style={{ color: 'var(--text-secondary)' }}>
                              Funding Progress
                            </small>
                            <small style={{ color: 'var(--primary-light)', fontWeight: 600 }}>
                              {progress}%
                            </small>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div>
                            <small style={{ color: 'var(--text-muted)', display: 'block' }}>Raised</small>
                            <span style={{ fontWeight: 700, color: 'var(--accent-light)' }}>
                              ${(project.fundingRaised / 1000).toFixed(0)}K
                            </span>
                          </div>
                          <div className="text-end">
                            <small style={{ color: 'var(--text-muted)', display: 'block' }}>Goal</small>
                            <span style={{ fontWeight: 700 }}>
                              ${(project.fundingGoal / 1000).toFixed(0)}K
                            </span>
                          </div>
                        </div>

                        <div
                          className="d-flex align-items-center gap-2 mt-3 pt-3"
                          style={{ borderTop: '1px solid var(--border-color)' }}
                        >
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'var(--primary-gradient)',
                              fontSize: '0.8rem',
                              color: '#fff',
                            }}
                          >
                            {project.founderName.charAt(0)}
                          </div>
                          <small style={{ color: 'var(--text-secondary)' }}>
                            {project.founderName}
                          </small>
                          <small className="ms-auto" style={{ color: 'var(--text-muted)' }}>
                            <i className="bi bi-people me-1"></i>
                            {project.investors.length} investors
                          </small>
                        </div>
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
  );
}

export default Projects;
