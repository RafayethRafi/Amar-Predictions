'use client';

import React from 'react';
import Link from 'next/link';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { login, logout, authenticated ,user} = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login();
    router.push('/');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          <Link href="/">Amar Predictions</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>

          {authenticated && user.isAdmin && (
            <li>
              <Link href="/admin" className="text-white hover:text-gray-300">
                Admin
              </Link>
            </li>
          )}
          
          {!authenticated && (
            <div>
              <li>
              <Link href="/login" 
                // onClick={handleLogin}
                className="text-white hover:text-gray-300"
              >
                Login
              </Link>
            </li>

<li>
<Link href="/register" className="text-white hover:text-gray-300">
  Register
</Link>
</li>
            </div>
          )}
          {authenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;