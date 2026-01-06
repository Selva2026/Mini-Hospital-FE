import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import AppointmentHistory from "../components/AppointmentCard";

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    API.get("/doctorlist").then((res) => setDoctors(res.data));
  }, []);

  const book = async () => {
    if (!date || !time) {
      alert("Please select date & time");
      return;
    }

    try {
      await API.post("/", { doctorId, date, time });
      alert("Appointment Booked ✅");

      // reset
      setDoctorId(null);
      setDate("");
      setTime("");
    } catch (err) {
      alert(err.response?.data?.msg || "Booking failed");
    }
  };

  return (
    <>
      <Navbar />

      {/* Doctor List */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard
            key={doc._id}
            doctor={doc}
            onSelect={setDoctorId}
          />
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {doctorId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">
              Book Appointment
            </h2>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setDoctorId(null)}
                className="px-4 py-2 rounded border font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={book}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment History */}
      <div className="">
        <AppointmentHistory />
      </div>
    </>
  );
}
