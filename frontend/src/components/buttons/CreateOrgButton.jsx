import { useNavigate } from "react-router";

export default function CreateOrgButton() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create");
  };

  return (
    <button
      onClick={handleCreate}
      className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition"
    >
      Create Organization
    </button>
  );
}
