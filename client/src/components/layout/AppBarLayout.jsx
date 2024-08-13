import React from "react";
import AppBar from "../global/AppBar";
import { Outlet } from "react-router-dom";

const AppBarLayout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default AppBarLayout;
