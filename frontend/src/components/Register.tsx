import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import './Register.css';

interface BirthDate {
  day: string;
  month: string;
  year: string;
}

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState<BirthDate>({ day: '', month: '', year: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { registerUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      await registerUser(name, email, password, birthDate);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create your Free Account</h2>
        
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="form-group">
          <label>Birth Date</label>
          <div className="birth-date">
            <select
              value={birthDate.day}
              onChange={(e) => setBirthDate({ ...birthDate, day: e.target.value })}
              required
              title="Day"
              aria-label="Day"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day.toString().padStart(2, '0')}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={birthDate.month}
              onChange={(e) => setBirthDate({ ...birthDate, month: e.target.value })}
              required
              title="Month"
              aria-label="Month"
            >
              <option value="">Month</option>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <option key={month} value={(index + 1).toString().padStart(2, '0')}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={birthDate.year}
              onChange={(e) => setBirthDate({ ...birthDate, year: e.target.value })}
              required
              title="Year"
              aria-label="Year"
            >
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="terms">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            I accept the <a href="#terms">Terms and Conditions</a>
          </label>
        </div>

        <button type="submit">Create an account</button>

        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
