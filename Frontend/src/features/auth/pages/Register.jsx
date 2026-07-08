import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link ,Navigate } from 'react-router';
import Navbar from '../../../components/Navbar';
import { useAuth } from '../hook/useAuth';

export default function Register() {
  // State variables for registration (renamed from name to username)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //for email verification after registration
  const [localError, setLocalError] = useState('');
  const [mailSentMsg, setMailSentMsg] = useState(''); // NEW
  
  // Custom states for verification feedback
  const [registered, setRegistered] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  

  const navigate = useNavigate();
  const { handleRegister, handleResendVerification } = useAuth();

  // Selectors from Redux store
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  // Set registered to true when user is successfully updated in Redux store
  useEffect(() => {
    if (user) {
      setRegistered(true);
    }
  }, [user]);

  if (!loading && user) {
  return <Navigate to="/dashboard" replace />;
}

  // Form validation (updated to validate username formatting)
  const validateForm = () => {
    if (!username.trim()) {
      setLocalError('Username is required');
      return false;
    }
    if (username.length < 3 || username.length > 30) {
      setLocalError('Username must be between 3 and 30 characters');
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setLocalError('Username can only contain letters, numbers, and underscores');
      return false;
    }
    if (!email) {
      setLocalError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setLocalError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return false;
    }
    setLocalError('');
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setResendMessage('');
    const payload = {
      email,
      username,
      password,
    };

    // await handleRegister(payload);
    
    const success = await handleRegister(payload);
    if(success) {
      setRegistered(true);
    }
  };

  const handleResendMail = async () => {
    setResendLoading(true);
    setResendMessage('');

    const res = await handleResendVerification({ email });
    setResendLoading(false);
    if (res.success) {
      setResendMessage('Verification email has been resent to ' + email + '!');
    } else {
      setResendMessage('Failed to resend verification email: ' + res.error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 dark:bg-black transition-colors duration-300 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Top Navbar */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main card */}
      <div className="w-full max-w-3xl md:max-w-4xl md:min-h-[400px] h-auto bg-white dark:bg-slate-900/75 dark:backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-transparent dark:border-gray-800/80 grid grid-cols-1 md:grid-cols-2 transition-all duration-300 my-auto z-10">

        {/* Left Side */}
        <div className="relative h-32 md:h-full min-h-[160px] md:min-h-[400px]">
          <img
            src="/hermes.png"
            alt="Hermes"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
            <h1 className="text-white text-3xl md:text-5xl tracking-[8px] md:tracking-[12px] font-light drop-shadow-md">
              WELCOME
            </h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 dark:bg-slate-900/30 my-auto">
          
          {!registered ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Register
              </h1>

              {/* Status and Error Messages */}
              {(localError || error) && (
                <div className="mb-4 p-3 rounded-lg text-sm font-medium border bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 transition-all">
                  {localError || error}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Username Field */}
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (localError) setLocalError('');
                    }}
                    required
                    className="w-full border-b border-gray-400 dark:border-gray-600 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent focus:outline-none focus:border-[#091B63] dark:focus:border-blue-400 transition-colors"
                    disabled={loading}
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (localError) setLocalError('');
                    }}
                    required
                    className="w-full border-b border-gray-400 dark:border-gray-600 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent focus:outline-none focus:border-[#091B63] dark:focus:border-blue-400 transition-colors"
                    disabled={loading}
                  />
                </div>

                {/* Password */}
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (localError) setLocalError('');
                    }}
                    required
                    className="w-full border-b border-gray-400 dark:border-gray-600 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent focus:outline-none focus:border-[#091B63] dark:focus:border-blue-400 transition-colors"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#091B63] hover:bg-[#07144e] dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-gray-500 text-white text-base sm:text-lg font-semibold py-3 rounded-xl transition-all shadow-md active:scale-[0.99] mt-2 cursor-pointer"
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-gray-600 dark:text-zinc-300">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[#091B63] dark:text-blue-400 transition hover:underline">
                  Login
                </Link>
              </p>
            </>
          ) : (
            // Success registration page view showing email verification message
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Account Created!
              </h1>

              <div className="p-4 rounded-xl border bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30 text-sm leading-relaxed">
                Thank you for registering, <strong>{username}</strong>! <br />
                Please verify your ID through your email link sent to <strong>{email}</strong>.
              </div>

              {resendMessage && (
                <div className="p-3 rounded-lg text-xs border bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/30">
                  {resendMessage}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleResendMail}
                  disabled={resendLoading}
                  className="w-full bg-[#091B63] hover:bg-[#07144e] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer flex justify-center items-center gap-2"
                >
                  {resendLoading ? 'Resending Mail...' : 'Resend verification mail'}
                </button>

                {/* <button
                  onClick={() => navigate('/login')}
                  className="w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 text-sm font-semibold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Email verified! Press to move forward
                </button> */}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}