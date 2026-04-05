import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../store/slices/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "founder",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case "founder":
          navigate("/founder/dashboard");
          break;
        case "investor":
          navigate("/investor/dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }
    dispatch(register(formData));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(20, 184, 166, 0.1) 0%, transparent 50%), var(--bg-primary)",
        paddingTop: "80px",
        paddingBottom: "2rem",
      }}
    >
      <div className="container" style={{ maxWidth: "500px" }}>
        <div
          className="glass-card p-5 animate-fade-in-up"
          id="register-form-card"
        >
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
                fontSize: "1.5rem",
              }}
            >
              <i className="bi bi-person-plus-fill text-white"></i>
            </div>
            <h2 style={{ fontWeight: 800 }}>Create Account</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Join the startup revolution
            </p>
          </div>

          {(error || localError) && (
            <div
              className="alert d-flex align-items-center gap-2 mb-3"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "var(--danger)",
                borderRadius: "var(--border-radius-sm)",
              }}
            >
              <i className="bi bi-exclamation-circle"></i>
              {error || localError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="register-name">
                Full Name
              </label>
              <div className="position-relative">
                <i
                  className="bi bi-person position-absolute"
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
                  id="register-name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px" }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="register-email">
                Email address
              </label>
              <div className="position-relative">
                <i
                  className="bi bi-envelope position-absolute"
                  style={{
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                ></i>
                <input
                  type="email"
                  className="form-control"
                  id="register-email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px" }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">I am a</label>
              <div className="row g-2">
                <div className="col-6">
                  <div
                    className="p-3 text-center"
                    style={{
                      borderRadius: "var(--border-radius-sm)",
                      border: `2px solid ${formData.role === "founder" ? "var(--primary-light)" : "var(--border-color)"}`,
                      background:
                        formData.role === "founder"
                          ? "rgba(99, 102, 241, 0.1)"
                          : "transparent",
                      cursor: "pointer",
                      transition: "var(--transition)",
                    }}
                    onClick={() =>
                      setFormData({ ...formData, role: "founder" })
                    }
                    id="role-founder-btn"
                  >
                    <i
                      className="bi bi-lightbulb-fill d-block mb-1"
                      style={{
                        fontSize: "1.25rem",
                        color:
                          formData.role === "founder"
                            ? "var(--primary-light)"
                            : "var(--text-muted)",
                      }}
                    ></i>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color:
                          formData.role === "founder"
                            ? "var(--primary-light)"
                            : "var(--text-secondary)",
                      }}
                    >
                      Founder
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="p-3 text-center"
                    style={{
                      borderRadius: "var(--border-radius-sm)",
                      border: `2px solid ${formData.role === "investor" ? "var(--accent)" : "var(--border-color)"}`,
                      background:
                        formData.role === "investor"
                          ? "rgba(20, 184, 166, 0.1)"
                          : "transparent",
                      cursor: "pointer",
                      transition: "var(--transition)",
                    }}
                    onClick={() =>
                      setFormData({ ...formData, role: "investor" })
                    }
                    id="role-investor-btn"
                  >
                    <i
                      className="bi bi-graph-up-arrow d-block mb-1"
                      style={{
                        fontSize: "1.25rem",
                        color:
                          formData.role === "investor"
                            ? "var(--accent-light)"
                            : "var(--text-muted)",
                      }}
                    ></i>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color:
                          formData.role === "investor"
                            ? "var(--accent-light)"
                            : "var(--text-secondary)",
                      }}
                    >
                      Investor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="register-password">
                Password
              </label>
              <div className="position-relative">
                <i
                  className="bi bi-lock position-absolute"
                  style={{
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                ></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="register-password"
                  name="password"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px", paddingRight: "42px" }}
                />
                <button
                  type="button"
                  className="btn position-absolute border-0 p-0"
                  style={{
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="register-confirm-password">
                Confirm Password
              </label>
              <div className="position-relative">
                <i
                  className="bi bi-lock-fill position-absolute"
                  style={{
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                ></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="register-confirm-password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "42px" }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-accent w-100 py-3 mb-3"
              id="register-submit-btn"
            >
              <i className="bi bi-person-plus me-2"></i>Create Account
            </button>
          </form>

          <p
            className="text-center mb-0"
            style={{ color: "var(--text-secondary)" }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
