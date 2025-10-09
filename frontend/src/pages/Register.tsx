import React, { useState } from "react";
import CountrySelect from "../components/CountryList";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [logo, setLogo] = useState<File | null>(null);
    const navigate = useNavigate();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)) {
      setLogo(file);
    } else {
      alert("Only PNG, JPG, or SVG files are allowed.");
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 bg-[url('/src/assets/loginbg.png')] bg-cover bg-center w-full ">
      <div className="bg-[#B0E0E6] shadow-md  w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold text-charcoalGray font-primary text-center my-10">
          Hotel Registration Form
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-[#36454F]">
                Hotel Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
                rows={2}
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Country <span className="text-red-500">*</span>
              </label>
               <CountrySelect />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                State / Region <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Registration Number
              </label>
              <input
                type="text"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Subscription Plan
              </label>
              <select className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]">
                <option>Free</option>
                <option>Basic</option>
                <option>Enterprise</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-[#36454F]">Amenities</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {["Rooms", "Bar", "Halls", "WiFi", "Gym", "Pool"].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-[#36454F]">
                    <input type="checkbox" className="accent-[#008080]" /> {item}
                  </label>
                ))}
                <label className="flex items-center gap-2 col-span-3">
                  <input type="checkbox" className="accent-[#008080]" /> Others
                  <input
                    type="text"
                    placeholder="Specify"
                    className="flex-1 border border-[#008080] rounded-md p-1 focus:ring-2 focus:ring-[#008080]"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Owner Name
              </label>
              <input
                type="text"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Manager Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">Upload Logo</label>
              <div className="border-2 border-dashed border-[#008080] rounded-md p-4 text-center bg-[#FFFFF0]">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer text-sm text-[#36454F]"
                />
                {logo && <p className="text-sm mt-2 text-[#008080]">{logo.name}</p>}
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
              <button
                type="button" onClick={() => navigate("/")} 
                className="px-6 py-2 rounded-full bg-white text-[#B84A4A] hover:bg-[#A53E3E] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#008080] text-[#FFFFF0] hover:bg-deepSeaBlue transition-colors"
              >
                Submit
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
