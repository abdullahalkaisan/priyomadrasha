import { useNavigate } from "react-router-dom";
import { LogOut, Plus } from "lucide-react";


export default function CreateButton() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create-organization");
  };

  return (
    <button
      onClick={handleCreate}
      className="px-4 py-2 text-sm flex items-center gap-1 bg-black cursor-pointer text-white rounded-full hover:bg-gray-600 transition"
    >
      <Plus size={20} />
      {/* <LogOut size={18} /> */}
      Create
    </button>
  );
}
