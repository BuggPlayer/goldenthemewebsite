import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_order } from '../../store/reducer/orderReducer';
import './Order.css';

const Order = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { myOrder } = useSelector(state => state.order);
    // const { userInfo } = useSelector(state => state.auth);
    const userInfo = JSON.parse(localStorage.getItem("user-info"));

    useEffect(() => {
        dispatch(get_order(orderId));
    }, [orderId]);

    return (
        <div className='order-container'>
            <h2 className='order-header'>#{myOrder._id}, <span className='order-date'>{myOrder.date}</span></h2>
            <div className='order-grid'>
                <div className='order-info'>
                    <h2 className='order-delivery'>Deliver to: {myOrder.shippingInfo?.name}</h2>
                    <p>
                        <span className='order-tag'>Home</span>
                        <span className='order-address'>{myOrder.shippingInfo?.address} {myOrder.shippingInfo?.province} {myOrder.shippingInfo?.city} {myOrder.shippingInfo?.area}</span>
                    </p>
                    <p className='order-email'>Email to {userInfo.email}</p>
                </div>
                <div className='order-summary'>
                    <h2>Price: ₹{myOrder.price} include shipping fee</h2>
                    <p>Payment status: <span className={`order-status ${myOrder.payment_status === 'paid' ? 'paid' : 'unpaid'}`}>{myOrder.payment_status}</span></p>
                    <p>Order status: <span className={`order-status ${myOrder.delivery_status === 'paid' ? 'delivered' : 'pending'}`}>{myOrder.delivery_status}</span></p>
                </div>
            </div>
            <div className='order-products'>
                <h2 className='products-title'>Products</h2>
                <div className='products-list'>
                    {
                        myOrder.products?.map((p, i) => (
                            <div key={i} className='product-item'>
                                <div className='product-details'>
                                    <img className='product-image'   src={Array.isArray(p.images) ? p.images[0] : p.image}
 alt="image" />
                                    <div className='product-text'>
                                        <Link>{p.name}</Link>
                                        <p>
                                            <span>Brand: {p.brand}</span>
                                            <span>Quantity: {p.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='product-price'>
                                    {/* <h2 className='discounted-price'>₹{p.price - Math.floor((p.price * p.discount) / 100)}</h2> */}
                                    <h2 className='discounted-price'>₹{p.price}</h2>

                                    {/* <p className='original-price'>{p.price}</p> */}
                                    {/* <p className='discount'>-{p.discount}%</p> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Order;
