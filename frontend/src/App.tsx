import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/general/Home";
import Login from "./pages/general/Login";
import Register from "./pages/general/Register";
import ResetPassword from "./pages/general/ResetPassword";
import ForgotPassword from "./pages/general/ForgotPassword";
import RegistrationSuccess from "./pages/general/RegistrationSuccess";
import HotelHome from "./pages/hotel/HotelHome";
import NotFound from "./pages/errors/NotFound";
import NotAuthorized from "./pages/errors/NotAuthorized";
import ServerError from "./pages/errors/ServerError";
import Maintenance from "./pages/errors/Maintenance";

function App() {
  return (
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/hotel-home" element={<HotelHome />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/maintenance" element={<Maintenance />} />
        </Routes>
      </ToastProvider>
  );
}

export default App;
