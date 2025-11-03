import { RotateCw } from "lucide-react";
import BackButton from "./buttons/BackButton";
import ReloadButton from "./buttons/ReloadButton";


const PageHeader = ({ title, subtitle, backBtnPath }) => {
  return (
    <div className=" w-full top-0 z-10 bg-gradient-to-b from-white to-transparent p-10 px-10">
      <div className="flex w-full items-start justify-between">
        
          <BackButton path={backBtnPath ? backBtnPath : false} bgColor={"bg-teal-50"} />

        <div className="text-center w-full flex justify-center flex-col items-center ">
          {title && (
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              {title}
            </h1>
          )}
          {subtitle && <p className=" text-gray-600">{subtitle}</p>}
        </div>

        <ReloadButton />
      </div>
    </div>
  );
};

export default PageHeader


