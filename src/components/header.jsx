import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Link to="/">
        <img className="m-auto logoBgAnim" src={Logo} />
      </Link>
      <nav className="bg-blue-500 p-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`block h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`block h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-white font-bold text-xl">
                  Pablo Viana
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/register"
                    className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Cadastrar
                  </Link>
                  <Link
                    to="/buy"
                    className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Comprar
                  </Link>
                  <Link
                    to="/purchases"
                    className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Vendas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`sm:hidden ${isOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-white hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/register"
              className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Cadastrar produtos
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/buy"
              className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Comprar
            </Link>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/purchases"
              className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Vendas
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;
