import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, clearError } from '../store/slices/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'founder':
          navigate('/founder/dashboard');
          break;
        case 'investor':
          navigate('/investor/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginSuccess({ email, password }));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(79, 70, 229, 0.12) 0%, transparent 50%), var(--bg-primary)',
        paddingTop: '80px',
      }}
    >
      <div className="container" style={{ maxWidth: '460px' }}>
        <div className="glass-card p-5 animate-fade-in-up" id="login-form-card">
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
              <i className="bi bi-rocket-takeoff-fill text-white"></i>
            </div>
            <h2 style={{ fontWeight: 800 }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>
          </div>

          {error && (
            <div
              className="alert d-flex align-items-center gap-2 mb-3"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: 'var(--danger)',
                borderRadius: 'var(--border-radius-sm)',
              }}
            >
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="login-email">Email address</label>
              <div className="position-relative">
                <i
                  className="bi bi-envelope position-absolute"
                  style={{ left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                ></i>
                <input
                  type="email"
                  className="form-control"
                  id="login-email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: '42px' }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="login-password">Password</label>
              <div className="position-relative">
                <i
                  className="bi bi-lock position-absolute"
                  style={{ left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                ></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="login-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                />
                <button
                  type="button"
                  className="btn position-absolute border-0 p-0"
                  style={{ right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary-custom w-100 py-3 mb-3" id="login-submit-btn">
              <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
            </button>
          </form>

          <p className="text-center mb-0" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ fontWeight: 600 }}>Create one</Link>
          </p>

          {/* Demo credentials hint */}
          <div
            className="mt-4 p-3"
            style={{
              background: 'rgba(99, 102, 241, 0.06)',
              borderRadius: 'var(--border-radius-sm)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
              fontSize: '0.8rem',
            }}
          >
            <p className="mb-1" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>
              <i className="bi bi-info-circle me-1"></i>Demo Credentials
            </p>
            <p className="mb-1" style={{ color: 'var(--text-muted)' }}>
              <strong>Founder:</strong> zohaib@gmail.com / password123
            </p>
            <p className="mb-0" style={{ color: 'var(--text-muted)' }}>
              <strong>Investor:</strong> chand@gmail.com / password123
            </p>
            <p className="mb-0" style={{ color: 'var(--text-muted)' }}>
              <strong>Admin:</strong> admin@gmail.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
