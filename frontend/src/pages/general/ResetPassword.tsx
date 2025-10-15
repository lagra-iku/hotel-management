import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { KeyRoundIcon } from "lucide-react";
import axios from "../../api/axios";
import { isAxiosError } from "axios";
import GeneralLayout from "../../layouts/GeneralLayout";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [pageType, setPageType] = useState<"create" | "reset">("reset");

  useEffect(() => {
    // Detect if URL has a ?type=create query param (optional, from registration email)
    if (location.search.includes("type=reset")) {
      setPageType("reset");
    } else {
      setPageType("create");
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!password || !password2) {
      setMessage("Please fill in both password fields.");
      return;
    }

    if (password !== password2) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        "/auth/set-new-password/",
        { uid, token, password, password2 },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setMessage(
          pageType === "create"
            ? "Password created successfully! You can now log in."
            : "Password reset successful! You can now log in."
        );
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Unexpected response. Please try again.");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Reset error:", error.response?.data || error.message);
        setMessage(
          error.response?.data?.detail ||
            "Error setting password. The link may have expired or is invalid."
        );
      } else {
        console.error("Reset error:", error);
        setMessage("Error setting password. Please try again.");
      }
    }
  };

  return (
    <GeneralLayout>
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex justify-center mb-6">
          <KeyRoundIcon className="text-tealGreen w-20 h-20" />
        </div>

        <h1 className="text-4xl font-bold font-primary mb-4">
          {pageType === "create"
            ? "Create Your Password"
            : "Reset Your Password"}
        </h1>
        <p className="text-xl mb-8">
          {pageType === "create"
            ? "Set a password to activate your account."
            : "Enter a new password below to reset your password."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 flex flex-col items-center"
        >
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 mb-4 rounded-md focus:ring-2 focus:ring-tealGreen outline-none"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full border border-gray-300 p-3 mb-6 rounded-md focus:ring-2 focus:ring-tealGreen outline-none"
          />
          <button
            type="submit"
            className="w-full bg-tealGreen text-white py-3 my-6 rounded-md hover:bg-[#006666] transition-all duration-300"
          >
            Save Password
          </button>
          {message && (
            <p className="mt-4 bg-yellow-50 p-6 rounded-md text-sm text-gray-700">
              {message}
            </p>
          )}
        </form>
      </div>
    </GeneralLayout>
  );
};

export default ResetPassword;
