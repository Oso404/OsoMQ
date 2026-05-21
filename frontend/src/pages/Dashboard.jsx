import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:6969/auth/me", {
          credentials: "include", //will send cookie 
        });

        const data = await res.json();
        setUser(data.user); //contains email pass and created_at
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!user) {
    return <div style={{ padding: 20 }}>Not logged in</div>;
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Dashboard</h2>

      <div
        style={{
          marginTop: 20,
          padding: 15,
          border: "1px solid #ccc",
          borderRadius: 8,
          maxWidth: 400,
        }}
      >
        <h3>User Info</h3>

        <p>
          <strong>Email:</strong> {user.email}
        </p>



        <p>
          <strong>Created At:</strong> {user.created_at}
        </p>
      </div>
    </div>
  );
}