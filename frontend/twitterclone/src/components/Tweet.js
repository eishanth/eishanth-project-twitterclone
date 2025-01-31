import React from 'react';
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FiShare } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from '../redux/tweetSlice';
import { timeSince } from "../utils/constant";
import { Link } from 'react-router-dom';
import { profileThemes } from '../utils/profileThemes';

const Tweet = ({ tweet }) => {
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const likeOrDislikeHandler = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const deleteTweetHandler = async (e, id) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <article className='border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer'>
            <div className='flex p-4' onClick={(e) => e.stopPropagation()}>
                <div className='flex-shrink-0'>
                    <Link to={`/profile/${tweet?.userId}`} onClick={(e) => e.stopPropagation()}>
                        <Avatar 
                            src={profileThemes[tweet?.userDetails[0]?.profileImage || 'default1']} 
                            size="40" 
                            round={true} 
                        />
                    </Link>
                </div>
                <div className='flex-grow ml-3'>
                    <div className='flex items-center'>
                        <Link to={`/profile/${tweet?.userId}`} onClick={(e) => e.stopPropagation()} className='hover:underline'>
                            <span className='font-bold'>{tweet?.userDetails[0]?.name}</span>
                        </Link>
                        <Link to={`/profile/${tweet?.userId}`} onClick={(e) => e.stopPropagation()} className='ml-1 text-gray-500 hover:underline'>
                            @{tweet?.userDetails[0]?.username}
                        </Link>
                        <span className='mx-1 text-gray-500'>·</span>
                        <span className='text-gray-500 hover:underline'>
                            {timeSince(tweet?.createdAt)}
                        </span>
                    </div>
                    <p className='mt-1 text-gray-800 whitespace-pre-wrap'>{tweet?.description}</p>
                    <div className='flex justify-between mt-3 max-w-md text-gray-500'>
                        <button 
                            type="button"
                            className='group flex items-center hover:text-blue-500'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <div className='p-2 rounded-full group-hover:bg-blue-50'>
                                <FaRegComment className="w-4 h-4" />
                            </div>
                            <span className='text-sm ml-1'>0</span>
                        </button>
                        <button 
                            type="button"
                            className={`group flex items-center ${tweet?.like?.includes(user?._id) ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                likeOrDislikeHandler(e, tweet?._id);
                            }}
                        >
                            <div className={`p-2 rounded-full ${tweet?.like?.includes(user?._id) ? 'bg-pink-50' : 'group-hover:bg-pink-50'}`}>
                                {tweet?.like?.includes(user?._id) ? (
                                    <FaHeart className="w-5 h-5" />
                                ) : (
                                    <CiHeart className="w-5 h-5" />
                                )}
                            </div>
                            <span className='text-sm ml-1'>{tweet?.like?.length || 0}</span>
                        </button>
                        <button 
                            type="button"
                            className='group flex items-center hover:text-green-500'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <div className='p-2 rounded-full group-hover:bg-green-50'>
                                <IoStatsChart className="w-4 h-4" />
                            </div>
                            <span className='text-sm ml-1'>0</span>
                        </button>
                        <button 
                            type="button"
                            className='group flex items-center hover:text-blue-500'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <div className='p-2 rounded-full group-hover:bg-blue-50'>
                                <FiShare className="w-4 h-4" />
                            </div>
                        </button>
                        {user?._id === tweet?.userId && (
                            <button 
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    deleteTweetHandler(e, tweet?._id);
                                }}
                                className='group flex items-center hover:text-red-500'
                            >
                                <div className='p-2 rounded-full group-hover:bg-red-50'>
                                    <MdOutlineDeleteOutline className="w-4 h-4" />
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default Tweet;