import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const role = await login(email, password);

      if (role === "patient") {
        navigate("/patient");
      } else {
        navigate("/doctor");
      }
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="border border-2 border-blue-600 bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl text-center text-blue-900 font-bold mb-4">
          LOGIN
        </h2>

        <div className="border border-2 border-green-500 p-4 rounded">
          {/* Email */}
          <input
            className={`w-full border-2 p-2 rounded ${
              errors.email ? "border-red-500" : "border-blue-600"
            }`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}

          {/* Password */}
          <input
            className={`w-full border-2 p-2 rounded mt-3 ${
              errors.password ? "border-red-500" : "border-blue-600"
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}

          {/* Server Error */}
          {serverError && (
            <p className="text-red-700 text-sm mt-3 text-center">
              {serverError}
            </p>
          )}

          <button
            disabled={loading}
            className={`w-full mt-4 py-2 rounded text-white font-bold ${
              loading ? "bg-gray-400" : "bg-blue-600 cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-sm mt-3 text-center">
          No account?{" "}
          <Link className="text-blue-600 font-semibold" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
