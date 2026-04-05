import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedProject } from "../store/slices/projectSlice";

function ProjectDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProject } = useSelector((state) => state.projects);
  const { investments } = useSelector((state) => state.investments);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setSelectedProject(id));
  }, [id, dispatch]);

  if (!selectedProject) {
    return (
      <div
        className="page-wrapper d-flex align-items-center justify-content-center"
        style={{ paddingTop: "100px" }}
      >
        <div className="text-center">
          <i
            className="bi bi-emoji-frown"
            style={{ fontSize: "4rem", color: "var(--text-muted)" }}
          ></i>
          <h3 className="mt-3">Project Not Found</h3>
          <p style={{ color: "var(--text-secondary)" }}>
            The project you're looking for doesn't exist.
          </p>
          <Link to="/projects" className="btn btn-primary-custom">
            <i className="bi bi-arrow-left me-2"></i>Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.round(
    (selectedProject.fundingRaised / selectedProject.fundingGoal) * 100,
  );
  const projectInvestments = investments.filter(
    (inv) => inv.projectId === selectedProject.id,
  );
  const remaining = selectedProject.fundingGoal - selectedProject.fundingRaised;

  return (
    <div
      className="page-wrapper"
      style={{ paddingTop: "100px" }}
      id="project-detail-page"
    >
      <div className="container">
        <button
          className="btn btn-outline-custom mb-4 animate-fade-in"
          onClick={() => navigate(-1)}
          id="back-btn"
        >
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>

        <div className="row g-4">
          <div className="col-lg-8 animate-fade-in-up">
            <div
              className="glass-card overflow-hidden mb-4"
              style={{ borderRadius: "var(--border-radius-lg)" }}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-100"
                style={{ height: "400px", objectFit: "cover" }}
              />
            </div>

            <div className="glass-card p-4 mb-4">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                <span className="badge-category">
                  {selectedProject.category}
                </span>
                <span
                  className={`badge ${
                    selectedProject.status === "funded"
                      ? "badge-status-funded"
                      : "badge-status-active"
                  }`}
                  style={{ padding: "6px 14px" }}
                >
                  {selectedProject.status === "funded"
                    ? "✓ Fully Funded"
                    : "● Actively Raising"}
                </span>
              </div>

              <h1
                style={{
                  fontWeight: 800,
                  fontSize: "2rem",
                  marginBottom: "0.75rem",
                }}
              >
                {selectedProject.title}
              </h1>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--primary-gradient)",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {selectedProject.founderName.charAt(0)}
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>
                    {selectedProject.founderName}
                  </span>
                  <small
                    className="d-block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Founded {selectedProject.createdAt}
                  </small>
                </div>
              </div>

              <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>
                About this project
              </h5>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                }}
              >
                {selectedProject.description}
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                This innovative project aims to disrupt the{" "}
                {selectedProject.category.toLowerCase()} industry by providing
                cutting-edge solutions that address real-world challenges. With
                a strong team and a clear vision, {selectedProject.title} is
                positioned to become a market leader in its space.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                The funds raised will be allocated towards product development
                (40%), marketing and growth (30%), operations (20%), and
                reserves (10%). Our roadmap includes a beta launch in Q2, full
                product release in Q3, and international expansion in Q4.
              </p>
            </div>

            <div className="glass-card p-4">
              <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>
                <i
                  className="bi bi-clock-history me-2"
                  style={{ color: "var(--primary-light)" }}
                ></i>
                Investment History
              </h5>
              {projectInvestments.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>
                  No investments yet. Be the first!
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark-custom table-hover align-middle">
                    <thead>
                      <tr>
                        <th
                          style={{
                            color: "var(--text-secondary)",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          Investor
                        </th>
                        <th
                          style={{
                            color: "var(--text-secondary)",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          Amount
                        </th>
                        <th
                          style={{
                            color: "var(--text-secondary)",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                          }}
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectInvestments.map((inv) => (
                        <tr key={inv.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                  background:
                                    "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
                                  color: "#fff",
                                  fontSize: "0.75rem",
                                  fontWeight: 700,
                                }}
                              >
                                {inv.investorName.charAt(0)}
                              </div>
                              {inv.investorName}
                            </div>
                          </td>
                          <td
                            style={{
                              color: "var(--accent-light)",
                              fontWeight: 600,
                            }}
                          >
                            ${inv.amount.toLocaleString()}
                          </td>
                          <td style={{ color: "var(--text-muted)" }}>
                            {inv.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4 animate-fade-in-up delay-2">
            <div
              className="glass-card p-4 mb-4"
              style={{ position: "sticky", top: "90px" }}
            >
              <h5 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>
                Funding Progress
              </h5>

              <div className="text-center mb-4">
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    background: "var(--primary-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ${(selectedProject.fundingRaised / 1000).toFixed(0)}K
                </div>
                <small style={{ color: "var(--text-muted)" }}>
                  raised of ${(selectedProject.fundingGoal / 1000).toFixed(0)}K
                  goal
                </small>
              </div>

              <div className="progress mb-3" style={{ height: "12px" }}>
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-4 text-center">
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    {progress}%
                  </div>
                  <small style={{ color: "var(--text-muted)" }}>Funded</small>
                </div>
                <div className="col-4 text-center">
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    {selectedProject.investors.length}
                  </div>
                  <small style={{ color: "var(--text-muted)" }}>
                    Investors
                  </small>
                </div>
                <div className="col-4 text-center">
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "var(--accent-light)",
                    }}
                  >
                    ${(remaining / 1000).toFixed(0)}K
                  </div>
                  <small style={{ color: "var(--text-muted)" }}>
                    Remaining
                  </small>
                </div>
              </div>

              {isAuthenticated &&
              user?.role === "investor" &&
              selectedProject.status !== "funded" ? (
                <Link
                  to={`/investor/invest/${selectedProject.id}`}
                  className="btn btn-accent w-100 py-3"
                  id="invest-now-btn"
                >
                  <i className="bi bi-cash-stack me-2"></i>Invest Now
                </Link>
              ) : !isAuthenticated ? (
                <Link to="/login" className="btn btn-primary-custom w-100 py-3">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Sign In to
                  Invest
                </Link>
              ) : selectedProject.status === "funded" ? (
                <button className="btn btn-outline-custom w-100 py-3" disabled>
                  <i className="bi bi-check-circle me-2"></i>Fully Funded
                </button>
              ) : null}

              <div
                className="mt-4 pt-3"
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Category
                  </span>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    {selectedProject.category}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Created
                  </span>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    {selectedProject.createdAt}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Status
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color:
                        selectedProject.status === "funded"
                          ? "var(--warning)"
                          : "var(--success)",
                    }}
                  >
                    {selectedProject.status === "funded" ? "Funded" : "Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
