import { Link } from "react-router-dom";

function CtaSection() {
  return (
    <section
      className="py-5 text-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(20, 184, 166, 0.1) 100%)",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <div className="container">
        <div className="animate-fade-in-up">
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              marginBottom: "1rem",
            }}
          >
            Ready to Build the Future?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.15rem",
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            Join hundreds of founders and investors already on Startup Connect.
            Your next big opportunity is just a click away.
          </p>
          <Link
            to="/register"
            className="btn btn-primary-custom btn-lg px-5 py-3"
            id="cta-signup"
          >
            <i className="bi bi-rocket-takeoff me-2"></i>Join Now — It's Free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
