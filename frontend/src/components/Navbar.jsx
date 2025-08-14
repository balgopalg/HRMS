import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // npm install lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg fixed w-full top-0 left-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-teal-600">
          <img src="./public/logo.jpg" alt="Logo" className="h-10 rounded" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setActive(link.name)}
                  className={`transition-colors duration-300 ${
                    active === link.name
                      ? "text-teal-600 font-semibold"
                      : "text-gray-700 hover:text-teal-600"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <a
            href="/login"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
          >
            Login
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-lg border-t border-white/30 shadow-lg">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-gray-200/30">
              <a
                href={link.href}
                onClick={() => {
                  setActive(link.name);
                  setIsOpen(false);
                }}
                className={`block px-4 py-3 ${
                  active === link.name
                    ? "text-teal-600 font-semibold"
                    : "text-gray-700 hover:text-teal-600"
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}

          {/* Login Button inside Mobile Menu */}
          <li>
            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-center bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
            >
              Login
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
