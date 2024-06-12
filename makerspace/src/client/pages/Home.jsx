import { useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";
import Features from "../components/Features";
import Mission from "../components/Mission";
import Testimonials from "../components/Testimonals";
import Title from "../components/Title";
export default function Home() {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  return (
    <>
      {isAdmin ? (
        <AdminDashboard />
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
