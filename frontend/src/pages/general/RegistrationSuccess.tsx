import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GeneralLayout from "../../layouts/GeneralLayout";

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <GeneralLayout>
      <div className="justify-center items-center px-4 py-10 text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <CheckCircle className="text-tealGreen w-20 h-20 animate-bounce" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-primary text-charcoalGray mb-3">
        Registration Successful!
      </h1>

      {/* Subtext */}
      <p className="text-base md:text-lg text-gray-600 font-secondary max-w-lg mb-8">
        Your account has been successfully created.  
        Please check your email for a confirmation message and a link to create your password.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => navigate("/login")}
          className="bg-tealGreen text-white px-6 py-2 rounded-lg hover:bg-deepSeaBlue transition-all duration-300"
        >
          Go to Login
        </button>
        <button
          onClick={() => navigate("/")}
          className="border border-tealGreen text-tealGreen px-6 py-2 rounded-lg hover:bg-tealGreen hover:text-white transition-all duration-300"
        >
          Back to Home
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500">
        Need help?{" "}
        <a href="mailto:support@hotelhub.com" className="text-tealGreen hover:underline">
          Contact Support
        </a>
      </footer>
      </div>
      </GeneralLayout>
  );
     
}
