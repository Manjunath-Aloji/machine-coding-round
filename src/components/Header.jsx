import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-transparent text-black p-4 shadow-md">
      <nav className="flex justify-end items-end">
      <ul className="flex space-x-4">
          <li>
            <NavLink 
              to="/otp-form" 
              className={({ isActive }) => 
                isActive ? "p-1 border-b-2 font-semibold" : "p-1 hover:border-b-2"
              }
            >
              OTP-Form
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/course-list" 
              className={({ isActive }) => 
                isActive ? "p-1 border-b-2 font-semibold" : "p-1 hover:border-b-2"
              }
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/batches" 
              className={({ isActive }) => 
                isActive ? "p-1 border-b-2 font-semibold" : "p-1 hover:border-b-2"
              }
            >
              Batches
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
