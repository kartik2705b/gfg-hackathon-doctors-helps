import React from "react";

const Header = () => {
  return (
    <header>
      <div className="flex item-center justify-center bg-[#1F4D36]">
        <span className="p-2 text-white font-semibold">
          Get your first doctor visit for just 499.
        </span>
      </div>
      <nav className="bg-[#F2F4EA] border-gray-200 md:px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex justify-between items-center px-3 md:px-24">
          <a href="/">
            <span className="text-green-900 text-2xl font-semibold">
              Doctor
            </span>
          </a>
          <div className="flex items-center">
            <button
              type="button"
              class="py-2.5 px-5 text-sm font-medium text-green-900 focus:outline-none rounded-full border border-green-900 hover:bg-greem-900 hover:text-white-700"
            >
              Find Your Doctor
            </button>
          </div>
        </div>
        <hr class="h-px mt-4 bg-green-700 border-1"></hr>
      </nav>
    </header>
  );
};

export default Header;
