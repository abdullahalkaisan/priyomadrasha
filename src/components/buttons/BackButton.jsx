import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useCreateOrgStore } from "../../store/useCreateOrgStore";

export default function BackButton({ bgColor, path }) {
  const navigate = useNavigate();
  const { resetAll } = useCreateOrgStore();


  const handleBack = () => {
    resetAll();
    // navigate(-1);
    if (path){
      navigate(path)
    }else{
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`${
        bgColor ? bgColor : "bg-white"
      } px-4 py-2 text-teal-600 hover:text-teal-900  font-semibold rounded-full cursor-pointer flex items-center shadow- hover:shadow-  transition`}
    >
      <ArrowLeft size={24} className="mr-1" />
      Back
    </button>
  );
}
