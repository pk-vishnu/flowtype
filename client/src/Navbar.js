import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [accessToken, setAccessToken] = useState();
  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken"));
  }, [accessToken]);
  return (
    <>
      <header className="text-gray-400 body-font w-full">
        <div className="container flex flex-wrap p-0 flex-col md:flex-row items-center py-3 lg:mx-7 md:mx-15 ">
          <img src="./logo.png" className="size-16 mt-2" alt="Flowtype logo" />
          <a
            className="flex title-font font-medium items-center text-light mb-4 md:mb-0"
            href="/"
          >
            <span className="ml-1 mt-1 text-2xl font-poppins">Flowtype</span>
          </a>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a
              className="mr-5 text-light hover:text-white"
              href="https://github.com/pk-vishnu/flowtype"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            {accessToken && (
              <a onClick={sessionStorage.removeItem("accessToken")} href="/">
                Logout
              </a>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
