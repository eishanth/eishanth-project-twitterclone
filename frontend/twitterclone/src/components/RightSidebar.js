import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link} from 'react-router-dom';
import { profileThemes } from '../utils/profileThemes';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const RightSidebar = ({ otherUsers }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const followAndUnfollowHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      if (user?.following?.includes(id)) {
        // Unfollow
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user?._id });
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } else {
        // Follow
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id });
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating follow status");
      console.log(error);
    }
  };

  return (
    <div className='h-screen px-4 py-3 overflow-y-auto'>
      {/* Search */}
      <div className='sticky top-0 bg-white pb-3'>
        <div className='flex items-center bg-[#eff3f4] rounded-full px-4 py-2 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-400'>
          <CiSearch className="w-5 h-5 text-gray-600" />
          <input 
            type="text" 
            className='bg-transparent outline-none px-3 w-full placeholder-gray-600'
            placeholder='Search' 
          />
        </div>
      </div>

      {/* Subscribe to Premium */}
      <div className='bg-[#f7f9f9] rounded-2xl p-4 mb-4'>
        <h2 className='font-bold text-xl mb-2'>Subscribe to Premium</h2>
        <p className='text-sm mb-3'>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
        <button
        className='bg-black text-white rounded-full px-4 py-2 font-bold hover:bg-gray-800'>
          Subscribe
        </button>
      </div>

      {/* Who to follow */}
      <div className='bg-[#f7f9f9] rounded-2xl p-4'>
        <h2 className='font-bold text-xl mb-4'>Who to follow</h2>
        {otherUsers?.map((otherUser) => (
          <div key={otherUser?._id} className='flex items-center justify-between mb-4 last:mb-0'>
            <Link to={`/profile/${otherUser?._id}`} className='flex items-center'>
              <Avatar 
                src={profileThemes[otherUser?.profileImage || 'default1']}
                size="40" 
                round={true} 
                className="flex-shrink-0"
              />
              <div className='ml-3'>
                <h3 className='font-bold leading-5 hover:underline cursor-pointer'>{otherUser?.name}</h3>
                <p className='text-gray-600 text-sm'>{`@${otherUser?.username}`}</p>
              </div>
            </Link>
            <button 
              onClick={() => followAndUnfollowHandler(otherUser?._id)}
              className='bg-black text-white rounded-full px-4 py-1.5 text-sm font-bold hover:bg-gray-800'
            >
              {user?.following?.includes(otherUser?._id) ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <nav className='text-gray-500 text-sm mt-4 px-4'>
        <div className='flex flex-wrap gap-2'>
          <a href="#" className='hover:underline'>Terms of Service</a>
          <a href="#" className='hover:underline'>Privacy Policy</a>
          <a href="#" className='hover:underline'>Cookie Policy</a>
          <a href="#" className='hover:underline'>Accessibility</a>
          <a href="#" className='hover:underline'>More</a>
          <span> 2024 X Corp.</span>
        </div>
      </nav>
    </div>
  )
}

export default RightSidebar