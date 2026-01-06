import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);
      await API.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      setServerError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen border flex justify-center items-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white border px-4 py-10 rounded shadow w-96"
      >
        <h2 className="text-2xl text-center text-blue-900 font-bold mb-4">
          REGISTER
        </h2>

        {/* NAME */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-blue-700">NAME</label>
          <input
            className={`border p-2 rounded ${
              errors.name ? "border-red-500" : "border-blue-700"
            }`}
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1 mt-3">
          <label className="font-bold text-blue-700">E-MAIL</label>
          <input
            className={`border p-2 rounded ${
              errors.email ? "border-red-500" : "border-blue-700"
            }`}
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1 mt-3">
          <label className="font-bold text-blue-700">PASSWORD</label>
          <input
            type="password"
            className={`border p-2 rounded ${
              errors.password ? "border-red-500" : "border-blue-700"
            }`}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
        </div>

        {/* ROLE */}
        <div className="flex flex-col gap-1 mt-4">
          <select
            className={`h-9 text-center border rounded ${
              errors.role ? "border-red-500" : "border-blue-700"
            }`}
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          {errors.role && (
            <p className="text-red-600 text-sm">{errors.role}</p>
          )}
        </div>

        {/* SERVER ERROR */}
        {serverError && (
          <p className="text-red-700 text-sm mt-3 text-center">
            {serverError}
          </p>
        )}

        <button
          disabled={loading}
          className={`w-full mt-4 py-2 rounded text-white font-bold ${
            loading ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
