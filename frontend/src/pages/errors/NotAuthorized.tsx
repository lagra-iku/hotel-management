import { useNavigate } from "react-router-dom";
import GeneralLayout from "../../layouts/GeneralLayout";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <GeneralLayout>
      <div className="text-center">
        <h1 className="text-7xl font-primary text-red-500 mb-4">403</h1>
        <p className="text-xl mb-6">Sorry, you are not authorized to view this page.</p>
        <button
          className="bg-tealGreen text-white px-6 py-2 rounded-md hover:bg-tealGreen/80 transition"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </GeneralLayout>
  );
}
