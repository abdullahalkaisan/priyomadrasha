import {  Loader2 } from "lucide-react";

const LoadingRoute = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin duration-300 text-teal-600" />
    </div>
  );
}

export default LoadingRoute