import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <h1 style={styles.logo}>getartyfy</h1>
        <div style={styles.headerRight}>
          <span style={styles.greeting}>Hi, {user.username}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h2 style={styles.welcome}>Welcome to your Dashboard</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>My Projects</h3>
            <p style={styles.placeholder}>Your projects will appear here.</p>
          </div>
          <div style={styles.card}>
            <h3>Recent Activity</h3>
            <p style={styles.placeholder}>Your recent activity will appear here.</p>
          </div>
          <div style={styles.card}>
            <h3>Settings</h3>
            <p style={styles.placeholder}>Account settings coming soon.</p>
          </div>
          <div style={styles.card}>
            <h3>Notifications</h3>
            <p style={styles.placeholder}>No new notifications.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    borderBottom: "1px solid #333",
  },
  logo: {
    margin: 0,
    fontSize: "1.4rem",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  greeting: {
    color: "#aaa",
    fontSize: "0.9rem",
  },
  logoutBtn: {
    padding: "0.4rem 1rem",
    borderRadius: 6,
    border: "1px solid #555",
    background: "transparent",
    color: "#ccc",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  main: {
    flex: 1,
    padding: "2rem",
    maxWidth: 900,
    margin: "0 auto",
    width: "100%",
  },
  welcome: {
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1rem",
  },
  card: {
    padding: "1.5rem",
    borderRadius: 10,
    border: "1px solid #333",
    background: "#1a1a1a",
  },
  placeholder: {
    color: "#777",
    fontSize: "0.9rem",
  },
};
