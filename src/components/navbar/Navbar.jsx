import { navLinks } from "../../data";
import { NavLink, } from "react-router";
import CurrencySelector from "./CurrencySelector";
import CartIcon from "../carticon/CartIcon";

function Navbar({ showNav, handleSetShowNav, handleClick }) {

  return (
    <nav
      className={`
        ${showNav ? "flex translate-y-0" : "hidden -translate-y-12"}
        absolute flex-col gap-8 justify-center transition-transform duration-500
        bg-primary p-10 shadow-lg w-full z-50 text-text top-33 left-0
        xs:top-36 sm:top-42 md:flex md:relative md:top-0 md:shadow-none md:left-0 md:flex-row md:translate-0 md:gap-0 md:justify-between
      `}
    >
      <ul className="flex flex-col gap-6 border-b-2 border-purple/30 pb-8 md:flex-row md:border-0 md:pb-0 md:items-center md:mx-auto md:gap-7 lg:gap-10">
        {navLinks.map((link) => (
          <li onClick={handleSetShowNav} key={link.linkName}>
            <NavLink
              to={link.path}
              end
              className={({ isActive }) =>
                `capitalize font-medium hover:opacity-50 transition-all duration-300 ${
                  isActive ? "text-purple" : ""
                } sm:text-4xl md:text-[2rem] lg:text-3xl`
              }
            >
              {link.linkName}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <CartIcon styles={`hidden md:flex`} handleClick={handleClick}/>
        <CurrencySelector />
      </div>
    </nav>
  );
}

export default Navbar;
