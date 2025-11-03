import { RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ReloadButton = () => {
const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(0)}
      className=" cursor-pointer text-white px-4 py-2 rounded-full bg-teal-50 transition-colors flex items-center gap-2"
    >
      <RotateCw className="w-5 h-5 text-teal-600" />
    </button>
  );
}

export default ReloadButton