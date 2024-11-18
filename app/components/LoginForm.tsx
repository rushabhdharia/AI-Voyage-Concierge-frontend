"use client"

import { useState } from 'react';
import { login } from '../api/auth';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = await login(username, password);

    if (token) {
      localStorage.setItem('token', token);
      // Redirect to a protected page
      window.location.href = '/protected';
    } else {
      // Handle authentication errors
      console.error('Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;