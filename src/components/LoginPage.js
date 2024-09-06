import React, { useState } from 'react';
import axios from 'axios'; // Install axios: `npm install axios`
import './LoginPage.css';

const LoginPage = () => {
  const [view, setView] = useState('login');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');

  const [forgotPhone, setForgotPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username: loginUsername, password: loginPassword });
      localStorage.setItem('token', response.data.token);
      window.location.href = 'https://highlightcards.co.uk';
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post('http://localhost:5000/signup', { username: signupUsername, email: signupEmail, password: signupPassword, phone: signupPhone });
      alert('Sign up successful');
      setView('login');
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    alert(`Reset Password:\nPhone: ${countryCode} ${forgotPhone}`);
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1>FUUSS</h1>
      </header>
      <div className="form-container">
        {view === 'login' && (
          <div className="form-section">
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-username">Username</label>
                <input
                  type="text"
                  id="login-username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="submit-button">Login</button>
              <div className="extra-options">
                <a href="#forgot-password" onClick={() => setView('forgotPassword')} className="forgot-password">Forgot Password?</a>
                <p className="signup-link">New User? <a href="#signup" onClick={() => setView('signup')}>Sign Up</a></p>
              </div>
            </form>
          </div>
        )}

        {view === 'signup' && (
          <div className="form-section">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label htmlFor="signup-username">Username</label>
                <input
                  type="text"
                  id="signup-username"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-phone">Phone Number</label>
                <input
                  type="text"
                  id="signup-phone"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <button type="submit" className="submit-button">Sign Up</button>
              <div className="extra-options">
                <a href="#login" onClick={() => setView('login')} className="forgot-password">Back to Login</a>
              </div>
            </form>
          </div>
        )}

        {view === 'forgotPassword' && (
          <div className="form-section">
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="form-group">
                <label htmlFor="forgot-phone">Phone Number</label>
                <div className="phone-number-group">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="country-code"
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (IN)</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input
                    type="text"
                    id="forgot-phone"
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    className="phone-number-input"
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">Submit</button>
              <div className="extra-options">
                <a href="#login" onClick={() => setView('login')} className="forgot-password">Back to Login</a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

