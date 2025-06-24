import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signIn } from '../api/backendApi';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../aws-config';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await signIn({ email, password });

      if (response.success) {
        setUser({ email, token: response.token });
        setIsAuthenticated(true); // ✅ Ensure navbar updates
        navigate('/home');
      } else {
        if (response.message.includes('User is not confirmed')) {
          navigate('/confirm-signup', { state: { email } });
        } else {
          setError(response.message || 'Login failed. Please check your credentials.');
        }
      }
    } catch (err) {
      if (err.message && err.message.includes('User is not confirmed')) {
        navigate('/confirm-signup', { state: { email } });
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }

    const user = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    user.forgotPassword({
      onSuccess: () => {
        alert("Password reset code sent to your email.");
        navigate('/reset-password', { state: { email } });
      },
      onFailure: (err) => {
        setError(err.message || "Failed to initiate password reset.");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8 gradient-text">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded-md">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 text-lg"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-purple-600 hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
