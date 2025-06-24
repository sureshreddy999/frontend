// src/pages/ConfirmSignUp.js
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { confirmSignUp, signIn } from '../api/backendApi';

const ConfirmSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the email passed from SignIn page or SignUp page
  const emailFromState = location.state?.email || '';
  const [email, setEmail] = useState(emailFromState);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Email is required.');
      setLoading(false);
      return;
    }

    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit confirmation code.');
      setLoading(false);
      return;
    }

    try {
      // Confirm user signup with Cognito
      await confirmSignUp(email, code);

      // After confirmation, sign user in automatically
      // You may want to ask for password again instead of this,
      // but here we assume user signs in right after confirmation
      // So redirect to login or prompt to sign in

      alert('Your account has been confirmed! Please sign in.');

      // Redirect to SignIn page for login
      navigate('/signin');

    } catch (err) {
      console.error('Confirmation error:', err);
      setError(err.message || 'Error confirming sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Confirm Your Email
        </h2>
        <p className="text-center mb-6 text-gray-700">
          Enter the 6-digit code sent to <strong>{email || '[your email]'}</strong>
        </p>

        <form onSubmit={handleConfirm} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmation Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Enter 6-digit code"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 text-center bg-red-50 p-2 rounded-md">{error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 text-lg"
            >
              {loading ? 'Confirming...' : 'Confirm Account'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Didn't receive the code?{' '}
          <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500 hover:underline">
            Sign Up Again
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ConfirmSignUp;
