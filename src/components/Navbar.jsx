import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(
    localStorage.getItem("name"));
  
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">🏥 Doctor Appointment</h1>
      <div className="flex justify-between gap-4 items-center ">
      <h1 className="font-bold  ">{name}</h1>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="bg-red-500 px-4 py-1 rounded"
      >
        Logout
      </button>
      </div>
    </nav>
  );
}
