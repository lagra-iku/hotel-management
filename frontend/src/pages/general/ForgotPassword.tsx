import { useState } from "react";
import { KeyRoundIcon } from "lucide-react";
import axios from "../../api/axios";
import GeneralLayout from "../../layouts/GeneralLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!email) {
      setIsError(true);
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        "/auth/request-password-reset-unauthenticated-user/",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setIsError(true);
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setIsError(true);
      setMessage(
        err.response?.data?.detail ||
          "Unable to send password reset email. Please check the email and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GeneralLayout>
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex justify-center mb-6">
          <KeyRoundIcon className="text-tealGreen w-20 h-20" />
        </div>

        <h1 className="text-4xl font-bold font-primary mb-4">
          Forgot your Password
        </h1>
        <p className="text-xl mb-8">
          Please enter the email address you would like your password reset link
          sent to.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 flex flex-col items-center"
        >
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 mb-4 rounded-md focus:ring-2 focus:ring-tealGreen outline-none"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-tealGreen text-white py-3 my-6 rounded-md hover:bg-[#006666] transition-all duration-300 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </button>

          {message && (
            <p
              className={`mt-4 p-4 rounded-md text-sm ${
                isError ? "bg-red-200 text-gray-800" : "bg-green-100 text-gray-800"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </GeneralLayout>
  );
};

export default ForgotPassword;
