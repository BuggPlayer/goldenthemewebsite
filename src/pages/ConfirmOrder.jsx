import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderConfirmation.css'; // Add your CSS for styling

const OrderConfirmation = () => {
    const location = useLocation();
    const orderDetails = location.state?.orderDetails; // Get order details from navigation state

    if (!orderDetails) {
        return (
            <div className="confirm-order-container">
                <h2>No order details found.</h2>
                <Link to="/" className="confirm-back-to-home-btn">Back to Home</Link>
            </div>
        );
    }

    const { price, products, shippingInfo, paymentMethod } = orderDetails;

    return (
        <div className="confirm-order-container">
            <h2>Order Placed Successfully!</h2>
            <div className="confirm-order-summary">
                <h3>Order Summary</h3>
                {products.map((product, index) => (
                    <div key={index} className="confirm-product-details">
                        <img src={product.image} alt={product.name} className="confirm-product-image" />
                        <div className="confirm-product-info">
                            <p className="confirm-product-name">{product.name}</p>
                            <p className="confirm-product-price">Price: ${product.price}</p>
                            <p className="confirm-product-quantity">Quantity: {product.quantity}</p>
                            <p className="confirm-product-total">Total: ${product.price * product.quantity}</p>
                        </div>
                    </div>
                ))}
                <p className="confirm-order-total">Order Total: ${price}</p>
            </div>

            <div className="confirm-shipping-details">
                <h3>Delivery Address</h3>
                <p>{shippingInfo.fullName}</p>
                <p>{shippingInfo.streetAddress}</p>
                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                <p>{shippingInfo.country}</p>
            </div>

            <div className="confirm-payment-details">
                <h3>Payment Method</h3>
                <p>{paymentMethod}</p>
            </div>

            <Link to="/" className="confirm-back-to-home-btn">Back to Home</Link>
        </div>
    );
};

export default OrderConfirmation;