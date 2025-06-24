import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../aws-config';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !code || !newPassword) {
      setError('All fields are required.');
      return;
    }

    const user = new CognitoUser({ Username: email, Pool: userPool });

    user.confirmPassword(code, newPassword, {
      onSuccess: () => {
        setSuccess('✅ Password reset successful. You can now sign in.');
        setTimeout(() => navigate('/signin'), 2000);
      },
      onFailure: (err) => {
        setError(err.message || 'Failed to reset password.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Reset Your Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Check your email for the 6-digit code.</p>
        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="6-digit code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="New password"
            />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 text-center p-2 rounded">{error}</p>}
          {success && <p className="text-sm text-green-600 bg-green-50 text-center p-2 rounded">{success}</p>}
          <button type="submit" className="w-full btn-primary py-2.5 text-lg">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
