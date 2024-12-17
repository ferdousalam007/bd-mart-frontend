import { useState } from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {  NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
// import ThemeButton from "./ThemeButton";
import { useUserProfile } from "../hooks/users/useUserProfile";
import { useLogout } from "../hooks/auth/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userProfile } = useUserProfile();
  const { logout } = useLogout();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { items } = useSelector((state: RootState) => state.cart);

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };
  return (
    <>
      {/* Top Banner */}
      <div className="bg-gray-100 text-center py-2">
        <p className="text-gray-700 text-sm">
          Free Delivery on orders over $80. Don’t miss discount.
        </p>
      </div>

      {/* Main Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">
                <img src={logo} alt="logo" className="h-10" />
              </span>
            </div>
          </Link>
          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-700">
            <div className="flex items-center space-x-2">
              <span className="md:flex hidden">👤</span>

              {userProfile?.role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/order-history"
                      className={({ isActive }) =>
                        isActive
                          ? "text-gray-300 cursor-pointer border-b-2 border-white md:flex hidden"
                          : "hover:text-gray-300 cursor-pointer md:flex hidden"
                      }
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      className={
                        "text-primary-brand transition duration-300 font-medium"
                      }
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {userProfile?.role === "vendor" && (
                <button
                  onClick={() => logout()}
                  className={
                    "text-slate-800 transition duration-300 font-medium"
                  }
                >
                  Logout
                </button>
              )}
              {userProfile?.role === "admin" && (
                <button
                  onClick={() => logout()}
                  className={
                    "text-slate-800 transition duration-300 font-medium"
                  }
                >
                  Logout
                </button>
              )}
              {!userProfile && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-brand transition duration-300 md:flex hidden"
                      : "hover:text-primary-brand transition duration-300 md:flex hidden"
                  }
                >
                  Login
                </NavLink>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span>❤️</span>

              <NavLink
                to="/comparison"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 cursor-pointer border-b-2 border-white"
                    : "hover:hover:text-blue-500 cursor-pointer"
                }
              >
                Compare
              </NavLink>
            </div>
            <div className="md:flex hidden items-center space-x-2 ">
              <span>🛒</span>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-300 cursor-pointer border-b-2 border-white"
                    : "hover:text-gray-600 cursor-pointer"
                }
              >
                Cart ({items.length})
              </NavLink>
            </div>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button className="text-gray-700 text-2xl" onClick={toggleMenu}>
              ☰
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className=" bg-[#FFBD0C] text-gray-800">
          <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
            {/* Left Menu */}
            <ul className="hidden md:flex  space-x-6 text-sm flex-wrap justify-center md:justify-start">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-800 cursor-pointer border-b-2 border-slate-600"
                      : "hover:text-gray-600 cursor-pointer"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-800 cursor-pointer border-b-2 border-slate-600"
                      : "hover:text-gray-600 cursor-pointer"
                  }
                >
                  products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recent-views"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-800 cursor-pointer border-b-2 border-slate-600"
                      : "hover:text-gray-600 cursor-pointer"
                  }
                >
                  Most Views
                </NavLink>
              </li>

              {userProfile?.role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/order-history"
                      className={({ isActive }) =>
                        isActive
                          ? "text-gray-300 cursor-pointer border-b-2 border-white"
                          : "hover:text-gray-300 cursor-pointer"
                      }
                    >
                      Order History
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      className={
                        "text-primary-brand transition duration-300 font-medium"
                      }
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

              {(userProfile?.role === "vendor" ||
                userProfile?.role === "admin") && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-gray-800 cursor-pointer border-b-2 border-slate-600"
                        : "hover:text-gray-600 cursor-pointer"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              {/* {!userProfile && (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary-brand transition duration-300 font-medium"
                        : "hover:text-primary-brand transition duration-300 font-medium"
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )} */}
            </ul>
            {/* Right Options */}
            <div className="hidden md:flex items-center space-x-4 text-sm mt-2 md:mt-0">
              <span className="font-bold">Hotline: +01 1234 8888</span>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={menuVariants}
                  className="md:hidden  text-gray-800 space-y-4 p-4 overflow-hidden font-semibold shadow-sm"
                >
                  <div className="flex items-center space-x-4 text-sm mt-2 md:mt-0">
                    <span className="font-bold">Hotline: +01 1234 8888</span>
                  </div>
                  <motion.li variants={itemVariants}>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "text-gray-500 transition duration-300 block"
                          : "hover:text-gray-600 transition duration-300 block"
                      }
                      onClick={toggleMenu}
                    >
                      Home
                    </NavLink>
                  </motion.li>
                  {userProfile?.role === "user" && (
                    <motion.li variants={itemVariants}>
                      <NavLink
                        to="/order-history"
                        className={({ isActive }) =>
                          isActive
                            ? "text-gray-500 transition duration-300 block"
                            : "hover:text-gray-600 transition duration-300 block"
                        }
                        onClick={toggleMenu}
                      >
                        Order History
                      </NavLink>
                    </motion.li>
                  )}
                  <motion.li variants={itemVariants}>
                    <NavLink
                      to="/comparison"
                      className={({ isActive }) =>
                        isActive
                          ? "text-gray-500 transition duration-300 block"
                          : "hover:text-gray-600 transition duration-300 block"
                      }
                      onClick={toggleMenu}
                    >
                      Compare
                    </NavLink>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <NavLink
                      to="/recent-views"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary-brand transition duration-300 block"
                          : "hover:text-primary-brand transition duration-300 block"
                      }
                      onClick={toggleMenu}
                    >
                      Recent Views
                    </NavLink>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary-brand transition duration-300 block"
                          : "hover:text-primary-brand transition duration-300 block"
                      }
                      onClick={toggleMenu}
                    >
                      Cart ({items.length})
                    </NavLink>
                  </motion.li>
                  {userProfile?.role === "vendor" && (
                    <motion.li variants={itemVariants}>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primary-brand transition duration-300 block"
                            : "hover:text-primary-brand transition duration-300 block"
                        }
                        onClick={toggleMenu}
                      >
                        Dashboard
                      </NavLink>
                    </motion.li>
                  )}
                  {!userProfile && (
                    <motion.li variants={itemVariants}>
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          isActive
                            ? "text-primary-brand transition duration-300 block"
                            : "hover:text-primary-brand transition duration-300 block"
                        }
                        onClick={toggleMenu}
                      >
                        Login
                      </NavLink>
                    </motion.li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavigationMenu;
