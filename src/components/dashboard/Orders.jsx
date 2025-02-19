import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_orders } from '../../store/reducer/orderReducer';
import './orders.css';

const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const { myOrders } = useSelector(state => state.order);
    const [state, setState] = useState('all');

    useEffect(() => {
        dispatch(get_orders({ status: state, customerId: userInfo._id }));
    }, [state]);

    const redirect = (ord) => {
        let items = ord.products.reduce((total, product) => total + product.quantity, 0);
        navigate('/payment', {
            state: {
                price: ord.price,
                items,
                orderId: ord._id
            }
        });
    };

    return (
        <div className='orders-container'>
            <div className='orders-header'>
                <h2 className='orders-title'>My Orders</h2>
                <select className='order-status-filter' value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="all">--Order Status--</option>
                    <option value="placed">Placed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="warehouse">Warehouse</option>
                </select>
            </div>
            <div className='orders-table-container'>
                <table className='orders-table'>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.map((o, i) => (
                            <tr key={i}>
                                <td>{o._id}</td>
                                <td>${o.price}</td>
                                <td>{o.payment_status}</td>
                                <td>{o.delivery_status}</td>
                                <td className='orders-action'>
                                    <Link to={`/dashboard/order/details/${o._id}`} className='order-link'>View</Link>
                                    {o.payment_status !== 'paid' && (
                                        <span onClick={() => redirect(o)} className='pay-now'>Pay Now</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
