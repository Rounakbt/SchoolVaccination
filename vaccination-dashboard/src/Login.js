import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the new CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      if (response.data.token) {
        setMessage('Login Successful!');
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError('Invalid credentials, please try again!');
      console.error(err);
    }
  };

  return (
    <div className="login-page background">
      <div className="container">
        <div className="row">
          <form className="col s12 m6 offset-m3" onSubmit={handleSubmit}>
            <div className="card z-depth-3">
              <div className="card-content">
                <span className="card-title center-align">LOGIN</span>

                <div className="input-field">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>

                <div className="input-field">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="center-align">
                  <button type="submit" className="btn waves-effect waves-light green">
                    Login
                  </button>
                </div>

                {message && <p className="green-text center-align">{message}</p>}
                {error && <p className="red-text center-align">{error}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
