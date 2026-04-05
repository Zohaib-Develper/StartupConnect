import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject, deleteProject } from '../../store/slices/projectSlice';

function EditProject() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  const project = projects.find((p) => p.id === id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    fundingGoal: '',
    image: '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const categories = [
    'CleanTech',
    'HealthTech',
    'FinTech',
    'AgriTech',
    'EdTech',
    'Logistics',
    'Marketplace',
    'CyberSecurity',
    'AI/ML',
    'SaaS',
    'E-Commerce',
    'Social Impact',
  ];

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        fundingGoal: project.fundingGoal,
        image: project.image,
      });
    }
  }, [project]);

  if (!project) {
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center" style={{ paddingTop: '100px' }}>
        <div className="text-center">
          <i className="bi bi-emoji-frown" style={{ fontSize: '4rem', color: 'var(--text-muted)' }}></i>
          <h3 className="mt-3">Project Not Found</h3>
          <button className="btn btn-primary-custom mt-3" onClick={() => navigate('/founder/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProject({
        id: project.id,
        ...formData,
        fundingGoal: Number(formData.fundingGoal),
      })
    );
    navigate('/founder/dashboard');
  };

  const handleDelete = () => {
    dispatch(deleteProject(project.id));
    navigate('/founder/dashboard');
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }} id="edit-project-page">
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="animate-fade-in-up">
          <button className="btn btn-outline-custom mb-4" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2"></i>Back
          </button>

          <div className="glass-card p-5">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h2 style={{ fontWeight: 800 }}>Edit Project</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Update your project details</p>
              </div>
              <button
                className="btn btn-outline-danger"
                onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                id="delete-project-toggle"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>

            {showDeleteConfirm && (
              <div
                className="alert mb-4 d-flex align-items-center justify-content-between"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--border-radius-sm)',
                  color: 'var(--danger)',
                }}
              >
                <span>
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Delete this project permanently?
                </span>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleDelete}
                    id="confirm-delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="edit-title">Project Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="edit-description">Description</label>
                <textarea
                  className="form-control"
                  id="edit-description"
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="edit-category">Category</label>
                  <select
                    className="form-select"
                    id="edit-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="edit-funding-goal">Funding Goal ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="edit-funding-goal"
                    name="fundingGoal"
                    value={formData.fundingGoal}
                    onChange={handleChange}
                    required
                    min="1000"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="edit-image">Image URL</label>
                <input
                  type="url"
                  className="form-control"
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              {formData.image && (
                <div className="mb-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-100"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: 'var(--border-radius-sm)',
                      border: '1px solid var(--border-color)',
                    }}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary-custom w-100 py-3" id="update-project-btn">
                <i className="bi bi-check-lg me-2"></i>Update Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProject;
