import React from "react";

export default function Navbar() {
  var accessToken = sessionStorage.getItem("accessToken");
  const code = new URLSearchParams(window.location.search).get("code");
  return (
    <>
      <header className="text-gray-400 body-font">
        <div className="container flex flex-wrap p-0 flex-col md:flex-row items-center py-3 lg:mx-10 md:mx-15">
          <img src="./logo.png" className="size-16 mt-2" alt="Flowtype logo" />
          <a
            className="flex title-font font-medium items-center text-light mb-4 md:mb-0"
            href="/"
          >
            <span className="ml-1 mt-1 text-2xl font-poppins">Flowtype</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 text-light hover:text-white" href="/"></a>
          </nav>
          {accessToken ? (
            <a href="/">
              <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 text-light ">
                Play
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </a>
          ) : (
            <a href="/">
              <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 text-light">
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </a>
          )}
        </div>
      </header>
    </>
  );
}
