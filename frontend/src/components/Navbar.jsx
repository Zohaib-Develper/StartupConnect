import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    closeNavbar();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "founder":
        return "/founder/dashboard";
      case "investor":
        return "/investor/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarContent");
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark-custom fixed-top"
      id="main-navbar"
    >
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          onClick={closeNavbar}
        >
          <i className="bi bi-rocket-takeoff-fill"></i>
          Startup Connect
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={closeNavbar}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/projects"
                onClick={closeNavbar}
              >
                Explore
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={getDashboardLink()}
                  onClick={closeNavbar}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-custom dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                  {user?.name}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--border-radius-sm)",
                  }}
                >
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to={getDashboardLink()}
                      onClick={closeNavbar}
                      style={{ padding: "8px 16px" }}
                    >
                      <i className="bi bi-speedometer2 me-2"></i>Dashboard
                    </Link>
                  </li>
                  <li>
                    <hr
                      className="dropdown-divider"
                      style={{ borderColor: "var(--border-color)" }}
                    />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                      id="logout-btn"
                      style={{ padding: "8px 16px" }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-custom"
                  id="login-nav-btn"
                  onClick={closeNavbar}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary-custom"
                  id="register-nav-btn"
                  onClick={closeNavbar}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
