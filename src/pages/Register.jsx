import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      setError("All fields are required!");
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Existing Users Before Register:", users);
  
    let existingUser = users.find((u) => u.email === user.email);
  
    if (existingUser) {
      setError("User already exists with this email!");
    } else {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Updated Users List After Register:", users);
      alert("Registration successful! Redirecting to login...");
      navigate("/login");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleRegister} style={styles.form}>
        <input type="text" name="name" placeholder="Full Name" value={user.name} onChange={handleChange} style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

// ✅ Inline CSS Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: { marginBottom: "15px" },
  error: { color: "red", marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column" },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1f1c16",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s",
  },
};

export default Register;
