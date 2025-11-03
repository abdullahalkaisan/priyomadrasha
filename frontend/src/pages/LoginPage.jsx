

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MapPin, MessageCircleMore, Search, Star } from "lucide-react";
import LoginButton from "../components/buttons/LoginButton";
import LoadingRoute from "../routes/LoadingRoute";

const LoginPage = () => {

  const { user, loading } = useAuthStore();
    if (loading) {
    return <LoadingRoute />
    }
  if (user) return <Navigate to="/" />;


  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side */}
        <div className="text-center lg:text-left space-y-8 px-4">
          <div className="space-y-2">
            <h1 className="py-5 text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              প্রিয় মাদ্রাসা
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              আপনার প্রিয় মাদ্রাসা প্রতিষ্ঠান অনুসন্ধান করুন ।
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <FeatureCard
              icon={<Search size={24} />}
              title="Smart Search"
              description="অবস্থান, সুবিধা এবং রেটিং অনুযায়ী মাদ্রাসা খুঁজুন।"
            />
            <FeatureCard
              icon={<MapPin size={24} />}
              title="Location Based"
              description="গুগল ম্যাপ দিয়ে খুঁজে নিন নিকটবর্তী প্রতিষ্ঠান।"
            />
            <FeatureCard
              icon={<MessageCircleMore size={24} />}
              title="Community Reviews"
              description="অভিভাবক ও শিক্ষার্থীদের মন্তব্য দেখুন"
            />
            <FeatureCard
              icon={<Star size={24} />}
              title="Verified Listings"
              description="বিশ্বাসযোগ্য ও বর্তমান তথ্য"
            />
          </div>
        </div>

        {/* Right Side - Login */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 space-y-8 backdrop-blur-sm bg-opacity-95">
              {/* ✅ Custom Google Login Button */}
              <LoginButton />
              {/* Benefits List */}
              <div className="pt-6 space-y-3 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700 text-center">
                  What you'll get:
                </p>
                <BenefitItem text="Save and compare your favorite madrasahs" />
                <BenefitItem text="Access detailed information and reviews" />
                <BenefitItem text="Connect with educational institutions" />
                <BenefitItem text="Get personalized recommendations" />
              </div>

              <p className="text-xs text-gray-500 text-center pt-4">
                By signing in, you agree to our Terms of Service and Privacy
                Policy. Your data is secure and never shared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

/* Utility Components */
function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex items-start cursor-pointer gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function BenefitItem({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
        <svg
          className="w-3 h-3 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span>{text}</span>
    </div>
  );
}
