import React, { useState, useEffect } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import useGetMyTweets from '../hooks/useGetMyTweets';
import useGetLikedTweets from '../hooks/useGetLikedTweets';
import axios from "axios";
import { USER_API_END_POINT, TWEET_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { followingUpdate, updateUser } from '../redux/userSlice';
import { getRefresh, getAllTweets } from '../redux/tweetSlice';
import { CiCalendar } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { profileThemes } from '../utils/profileThemes';
import Tweet from './Tweet';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { tweets, likedTweets } = useSelector(store => store.tweet);
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('posts');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showThemes, setShowThemes] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        username: '',
        bio: '',
        profileImage: ''
    });
    const dispatch = useDispatch();

    // Get the count of user's posts
    const userPosts = tweets?.filter(tweet => tweet.userId === id) || [];
    const postCount = userPosts.length;
    const likeCount = likedTweets?.length || 0;

    useGetProfile(id);
    useGetMyTweets(id);
    useGetLikedTweets(id);

    // Reset tweets when switching tabs
    useEffect(() => {
        const fetchMyTweets = async () => {
            if (activeTab === 'posts') {
                try {
                    const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
                        withCredentials: true
                    });
                    dispatch(getAllTweets(res.data.tweets));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        
        fetchMyTweets();
    }, [activeTab, id, dispatch]);

    useEffect(() => {
        if (activeTab === 'likes') {
            const getLikedTweets = async () => {
                try {
                    const res = await axios.get(`${TWEET_API_END_POINT}/likedtweets/${id}`, {
                        withCredentials: true
                    });
                    dispatch(getAllTweets(res.data.tweets));
                } catch (error) {
                    console.log(error);
                }
            };
            getLikedTweets();
        }
    }, [activeTab, id, dispatch]);

    const handleEditClick = () => {
        setEditForm({
            name: profile?.name || '',
            username: profile?.username || '',
            bio: profile?.bio || '',
            profileImage: profile?.profileImage || 'default1'
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `${USER_API_END_POINT}/edit/${user?._id}`,
                editForm,
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(updateUser(res.data.user));
                dispatch(getRefresh());
                toast.success(res.data.message);
                setIsEditModalOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile");
        }
    };

    const followAndUnfollowHandler = async () => {
        if (user.following.includes(id)) {
            // unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user?._id });
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        } else {
            // follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id });
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }

    const tabs = [
        { id: 'posts', label: 'Posts' },
        { id: 'replies', label: 'Replies' },
        { id: 'highlights', label: 'Highlights' },
        { id: 'media', label: 'Media' },
        { id: 'likes', label: 'Likes' }
    ];

    return (
        <div className='flex-grow min-h-screen'>
            {/* Header */}
            <div className='sticky top-0 bg-white/80 backdrop-blur-md z-10'>
                <div className='flex items-center p-4'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-200 transition'>
                        <IoMdArrowBack className="w-5 h-5" />
                    </Link>
                    <div className='ml-6'>
                        <h1 className='font-bold text-xl'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>{activeTab === 'posts' ? `${postCount} posts` : `${likeCount} likes`}</p>
                    </div>
                </div>
            </div>

            {/* Banner and Profile Info */}
            <div>
                <div className='h-48 bg-gray-300'>
                    <img 
                        src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" 
                        alt="banner"
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='relative px-4'>
                    <div className='absolute -top-16 border-4 border-white rounded-full'>
                        <Avatar 
                            src={profileThemes[profile?.profileImage || 'default1']}
                            size="120" 
                            round={true}
                        />
                    </div>
                    <div className='flex justify-end pt-3'>
                        {profile?._id === user?._id ? (
                            <button 
                                onClick={handleEditClick}
                                className='px-4 py-1.5 rounded-full border border-gray-300 font-bold hover:bg-gray-200 transition'
                            >
                                Edit profile
                            </button>
                        ) : (
                            <button 
                                onClick={followAndUnfollowHandler} 
                                className='px-4 py-1.5 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition'
                            >
                                {user.following.includes(id) ? "Following" : "Follow"}
                            </button>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className='mt-6'>
                        <h1 className='font-bold text-xl'>{profile?.name}</h1>
                        <p className='text-gray-500'>{`@${profile?.username}`}</p>
                        
                        {profile?.bio ? (
                            <p className='mt-3 text-sm whitespace-pre-wrap'>{profile.bio}</p>
                        ) : (
                            <p className='mt-3 text-sm text-gray-500'>No bio yet.</p>
                        )}
                        
                        <div className='flex items-center mt-3 text-gray-500 text-sm'>
                            <CiCalendar className="w-5 h-5" />
                            <span className='ml-2'>Joined November 2022</span>
                        </div>

                        <div className='flex gap-4 mt-3 text-sm'>
                            <Link to={`/profile/${profile?._id}/following`} className='hover:underline'>
                                <span className='font-bold text-black'>{profile?.following?.length || 0}</span>
                                <span className='text-gray-500 ml-1'>Following</span>
                            </Link>
                            <Link to={`/profile/${profile?._id}/followers`} className='hover:underline'>
                                <span className='font-bold text-black'>{profile?.followers?.length || 0}</span>
                                <span className='text-gray-500 ml-1'>Followers</span>
                            </Link>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className='flex mt-4 border-b border-gray-200'>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setActiveTab(tab.id);
                                }}
                                className={`flex-1 py-4 hover:bg-gray-100 transition relative ${
                                    activeTab === tab.id ? 'font-bold' : 'text-gray-500'
                                }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className='absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full'></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Posts Content */}
                    {activeTab === 'posts' && (
                        <div className="mt-4">
                            {userPosts.map((tweet) => (
                                <Tweet key={tweet._id} tweet={tweet} />
                            ))}
                        </div>
                    )}

                    {/* Likes Content */}
                    {activeTab === 'likes' && (
                        <div className="mt-4">
                            {likedTweets?.map((tweet) => (
                                <Tweet key={tweet._id} tweet={tweet} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-2xl w-full max-w-xl p-4 max-h-[90vh] overflow-y-auto'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-4'>
                                <button 
                                    onClick={() => setIsEditModalOpen(false)}
                                    className='p-2 rounded-full hover:bg-gray-200 transition'
                                >
                                    <IoClose className="w-5 h-5" />
                                </button>
                                <h2 className='text-xl font-bold'>Edit profile</h2>
                            </div>
                            <button
                                onClick={handleEditSubmit}
                                className='px-4 py-1.5 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition'
                            >
                                Save
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            {/* Profile Theme Selection */}
                            <div className='mb-4'>
                                <div className="flex items-center justify-between mb-2">
                                    <label className='block text-gray-700 font-bold'>
                                        Profile Theme
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowThemes(!showThemes)}
                                        className='text-blue-500 hover:text-blue-600 text-sm font-medium'
                                    >
                                        {showThemes ? 'Hide Themes' : 'Show Themes'}
                                    </button>
                                </div>
                                
                                {/* Current Theme Preview */}
                                <div className='mb-4 flex items-center gap-4'>
                                    <div className='w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200'>
                                        <img 
                                            src={profileThemes[editForm.profileImage || 'default1']} 
                                            alt="Current theme" 
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                    <span className='text-gray-500 text-sm'>Current Theme</span>
                                </div>

                                {/* Theme Grid */}
                                {showThemes && (
                                    <div className='grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-xl'>
                                        {Object.entries(profileThemes).map(([key, url]) => (
                                            <div 
                                                key={key}
                                                onClick={() => setEditForm(prev => ({ ...prev, profileImage: key }))}
                                                className={`cursor-pointer rounded-xl p-2 transition ${
                                                    editForm.profileImage === key 
                                                        ? 'bg-blue-100 ring-2 ring-blue-500' 
                                                        : 'hover:bg-gray-100'
                                                }`}
                                            >
                                                <div className='aspect-square rounded-full overflow-hidden'>
                                                    <img 
                                                        src={url} 
                                                        alt={`Theme ${key}`} 
                                                        className='w-full h-full object-cover'
                                                    />
                                                </div>
                                                <p className='text-xs text-center mt-1 text-gray-600'>
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Name Input */}
                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder="Your name"
                                />
                            </div>

                            {/* Username Input */}
                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={editForm.username}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder="Your username"
                                />
                            </div>

                            {/* Bio Input */}
                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>
                                    Bio
                                </label>
                                <textarea
                                    value={editForm.bio}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                                    placeholder="Your bio"
                                    rows={4}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile;