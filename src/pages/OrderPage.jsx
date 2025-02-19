import React, { useState, useEffect } from "react";
import './order.css';
import { useSelector, useDispatch } from "react-redux";
import { place_order, messageClear } from "../store/reducer/orderReducer";
import { useNavigate } from "react-router-dom";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const OrderPage = () => {
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.cartList);
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const dispatch = useDispatch();

  const { isLoading, errorMessage, successMessage } = useSelector((state) => state.order);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  const [address, setAddress] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiryDate: "", cvv: "" });
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage); // Show success toast
      setShowConfirmationModal(true); // Show modal on success
      setTimeout(() => dispatch(messageClear()), 5000);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      setTimeout(() => dispatch(messageClear()), 5000);
    }
  }, [successMessage, errorMessage, dispatch]);

  const validateAddress = () => Object.values(address).every((field) => field.trim() !== "");
  const validatePayment = () => {
    if (paymentMethod === "Card") return cardDetails.cardNumber && cardDetails.expiryDate && cardDetails.cvv;
    if (paymentMethod === "UPI") return upiId.trim() !== "";
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateAddress()) {
      alert("Please fill in all address fields.");
      return;
    }
    if (!validatePayment()) {
      alert("Please enter valid payment details.");
      return;
    }
    const totalPrice = cartList.reduce((total, item) => total + item.price * item.qty, 0);
    const orderDetails = {
      price: totalPrice,
      products: cartList.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.qty,
        image: item.images[0],
        sellerId: item.sellerId,
      })),
      shipping_fee: 0,
      sellerId: cartList[0].sellerId,
      shippingInfo: address.streetAddress,
      userId: userInfo?._id,
      userName: userInfo?.name,
      paymentMethod,
    };
    dispatch(place_order(orderDetails));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };
  useWindowScrollToTop();

  return (
    <div className="order-page-container">
      <div className="order-left">
        <h2 className="order-summary-heading">Order Summary</h2>
        {cartList?.length === 0 ? (
          <h1 className="no-items product">Your order is empty</h1>
        ) : (
          cartList.map((item, index) => (
            <div className="order-summary" key={index}>
              <div className="order-product-details">
                <img src={item.images[0]} alt={item.name} className="order-product-image" />
                <div className="order-product-info">
                  <h3 className="order-product-name">
                    {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
                  </h3>
                  <p className="order-product-price">Price: ₹{item.price}</p>
                  <p className="order-product-quantity">Quantity: {item.qty}</p>
                  <p className="order-product-total">Total: ₹{item.price * item.qty}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="order-right">
        <div className="order-form">
          <h3>Delivery Address</h3>
          {Object.keys(address).map((key) => (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              value={address[key]}
              onChange={handleInputChange}
            />
          ))}

          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
              Cash on Delivery (COD)
            </label>
            <label>
              <input type="radio" name="payment" value="Card" checked={paymentMethod === "Card"} onChange={() => setPaymentMethod("Card")} />
              Credit/Debit Card
            </label>
            {paymentMethod === "Card" && (
              <div className="card-details">
                <input type="text" name="cardNumber" placeholder="Card Number" value={cardDetails.cardNumber} onChange={handleCardChange} />
                <input type="text" name="expiryDate" placeholder="MM/YY" value={cardDetails.expiryDate} onChange={handleCardChange} />
                <input type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleCardChange} />
              </div>
            )}
            <label>
              <input type="radio" name="payment" value="UPI" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} />
              UPI
            </label>
            {paymentMethod === "UPI" && (
              <input type="text" placeholder="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            )}
          </div>

          <button onClick={handlePlaceOrder} className="place-order-btn" disabled={isLoading}>
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for your order, {userInfo?.name}!</p>
          <h5>Order Summary:</h5>
          <ul>
            {cartList.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - ₹{item.price} x {item.qty}
              </li>
            ))}
          </ul>
          <p>Total Price: ₹{cartList.reduce((total, item) => total + item.price * item.qty, 0)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/index")}>
            View Orders
          </Button>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Continue Shopping
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderPage;
