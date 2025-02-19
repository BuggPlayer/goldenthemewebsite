import React, { useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_dashboard_index_data } from '../../store/reducer/dashboardReducer';
import './Dashboard.css';

const Index = () => {
    const navigate = useNavigate();
    // const { userInfo } = useSelector(state => state.auth);
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const { totalOrder, pendingOrder, recentOrders, cancelledOrder } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_dashboard_index_data(userInfo._id));
    }, [dispatch, userInfo._id]);

    const redirectToPayment = (ord) => {
        let items = ord.products.reduce((acc, product) => acc + product.quantity, 0);
        navigate('/payment', {
            state: {
                price: ord.price,
                items,
                orderId: ord._id
            }
        });
    };

    return (
        <div className="dashboard-container">
            <div className="grid-container">
                <div className="card">
                    <div className="icon-container">
                        <AiOutlineShoppingCart className="icon" />
                    </div>
                    <div className="text-container">
                        <h2>{totalOrder}</h2>
                        <span>Orders</span>
                    </div>
                </div>
                <div className="card">
                    <div className="icon-container blue">
                        <AiOutlineShoppingCart className="icon" />
                    </div>
                    <div className="text-container">
                        <h2>{pendingOrder}</h2>
                        <span>Pending Orders</span>
                    </div>
                </div>
                <div className="card">
                    <div className="icon-container red">
                        <AiOutlineShoppingCart className="icon" />
                    </div>
                    <div className="text-container">
                        <h2>{cancelledOrder}</h2>
                        <span>Cancelled Orders</span>
                    </div>
                </div>
            </div>
            <div className="recent-orders">
                <h2>Recent Orders</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Price</th>
                                <th>Payment status</th>
                                <th>Order status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((o, i) => (
                                <tr key={i}>
                                    <td>{o._id}</td>
                                    <td>₹{o.price}</td>
                                    <td>{o.payment_status}</td>
                                    <td>{o.delivery_status}</td>
                                    <td>
                                        <Link to={`/dashboard/order/details/${o._id}`} className="view-button">View</Link>
                                        {o.payment_status !== 'paid' && (
                                            <span onClick={() => redirectToPayment(o)} className="pay-now">Pay Now</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Index;
