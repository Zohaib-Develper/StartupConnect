function HowItWorksSection() {
  return (
    <section
      className="py-5"
      style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Three simple steps to bring your startup to life
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              icon: "bi-person-plus-fill",
              title: "Create Your Profile",
              desc: "Sign up as a founder or investor. Set up your profile and tell us about your goals.",
              color: "var(--primary-light)",
            },
            {
              icon: "bi-lightbulb-fill",
              title: "Share Your Idea",
              desc: "Founders post detailed startup pitches with funding goals. Investors browse and discover opportunities.",
              color: "var(--accent-light)",
            },
            {
              icon: "bi-cash-stack",
              title: "Secure Funding",
              desc: "Investors fund promising startups securely through Stripe. Track progress in real-time.",
              color: "var(--warning)",
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
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: `rgba(99, 102, 241, 0.1)`,
                    fontSize: "1.75rem",
                    color: step.color,
                  }}
                >
                  <i className={`bi ${step.icon}`}></i>
                </div>
                <div
                  className="mb-2"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--primary-light)",
                    letterSpacing: "2px",
                  }}
                >
                  STEP {idx + 1}
                </div>
                <h5 className="mb-2" style={{ fontWeight: 700 }}>
                  {step.title}
                </h5>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
