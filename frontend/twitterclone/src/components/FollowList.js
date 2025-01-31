import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import Avatar from "react-avatar";
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';
import toast from 'react-hot-toast';
import { profileThemes } from '../utils/profileThemes';

const FollowList = () => {
    const { id, type } = useParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${USER_API_END_POINT}/${type}/${id}`, {
                    withCredentials: true
                });
                setUsers(res.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        if (id && type && (type === 'followers' || type === 'following')) {
            fetchUsers();
        }
    }, [id, type]);

    const handleFollowClick = async (targetId) => {
        try {
            const endpoint = user.following.includes(targetId) ? 'unfollow' : 'follow';
            const res = await axios.post(
                `${USER_API_END_POINT}/${endpoint}/${targetId}`,
                { id: user?._id },
                { withCredentials: true }
            );
            dispatch(followingUpdate(targetId));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating follow status');
        }
    };

    return (
        <div className='flex-grow border-x border-gray-200'>
            <div className='sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-200'>
                <div className='flex items-center p-4'>
                    <button 
                        onClick={() => navigate(-1)}
                        className='p-2 rounded-full hover:bg-gray-200 transition'
                    >
                        <IoMdArrowBack className="w-5 h-5" />
                    </button>
                    <div className='ml-6'>
                        <h1 className='font-bold text-xl capitalize'>{type}</h1>
                    </div>
                </div>
            </div>

            <div className='divide-y divide-gray-200'>
                {loading ? (
                    <div className='flex justify-center items-center p-4'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
                    </div>
                ) : users.length > 0 ? (
                    users.map(userItem => (
                        <div key={userItem._id} className='p-4 hover:bg-gray-50 transition'>
                            <div className='flex items-center justify-between'>
                                <Link 
                                    to={`/profile/${userItem._id}`}
                                    className='flex items-center flex-grow'
                                >
                                    <Avatar 
                                        src={profileThemes[userItem.profileImage || 'default1']}
                                        size="40" 
                                        round={true} 
                                    />
                                    <div className='ml-3'>
                                        <h3 className='font-bold hover:underline'>{userItem.name}</h3>
                                        <p className='text-gray-500 text-sm'>@{userItem.username}</p>
                                    </div>
                                </Link>
                                {user._id !== userItem._id && (
                                    <button
                                        onClick={() => handleFollowClick(userItem._id)}
                                        className={`px-4 py-1.5 rounded-full font-bold transition ${
                                            user.following.includes(userItem._id)
                                                ? 'border border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                                                : 'bg-black text-white hover:bg-gray-800'
                                        }`}
                                    >
                                        {user.following.includes(userItem._id) ? 'Following' : 'Follow'}
                                    </button>
                                )}
                            </div>
                            {userItem.bio && (
                                <p className='mt-2 text-sm text-gray-800'>{userItem.bio}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <div className='p-4 text-center text-gray-500'>
                        No {type} found
                    </div>
                )}
            </div>
        </div>
    );
};

export default FollowList;
