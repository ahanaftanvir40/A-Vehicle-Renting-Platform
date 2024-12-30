import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { useTheme } from "@/store/themeProvider";

function Header() {
  const { user } = useAuth();
  const { setTheme, theme } = useTheme()

  let navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  // );

  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   const localTheme = localStorage.getItem("theme");
  //   document.querySelector("html").setAttribute("class", localTheme);
  // }, [theme]);

  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <div className="py-2 hidden sm:flex"></div>
      <div className="relative mx-auto transform w-full md:w-full lg:w-2/3 lg:rounded-full py-4 dark:bg-slate-900 bg-[#2f2d3b] sm:px-10 transition-all duration-500 ">
        <div className="mx-auto px-4 flex justify-between items-center text-white">
          {/* Logo and Branding */}
          <Link
            to="/"
            className="flex justify-center items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              className="h-12 w-12 hidden md:flex rounded-full"
              src={logo}
              alt="Logo"
            />
            <span className="text-2xl hidden md:flex font-semibold dark:text-amber-500">
              WheelzOnRent
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className=" flex space-x-4 sm:space-x-8 text-white">
            <li>
              <Link
                to="/"
                className="dark:text-white/60 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/WheelHub"
                className="dark:text-white/60 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                WheelHub
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li>
                <Link
                  to="/userdashboard"
                  className="dark:text-white/60 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li>
              <label className="swap swap-rotate">
                {/* Theme Toggle */}
                <input
                  type="checkbox"
                  onChange={handleTheme}
                  checked={theme !== "light"}
                />

                {/* Sun icon */}
                <svg
                  className="swap-on h-6 w-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* Moon icon */}
                <svg
                  className="swap-off h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </li>
          </ul>

          {/* Auth Links */}
          <div className=" space-x-6 items-center">
            {!localStorage.getItem("authToken") ? (
              <>
                <Link
                  to="/signup"
                  className="dark:text-white/90 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="dark:text-white/90 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={handleToggleDropdown}
                >
                  <img
                    className="h-10 w-10 rounded-full max-w-full"
                    src={`http://localhost:3000/public/images/user-avatars/${user.avatar}`}
                    alt="Profile Avatar"
                  />
                  <span className="dark:text-gray-300 hidden md:flex">
                    Profile
                  </span>
                  <svg
                    className="w-5 h-5 text-blue-500 hidden md:flex dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg  z-50">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4  py-2 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                        onClick={handleOptionClick}
                      >
                        Profile
                      </Link>
                    </li>
                    {user.isAdmin && (
                      <li>
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                          onClick={handleOptionClick}
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          handleOptionClick();
                        }}
                        className="w-full text-left block px-4 py-2 text-black dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
        </div>
      </div>
    </div>
  );
}

export default Header;
