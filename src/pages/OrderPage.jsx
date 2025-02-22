import React, { useState, useEffect } from "react";
import './order.css';
import { useSelector, useDispatch } from "react-redux";
import { place_order, messageClear } from "../store/reducer/orderReducer";
import { useNavigate } from "react-router-dom";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";

const OrderPage = () => {
  const navigate = useNavigate();
  const cartList = useSelector((state) => state.cart.cartList);
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const dispatch = useDispatch();
  const { isLoading, errorMessage, successMessage } = useSelector((state) => state.order);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  const [address, setAddress] = useState({
    fullName: userInfo?.name || "",
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
    if (!cartList.length) {
      navigate('/cart');
      toast.error("Your cart is empty!");
    }
  }, [cartList, navigate]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setShowConfirmationModal(true);
      setTimeout(() => dispatch(messageClear()), 3000);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      setTimeout(() => dispatch(messageClear()), 3000);
    }
  }, [successMessage, errorMessage, dispatch]);

  const validateAddress = () => {
    const requiredFields = ['fullName', 'streetAddress', 'city', 'state', 'zipCode', 'country'];
    const emptyFields = requiredFields.filter(field => !address[field].trim());
    
    if (emptyFields.length) {
      toast.error(`Please fill in: ${emptyFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === "Card") {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        toast.error("Please fill in all card details");
        return false;
      }
    }
    if (paymentMethod === "UPI" && !upiId) {
      toast.error("Please enter UPI ID");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateAddress() || !validatePayment()) return;

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
      shippingInfo: `${address.streetAddress}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`,
      userId: userInfo?._id,
      userName: address.fullName,
      paymentMethod,
    };
    dispatch(place_order(orderDetails));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  useWindowScrollToTop();

  const totalAmount = cartList.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="order-content">
          {/* Order Summary Section */}
          <section className="order-summary-section">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cartList.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="item-image">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                    <p className="item-quantity">Quantity: {item.qty}</p>
                    <p className="item-total">
                      Total: ₹{(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <h3>Total Amount: ₹{totalAmount.toLocaleString()}</h3>
            </div>
          </section>

          {/* Shipping Information Section */}
          <section className="shipping-section">
            <h2>Shipping Information</h2>
            <Form className="shipping-form">
              {Object.entries(address).map(([key, value]) => (
                <Form.Group key={key} className="form-group">
                  <Form.Label>{key.replace(/([A-Z])/g, ' $1').trim()}</Form.Label>
                  <Form.Control
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                </Form.Group>
              ))}
            </Form>
          </section>

          {/* Payment Section */}
          <section className="payment-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <Form.Check
                type="radio"
                id="cod"
                label="Cash on Delivery (COD)"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="payment-option"
              />
              <Form.Check
                type="radio"
                id="card"
                label="Credit/Debit Card"
                checked={paymentMethod === "Card"}
                onChange={() => setPaymentMethod("Card")}
                className="payment-option"
              />
              {paymentMethod === "Card" && (
                <div className="card-details">
                  <Form.Control
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                  />
                  <div className="card-security">
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                    />
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    />
                  </div>
                </div>
              )}
              <Form.Check
                type="radio"
                id="upi"
                label="UPI"
                checked={paymentMethod === "UPI"}
                onChange={() => setPaymentMethod("UPI")}
                className="payment-option"
              />
              {paymentMethod === "UPI" && (
                <Form.Control
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="upi-input"
                />
              )}
            </div>
          </section>

          <button 
            className="place-order-button"
            onClick={handlePlaceOrder}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <Modal 
        show={showConfirmationModal} 
        onHide={() => setShowConfirmationModal(false)}
        centered
        className="order-confirmation-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Placed Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="confirmation-content">
            <i className="fas fa-check-circle success-icon"></i>
            <h4>Thank you for your order, {userInfo?.name}!</h4>
            <div className="order-details">
              <h5>Order Summary:</h5>
              <ul>
                {cartList.map((item, index) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <span>₹{item.price.toLocaleString()} × {item.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="total-amount">
                <strong>Total:</strong>
                <strong>₹{totalAmount.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/orders")}>
            View Orders
          </Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderPage;
