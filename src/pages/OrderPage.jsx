import React, { useState } from "react";
import './order.css';
import { useSelector, useDispatch } from "react-redux";
import { place_order } from "../store/reducer/orderReducer";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();

    const cartList = useSelector((state) => state.cart.cartList);
    // const userInfo = useSelector((state) => state.auth.userInfo); // Assuming userInfo is stored in auth state
    // const userInfo = localStorage.getItem('user-info'); // Assuming userInfo is stored in auth state
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [upiId, setUpiId] = useState("");

    const handlePlaceOrder = () => {
        // Validate payment details
        if (paymentMethod === "Card" && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
            alert("Please enter valid card details.");
            return;
        }
        if (paymentMethod === "UPI" && !upiId) {
            alert("Please enter a valid UPI ID.");
            return;
        }

        // Calculate total price
        const totalPrice = cartList.reduce((total, item) => total + item.price * item.quantity, 0);
        // Prepare order details
        const orderDetails = {
            price: totalPrice,
            products: cartList.map((item) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.images[0],
                sellerId:item.sellerId,
            })),
            shipping_fee: 0, // Add shipping fee if applicable
            shippingInfo: address,
            userId:userInfo?._id,
            userName:userInfo?.name,
            paymentMethod,
        };

        // Dispatch the place_order action
        dispatch(place_order(orderDetails));
 // Navigate to the Order Confirmation page with order details
 navigate('/order-confirmation', { state: { orderDetails } });
        // Optionally, navigate to a confirmation page
        // navigate('/order-confirmation');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({ ...prev, [name]: value }));
    };

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
                                    <p className="order-product-price">Price: ${item.price}</p>
                                    <p className="order-product-quantity">Quantity: {item.quantity}</p>
                                    <p className="order-product-total">Total: ${item.price * item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="order-right">
                <div className="order-form">
                    <h3>Delivery Address</h3>
                    <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleInputChange} />
                    <input type="text" name="streetAddress" placeholder="Street Address" value={address.streetAddress} onChange={handleInputChange} />
                    <input type="text" name="city" placeholder="City" value={address.city} onChange={handleInputChange} />
                    <input type="text" name="state" placeholder="State" value={address.state} onChange={handleInputChange} />
                    <input type="text" name="zipCode" placeholder="Zip Code" value={address.zipCode} onChange={handleInputChange} />
                    <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleInputChange} />

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

                    <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;