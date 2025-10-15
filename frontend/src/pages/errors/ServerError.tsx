import { useNavigate } from "react-router-dom";
import GeneralLayout from "../../layouts/GeneralLayout";

export default function ServerError() {
  const navigate = useNavigate();

  return (
    <GeneralLayout>
      <div className="text-center">
        <h1 className="text-7xl font-primary text-red-600 mb-4">500</h1>
        <p className="text-xl mb-6">Something went wrong on our end.</p>
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
