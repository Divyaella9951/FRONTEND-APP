import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    if (user?.email) {
      const url = `${API_URL}/orders`;
      const order = {
        email: user.email,
        items: cart,
        orderValue,
        orderDate: Date.now(),
      };

      await axios.post(url, order, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setCart([]);
      Navigate("/orders");
    }
  };

  // ✅ Inline styles
  const styles = {
    container: {
      padding: "30px",
      background: "#f5f7fb",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#fff",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    image: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "8px",
    },
    details: {
      flex: 1,
      marginLeft: "15px",
    },
    quantity: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "10px",
    },
    button: {
      padding: "5px 10px",
      border: "none",
      background: "#2c7be5",
      color: "#fff",
      cursor: "pointer",
      borderRadius: "5px",
    },
    price: {
      fontWeight: "bold",
      color: "#333",
    },
    summary: {
      marginTop: "30px",
      textAlign: "center",
    },
    total: {
      marginBottom: "15px",
    },
    orderBtn: {
      padding: "10px 20px",
      background: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Cart</h1>

      <div style={styles.list}>
        {cart &&
          cart.map((item) => (
            <div style={styles.item} key={item._id}>
              
              {/* Image */}
              <img
                style={styles.image}
                src={`${API_URL}/${item.imageUrl}`}
                alt={item.name}
              />

              {/* Details */}
              <div style={styles.details}>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div style={styles.quantity}>
                  <button
                    style={styles.button}
                    onClick={() => decrement(item._id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    style={styles.button}
                    onClick={() => increment(item._id)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div style={styles.price}>
                ₹{item.quantity * item.price}
              </div>
            </div>
          ))}
      </div>

      {/* Summary */}
      <div style={styles.summary}>
        <h2 style={styles.total}>Total: ₹{orderValue}</h2>

        {user?.email ? (
          <button style={styles.orderBtn} onClick={placeOrder}>
            Place Order
          </button>
        ) : (
          <button
            style={styles.orderBtn}
            onClick={() => Navigate("/login")}
          >
            Login to Order
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
