import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_order } from '../../store/reducer/orderReducer'
// import { get_order } from '../../store/reducers/orderReducer'
const Order = () => {

    const { orderId } = useParams()
    const dispatch = useDispatch()
    const { myOrder } = useSelector(state => state.order)
    // const { userInfo } = useSelector(state => state.auth)
    const userInfo = JSON.parse(localStorage.getItem("user-info"));

    useEffect(() => {
        dispatch(get_order(orderId))
    }, [orderId])

    return (
        <div className='p-5  rounded-lg shadow-sm'>
        <h2 className='text-slate-600 font-semibold text-xl mb-4'>
            #{myOrder._id} , <span className='pl-1 text-slate-500'>{myOrder.date}</span>
        </h2>
    
        {/* Shipping and Payment Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-6'>
            {/* Shipping Information */}
            <div className='flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100'>
                <h2 className='text-slate-600 font-semibold'>Deliver to: {myOrder.shippingInfo?.name}</h2>
                <p className='flex items-center gap-2'>
                    <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded'>Home</span>
                    <span className='text-slate-600 text-sm'>
                        {myOrder.shippingInfo?.address}, {myOrder.shippingInfo?.province}, {myOrder.shippingInfo?.city}, {myOrder.shippingInfo?.area}
                    </span>
                </p>
                <p className='text-slate-600 text-sm font-semibold'>Email to {userInfo?.email}</p>
            </div>
    
            {/* Payment Information */}
            <div className='flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100'>
                <h2 className='text-slate-600'>Price: ₹{myOrder.price} (includes shipping fee)</h2>
                <p className='text-slate-600'>
                    Payment status: <span className={`py-[1px] text-xs px-3 ${myOrder.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md`}>
                        {myOrder.payment_status}
                    </span>
                </p>
                <p className='text-slate-600'>
                    Order status: <span className={`py-[1px] text-xs px-3 ${myOrder.delivery_status === 'delivered' ? 'bg-indigo-100 text-indigo-800' : 'bg-red-100 text-red-800'} rounded-md`}>
                        {myOrder.delivery_status}
                    </span>
                </p>
            </div>
        </div>
    
        {/* Products List */}
        <div className='mt-5'>
            <h2 className='text-slate-600 text-lg font-semibold mb-4'>Products</h2>
            <div className='flex flex-col gap-4'>
                {myOrder.products?.map((p, i) => (
                    <div key={i} className='flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow'>
                        {/* Product Image and Details */}
                        <div className='flex items-center gap-4'>
                            {/* <img className='w-[5px] h-[5px] object-cover rounded-md' src={p.image} alt={p.name} /> */}
                            <div className='flex flex-col gap-1'>
                                <Link to="#" className='text-slate-600 font-medium hover:text-blue-600 transition-colors'>{p.name}</Link>
                                <p className='text-slate-500 text-sm'>
                                    <span>Brand: {p.brand}</span> | <span>Quantity: {p.quantity}</span>
                                </p>
                            </div>
                        </div>
    
                        {/* Product Price and Discount */}
                        <div className='text-right'>
                            <h2 className='text-md text-orange-500 font-semibold'>
                                ${p.price - Math.floor((p.price * p.discount) / 100)}
                            </h2>
                            <p className='text-slate-500 text-sm line-through'>${p.price}</p>
                            <p className='text-green-600 text-sm'>-{p.discount}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Order