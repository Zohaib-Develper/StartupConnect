import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../../store/slices/authSlice";
import { deleteProject } from "../../store/slices/projectSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  const [activeTab, setActiveTab] = useState("users");

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{ paddingTop: "100px" }}
      id="admin-dashboard"
    >
      <div className="container">
        <div className="mb-4 animate-fade-in-up">
          <h1 style={{ fontWeight: 800, fontSize: "1.75rem" }}>
            Admin Dashboard 🛡️
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Manage platform users and startup projects.
          </p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6 col-lg-3">
            <div className="glass-card p-4 animate-fade-in-up delay-1">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(99, 102, 241, 0.15)",
                    color: "var(--primary-light)",
                    fontSize: "1.25rem",
                  }}
                >
                  <i className="bi bi-people-fill"></i>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                    {users.length}
                  </div>
                  <small style={{ color: "var(--text-muted)" }}>
                    Total Users
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="glass-card p-4 animate-fade-in-up delay-2">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(20, 184, 166, 0.15)",
                    color: "var(--accent-light)",
                    fontSize: "1.25rem",
                  }}
                >
                  <i className="bi bi-folder-fill"></i>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                    {projects.length}
                  </div>
                  <small style={{ color: "var(--text-muted)" }}>
                    Total Projects
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 animate-fade-in-up delay-3">
          <ul className="nav nav-pills mb-4" id="admin-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "users" ? "active" : ""}`}
                onClick={() => setActiveTab("users")}
                style={{
                  background:
                    activeTab === "users"
                      ? "var(--primary-gradient)"
                      : "transparent",
                  color:
                    activeTab === "users" ? "#fff" : "var(--text-secondary)",
                  borderRadius: "var(--border-radius-sm)",
                }}
              >
                <i className="bi bi-people me-2"></i>Manage Users
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
                style={{
                  background:
                    activeTab === "projects"
                      ? "var(--primary-gradient)"
                      : "transparent",
                  color:
                    activeTab === "projects" ? "#fff" : "var(--text-secondary)",
                  borderRadius: "var(--border-radius-sm)",
                }}
              >
                <i className="bi bi-kanban me-2"></i>Manage Projects
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === "users" && (
              <div className="table-responsive">
                <table className="table table-dark-custom table-hover align-middle">
                  <thead>
                    <tr>
                      <th style={{ color: "var(--text-secondary)" }}>Name</th>
                      <th style={{ color: "var(--text-secondary)" }}>Email</th>
                      <th style={{ color: "var(--text-secondary)" }}>Role</th>
                      <th style={{ color: "var(--text-secondary)" }}>Joined</th>
                      <th
                        className="text-end"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.05)",
                                color: "var(--text-primary)",
                                fontSize: "0.8rem",
                              }}
                            >
                              {u.name.charAt(0)}
                            </div>
                            <span style={{ fontWeight: 500 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ color: "var(--text-muted)" }}>
                          {u.email}
                        </td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background:
                                u.role === "admin"
                                  ? "rgba(239, 68, 68, 0.15)"
                                  : u.role === "founder"
                                    ? "rgba(99, 102, 241, 0.15)"
                                    : "rgba(20, 184, 166, 0.15)",
                              color:
                                u.role === "admin"
                                  ? "var(--danger)"
                                  : u.role === "founder"
                                    ? "var(--primary-light)"
                                    : "var(--accent-light)",
                            }}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td style={{ color: "var(--text-muted)" }}>
                          {u.joinedDate}
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteUser(u.id)}
                            disabled={u.id === user.id} // Don't allow admin to delete themselves
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="table-responsive">
                <table className="table table-dark-custom table-hover align-middle">
                  <thead>
                    <tr>
                      <th style={{ color: "var(--text-secondary)" }}>
                        Project
                      </th>
                      <th style={{ color: "var(--text-secondary)" }}>
                        Category
                      </th>
                      <th style={{ color: "var(--text-secondary)" }}>
                        Founder
                      </th>
                      <th style={{ color: "var(--text-secondary)" }}>Status</th>
                      <th
                        className="text-end"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.title}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                objectFit: "cover",
                              }}
                            />
                            <span style={{ fontWeight: 600 }}>{p.title}</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className="badge-category"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {p.category}
                          </span>
                        </td>
                        <td style={{ color: "var(--text-muted)" }}>
                          {p.founderName}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              p.status === "funded"
                                ? "badge-status-funded"
                                : "badge-status-active"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteProject(p.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No projects found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
