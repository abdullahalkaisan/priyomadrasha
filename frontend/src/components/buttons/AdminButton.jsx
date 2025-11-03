import { useNavigate } from "react-router-dom";
import { ShieldUser } from "lucide-react";


export default function AdminButton() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/admin");
  };

  return (
    <button
      onClick={handleCreate}
      className="px-4 py-2 text-sm flex items-center gap-1 bg-black cursor-pointer text-white rounded-full hover:bg-gray-600 transition"
    >
      <ShieldUser size={20} />
      Admin
    </button>
  );
}
