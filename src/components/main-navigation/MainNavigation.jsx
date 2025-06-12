// import Announcement from "../announcement/Announcement"
import Announcement from "../announcement/Announcement"
import Footer from "../footer/Footer"
import Header from "../header/Header"

function MainNavigation({children}) {
  return (
    <>
    {/* <Announcement/> */}
    <Header/>
    {children}
    <Footer/>
    </>
  )
}

export default MainNavigation
