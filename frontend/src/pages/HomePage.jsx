import Marquee from "react-fast-marquee";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Header from "../components/Header";
import HomeCarousel from "../components/HomeCarousel";
import Footer from "../components/Footer";
import TestimonialMarquee from "../components/TestimonialMarquee";
import FeaturesSection from "../components/FeaturesSection";



export default function HomePage() {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" />;



  return (
    <div className=" h-screen overflow-hidden">
      <Header />
      <div className="h-[calc(100vh-56px)] bg-gradient-to-b from-white to-teal-50   overflow-y-auto ">
        <HomeCarousel />
        <div>
          <TestimonialMarquee />
          <FeaturesSection />
        </div>
        <Footer />
      </div>
    </div>
  );
}
