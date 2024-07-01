import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";
import Features from "../components/Features";
import Mission from "../components/Mission";
import Testimonials from "../components/Testimonals";
import Title from "../components/Title";
import Sidebar from "../components/SideBar";
export default function Home() {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  console.log(isAdmin);
  return (
    <>
      {isAdmin ? (
        <>
        <Sidebar />
        <AdminDashboard />
        </>
      ) : (
        <>
          <Testimonials />
          <Features />
          <Mission />
          <Title />
        </>
      )}
    </>
  );
}
