import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const department = localStorage.getItem("department");

  const [form, setForm] = useState({
    eventName: "",
    eventDate: "",
    trainingQuality: 5,
    discipline: 5,
    leadership: 5,
    facilities: 5,
    suggestions: ""
  });

  const [feedbacks, setFeedbacks] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      await api.post("/feedback", form);
      alert("Feedback submitted successfully");
      
      // Reset form
      setForm({
        eventName: "",
        eventDate: "",
        trainingQuality: 5,
        discipline: 5,
        leadership: 5,
        facilities: 5,
        suggestions: ""
      });

      fetchMyFeedback();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const fetchMyFeedback = async () => {
    try {
      const { data } = await api.get("/feedback/my");
      setFeedbacks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyFeedback();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-2 text-blue-900">
        Candidate Dashboard
      </h1>

      <p className="mb-6 text-gray-600">
        Your Department:
        <span className="ml-2 font-semibold text-blue-900">
          {department}
        </span>
      </p>

      {/* 🔹 Feedback Form */}
      <form
        onSubmit={submitFeedback}
        className="bg-white p-6 shadow-lg rounded-lg mb-10"
      >
        <h2 className="text-xl font-bold mb-6">Submit Feedback</h2>

        <input
          type="text"
          name="eventName"
          value={form.eventName}
          placeholder="Event Name"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="date"
          name="eventDate"
          value={form.eventDate}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* Rating Sections */}
        {[
          { label: "Training Quality", name: "trainingQuality" },
          { label: "Discipline", name: "discipline" },
          { label: "Leadership", name: "leadership" },
          { label: "Facilities", name: "facilities" }
        ].map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold mb-1">
              {item.label}
            </label>
            <select
              name={item.name}
              value={form[item.name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="5">Excellent</option>
              <option value="4">Very Good</option>
              <option value="3">Good</option>
              <option value="2">Average</option>
              <option value="1">Poor</option>
            </select>
          </div>
        ))}

        <textarea
          name="suggestions"
          value={form.suggestions}
          placeholder="Suggestions (Optional)"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Submit Feedback
        </button>
      </form>

      {/* 🔹 My Feedback List */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-6">My Feedback</h2>

        {feedbacks.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((fb) => (
              <div
                key={fb._id}
                className="border p-4 rounded flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-lg">
                    {fb.eventName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(fb.eventDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      fb.status === "approved"
                        ? "bg-green-600"
                        : fb.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {fb.status}
                  </span>

                  {fb.status === "approved" && (
                    <a
                      href={`/certificate/${fb.certificateId}`}
                      className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;