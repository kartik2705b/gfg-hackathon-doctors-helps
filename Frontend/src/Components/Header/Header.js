import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import Menu from "./Menu";

const Header = () => {
  const [token, setToken] = useState(null);
  const [state, setState] = useState(null);
  const [role, setRole] = useState("patient");

  useEffect(() => {
    console.log("token", localStorage.getItem("token"));
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);
  return (
    <header>
      <div className="flex item-center justify-center bg-[#1F4D36]">
        <span className="p-2 text-white font-semibold">
          Get your first doctor visit for just 499.
        </span>
      </div>
      <nav className="bg-[#F2F4EA] border-gray-200 md:px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex justify-between items-center px-3 md:px-24">
          <a href="/" className="flex justify-between items-center">
            <img src={logo} height={70} width={70} />
            <h1 className="px-4 text-2xl font-bold text-[#1F4D36]">
              My Doctor
            </h1>
          </a>

          <div className="flex items-center gap-4">
              {role === "patient" && (
                <a
                  href="/store"
                  className="py-2.5 px-5 text-sm font-medium text-green-900 focus:outline-none rounded border border-green-900 hover:bg-greem-900 hover:text-white-700"
                >
                  Medicine
                </a>
              )}

              {role === "patient" && (
                <a
                  href="/checkout"
                  className="py-2.5 px-5 text-sm font-medium text-green-900 focus:outline-none rounded border border-green-900 hover:bg-greem-900 hover:text-white-700"
                >
                  Cart
                </a>
              )}
            {!token ? (
              <a
                type="button"
                href="/login"
                class="py-2.5 px-5 text-sm font-medium text-green-900 focus:outline-none rounded-full border border-green-900 hover:bg-greem-900 hover:text-white-700"
              >
                Log in
              </a>
            ) : (
              <Menu />
            )}
          </div>
        </div>
        <hr class="h-px mt-4 bg-green-700 border-1"></hr>
      </nav>
    </header>
  );
};

export default Header;
