import { useNavigate } from "react-router";

export default function PendingPageBtn() {

  const navigate = useNavigate();

  const handlePending = () => {
    navigate("/pending");
  };

  return (
    <button
      onClick={handlePending}
      className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition"
    >
      Pending
    </button>
  );
}
