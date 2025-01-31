import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikedTweets } from "../redux/tweetSlice";

const useGetLikedTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweet);

    useEffect(() => {
        const fetchLikedTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_END_POINT}/likedtweets/${id}`, {
                    withCredentials: true
                });
                dispatch(setLikedTweets(res.data.tweets));
            } catch (error) {
                console.log(error);
            }
        };

        if (id) {
            fetchLikedTweets();
        }
    }, [id, refresh, dispatch]);
};

export default useGetLikedTweets;
