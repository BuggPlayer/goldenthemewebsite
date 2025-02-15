import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";
import { BsChat, BsHeart } from "react-icons/bs";
import { TfiLock } from "react-icons/tfi";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterShow, setFilterShow] = useState(false);

  const logout = async () => {
    // try {
    //     const { data } = await api.get('/customer/logout')
    //     localStorage.removeItem('customerToken')
    //     dispatch(user_reset())
    //     dispatch(reset_count())
    //     navigate('/login')
    // } catch (error) {
    //     console.log(error.response.data)
    // }
  };

  return (
    <div className="bg-black min-h-screen text-[#d2a34b] font-primary">
      <div className="mt-5">
        {/* Mobile Toggle Button */}
        <div className="w-[90%] mx-auto pt-5 md:hidden">
          <button
            onClick={() => setFilterShow(!filterShow)}
            className="text-center py-3 px-3 bg-[#d2a34b] text-black rounded-md"
          >
            <FaList />
          </button>
        </div>

        {/* Dashboard Layout */}
        <div className="h-full mx-auto py-5 flex md:flex-row flex-col">
          {/* Sidebar */}
          <div
            className={`bg-[#121212] md:static fixed top-0 left-0 h-full w-[270px] md:w-[270px] transition-all duration-300 ${
              filterShow ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 z-50`}
          >
            <ul className="py-4 px-6 space-y-4 text-[#fff]">
              {[
                { to: "/index", label: "Dashboard", icon: <RxDashboard /> },
                { to: "/dashboard/my-orders", label: "My Orders", icon: <RiProductHuntLine /> },
                { to: "/dashboard/my-wishlist", label: "Wishlist", icon: <BsHeart /> },
                { to: "/dashboard/chat", label: "Chat", icon: <BsChat /> },
                { to: "/dashboard/change-password", label: "Change Password", icon: <TfiLock /> },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 py-2 hover:text-[#d2a34b]">
                  <span className="text-xl">{item.icon}</span>
                  <Link to={item.to} className="block">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li
                onClick={logout}
                className="flex items-center gap-3 py-2 text-red-500 cursor-pointer hover:text-red-400"
              >
                <span className="text-xl">
                  <BiLogInCircle />
                </span>
                <div>Logout</div>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="w-full md:ml-[270px] p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
