import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LogOut } from "lucide-react";


export default function LogoutButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm flex items-center gap-1 bg-rose-500 cursor-pointer text-white rounded-full hover:bg-red-600 transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}
