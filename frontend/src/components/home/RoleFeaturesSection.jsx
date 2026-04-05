import { Link } from "react-router-dom";

function RoleFeaturesSection() {
  return (
    <section
      className="py-5"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 animate-fade-in-up">
            <div
              className="glass-card p-5"
              style={{ borderLeft: "4px solid var(--primary-light)" }}
            >
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "rgba(99, 102, 241, 0.15)",
                    color: "var(--primary-light)",
                    fontSize: "1.5rem",
                  }}
                >
                  <i className="bi bi-lightbulb-fill"></i>
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 0 }}>
                  For Founders
                </h3>
              </div>
              <ul className="list-unstyled d-flex flex-column gap-2">
                {[
                  "Showcase your startup to thousands of investors",
                  "Track your funding progress in real-time",
                  "Manage your projects with an intuitive dashboard",
                  "Get email notifications on new investments",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="d-flex align-items-start gap-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <i
                      className="bi bi-check-circle-fill mt-1"
                      style={{ color: "var(--success)", fontSize: "0.85rem" }}
                    ></i>
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
              style={{ borderLeft: "4px solid var(--accent)" }}
            >
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "rgba(20, 184, 166, 0.15)",
                    color: "var(--accent-light)",
                    fontSize: "1.5rem",
                  }}
                >
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 0 }}>
                  For Investors
                </h3>
              </div>
              <ul className="list-unstyled d-flex flex-column gap-2">
                {[
                  "Discover curated startup opportunities",
                  "Invest securely through Stripe payments",
                  "Track your portfolio performance",
                  "Diversify across multiple categories",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="d-flex align-items-start gap-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <i
                      className="bi bi-check-circle-fill mt-1"
                      style={{ color: "var(--success)", fontSize: "0.85rem" }}
                    ></i>
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
  );
}

export default RoleFeaturesSection;
