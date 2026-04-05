import { Link } from "react-router-dom";

function FeaturedStartupsSection({ projects, navigate }) {
  return (
    <section
      className="py-5"
      style={{
        background: "var(--bg-secondary)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Featured Startups</h2>
          <p className="section-subtitle">
            Discover innovative projects seeking investment
          </p>
        </div>

        <div className="row g-4">
          {projects.slice(0, 4).map((project, idx) => {
            const progress = Math.round(
              (project.fundingRaised / project.fundingGoal) * 100,
            );
            return (
              <div className="col-md-6 col-lg-3" key={project.id}>
                <div
                  className="glass-card h-100 animate-fade-in-up"
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-100"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderRadius:
                        "var(--border-radius) var(--border-radius) 0 0",
                    }}
                  />
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge-category">
                        {project.category}
                      </span>
                      <span
                        className={`badge ${project.status === "funded" ? "badge-status-funded" : "badge-status-active"}`}
                      >
                        {project.status === "funded" ? "Funded" : "Active"}
                      </span>
                    </div>
                    <h6 className="mb-1" style={{ fontWeight: 700 }}>
                      {project.title}
                    </h6>
                    <p
                      className="mb-2"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {project.description.substring(0, 80)}...
                    </p>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <span
                        style={{
                          color: "var(--accent-light)",
                          fontWeight: 600,
                        }}
                      >
                        ${(project.fundingRaised / 1000).toFixed(0)}K raised
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>
                        {progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <Link
            to="/projects"
            className="btn btn-outline-custom"
            id="view-all-projects-btn"
          >
            View All Startups <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedStartupsSection;
