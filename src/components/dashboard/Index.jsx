import React, { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { get_dashboard_index_data } from '../../store/reducer/dashboardReducer'
// import { get_dashboard_index_data } from '../../store/reducers/dashboardReducer'

const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { userInfo } = useSelector(state => state.auth)
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
const { totalOrder, pendingOrder, recentOrders, cancelledOrder } = useSelector(state => state.dashboard)

  

    useEffect(() => {
        dispatch(get_dashboard_index_data(userInfo._id))
    }, [])
    const redirect = (ord) => {
        let items = 0;
        for (let i = 0; i < ord.length; i++) {
            items = ord.products[i].quantity + items
        }
        navigate('/payment', {
            state: {
                price: ord.price,
                items,
                orderId: ord._id
            }
        })
    }
    return (
        <div >
<div style={{ 
    // background: "red", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: "40px", 
    borderRadius: "8px",
    color: "white"
}}>
    {/* Total Orders */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ 
            background: "#D1FAE5", 
            width: "50px", 
            height: "50px", 
            borderRadius: "50%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
        }}>
            <span style={{ fontSize: "20px", color: "#065F46" }}>
                <AiOutlineShoppingCart />
            </span>
        </div>
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{totalOrder}</h2>
            <span>Orders</span>
        </div>
    </div>

    {/* Pending Orders */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ 
            background: "#DBEAFE", 
            width: "50px", 
            height: "50px", 
            borderRadius: "50%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
        }}>
            <span style={{ fontSize: "20px", color: "#1E40AF" }}>
                <AiOutlineShoppingCart />
            </span>
        </div>
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{pendingOrder}</h2>
            <span>Pending Orders</span>
        </div>
    </div>

    {/* Cancelled Orders */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ 
            background: "#FEE2E2", 
            width: "50px", 
            height: "50px", 
            borderRadius: "50%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
        }}>
            <span style={{ fontSize: "20px", color: "#B91C1C" }}>
                <AiOutlineShoppingCart />
            </span>
        </div>
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{cancelledOrder}</h2>
            <span>Cancelled Orders</span>
        </div>
    </div>
</div>


<div className='p-4 mt-5 rounded-md  shadow-md'>
    <h2 className='text-lg font-semibold text-slate-600'>Recent Orders</h2>
 <div className='overflow-x-auto rounded-md shadow-md  border-gray-200'>
    <table className='w-full border-collapse text-sm text-gray-600'>
        {/* Table Header */}
        <thead className='bg-gray-100 text-gray-700 text-sm font-semibold uppercase border-b border-gray-300'>
            <tr>
                <th scope='col' className='px-6 py-3 text-left w-1/5'>Order ID</th>
                <th scope='col' className='px-6 py-3 text-left w-1/5'style={{padding:40}}>Price</th>
                <th scope='col' className='px-6 py-3 text-left w-1/5' style={{padding:40}}>Payment Status</th>
                <th scope='col' className='px-6 py-3 text-left w-1/5'>Order Status</th>
                <th scope='col' className='px-6 py-3 text-center w-1/5'>Action</th>
            </tr>
        </thead>

        {/* Table Body */}
        <tbody>
            {recentOrders.map((o, i) => (
                <tr key={i} className='border-b odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition'>
                    <td className='px-6 py-4 font-medium text-nowrap'>{o._id}</td>
                    <td className='px-6 py-4 font-medium text-nowrap' style={{padding:40}}>₹{o.price}</td>
                    <td className={`px-6 py-4 font-medium ${o.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'}`}style={{padding:40}}>
                        {o.payment_status}
                    </td>
                    <td className='px-6 py-4 font-medium'>{o.delivery_status}</td>
                    <td className='px-6 py-4 text-center'style={{padding:40}}>
                        <Link 
                            to={`/dashboard/order/details/${o._id}`} 
                            className='bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-green-200 transition'
                            style={{padding:40}}>
                            View
                        </Link>
                        {/* {o.payment_status !== 'paid' && (
                            <span 
                                onClick={() => redirect(o)} 
                                className='bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-md ml-2 cursor-pointer hover:bg-red-200 transition'
                            >
                                Pay Now
                            </span>
                        )} */}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


    
</div>

        </div>
    )
}

export default Index