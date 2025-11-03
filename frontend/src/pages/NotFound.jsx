import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import ReloadButton from "../components/buttons/ReloadButton";
import BackButton from "../components/buttons/BackButton";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full">
        {/* Card Container */}
        <div className=" rounded-2xl  p-8 md:p-12 text-center">
          {/* Animated 404 */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-600 animate-pulse">
              404
            </h1>
          </div>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            The page you're looking for seems to have wandered off. Don't worry,
            let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all cursor-pointer"
            >
              <ArrowLeft size={20} />
              Go Back
            </button> */}
            <BackButton/>
            <ReloadButton/>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-all cursor-pointer shadow-lg"
            >
              <Home size={20} />
              Back to Home
            </button>

          </div>

          {/* Decorative Element */}
          {/* <div className="mt-12 flex justify-center gap-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce delay-200"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
