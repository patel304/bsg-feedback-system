import { useEffect, useState } from "react";
import api from "../services/api";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const department = localStorage.getItem("department");
  const role = localStorage.getItem("role");

  const fetchFeedback = async () => {
    try {
      const { data } = await api.get(`/admin/feedback?search=${search}`);
      setFeedbacks(data);
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const approveFeedback = async (id) => {
    try {
      await api.put(`/admin/approve/${id}`);
      alert("Approved & Certificate Sent");
      fetchFeedback();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const rejectFeedback = async (id) => {
    try {
      await api.put(`/admin/reject/${id}`);
      alert("Feedback Rejected");
      fetchFeedback();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Analytics
  const total = feedbacks.length;
  const approved = feedbacks.filter(fb => fb.status === "approved").length;
  const pending = feedbacks.filter(fb => fb.status === "pending").length;
  const rejected = feedbacks.filter(fb => fb.status === "rejected").length;

  const chartData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [approved, pending, rejected],
        backgroundColor: ["#16a34a", "#facc15", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-2 text-blue-900">
        Admin Dashboard
      </h1>

      {role === "superadmin" ? (
        <p className="mb-6 text-red-600 font-semibold">
          You are Super Admin (Access to All Departments)
        </p>
      ) : (
        <p className="mb-6 text-gray-600">
          Department:
          <span className="ml-2 font-semibold text-blue-900">
            {department}
          </span>
        </p>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total" value={total} color="blue" />
        <StatCard title="Approved" value={approved} color="green" />
        <StatCard title="Pending" value={pending} color="yellow" />
        <StatCard title="Rejected" value={rejected} color="red" />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 shadow rounded mb-10">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-900">
          Feedback Status Overview
        </h2>
        <div className="max-w-md mx-auto">
          <Pie data={chartData} />
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search by event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-80"
        />
        <button
          onClick={fetchFeedback}
          className="ml-2 bg-blue-900 text-white px-4 rounded hover:bg-blue-800"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {feedbacks.length === 0 ? (
          <p>No feedback found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Event</th>
                <th className="p-3">Department</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb._id} className="border-b text-center hover:bg-gray-50">
                  <td className="p-3">{fb.userId?.name}</td>
                  <td className="p-3">{fb.eventName}</td>
                  <td className="p-3">{fb.department}</td>
                  <td className="p-3">
                    <StatusBadge status={fb.status} />
                  </td>
                  <td className="p-3">
                    {fb.status === "pending" ? (
                      <>
                        <button
                          onClick={() => approveFeedback(fb._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectFeedback(fb._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`bg-${color}-100 p-6 shadow rounded text-center`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-700`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    approved: "bg-green-600",
    rejected: "bg-red-600",
    pending: "bg-yellow-500"
  };

  return (
    <span className={`px-3 py-1 rounded text-white text-sm ${colors[status]}`}>
      {status}
    </span>
  );
}

export default AdminDashboard;