import React, { useState } from 'react';
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmile } from "react-icons/bs";
import { TbCalendarTime } from "react-icons/tb";
import { HiOutlineGif } from "react-icons/hi2";
import { GoLocation } from "react-icons/go";
import axios from "axios";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux";
import { getAllTweets, getActive, getRefresh } from '../redux/tweetSlice';
import { getMyProfile } from '../redux/userSlice';

const CreatePost = () => {
    const [description, setDescription] = useState("");
    const { user } = useSelector(store => store.user);
    const { isActive } = useSelector(store => store.tweet);
    const dispatch = useDispatch();

    const submitHandler = async () => {
        if (!description.trim()) {
            toast.error("Post cannot be empty!");
            return;
        }
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description, id: user?._id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            dispatch(getRefresh());
            
            // Fetch updated profile data after creating post
            const profileRes = await axios.get(`${USER_API_END_POINT}/profile/${user?._id}`, {
                withCredentials: true
            });
            dispatch(getMyProfile(profileRes.data.user));
            
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        setDescription("");
    }

    const forYouHandler = () => {
        dispatch(getActive(true));
    }
    const followingHandler = () => {
        dispatch(getActive(false));
    }

    return (
        <div className='w-full border-b border-gray-200'>
            <div className='grid grid-cols-2 border-b border-gray-200'>
                <button
                    onClick={forYouHandler}
                    className={`py-4 hover:bg-gray-50 transition relative ${
                        isActive ? 'font-bold' : 'text-gray-500'
                    }`}
                >
                    <span>For you</span>
                    {isActive && (
                        <div className='absolute bottom-0 left-0 right-0 h-1 bg-blue-500'></div>
                    )}
                </button>
                <button
                    onClick={followingHandler}
                    className={`py-4 hover:bg-gray-50 transition relative ${
                        !isActive ? 'font-bold' : 'text-gray-500'
                    }`}
                >
                    <span>Following</span>
                    {!isActive && (
                        <div className='absolute bottom-0 left-0 right-0 h-1 bg-blue-500'></div>
                    )}
                </button>
            </div>
            
            <div className='flex p-4'>
                <div className='flex-shrink-0'>
                    <Avatar 
                        src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" 
                        size="40" 
                        round={true} 
                    />
                </div>
                <div className='flex-grow ml-3'>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full text-xl bg-transparent outline-none resize-none placeholder:text-gray-600'
                        placeholder="What is happening?!"
                        rows="3"
                    />
                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center -ml-2'>
                            <button className='p-2 hover:bg-blue-50 rounded-full text-blue-500'>
                                <CiImageOn className="w-5 h-5" />
                            </button>
                            <button className='p-2 hover:bg-blue-50 rounded-full text-blue-500'>
                                <HiOutlineGif className="w-5 h-5" />
                            </button>
                            <button className='p-2 hover:bg-blue-50 rounded-full text-blue-500'>
                                <BsEmojiSmile className="w-5 h-5" />
                            </button>
                            <button className='p-2 hover:bg-blue-50 rounded-full text-blue-500'>
                                <TbCalendarTime className="w-5 h-5" />
                            </button>
                            <button className='p-2 hover:bg-blue-50 rounded-full text-blue-500'>
                                <GoLocation className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={submitHandler}
                            disabled={!description.trim()}
                            className={`px-4 py-1.5 bg-[#1d9bf0] text-white rounded-full font-bold hover:bg-[#1a8cd8] transition ${
                                !description.trim() ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost