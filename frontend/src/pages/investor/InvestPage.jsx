import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { investInProject } from "../../store/slices/projectSlice";
import { addInvestment } from "../../store/slices/investmentSlice";

function InvestPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const project = projects.find((p) => p.id === id);

  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!project) {
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
          <button
            className="btn btn-primary-custom mt-3"
            onClick={() => navigate("/projects")}
          >
            Browse Projects
          </button>
        </div>
      </div>
    );
  }

  const remaining = project.fundingGoal - project.fundingRaised;
  const progress = Math.round(
    (project.fundingRaised / project.fundingGoal) * 100,
  );

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiry(value);
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvc(value.slice(0, 3));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // We will later implement stripe
    setTimeout(() => {
      const investAmount = Number(amount);
      dispatch(
        investInProject({
          projectId: project.id,
          amount: investAmount,
          investorId: user.id,
        }),
      );
      dispatch(
        addInvestment({
          investorId: user.id,
          investorName: user.name,
          projectId: project.id,
          projectTitle: project.title,
          amount: investAmount,
        }),
      );
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div
        className="page-wrapper d-flex align-items-center justify-content-center"
        style={{ paddingTop: "100px" }}
      >
        <div className="container" style={{ maxWidth: "500px" }}>
          <div className="glass-card p-5 text-center animate-fade-in-up">
            <div
              className="d-inline-flex align-items-center justify-content-center mb-4"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                color: "var(--success)",
                fontSize: "2.5rem",
              }}
            >
              <i className="bi bi-check-lg"></i>
            </div>
            <h2 style={{ fontWeight: 800 }}>Investment Successful! 🎉</h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                margin: "1rem 0",
              }}
            >
              You've invested{" "}
              <strong style={{ color: "var(--accent-light)" }}>
                ${Number(amount).toLocaleString()}
              </strong>{" "}
              in <strong>{project.title}</strong>
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              A confirmation email will be sent to your registered email
              address.
            </p>
            <div className="d-flex gap-3 justify-content-center mt-4">
              <button
                className="btn btn-outline-custom"
                onClick={() => navigate("/investor/dashboard")}
              >
                <i className="bi bi-speedometer2 me-2"></i>Dashboard
              </button>
              <button
                className="btn btn-primary-custom"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <i className="bi bi-eye me-2"></i>View Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="page-wrapper"
      style={{ paddingTop: "100px" }}
      id="invest-page"
    >
      <div className="container" style={{ maxWidth: "800px" }}>
        <button
          className="btn btn-outline-custom mb-4 animate-fade-in"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>

        <div className="row g-4">
          <div className="col-md-5 animate-fade-in-up">
            <div
              className="glass-card p-4"
              style={{ position: "sticky", top: "90px" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-100 mb-3"
                style={{
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "var(--border-radius-sm)",
                }}
              />
              <h5 style={{ fontWeight: 700 }}>{project.title}</h5>
              <span className="badge-category mb-3 d-inline-block">
                {project.category}
              </span>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small style={{ color: "var(--text-muted)" }}>Progress</small>
                  <small
                    style={{ color: "var(--primary-light)", fontWeight: 600 }}
                  >
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

              <div className="d-flex justify-content-between mb-2">
                <span
                  style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  Raised
                </span>
                <span style={{ fontWeight: 600, color: "var(--accent-light)" }}>
                  ${(project.fundingRaised / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span
                  style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  Goal
                </span>
                <span style={{ fontWeight: 600 }}>
                  ${(project.fundingGoal / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span
                  style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  Remaining
                </span>
                <span style={{ fontWeight: 600, color: "var(--warning)" }}>
                  ${(remaining / 1000).toFixed(0)}K
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-7 animate-fade-in-up delay-2">
            <div className="glass-card p-4">
              <h4 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
                <i
                  className="bi bi-credit-card me-2"
                  style={{ color: "var(--primary-light)" }}
                ></i>
                Payment Details
              </h4>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9rem",
                  marginBottom: "1.5rem",
                }}
              >
                Secure payment powered by Stripe
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Investment Amount ($)</label>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {[5000, 10000, 25000, 50000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={`btn btn-sm ${
                          Number(amount) === preset
                            ? "btn-primary-custom"
                            : "btn-outline-custom"
                        }`}
                        onClick={() => setAmount(String(preset))}
                        style={{ fontSize: "0.85rem" }}
                      >
                        ${(preset / 1000).toFixed(0)}K
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    id="invest-amount"
                    placeholder="Enter custom amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="100"
                    max={remaining}
                  />
                  <small style={{ color: "var(--text-muted)" }}>
                    Min: $100 · Max: ${remaining.toLocaleString()}
                  </small>
                </div>

                <hr
                  style={{
                    borderColor: "var(--border-color)",
                    margin: "1.5rem 0",
                  }}
                />

                <div
                  className="p-3 mb-3"
                  style={{
                    background: "rgba(99, 102, 241, 0.05)",
                    borderRadius: "var(--border-radius-sm)",
                    border: "1px solid rgba(99, 102, 241, 0.15)",
                  }}
                >
                  <small
                    style={{ color: "var(--primary-light)", fontWeight: 600 }}
                  >
                    <i className="bi bi-shield-lock me-1"></i>
                    Test Mode — Use any card details
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="card-number">
                    Card Number
                  </label>
                  <div className="position-relative">
                    <i
                      className="bi bi-credit-card position-absolute"
                      style={{
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--text-muted)",
                      }}
                    ></i>
                    <input
                      type="text"
                      className="form-control"
                      id="card-number"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      required
                      maxLength="19"
                      style={{ paddingLeft: "42px" }}
                    />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label className="form-label" htmlFor="card-expiry">
                      Expiry
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="card-expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      required
                      maxLength="5"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="card-cvc">
                      CVC
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="card-cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={handleCvcChange}
                      required
                      maxLength="3"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-accent w-100 py-3"
                  id="process-payment-btn"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-lock-fill me-2"></i>
                      Pay ${amount ? Number(amount).toLocaleString() : "0"}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestPage;
