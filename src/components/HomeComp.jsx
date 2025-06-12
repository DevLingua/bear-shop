import CollectionSection from "./collection/CollectionSection"
import FeaturedSection from "./featured-section/FeaturedSection"
import Hero from "./hero/Hero"
import NewsLetter from "./news-letter/NewsLetter"
import TrustedSection from "./trusted-section/TrustedSection"

function HomeComp() {
  return (
    <>
    <Hero/>
    <FeaturedSection/>
   <CollectionSection/>
   <TrustedSection/>
    <NewsLetter/>
    </>
  )
}

export default HomeComp
