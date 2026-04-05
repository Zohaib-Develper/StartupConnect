function StatsSection({ projects, totalFunded, activeProjects, fundedProjects }) {
  return (
    <section className="py-5" style={{ background: "var(--bg-secondary)" }}>
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
              <div className="stat-number">
                ${(totalFunded / 1000000).toFixed(1)}M
              </div>
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
  );
}

export default StatsSection;
