import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => 
      user.email === formData.email && 
      user.password === formData.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('email', user.email);
      navigate('/HomePage');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    
    
  };
  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>Login to IndiyaSe</h1>
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.showHideBtn}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && <p style={styles.errorText}>{error}</p>}

            <button type="submit" style={styles.submitButton}>
              Login
            </button>
          </form>

          <p style={styles.footerText}>
            Don't have an account?{' '}
            <a href="/signup" style={styles.link}>Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
    width: '100vw',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    zIndex: -1
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'left'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555'
  },
  input: {
    padding: '14px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#0077cc',
      boxShadow: '0 0 0 2px rgba(0, 119, 204, 0.1)'
    }
  },
  passwordWrapper: {
    position: 'relative'
  },
  showHideBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#0077cc',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  errorText: {
    color: '#d32f2f',
    fontSize: '14px',
    margin: '5px 0'
  },
  submitButton: {
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '10px',
    ':hover': {
      backgroundColor: '#0066b3'
    }
  },
  footerText: {
    fontSize: '14px',
    color: '#666',
    marginTop: '24px'
  },
  link: {
    color: '#0077cc',
    fontWeight: '500',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  }
};

export default Login;