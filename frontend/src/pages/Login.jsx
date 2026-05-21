import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:6969/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            const { success } = data;
            if (success) {
                //navigate to the homepage
                alert("successfully able to login!")
                setError(""); //updating error
                
            } else {
                //indicate invalid credentials
                setError("Incorrect email or password");

            }

            // alert("Login successful!");
        } catch (err) {
            console.error(err);
            // alert("Server error");
        }
    };

    return (
        <div className="container">
            <form className="card" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: "red", marginBottom: "5px" }}>{error}</p>}
                <button type="submit" className="btn primary">
                    Login
                </button>
                <p style={{ marginTop: "15px", fontSize: "14px" }}>
                    Don’t have an account?{" "}
                    <Link to="/register" style={{ color: "blue" }}>
                        Register here
                    </Link>
                </p>
            </form>
        </div>
    );
}