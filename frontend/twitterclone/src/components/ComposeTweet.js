import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';

const ComposeTweet = () => {
    const [tweet, setTweet] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(store => store.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!tweet.trim()) {
            toast.error('Tweet cannot be empty');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${TWEET_API_END_POINT}/create`, {
                description: tweet,
                id: user._id
            });
            
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            }
        } catch (error) {
            console.error('Tweet creation error:', error);
            toast.error(error.response?.data?.message || 'Error creating tweet');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-grow border-l border-r border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <button 
                    onClick={() => navigate(-1)} 
                    className="hover:bg-gray-200 rounded-full p-2"
                >
                    ✕
                </button>
                <h1 className="text-xl font-bold">New Post</h1>
                <div className="w-8"></div>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="4"
                        placeholder="What's happening?"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                        maxLength={280}
                    />
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                            {tweet.length}/280
                        </span>
                        <button
                            type="submit"
                            disabled={isLoading || !tweet.trim()}
                            className={`px-4 py-2 text-white font-bold rounded-full ${
                                isLoading || !tweet.trim() 
                                ? 'bg-[#1D9BF0]/50 cursor-not-allowed' 
                                : 'bg-[#1D9BF0] hover:bg-[#1a8cd8]'
                            }`}
                        >
                            {isLoading ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ComposeTweet;
