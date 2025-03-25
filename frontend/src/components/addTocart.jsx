import React, { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Samsung S25 Ultra",
      price: 130000,
      quantity: 1,
      imageUrl: "http://res.cloudinary.com/dqfhn7rw3/image/upload/v1742835830/kpuarjwxjr2qmp09gdje.jpg",
    },
    {
      id: 2,
      name: "Apple iPhone 15 Pro",
      price: 145000,
      quantity: 1,
      imageUrl: "https://res.cloudinary.com/demo/image/upload/iphone15.jpg",
    },
  ]);

  // Function to increase quantity
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Function to remove an item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <h3>Your cart is empty!</h3>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price.toLocaleString()}</p>
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <p>Total: ₹{(item.price * item.quantity).toLocaleString()}</p>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price Section */}
          <div className="cart-summary">
            <h3>Total Price: ₹{totalPrice.toLocaleString()}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
