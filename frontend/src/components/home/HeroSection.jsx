import { Link } from "react-router-dom";

function HeroSection({ projects, navigate }) {
  return (
    <section
      className="position-relative d-flex align-items-center"
      style={{
        minHeight: "100vh",
        paddingTop: "100px",
        paddingBottom: "60px",
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%), var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="animate-fade-in-up">
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                Where{" "}
                <span
                  style={{
                    background: "var(--primary-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Great Ideas
                </span>{" "}
                Meet{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Smart Money
                </span>
              </h1>
              <p
                style={{
                  fontSize: "1.15rem",
                  color: "var(--text-secondary)",
                  marginBottom: "2rem",
                  maxWidth: "520px",
                }}
              >
                Connect with investors who believe in your vision. Launch your
                startup, secure funding, and build the future — all from one
                platform.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="btn btn-primary-custom btn-lg px-4 py-3"
                  id="hero-get-started"
                >
                  <i className="bi bi-rocket-takeoff me-2"></i>Get Started Free
                </Link>
                <Link
                  to="/projects"
                  className="btn btn-outline-custom btn-lg px-4 py-3"
                  id="hero-explore"
                >
                  Explore Startups <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6 animate-fade-in-up delay-2">
            <div
              className="glass-card p-4"
              style={{
                animation: "pulse-glow 4s ease-in-out infinite",
              }}
            >
              <div className="row g-3">
                {projects.slice(0, 3).map((project, idx) => (
                  <div
                    className="col-12"
                    key={project.id}
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div
                      className="d-flex align-items-center gap-3 p-3"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "var(--border-radius-sm)",
                        border: "1px solid var(--border-color)",
                        animationDelay: `${idx * 0.15}s`,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
                          {project.title}
                        </h6>
                        <small style={{ color: "var(--text-muted)" }}>
                          {project.category}
                        </small>
                      </div>
                      <div className="text-end">
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "var(--accent-light)",
                          }}
                        >
                          ${(project.fundingRaised / 1000).toFixed(0)}K
                        </div>
                        <small style={{ color: "var(--text-muted)" }}>
                          raised
                        </small>
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
  );
}

export default HeroSection;
