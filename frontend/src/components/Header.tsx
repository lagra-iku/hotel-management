import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-6 bg-base-200 shadow-md">
      <h1 className="text-2xl font-bold">Hotel Hub</h1>
      <nav className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="btn btn-outline btn-sm flex items-center gap-2 hover:bg-[#008080] hover:text-white transition-colors"
        >
          <LogIn size={16} /> Login
        </button>
      </nav>
    </header>
  );
}
