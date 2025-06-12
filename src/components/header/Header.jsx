import Navbar from "../navbar/Navbar";
import Logo from "../logo/Logo";
import Hamburger from "../hamburger/Hamburger";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSticky } from "../../context/StickyContext";
import CartIcon from "../carticon/CartIcon";
import Announcement from "../announcement/Announcement";

function Header() {
  const { isSticky } = useSticky();
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
    const navigate = useNavigate();

    function handleClick() {
    
    navigate("/cart");
  }

  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  return (
    <>
    <Announcement/>
    <header
      className={`top-0 w-full px-10 py-8 mb-0 sm:px-15 md:py-4 flex items-center justify-between shadow-lg transition-all duration-300 ${
        isSticky ? "fixed z-50 bg-primary" : "relative mt-0"
      }`}
      >
      <Logo handleSetShowNav={() => setShowNav(false)} showNav={showNav} />

      <div className="flex items-center gap-4">
        <CartIcon handleClick={handleClick} styles={`flex md:hidden`}  />
        <Hamburger
          showNav={showNav}
          handleSetShowNav={() => setShowNav((s) => !s)}
        />
      </div>
      <Navbar
        handleSetShowNav={() => setShowNav((s) => !s)}
        showNav={showNav}
        handleClick={handleClick}
        />
    </header>
        </>
  );
}

export default Header;
