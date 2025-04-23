import React , {createContext,useState, useEffect} from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/user/getCartItems", {
          headers: { authorization: `Bearer ${token}` },
        });
        console.log("Cart count response:", response.data);
        setCartCount((response.data).length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    }
  }

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}