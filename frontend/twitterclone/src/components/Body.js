import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';
import Explore from './Explore';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import ComposeTweet from './ComposeTweet';
import Messages from './Messages';
import Communities from './Communities';
import Premium from './Premium';
import FollowList from './FollowList';

const Body = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home Layout with Nested Routes */}
                <Route path="/" element={<Home />}>
                    <Route index element={<Feed />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="profile/:id/:type" element={<FollowList />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="bookmarks" element={<Bookmarks />} />
                    <Route path="compose/tweet" element={<ComposeTweet />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="communities" element={<Communities />} />
                    <Route path="premium" element={<Premium />} />
                </Route>

                {/* Login Page */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Body;

// import React from 'react';
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Login from './Login';
// import Home from './Home';
// import Feed from './Feed';
// import Profile from './Profile';
// import Explore from './Explore';
// import Notifications from './Notifications';
// import Bookmarks from './Bookmarks';
// import ComposeTweet from './ComposeTweet';
// import Messages from './Messages';
// import Communities from './Communities';
// import Premium from './Premium';
// import FollowList from './FollowList';

// const Body = () => {
//     const appRouter = createBrowserRouter([
//         {
//             path: "/",
//             element: <Home/>,
//             children:[
//                 {
//                     path:"/",
//                     element:<Feed/>
//                 },
//                 {
//                     path:"/profile/:id",
//                     element:<Profile/>
//                 },
//                 {
//                     path:"/profile/:id/:type",
//                     element:<FollowList/>
//                 },
//                 {
//                     path:"/explore",
//                     element:<Explore/>
//                 },
//                 {
//                     path:"/notifications",
//                     element:<Notifications/>
//                 },
//                 {
//                     path:"/bookmarks",
//                     element:<Bookmarks/>
//                 },
//                 {
//                     path:"/compose/tweet",
//                     element:<ComposeTweet/>
//                 },
//                 {
//                     path:"/messages",
//                     element:<Messages/>
//                 },
//                 {
//                     path:"/communities",
//                     element:<Communities/>
//                 },
//                 {
//                     path:"/premium",
//                     element:<Premium/>
//                 }
//             ]
//         },
//         {
//             path: "/login",
//             element: <Login />
//         }
//     ])
//     return (
//         <div>
//             <RouterProvider router={appRouter} />
//         </div>
//     )
// }

// export default Body
