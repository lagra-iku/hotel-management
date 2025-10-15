import { useEffect, useState } from "react";
import { format } from "date-fns";

interface HotelInfo {
  hotelName: string;
  address: string;
  phoneNumber: string;
}

interface UserInfo {
  email: string;
  firstName?: string;
  lastName?: string;
}

export default function HotelHome() {
  const [user] = useState<UserInfo>({ email: "doctor@hotel.com", firstName: "Stephen" });
  const [hotel] = useState<HotelInfo>({
    hotelName: "Dark Dimension Hotel",
    address: "123 Sanctum Street, New York, NY",
    phoneNumber: "+1 678-334-5523",
  });

  const today = format(new Date(), "EEEE, MMMM do yyyy");

  // Dummy stats
  const stats = [
    { title: "Today's Bookings", value: 12 },
    { title: "Available Rooms", value: 48 },
    { title: "Amenities Active", value: 4 },
  ];

  return (
    <div className="min-h-screen bg-ivory font-secondary p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-primary text-charcoalGray mb-2">
          {hotel.hotelName}
        </h1>
        <p className="text-gray-600">
          Welcome, <span className="font-medium">{user.firstName || user.email}</span>!
        </p>
        <p className="text-gray-500">{today}</p>
      </header>

      {/* Hotel Info + Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Hotel Info Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-primary text-tealGreen mb-2">Hotel Information</h2>
          <p className="text-gray-700"><span className="font-medium">Address:</span> {hotel.address}</p>
          <p className="text-gray-700"><span className="font-medium">Phone:</span> {hotel.phoneNumber}</p>
        </div>

        {/* Stats Cards */}
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-center items-center">
            <h3 className="text-lg font-primary text-charcoalGray mb-2">{stat.title}</h3>
            <p className="text-2xl font-bold text-tealGreen">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
