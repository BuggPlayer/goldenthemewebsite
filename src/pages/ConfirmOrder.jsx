import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const orderDetails = location.state?.orderDetails;

    if (!orderDetails) {
        return (
            <div className="confirm-order-container">
                <h2 className="confirm-heading">No order details found.</h2>
                <Link to="/" className="confirm-back-to-home-btn">Back to Home</Link>
            </div>
        );
    }

    const { price, products, shippingInfo, paymentMethod } = orderDetails;

    return (
        <div className="confirm-order-container">
            <h1 className="confirm-title">🎉 Order Placed Successfully! 🎉</h1>
            <p className="confirm-message">Thank you for shopping with us. Your order will be processed soon.</p>
            
            <div className="confirm-order-summary">
                <h2 className="section-title">🛒 Order Summary</h2>
                {products.map((product, index) => (
                    <div key={index} className="confirm-product-details">
                        <img src={product.image} alt={product.name} className="confirm-product-image" />
                        <div className="confirm-product-info">
                            <p className="confirm-product-name">{product.name}</p>
                            <p className="confirm-product-price">💰 Price: ₹{product.price}</p>
                            {/* <p className="confirm-product-quantity">🔢 Quantity: {product.qty}</p> */}
                            {/* <p className="confirm-product-total">💵 Total: ₹{product.price * product.qty}</p> */}
                        </div>
                    </div>
                ))}
                <p className="confirm-order-total">📦 Order Total: <strong> ₹{price}</strong></p>
            </div>

            <div className="confirm-shipping-details">
                <h2 className="section-title">🚚 Delivery Address</h2>
                <p><strong>{shippingInfo.fullName}</strong></p>
                <p>{shippingInfo.streetAddress}</p>
                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                <p>{shippingInfo.country}</p>
            </div>

            <div className="confirm-payment-details">
                <h2 className="section-title">💳 Payment Method</h2>
                <p>{paymentMethod}</p>
            </div>

            <Link to="/" className="confirm-back-to-home-btn">🏠 Back to Home</Link>
        </div>
    );
};

export default OrderConfirmation;
