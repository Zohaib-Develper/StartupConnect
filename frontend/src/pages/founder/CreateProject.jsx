import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../../store/slices/projectSlice';

function CreateProject() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    fundingGoal: '',
    image: '',
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProject({
        ...formData,
        fundingGoal: Number(formData.fundingGoal),
        founderId: user.id,
        founderName: user.name,
        image:
          formData.image ||
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
      })
    );
    navigate('/founder/dashboard');
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }} id="create-project-page">
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="animate-fade-in-up">
          <button
            className="btn btn-outline-custom mb-4"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-2"></i>Back
          </button>

          <div className="glass-card p-5">
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'var(--primary-gradient)',
                  fontSize: '1.5rem',
                }}
              >
                <i className="bi bi-plus-lg text-white"></i>
              </div>
              <h2 style={{ fontWeight: 800 }}>Create New Project</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Share your startup idea with potential investors
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="project-title">Project Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="project-title"
                  name="title"
                  placeholder="e.g., EcoTrack"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="project-description">Description</label>
                <textarea
                  className="form-control"
                  id="project-description"
                  name="description"
                  rows="5"
                  placeholder="Describe your startup idea, the problem it solves, and why investors should fund it..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label" htmlFor="project-category">Category</label>
                  <select
                    className="form-select"
                    id="project-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" htmlFor="project-funding-goal">
                    Funding Goal ($)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="project-funding-goal"
                    name="fundingGoal"
                    placeholder="e.g., 500000"
                    value={formData.fundingGoal}
                    onChange={handleChange}
                    required
                    min="1000"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="project-image">
                  Image URL <small style={{ color: 'var(--text-muted)' }}>(optional)</small>
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="project-image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                />
                <small style={{ color: 'var(--text-muted)' }}>
                  Leave empty for a default image. In production, Cloudinary upload will be used.
                </small>
              </div>

              {formData.image && (
                <div className="mb-4">
                  <label className="form-label">Preview</label>
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
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary-custom w-100 py-3"
                id="submit-project-btn"
              >
                <i className="bi bi-rocket-takeoff me-2"></i>Launch Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
