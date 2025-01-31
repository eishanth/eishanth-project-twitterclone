import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost.js'
import Tweet from './Tweet.js'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utils/constant.js';
import { getAllTweets } from '../redux/tweetSlice.js';
import { getMyProfile } from '../redux/userSlice';

const Feed = () => {
  const { tweets, isActive, refresh } = useSelector(store => store.tweet);
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch tweets based on active tab
        const endpoint = isActive 
          ? `${TWEET_API_END_POINT}/alltweets/${user?._id}`
          : `${TWEET_API_END_POINT}/followingtweets/${user?._id}`;
        
        const [tweetsRes, profileRes] = await Promise.all([
          axios.get(endpoint, { withCredentials: true }),
          axios.get(`${USER_API_END_POINT}/profile/${user?._id}`, { withCredentials: true })
        ]);

        dispatch(getAllTweets(tweetsRes.data.tweets));
        dispatch(getMyProfile(profileRes.data.user));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchData();
    }
  }, [user?._id, isActive, refresh, dispatch]);

  return (
    <div className='flex-grow border-x border-gray-200'>
      <div className='border-b border-gray-200'>
        <div className='sticky top-0 bg-white/80 backdrop-blur-md z-10'>
          <h1 className='text-xl font-bold p-4'>Home</h1>
          <CreatePost />
        </div>
      </div>
      <div>
        {loading ? (
          <div className='flex justify-center items-center p-4'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
          </div>
        ) : tweets?.length > 0 ? (
          tweets.map((tweet) => (
            <Tweet key={tweet?._id} tweet={tweet} />
          ))
        ) : (
          <div className='text-center py-8 text-gray-500'>
            {isActive 
              ? "No tweets found. Start following people or create your first tweet!"
              : "No tweets from people you follow. Start following more people!"}
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed