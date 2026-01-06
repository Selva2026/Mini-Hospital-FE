import { useEffect, useState } from "react";
import API from "../api/api";

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/patient");
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to load appointment history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4 text-blue-900">
        Appointment History
      </h2>

      {loading && (
        <p className="text-gray-500">Loading appointments...</p>
      )}

      {!loading && appointments.length === 0 && (
        <p className="text-gray-500">
          No appointments found.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((a) => (
          <div
            key={a._id}
            className="bg-white border rounded shadow-sm p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-800">
                {a.date} • {a.time}
              </p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    a.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {a.status}
                </span>
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold ${
                a.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
