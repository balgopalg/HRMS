import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const {login} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      // Handle successful login
      console.log('Login successful:', response.data);
      // You can redirect the user or store the token here
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token",response.data.token)
        if(response.data.user.role === "admin"){
          navigate('/admin-dashboard')
        }else{
          navigate('/employee-dashboard')
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      if(error.response && !error.response.data.success) {
        setError(error.response.data.message);
      }else{
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900">
  <div className="relative flex flex-col items-center h-screen justify-center bg-gradient-to-br from-blue-100 via-teal-100 to-pink-100 transition-all duration-500">
    <h2 className="text-3xl font-bold mb-8 drop-shadow-lg text-blue-900">
      Human Resource Management System
    </h2>
    <div className="border-0 shadow-2xl w-80 p-8 rounded-2xl bg-white/80 backdrop-blur-lg transition-all duration-500 text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-900">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-blue-900"
          >
            Email:
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg border-0 shadow-inner focus:ring-2 focus:ring-teal-400 outline-none bg-white text-gray-800 placeholder-gray-400"
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-blue-900"
          >
            Password:
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg border-0 shadow-inner focus:ring-2 focus:ring-teal-400 outline-none bg-white text-gray-800 placeholder-gray-400"
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="mr-2 accent-teal-500"
            />
            <label
              htmlFor="remember"
              className="text-sm text-blue-900"
            >
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-teal-600 hover:underline text-sm"
          >
            Forgot password?
          </a>
        </div>
        <button
          className="w-full py-2 rounded-lg font-bold shadow-lg transition-all duration-300 bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:from-teal-500 hover:to-teal-700"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</div>

  )
}

export default Login
