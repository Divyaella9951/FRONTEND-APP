import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, setUser, cart } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const handleLogin = async () => {
    const url = API_URL + "/auth/signin";
    const response = await axios.post(url, user);
    setUser(response.data);
    if (cart.length > 0) Navigate("/cart");
    else Navigate("/");
  };

  // ✅ Inline CSS styles
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f7fb",
      fontFamily: "Arial, sans-serif",
    },
    box: {
      background: "#ffffff",
      padding: "30px 40px",
      borderRadius: "12px",
      width: "320px",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#2c7be5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    },
    link: {
      textDecoration: "none",
      color: "#2c7be5",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Login Page</h2>

        <p>
          <input
            style={styles.input}
            type="text"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            placeholder="Email"
          />
        </p>

        <p>
          <input
            style={styles.input}
            type="password"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            placeholder="Password"
          />
        </p>

        <p>
          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>
        </p>

        <p>
          <Link style={styles.link} to="/register">
            New user register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
