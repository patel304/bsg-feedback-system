import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Certificate() {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const { data } = await api.get(`/admin/verify/${id}`);
        setCertificate(data);
      } catch (err) {
        setError("Certificate not found or access denied.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
      <div className="bg-white p-10 shadow-lg rounded-lg text-center w-[600px]">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Certificate of Participation
        </h1>
        

        <p>This is to certify that</p>
        <p className="mt-4 font-semibold">
          Certificate ID: {certificate.certificateId}
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {certificate.userId?.name}
        </h2>

        <p className="mt-4">has successfully participated in</p>

        <h3 className="text-xl font-semibold mt-2">
          {certificate.eventName}
        </h3>

        <p className="mt-6">
          Department: {certificate.department}
        </p>
        
      </div>
    </div>
  );
}

export default Certificate;