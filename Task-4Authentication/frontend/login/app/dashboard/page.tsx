"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "../../grapql/userQueries";  // Import the query here

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  
  // Always call hooks in the same order
  const { data, loading, error } = useQuery(GET_USER_DATA);

  useEffect(() => {
    // Check if token is stored in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if no token is found
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (data && data.me) {
      setUserData(data.me);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-6">Dashboard</h2>
      {userData ? (
        <div>
          <h3 className="text-xl">Welcome, {userData.name}</h3>
          <p className="mt-2">Email: {userData.email}</p>
          {/* Add more user-specific content here */}
        </div>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
};

export default Dashboard;
