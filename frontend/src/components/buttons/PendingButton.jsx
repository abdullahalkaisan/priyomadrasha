import { useNavigate } from "react-router-dom";
import { Clock3, LogOut, Plus } from "lucide-react";

export default function PendingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/pending");
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 text-sm flex items-center gap-1 bg-yellow-300 hover:bg-yellow-200 text-gray-900 cursor-pointer  rounded-full  transition"
    >
      {/* <Plus size={20} /> */}
      <Clock3 className="animate-spin" size={16} />
      {/* <LogOut size={18} /> */}
      Pending
    </button>
  );
}
