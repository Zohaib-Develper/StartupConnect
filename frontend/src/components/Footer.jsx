import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-dark" id="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="d-flex align-items-center gap-2">
              <i className="bi bi-rocket-takeoff-fill" style={{ color: 'var(--primary-light)' }}></i>
              Startup Connect
            </h5>
            <p className="mb-3" style={{ fontSize: '0.9rem' }}>
              Bridging the gap between visionary founders and strategic investors. 
              Build the future, one startup at a time.
            </p>
            <div className="d-flex gap-3">
              <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x fs-5"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin fs-5"></i></a>
              <a href="#" aria-label="GitHub"><i className="bi bi-github fs-5"></i></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram fs-5"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5>Platform</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/projects">Explore Startups</Link></li>
              <li><Link to="/register">Get Started</Link></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5>Resources</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">API Docs</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5>Stay Updated</h5>
            <p style={{ fontSize: '0.9rem' }}>Subscribe to our newsletter for the latest startup opportunities.</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
              <button className="btn btn-primary-custom" type="button">
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0 1rem' }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0" style={{ fontSize: '0.85rem' }}>
            © 2025 Startup Connect. All rights reserved.
          </p>
          <div className="d-flex gap-3" style={{ fontSize: '0.85rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
