import { useState } from "react";
import api from "../services/api";

function VerifyCertificate() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const { data } = await api.get(`/admin/verify/${id}`);
      setResult(data);
      setError("");
    } catch (err) {
      setResult(null);
      setError("Certificate Not Found");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Verify Certificate
      </h1>

      <div className="flex">
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="p-2 border rounded w-80"
        />
        <button
          onClick={handleVerify}
          className="ml-2 bg-blue-900 text-white px-4 rounded"
        >
          Verify
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-white p-6 shadow-lg rounded-lg text-center">
          <p className="text-green-600 font-bold text-lg">
            Certificate Valid ✅
          </p>
          <p>Name: {result.userId?.name}</p>
          <p>Event: {result.eventName}</p>
          <p>Department: {result.department}</p>
        </div>
      )}

      {error && (
        <p className="mt-6 text-red-600 font-bold">{error}</p>
      )}
    </div>
  );
}

export default VerifyCertificate;