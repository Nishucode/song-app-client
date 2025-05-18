import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ token, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Song App</h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        <div className={`md:flex items-center ${isOpen ? 'block' : 'hidden'} md:block`}>
          {token ? (
            <>
              <Link to="/favorites" className="block md:inline-block mx-2 hover:underline">
                Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="block md:inline-block bg-red-500 px-4 py-2 rounded hover:bg-red-600 mt-2 md:mt-0 w-full md:w-auto text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block md:inline-block mx-2 hover:underline">
                Login
              </Link>
              <Link to="/register" className="block md:inline-block mx-2 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .block {
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            background: #4f46e5;
            padding: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;