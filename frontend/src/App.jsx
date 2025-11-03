import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

function App() {

  const initAuthListener = useAuthStore((state) => state.initAuthListener);

    useEffect(() => {
      initAuthListener();
    }, [initAuthListener]);


  return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 ">
        <Toaster position="bottom-left" />
        <AppRoutes />
      </div>
  );
}

export default App;
