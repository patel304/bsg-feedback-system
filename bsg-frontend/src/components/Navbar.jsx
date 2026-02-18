import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload(); // force refresh navbar
  };

  return (
    <nav className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center">

      <div className="flex items-center space-x-3">
        <img
          src="https://www.bsgindia.org/images/bsg_logo.png"
          alt="BSG Logo"
          className="h-12"
        />
        <h1 className="font-bold text-xl">BSG India</h1>
      </div>

      <div className="flex items-center space-x-8">

        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>

        {token && role === "candidate" && (
          <Link to="/dashboard" className="hover:text-yellow-400">
            Dashboard
          </Link>
        )}

        {token && (role === "admin" || role === "superadmin") && (
          <Link to="/admin" className="hover:text-yellow-400">
            Admin Panel
          </Link>
        )}

        {!token ? (
          <Link to="/login" className="hover:text-yellow-400">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-yellow-400"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;