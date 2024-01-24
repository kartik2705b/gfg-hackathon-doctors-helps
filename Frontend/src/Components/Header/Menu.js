import React, { useState, useEffect } from "react";

const Menu = () => {
  const [name, setName] = useState(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    const nameT = localStorage.getItem("name");
    if (nameT) {
      setName(nameT);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href="/"
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className="relative">
        <button onClick={toggleDropdown}>
          <div className="relative w-10 h-10 overflow-hidden bg-green-600 rounded-full dark:bg-gray-600">
            <svg
              class="absolute w-12 h-12 text-white -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </button>

        <div
          id="userDropdown"
          class={`absolute right-0 mt-2 ${
            isDropdownOpen ? "" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44  z-50`}
        >
          <div class="px-4 py-3 text-sm text-gray-900">
            <div class="font-medium  truncate">{name}</div>
          </div>
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200 mb-0"
            aria-labelledby="avatarButton"
          >
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100  text-green-700"
              >
                Dashboard
              </a>
            </li>
          </ul>
          <div class="py-1">
            <button
              onClick={() => handleLogOut()}
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
