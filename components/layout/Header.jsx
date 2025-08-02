'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Restaurant
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className={`${isActive('/') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className={`${isActive('/menu') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
          >
            Menu
          </Link>
          <Link
            href="/about"
            className={`${isActive('/about') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${isActive('/contact') ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="hidden md:inline-block px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 rounded-md"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden bg-gray-50 px-4 py-2">
        <div className="flex justify-between space-x-4 overflow-x-auto">
          <Link
            href="/"
            className={`whitespace-nowrap px-3 py-1 rounded ${isActive('/') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className={`whitespace-nowrap px-3 py-1 rounded ${isActive('/menu') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Menu
          </Link>
          <Link
            href="/about"
            className={`whitespace-nowrap px-3 py-1 rounded ${isActive('/about') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`whitespace-nowrap px-3 py-1 rounded ${isActive('/contact') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}