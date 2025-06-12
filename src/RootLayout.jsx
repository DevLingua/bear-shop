import { Outlet } from "react-router";
import MainNavigation from "./components/main-navigation/MainNavigation";

function RootLayout() {
  return (
    <div>
      <MainNavigation>
        <Outlet />
      </MainNavigation>
    </div>
  );
}

export default RootLayout;
