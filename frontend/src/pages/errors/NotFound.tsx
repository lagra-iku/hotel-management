import { useNavigate } from "react-router-dom";
import GeneralLayout from "../../layouts/GeneralLayout";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <GeneralLayout>
      <div className="text-center py-10">
        <h1 className="text-9xl font-bold font-primary text-tealGreen mb-4">404</h1>
        <h2 className="text-6xl font-primary text-charcoalGray mb-4">OOPS! Page not found!</h2>
        <p className="text-xl mb-6">Sorry the page you are looking for does not exist</p>
        <button
          className="bg-tealGreen text-white px-6 py-2 rounded-md hover:bg-tealGreen/80 transition"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </GeneralLayout>
  );
}
