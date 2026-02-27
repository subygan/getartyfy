import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isSignUp ? "/api/signup" : "/api/signin";
    const body = isSignUp
      ? { username: form.username, email: form.email, password: form.password }
      : { email: form.email, password: form.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (isSignUp) {
        setIsSignUp(false);
        setError("");
        setForm({ username: "", email: "", password: "" });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const toggle = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setForm({ username: "", email: "", password: "" });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isSignUp ? "Create Account" : "Sign In"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignUp && (
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p style={styles.toggle}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={toggle} style={styles.link}>
            {isSignUp ? "Sign in" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    padding: "2rem",
    borderRadius: 12,
    border: "1px solid #333",
    background: "#1a1a1a",
  },
  title: {
    margin: "0 0 1.5rem",
    textAlign: "center",
    fontSize: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  input: {
    padding: "0.7rem 0.9rem",
    borderRadius: 8,
    border: "1px solid #444",
    background: "#2a2a2a",
    color: "#eee",
    fontSize: "0.95rem",
    outline: "none",
  },
  button: {
    padding: "0.7rem",
    borderRadius: 8,
    border: "none",
    background: "#646cff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  error: {
    color: "#ff6b6b",
    margin: 0,
    fontSize: "0.85rem",
  },
  toggle: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.85rem",
    color: "#999",
  },
  link: {
    color: "#646cff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
