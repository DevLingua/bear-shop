import { Link } from "react-router";
import { footerLinks } from "../../data";
import PinterestIcon from "/pinterest-logo-24.png";
import FacebookIcon from "/facebook-logo-24.png";
import IgIcon from "/bxl-instagram-alt.svg";

const socialIcons = [
  {
    icon: FacebookIcon,
    url: "https://www.facebook.com/pricklybearart/",
  },
  {
    icon: IgIcon,
    url: "https://www.instagram.com/pricklybearart/",
  },
  {
    icon: PinterestIcon,
    url: "https://www.pinterest.com/PricklyBearArt/",
  },
];

function Footer() {
  return (
    <footer className="px-10 py-8 mb-10">
      <div>
        <ul className="flex gap-4 flex-wrap items-center justify-center">
          {footerLinks.map((link) => (
            <li
              key={link.linkName}
              className="not-first:border-l-1 not-first:pl-2 not-first:border-purple"
            >
              <Link
                to={`/${link.path}`}
                className="text-2xl transition-all duration-300 hover:text-purple sm:text-[2rem]"
              >
                {link.linkName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center gap-5 my-10 ">
        {socialIcons.map((icon) => (
          <Link className="hover:opacity-70" key={icon.url} to={`${icon.url}`}>
            <img className="w-10 sm:w-13" src={icon.icon} alt={icon} />
          </Link>
        ))}
      </div>

      <div className="text-xl/snug text-text/50 flex items-center justify-center sm:text-2xl">
        <p className="text-center">
          Prickly Bear Art | Fandom Mashups & Pop Culture Humor Designs Powered
          by Fourthwall
        </p>
      </div>
    </footer>
  );
}

export default Footer;
