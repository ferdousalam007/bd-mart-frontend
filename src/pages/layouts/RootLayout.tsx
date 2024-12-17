import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React from "react";
import NavigationMenu from "../../components/navigationMenu";

const RootLayout = () => {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <NavigationMenu />
      <main className="bg-primary-background">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default RootLayout;
