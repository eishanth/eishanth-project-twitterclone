import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [],
    likedTweets: [],
    isActive: true,
    refresh: false
}

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        getAllTweets: (state, action) => {
            state.tweets = action.payload;
        },
        setLikedTweets: (state, action) => {
            state.likedTweets = action.payload;
        },
        getActive: (state, action) => {
            state.isActive = action.payload;
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh;
        }
    }
});

export const { getAllTweets, getActive, getRefresh, setLikedTweets } = tweetSlice.actions;
export default tweetSlice.reducer;