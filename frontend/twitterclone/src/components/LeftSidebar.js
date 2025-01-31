import React from 'react';
import { CiHome, CiUser, CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiGroupLine} from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

const LeftSidebar = () => {
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-[275px] fixed h-screen px-4'>
            <div className='flex flex-col h-full'>
                <div className='py-4'>
                    <Link to="/">
                        <img className='w-8 h-8' src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="X logo" />
                    </Link>
                </div>
                
                <nav className='flex-1'>
                    <Link to="/" className='flex items-center py-3 px-3 text-xl hover:bg-gray-200 rounded-full transition duration-200'>
                        <CiHome className="w-7 h-7" />
                        <span className='ml-4 font-medium'>Home</span>
                    </Link>
                    
                    <Link to="/explore" className='flex items-center py-3 px-3 text-xl hover:bg-gray-200 rounded-full transition duration-200'>
                        <CiSearch className="w-7 h-7" />
                        <span className='ml-4 font-medium'>Explore</span>
                    </Link>
                    
                    <Link to="/notifications" className='flex items-center py-3 px-3 text-xl hover:bg-gray-200 rounded-full transition duration-200'>
                        <IoIosNotificationsOutline className="w-7 h-7" />
                        <span className='ml-4 font-medium'>Notifications</span>
                    </Link>
                    
                    <Link to="/messages" className='flex items-center py-3 px-3 text-xl hover:bg-gray-200 rounded-full transition duration-200'>
                        <HiOutlineMail className="w-7 h-7" />
                        <span className='ml-4 font-medium'>Messages</span>
                    </Link>

                    <Link to="/communities" className='flex items-center py-3 px-3 text-xl hover:bg-gray-200 rounded-full transition duration-200'>
                        <RiGroupLine className="w-7 h-7" />
                        <span className='ml-4 font-medium'>Communities</span>
                    </Link>

                    <Link to="/premium" className='flex items-center py-3 px-3 text-xl hover:bg-gray-200 rounded-full transition duration-200'>
                        <span className='font-bold text-2xl ml-1'>𝕏</span>
                        <span className='ml-4 font-medium'>Premium</span>
                    </Link>

                    <Link to={`/profile/${user?._id}`} className='flex items-center py-3 px-3 text-xl hover:bg-gray-200 rounded-full transition duration-200'>
                        <CiUser className="w-7 h-7" />
                        <span className='ml-4 font-medium'>Profile</span>
                    </Link>
                    
                    <button onClick={logoutHandler} className='w-full flex items-center py-3 px-3 text-xl hover:bg-gray-200 rounded-full transition duration-200'>
                        <AiOutlineLogout className="w-7 h-7" />
                        <span className='ml-4 font-medium'>Logout</span>
                    </button>
                </nav>
                
                <Link to="/compose/tweet" className='mb-4 w-full'>
                    <button className='w-full bg-[#1d9bf0] text-white rounded-full py-3 px-4 text-lg font-bold hover:bg-[#1a8cd8] transition duration-200'>
                        Post
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default LeftSidebar