import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/orders/${user.email}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
      marginBottom: "25px",
      color: "#333",
    },
    card: {
      background: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "20px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    orderTitle: {
      color: "#2c7be5",
      marginBottom: "10px",
    },
    list: {
      paddingLeft: "20px",
    },
    listItem: {
      margin: "8px 0",
      color: "#555",
      fontSize: "15px",
    },
    total: {
      marginTop: "10px",
      fontWeight: "bold",
      color: "#28a745",
    },
    divider: {
      marginTop: "15px",
      borderTop: "1px solid #eee",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Orders</h1>

      <div>
        {orders &&
          orders.map((order) => (
            <div style={styles.card} key={order._id}>
              <h3 style={styles.orderTitle}>
                Order Id: {order.orderDate}
              </h3>

              <ol style={styles.list}>
                {order.items.map((item) => (
                  <li style={styles.listItem} key={item._id}>
                    {item.name} - ₹{item.price} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ol>

              <h3 style={styles.total}>
                Order Value: ₹{order.orderValue}
              </h3>

              <div style={styles.divider}></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Orders;
