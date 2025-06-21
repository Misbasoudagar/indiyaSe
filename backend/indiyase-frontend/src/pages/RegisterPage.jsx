import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateName = (name) => /^[a-zA-Z ]{3,}$/.test(name);
  const validateGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validatePassword = (password) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

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

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!validateName(trimmedName)) {
      setError('Name must be at least 3 characters and alphabets only.');
      return;
    }

    if (!validateGmail(trimmedEmail)) {
      setError('Only Gmail addresses allowed (e.g., yourname@gmail.com).');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must have 8+ chars with uppercase, lowercase, number & special char.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((u) => u.email === trimmedEmail)) {
      setError('This Gmail is already registered.');
      return;
    }

    users.push({ 
      name: trimmedName, 
      email: trimmedEmail, 
      password: formData.password 
    });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Create Your IndiyaSe Account</h2>
          
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Gmail"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter strong password"
                  required
                  style={styles.input}
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

            {error && <p style={styles.error}>{error}</p>}
            
            <button type="submit" style={styles.button}>
              Sign Up
            </button>
          </form>

          <p style={styles.text}>
            Already have an account?{' '}
            <a href="/login" style={styles.link}>Login here</a>
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, #89f7fe, #66a6ff)',
    zIndex: -1,
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#0077cc',
    fontSize: '24px',
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    color: '#333',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#0077cc',
      boxShadow: '0 0 0 2px rgba(0, 119, 204, 0.2)',
    },
  },
  passwordWrapper: {
    position: 'relative',
  },
  showHideBtn: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#0077cc',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#0077cc',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    fontWeight: '600',
    ':hover': {
      backgroundColor: '#0066b3',
    },
  },
  error: {
    color: 'red',
    fontSize: '13px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  text: {
    marginTop: '20px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#555',
  },
  link: {
    color: '#0077cc',
    textDecoration: 'none',
    fontWeight: '500',
    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default Signup;