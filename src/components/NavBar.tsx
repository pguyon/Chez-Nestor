import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/UserContext";

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  const { user, logout } = useContext<AuthContextType>(AuthContext);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <Link to="/">Chez Nestor</Link>
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {user ? (
            <div>
                <Link
                to="/dashboard"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Dashboard
              </Link> 
              <Link to="/admin/addappartment"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
              Add Appartment
              </Link>           
                <Link to="/"
                 className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                 onClick={logout}
                
                >Logout</Link>            
            </div>
          ) : (
            <Link
              to="/login"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
