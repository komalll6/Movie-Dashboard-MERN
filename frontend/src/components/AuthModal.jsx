//new- 27-07-26 (new file)

import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { registerUser, loginUser } from '../services/authService';

const AuthModal = ({ isOpen, onClose, initialIsSignUp = true, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await registerUser(formData);
      } else {
        await loginUser({ email: formData.email, password: formData.password });
      }
      if (onAuthSuccess) onAuthSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } font-semibold {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-md p-8 bg-[#131217]/90 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-white tracking-wide">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isSignUp ? 'Sign up to start streaming and saving favorites' : 'Sign in to access your MovieHub account'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-2.5 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1c1b22] text-white text-xs pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:border-red-600 outline-none transition"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1c1b22] text-white text-xs pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:border-red-600 outline-none transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#1c1b22] text-white text-xs pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:border-red-600 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-red-600/20 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-gray-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-red-500 hover:underline font-semibold ml-1 cursor-pointer"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;