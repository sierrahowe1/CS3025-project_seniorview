import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [studentId, setStudentId] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (nameError) {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validation
    let hasError = false;
    
    if (isSignUp && !name) {
      setNameError('Name is required');
      hasError = true;
    }

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (isSignUp && !confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      hasError = true;
    } else if (isSignUp && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) {
      toast.error('Validation Error', {
        description: 'Please fix the errors in the form.',
      });
      return;
    }

    // Simulate login/signup
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const userType = isStudent ? 'student' : 'senior';
      const displayName = isSignUp ? name : email.split('@')[0];
      toast.success(isSignUp ? 'Sign up successful!' : 'Login successful!', {
        description: isSignUp ? `Welcome, ${name}! Registered as ${userType}.` : `Welcome back!`,
      });
      
      onLogin({
        name: displayName,
        email: email,
        isStudent: isStudent,
        studentId: studentId,
      });
      
      // Reset form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsStudent(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setStudentId('');
    }, 1500);
  };

  const handleForgotPassword = () => {
    toast.info('Password Reset', {
      description: 'A password reset link will be sent to your email.',
    });
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsStudent(false);
    setStudentId('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Sidebar with Gradient Background - Made slightly wider */}
      <div className="relative w-full md:w-[280px] lg:w-[320px] bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col items-center justify-center py-8 md:py-0 order-2 md:order-1">
        {/* Decorative top blob - Enlarged */}
        <div className="absolute top-0 right-0 w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-white/30 to-transparent rounded-bl-[120px] md:rounded-bl-[150px]" />
        
        {/* Sidebar Buttons - Enlarged */}
        <div className="relative z-10 flex flex-row md:flex-col items-center justify-center gap-6 md:gap-0 w-full">
          {/* LOGIN Button */}
          <div className="relative md:mb-16">
            <button 
              className={`px-10 md:px-14 lg:px-16 py-4 md:py-5 rounded-r-full md:rounded-l-none transition-all duration-300 font-bold text-lg ${
                !isSignUp 
                  ? 'bg-white text-black shadow-xl scale-110' 
                  : 'bg-white/20 text-black hover:bg-white/30'
              }`}
              onClick={() => {
                setIsSignUp(false);
                resetForm();
              }}
            >
              LOGIN
            </button>
          </div>
          
          {/* SIGN UP Button */}
          <div className="relative">
            <button 
              className={`px-10 md:px-14 lg:px-16 py-4 md:py-5 rounded-r-full md:rounded-l-none transition-all duration-300 font-bold text-lg ${
                isSignUp 
                  ? 'bg-white text-black shadow-xl scale-110' 
                  : 'bg-white/20 text-black hover:bg-white/30'
              }`}
              onClick={() => {
                setIsSignUp(true);
                resetForm();
              }}
            >
              SIGN UP
            </button>
          </div>
        </div>

        {/* Decorative bottom blob - Enlarged */}
        <div className="absolute bottom-0 left-0 w-40 h-40 md:w-56 md:h-56 bg-gradient-to-tr from-white/30 to-transparent rounded-tr-[120px] md:rounded-tr-[150px]" />
      </div>

      {/* Right Content Area - Enlarged and centered form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 md:p-10 lg:p-16 order-1 md:order-2">
        <div className="w-full max-w-2xl"> {/* Increased from max-w-md to max-w-2xl */}
          {/* Header with Logo - Enlarged */}
          <div className="mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-10 md:mb-14">
              <img src="src/Banner.png" alt="Banner" className="w-full max-w-lg h-auto" /> {/* Made logo larger */}
            </div>
          </div>

          {/* Login/Signup Form - Enlarged */}
          <form onSubmit={handleSubmit} className="space-y-7 md:space-y-8">
            {/* Name Input - Enlarged */}
            {isSignUp && (
              <div className="relative">
                <div className="flex items-center gap-5 pb-3 border-b-2 border-gray-300 focus-within:border-cyan-500 transition-colors">
                  <User className="w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-lg"
                  />
                </div>
                {nameError && (
                  <p className="text-red-500 text-base mt-2 ml-11">{nameError}</p>
                )}
              </div>
            )}

            {/* Email Input - Enlarged */}
            <div className="relative">
              <div className="flex items-center gap-5 pb-3 border-b-2 border-gray-300 focus-within:border-cyan-500 transition-colors">
                <Mail className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-lg"
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-base mt-2 ml-11">{emailError}</p>
              )}
            </div>

            {/* Password Input - Enlarged */}
            <div className="relative">
              <div className="flex items-center gap-5 pb-3 border-b-2 border-gray-300 focus-within:border-cyan-500 transition-colors">
                <Lock className="w-6 h-6 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-6 h-6" />
                  ) : (
                    <Eye className="w-6 h-6" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-base mt-2 ml-11">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password Input - Enlarged */}
            {isSignUp && (
              <div className="relative">
                <div className="flex items-center gap-5 pb-3 border-b-2 border-gray-300 focus-within:border-cyan-500 transition-colors">
                  <Lock className="w-6 h-6 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-base mt-2 ml-11">{confirmPasswordError}</p>
                )}
              </div>
            )}

            {/* Student Radio Buttons for Sign Up - Enlarged */}
            {isSignUp && (
              <div className="space-y-4">
                <div className="flex items-center gap-8">
                  <span className="text-cyan-500 font-bold text-lg">STUDENT?</span>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        checked={isStudent === true}
                        onChange={() => setIsStudent(true)}
                        className="w-5 h-5 accent-cyan-500"
                      />
                      <span className="text-gray-700 font-medium text-lg">YES</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        checked={isStudent === false}
                        onChange={() => setIsStudent(false)}
                        className="w-5 h-5 accent-cyan-500"
                      />
                      <span className="text-gray-700 font-medium text-lg">NO</span>
                    </label>
                  </div>
                </div>
                
                {/* Student ID field - Enlarged */}
                {isStudent && (
                  <div className="relative ml-6 pl-6 border-l-2 border-cyan-200">
                    <input
                      type="text"
                      placeholder="STUDENT ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full pb-3 border-b-2 border-gray-300 focus:border-cyan-500 outline-none text-gray-700 placeholder:text-gray-400 text-lg transition-colors"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Forgot Password & Submit - Enlarged */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-0 pt-6">
              {!isSignUp && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-cyan-500 hover:underline transition-all font-medium text-lg text-center sm:text-left order-2 sm:order-1"
                >
                  Forgot Password?
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`bg-cyan-400 hover:bg-cyan-300 text-black px-12 sm:px-16 py-4 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg font-semibold order-1 sm:order-2 ${!isSignUp ? 'sm:ml-auto' : 'w-full sm:w-auto'}`}
              >
                {isLoading ? (isSignUp ? 'SIGNING UP...' : 'LOGGING IN...') : (isSignUp ? 'SIGN UP' : 'LOGIN')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}