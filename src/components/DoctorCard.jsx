export default function DoctorCard({ doctor, onSelect }) {
    return (
      <div className="bg-white shadow rounded p-4 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
          className="w-24 mx-auto mb-3"
        />
        <h3 className="font-semibold">{doctor.name}</h3>
        <button
          onClick={() => onSelect(doctor._id)}
          className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
        >
          Book
        </button>
      </div>
    );
  }
  