"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../../grapql/authQueries";
import InputField from "../../../components/InputField";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const router = useRouter();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      setToken(data.login.token);
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (e) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error.message}</div>}
    </div>
  );
};

export default Login;
