import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await API.get("/doctor");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const status = async (id) => {
    await API.put(`/${id}`); // ✅ FIXED
    alert("Updated");
    fetchAppointments(); // refresh list
  };

  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-1 border md:grid-cols-3 gap-6">
        {appointments.map((a) => (
          <div key={a._id} className="bg-white shadow p-4 rounded">
            
            <p className="font-semibold">
              {a.date} - {a.time}
            </p>

            <p className="mb-3">
              Status: <span className="font-bold">{a.status}</span>
            </p>

            {a.status === "Pending" && (
              <button
                onClick={() => status(a._id)} // ✅ FIXED
                className="bg-blue-700 px-2 py-1 text-white font-bold cursor-pointer border border-blue-700 rounded"
              >
                Change Status
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
