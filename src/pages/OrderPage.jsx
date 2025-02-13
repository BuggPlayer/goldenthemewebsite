import React, { useState } from 'react';

const OrderPage = () => {
    const [address, setAddress] = useState({
        fullName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [upiId, setUpiId] = useState('');

    // Mock product data (replace with actual data)
    const product = {
        name: 'Premium Leather Jacket',
        price: 120,
        quantity: 1,
        image: 'https://via.placeholder.com/150',
    };

    const handlePlaceOrder = () => {
        if (paymentMethod === 'Card' && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
            alert('Please enter valid card details.');
            return;
        }
        if (paymentMethod === 'UPI' && !upiId) {
            alert('Please enter a valid UPI ID.');
            return;
        }
        alert(`Order placed successfully! Payment method: ${paymentMethod}`);
        // Add logic to handle order placement
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
        <div style={styles.container}>
            {/* Left Side: Order Summary */}
            <div style={styles.leftSide}>
                <h2 style={styles.heading}>Order Summary</h2>
                <div style={styles.productContainer}>
                    <img src={product.image} alt={product.name} style={styles.productImage} />
                    <div style={styles.productDetails}>
                        <h3 style={styles.productName}>{product.name}</h3>
                        <p style={styles.productPrice}>Price: ${product.price}</p>
                        <p style={styles.productQuantity}>Quantity: {product.quantity}</p>
                    </div>
                </div>
                <div style={styles.summarySection}>
                    <h3 style={styles.sectionHeading}>Order Details</h3>
                    <p style={styles.summaryText}>Product: {product.name}</p>
                    <p style={styles.summaryText}>Quantity: {product.quantity}</p>
                    <p style={styles.summaryText}>Total: ${product.price * product.quantity}</p>
                </div>
            </div>

            {/* Right Side: Address, Payment, and Buy Button */}
            <div style={styles.rightSide}>
                {/* Delivery Address */}
                <div style={styles.section}>
                    <h3 style={styles.sectionHeading}>Delivery Address</h3>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={address.fullName}
                        onChange={handleInputChange}
                        style={styles.inputField}
                        required
                    />
                    <input
                        type="text"
                        name="streetAddress"
                        placeholder="Street Address"
                        value={address.streetAddress}
                        onChange={handleInputChange}
                        style={styles.inputField}
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleInputChange}
                        style={styles.inputField}
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={handleInputChange}
                        style={styles.inputField}
                        required
                    />
                    <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={address.zipCode}
                        onChange={handleInputChange}
                        style={styles.inputField}
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={address.country}
                        onChange={handleInputChange}
                        style={styles.inputField}
                        required
                    />
                </div>

                {/* Payment Options */}
                <div style={styles.section}>
                    <h3 style={styles.sectionHeading}>Payment Method</h3>
                    <div style={styles.paymentOptions}>
                        <label style={styles.paymentOption}>
                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={paymentMethod === 'COD'}
                                onChange={() => setPaymentMethod('COD')}
                            />
                            Cash on Delivery (COD)
                        </label>
                        <label style={styles.paymentOption}>
                            <input
                                type="radio"
                                name="payment"
                                value="Card"
                                checked={paymentMethod === 'Card'}
                                onChange={() => setPaymentMethod('Card')}
                            />
                            Credit/Debit Card
                        </label>
                        {paymentMethod === 'Card' && (
                            <div style={styles.cardDetails}>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardChange}
                                    style={styles.inputField}
                                    required
                                />
                                <input
                                    type="text"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={cardDetails.expiryDate}
                                    onChange={handleCardChange}
                                    style={styles.inputField}
                                    required
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={cardDetails.cvv}
                                    onChange={handleCardChange}
                                    style={styles.inputField}
                                    required
                                />
                            </div>
                        )}
                        <label style={styles.paymentOption}>
                            <input
                                type="radio"
                                name="payment"
                                value="UPI"
                                checked={paymentMethod === 'UPI'}
                                onChange={() => setPaymentMethod('UPI')}
                            />
                            UPI
                        </label>
                        {paymentMethod === 'UPI' && (
                            <div style={styles.upiDetails}>
                                <input
                                    type="text"
                                    placeholder="UPI ID"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    style={styles.inputField}
                                    required
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Buy Button */}
                <button onClick={handlePlaceOrder} style={styles.buyButton}>
                    Place Order
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        backgroundColor: 'var(--primary-bg)',
        color: 'var(--text-color)',
        minHeight: '100vh',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    leftSide: {
        flex: 1,
        marginRight: '20px',
        backgroundColor: 'var(--secondary-bg)',
        padding: '20px',
        borderRadius: '10px',
    },
    rightSide: {
        flex: 1,
        backgroundColor: 'var(--secondary-bg)',
        padding: '20px',
        borderRadius: '10px',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: 'var(--highlight-color)',
    },
    productContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    productImage: {
        width: '100px',
        height: '100px',
        borderRadius: '10px',
        marginRight: '20px',
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: '1.2rem',
        marginBottom: '10px',
    },
    productPrice: {
        fontSize: '1rem',
        marginBottom: '5px',
    },
    productQuantity: {
        fontSize: '1rem',
    },
    summarySection: {
        marginTop: '20px',
    },
    section: {
        marginBottom: '20px',
    },
    sectionHeading: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: 'var(--highlight-color)',
    },
    inputField: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--primary-bg)',
        color: 'var(--text-color)',
        marginBottom: '10px',
    },
    paymentOptions: {
        display: 'flex',
        flexDirection: 'column',
    },
    paymentOption: {
        marginBottom: '10px',
        fontSize: '1rem',
    },
    cardDetails: {
        marginLeft: '20px',
    },
    upiDetails: {
        marginLeft: '20px',
    },
    buyButton: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'var(--highlight-color)',
        color: 'var(--text-color-secondary)',
        cursor: 'pointer',
        fontSize: '1rem',
    },
};

export default OrderPage;