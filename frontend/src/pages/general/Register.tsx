import React, { useState } from "react";
import CountrySelect from "../../components/CountryList";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import api from "../../api/axios";

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        phone_number: '',
        is_hotel: true,
        hotel_data: {
        hotel_name: '',
        phone_number: '',
        address: '',
        country: '',
        state_region: '',
        city: '',
        registration_num: '',
        owner_name: '',
        manager_number: '',
        rooms: true,
        bar: false,
        halls: false,
        wifi: false,
        gym: false,
        pool: false,
        others: ''
        }
    });
    const { showToast } = useToast();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name in formData.hotel_data) {
            setFormData({
                ...formData,
                hotel_data: { ...formData.hotel_data, [name]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    // Append basic fields
    form.append("email", formData.email);
    form.append("phone_number", formData.phone_number);
    form.append("is_hotel", formData.is_hotel.toString());

    // Append hotel_data fields
  // hotel_data as a JSON string
    form.append("hotel_data", JSON.stringify(formData.hotel_data));
    // Append logo if present
    if (logo) {
        form.append("logo", logo);
    }

    try {
        const response = await api.post("auth/register/", form, {
        headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Registration successful!", "success");
        navigate("/registration-success");
    } catch (error: any) {
        console.error("Registration failed:", error.response?.data || error.message);

        // Attempt to extract a meaningful message from the backend
        const backendError = error.response?.data;

        let userMessage = "Registration failed. Please try again.";

        if (backendError) {
          // Case 1: If backend returns an object like { email: ["This email already exists."] }
          if (typeof backendError === "object") {
            const firstKey = Object.keys(backendError)[0];
            if (Array.isArray(backendError[firstKey])) {
              userMessage = backendError[firstKey][0];
            } else if (typeof backendError[firstKey] === "string") {
              userMessage = backendError[firstKey];
            }
          }

          // Case 2: If backend returns a simple message string
          else if (typeof backendError === "string") {
            userMessage = backendError;
          }
        }

        showToast(userMessage, "error");
      }

    };


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

    type AmenityKey = 'rooms' | 'bar' | 'halls' | 'wifi' | 'gym' | 'pool';

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory text-gray-900 bg-[url('/src/assets/loginbg.png')] bg-cover bg-center w-full ">
      <div className="bg-[#B0E0E6] shadow-md  w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold text-charcoalGray font-primary text-center my-10">
          Hotel Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-[#36454F]">
                Hotel Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="hotel_name" placeholder="" onChange={handleChange} required
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email" name="email" placeholder="" onChange={handleChange} required
                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Please input a valid email address")}
                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel" name="phone_number" placeholder="" onChange={handleChange} required
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea name="address" placeholder="" onChange={handleChange} required
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
                rows={2}
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Country <span className="text-red-500">*</span>
              </label>
              <CountrySelect
                value={formData.hotel_data.country}
                onChange={(value) =>
                setFormData({
                    ...formData,
                    hotel_data: { ...formData.hotel_data, country: value },
                })
                }
            />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                State / Region <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="state_region" placeholder="" onChange={handleChange} required
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="city" placeholder="" onChange={handleChange} required
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Registration Number
              </label>
              <input
                type="text" name="registration_num" placeholder="" onChange={handleChange}
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Subscription Plan  <span className="text-red-500">*</span>
              </label>
              <select name="subscription_plan" onChange={handleChange} required className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]">
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
                    {[
                    { label: "Rooms", key: "rooms" },
                    { label: "Bar", key: "bar" },
                    { label: "Halls", key: "halls" },
                    { label: "WiFi", key: "wifi" },
                    { label: "Gym", key: "gym" },
                    { label: "Pool", key: "pool" },
                    ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2 text-[#36454F]">
                        <input
                        type="checkbox"
                        className="accent-[#008080]"
                        checked={formData.hotel_data[item.key as AmenityKey]}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            hotel_data: {
                                ...formData.hotel_data,
                                [item.key]: e.target.checked,
                            },
                            })
                        }
                        />
                        {item.label}
                    </label>
                    ))}

                    {/* 'Others' as a single text input (no checkbox) */}
                    <label className="flex items-center gap-2 col-span-3">
                    Others:
                    <input
                        type="text"
                        placeholder="Specify"
                        className="flex-1 border border-[#008080] rounded-md p-1 focus:ring-2 focus:ring-[#008080]"
                        value={formData.hotel_data.others || ""}
                        onChange={(e) =>
                        setFormData({
                            ...formData,
                            hotel_data: {
                            ...formData.hotel_data,
                            others: e.target.value,
                            },
                        })
                        }
                    />
                    </label>
                </div>
                </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Owner's Name
              </label>
              <input
                type="text" name="owner_name" placeholder="" onChange={handleChange} required
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">
                Manager Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel" name="manager_number" placeholder="" onChange={handleChange} required
                className="w-full border border-[#008080] rounded-md p-2 focus:ring-2 focus:ring-[#008080]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#36454F]">Upload Logo</label>
              <div className="border border-solid border-[#008080] rounded-md p-4 text-center bg-white">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer text-sm text-[#36454F]"
                />
                {logo && <p className="text-sm mt-2 text-[#008080]">{logo.name}</p>}
              </div>
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
