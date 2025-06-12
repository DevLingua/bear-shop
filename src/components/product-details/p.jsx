import { Link } from "react-router"


import Section from "../section/Section"
import Footer from "./Footer"
import Styles from "./FooterComp.module.css"
import { footerLinks } from "../../data"





function FooterComp() {
  return (
    <Footer>
      <Section styles={`padding-sm ${Styles.section}`}>
        <menu className={Styles.footerLinks}>
          {
            footerLinks.map((link)=>
            <li key={link.linkName}>
              <Link to={`${link.path}`}>{link.linkName}</Link>
            </li>
            )
          }
        </menu>

        <div className={Styles.footerSocials}>
          {
            socialIcons.map((icon)=>
            <Link key={icon.url} to={`${icon.url}`}>
            <img src={icon.icon} alt={icon} />
            </Link>
            )
          }
        </div>

        <div className={Styles.copyright}>
          <p>
            <span>&#169;</span> {new Date().getFullYear()} Prickly Bear Art | Fandom Mashups & Pop Culture Humor Designs
          </p>
        </div>
      </Section>
    </Footer>
  )
}

export default FooterComp
