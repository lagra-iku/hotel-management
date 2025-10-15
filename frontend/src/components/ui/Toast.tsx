import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto-close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all
        ${type === "error" ? "bg-red-600" : "bg-tealGreen"}`}
    >
      {message}
    </div>
  );
}
