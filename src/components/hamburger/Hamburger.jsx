function Hamburger({ handleSetShowNav, showNav }) {
  return (
    <div
      onClick={() => handleSetShowNav()}
      className="group flex flex-col w-12 h-[1.7rem] gap-1 cursor-pointer md:hidden"
    >
      <span
        style={showNav ? { rotate: "45deg", translate: "0.5rem" } : {}}
        className="w-full h-full bg-text transition-all duration-400 "
      ></span>
      <span
        style={showNav ? { scale: "0.5", opacity: "0" } : {}}
        className="w-full h-full bg-text transition-all duration-300 "
      ></span>
      <span
        style={
          showNav ? { rotate: "-45deg", translate: "0.5rem -1.2rem" } : {}
        }
        className="w-full h-full bg-text transition-all duration-400"
      ></span>
    </div>
  );
}

export default Hamburger;
