import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from '../hooks/useOtherUsers';
import { useSelector } from "react-redux";
import useGetMyTweets from '../hooks/useGetMyTweets';

const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  // custom Hook
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-[1300px] mx-auto flex'>
        <LeftSidebar />
        <main className='flex-1 min-h-screen border-l border-r border-gray-200 ml-[275px] mr-[350px]'>
          <Outlet />
        </main>
        <div className='w-[350px] fixed right-0 h-screen'>
          <RightSidebar otherUsers={otherUsers} />
        </div>
      </div>
    </div>
  )
}

export default Home