import { Link } from "react-router-dom";
import LogoImg from "/logo.webp";

function Logo({ handleSetShowNav }) {

    function handleClick() {
    handleSetShowNav();
  }


  return (
    <div className="w-20 xs:w-22 sm:w-25">
        <Link onClick={handleClick} to={"/"}><img src={LogoImg} alt="Prickly bear logo" /></Link>
      </div>
  )
}

export default Logo
