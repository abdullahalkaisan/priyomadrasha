
import { Menu } from "lucide-react";


export default function BurgerButton() {
  const handleBurgerMenu = () => {};

  return (
    <button
      onClick={handleBurgerMenu}
      className="px-4 py-2 text-sm flex items-center gap-1  cursor-pointer text-black rounded-full hover:bg-gray-100 transition"
    >
      <Menu  />
    </button>
  );
}
