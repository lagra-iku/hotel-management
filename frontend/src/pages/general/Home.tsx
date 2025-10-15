import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

export default function App() {
     const navigate = useNavigate();
    const handleScrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="font-secondary text-gray-800">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[url('src/assets/hotel.png')] bg-cover bg-left-bottom h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 text-center text-white px-6 md:px-20">
          <h1 className="font-primary text-5xl md:text-6xl font-bold mb-6">
            Manage Your Hotel Smarter
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Simplify bookings, streamline operations, and grow your hospitality business all in one platform.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => navigate("/register")} className="bg-deepSeaBlue hover:bg-deepSeaBlue/90 px-6 py-3 rounded-full font-semibold text-white transition-all">
              Get Started
            </button>
            <button onClick={() => handleScrollToPricing()} className="bg-white text-deepSeaBlue hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-primary text-4xl font-bold mb-12 text-gray-900">
            Everything Your Hotel Needs
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 hover:-translate-y-2 transition">
              <FontAwesomeIcon icon={['fas', 'calendar-plus']} className='text-7xl text-powderBlue mb-4' />
              <h3 className="font-primary text-2xl font-semibold mb-3">Booking Management</h3>
              <p>Handle reservations check-ins, check-outs, and cancellations all in one dashboard.</p>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-8 hover:-translate-y-2 transition">
              <FontAwesomeIcon icon={['fas', 'chart-pie']} className='text-7xl text-powderBlue mb-4' />
              <h3 className="font-primary text-2xl font-semibold mb-3">Reports & Analytics</h3>
              <p>View detailed revenue, occupancy, and performance insights to make informed business decisions.</p>
            </div>
            <div className="bg-white shadow-lg rounded-2xl p-8 hover:-translate-y-2 transition">
              <FontAwesomeIcon icon={['fas', 'users-gear']} className='text-7xl text-powderBlue mb-4' />
              <h3 className="font-primary text-2xl font-semibold mb-3">Multi-User Access</h3>
              <p>Grant controlled access for admins, managers, and receptionists with unique permissions each.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white text-center">
        <h2 className="font-primary text-4xl font-bold mb-12 text-gray-900">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {/* Free Plan */}
          <div className="border rounded-2xl shadow hover:shadow-lg transition p-8">
            <h3 className="font-primary text-2xl font-bold mb-4">Free</h3>
            <p className="mb-4">Perfect for startups and small hotels.</p>
            <h4 className="text-3xl font-semibold mb-6">£0 <span className="text-sm text-gray-500">/mo</span></h4>
            <ul className="text-left space-y-2 mb-6">
              <li>✔ 1 Hotel</li>
              <li>✔ Up to 5 Users</li>
              <li>✔ Basic Reports</li>
            </ul>
            <button className="bg-deepSeaBlue text-white px-6 py-3 rounded-full w-full font-semibold">Start Free</button>
          </div>

          {/* Basic Plan */}
          <div className="border-2 border-deepSeaBlue shadow-xl rounded-2xl p-8 bg-deepSeaBlue text-white scale-105">
            <h3 className="font-primary text-2xl font-bold mb-4">Basic</h3>
            <p className="mb-4">For growing hotels and guest houses.</p>
            <h4 className="text-3xl font-semibold mb-6">£39 <span className="text-sm text-gray-200">/mo</span></h4>
            <ul className="text-left space-y-2 mb-6">
              <li>✔ Up to 3 Hotels</li>
              <li>✔ Unlimited Users</li>
              <li>✔ Full Reports & Analytics</li>
              <li>✔ Email Support</li>
            </ul>
            <button className="bg-white text-deepSeaBlue font-semibold px-6 py-3 rounded-full w-full">Choose Basic</button>
          </div>

          {/* Enterprise Plan */}
          <div className="border rounded-2xl shadow hover:shadow-lg transition p-8">
            <h3 className="font-primary text-2xl font-bold mb-4">Enterprise</h3>
            <p className="mb-4">For large hotel groups and chains.</p>
            <h4 className="text-3xl font-semibold mb-6">£99 <span className="text-sm text-gray-500">/mo</span></h4>
            <ul className="text-left space-y-2 mb-6">
              <li>✔ Unlimited Hotels</li>
              <li>✔ Dedicated Account Manager</li>
              <li>✔ Custom Integrations</li>
              <li>✔ 24/7 Priority Support</li>
            </ul>
            <button className="bg-deepSeaBlue text-white px-6 py-3 rounded-full w-full font-semibold">Go Enterprise</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="font-primary text-4xl font-bold mb-12 text-gray-900">What Our Clients Say</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          {[
            {
              name: 'Emma Johnson',
              role: 'Manager, Ocean View Hotel',
              img: 'https://randomuser.me/api/portraits/women/44.jpg',
              text: '“This app has completely transformed how we manage bookings. It’s fast, reliable, and incredibly easy to use!”',
            },
            {
              name: 'Michael Lee',
              role: 'Owner, Golden Palm Resort',
              img: 'https://randomuser.me/api/portraits/men/35.jpg',
              text: '“Our revenue reports and analytics are now automated. We can finally focus on improving guest experience.”',
            },
            {
              name: 'Sofia Carter',
              role: 'Reception Lead, Lakeview Lodge',
              img: 'https://randomuser.me/api/portraits/women/68.jpg',
              text: '“The multi-user access makes our team workflow seamless. Highly recommended for all hotels!”',
            },
          ].map((t, i) => (
            <div key={i} className="bg-white shadow-lg rounded-2xl p-8">
              <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <p className="italic mb-4 text-gray-600">"{t.text}"</p>
              <h4 className="font-primary text-lg font-semibold">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels Onboarded */}
      <section className="py-20 bg-white text-center">
        <h2 className="font-primary text-4xl font-bold mb-12 text-gray-900">Hotels Using Our Platform</h2>
        <div className="flex flex-wrap justify-center gap-10 px-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Marriott_hotels_logo14.svg" alt="Marriott" className="h-12" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/HI_mk_logo_hiltonbrandlogo.jpg" alt="Hilton" className="h-12" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Marriott_hotels_logo14.svg" alt="Hyatt" className="h-12" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Marriott_hotels_logo14.svg" alt="Sheraton" className="h-12" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-primary text-2xl text-white mb-4">Hotel Hub</h3>
            <p>Smart, simple, and scalable hotel management software designed to help you thrive in the hospitality industry.</p>
          </div>
          <div>
            <h4 className="font-primary text-xl text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-primary text-xl text-white mb-3">Get in Touch</h4>
            <p>Email: support@hotelhub.com</p>
            <p>Phone: +44hotelhub</p>
            <div className="flex gap-4 mt-4">
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6" /></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6" /></a>
              <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="LinkedIn" className="w-6" /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} HotelHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
