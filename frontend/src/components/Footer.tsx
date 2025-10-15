export default function Footer() {
  return (
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
  );
}
