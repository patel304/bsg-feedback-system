import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300 pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12">

        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">
            Bharat Scouts & Guides
          </h2>
          <p className="text-gray-400 leading-relaxed">
            The Bharat Scouts and Guides develops leadership,
            discipline and community service among youth,
            shaping responsible citizens for the future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">
            Quick Links
          </h2>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-400 transition">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/verify" className="hover:text-yellow-400 transition">
                Verify Certificate
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">
            Contact Us
          </h2>
          <p className="mb-2">
            Email:{" "}
            <a
              href="mailto:info@bsgindia.org"
              className="hover:text-yellow-400 transition"
            >
              info@bsgindia.org
            </a>
          </p>
          <p className="mb-2">
            Phone: +91 99999 99999
          </p>
          <p>
            India
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BSG Feedback Management System.
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
