"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../../grapql/authQueries";
import InputField from "../../../components/InputField";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await signup({ variables: { name, email, password } });
      localStorage.setItem("token", data.signup.token);
      router.push("/auth/login"); // Redirect after successful signup
    } catch (e) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error.message}</div>}
    </div>
  );
};

export default Signup;
