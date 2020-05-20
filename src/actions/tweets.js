import {
    RETRIEVE_TWEETS_REQUEST,
    RETRIEVE_TWEETS_SUCCESS,
    RETRIEVE_TWEETS_FAILURE,
    DELETE_TWEET_REQUEST,
    DELETE_TWEET_SUCCESS,
    DELETE_TWEET_FAILURE,
    UPDATE_TWEET_REQUEST,
    UPDATE_TWEET_SUCCESS,
    UPDATE_TWEET_FAILURE
} from './types';
import axios from 'axios';

const requestTweets =() => {
    return{
        type:RETRIEVE_TWEETS_REQUEST,
    }
}
const retrieveTweets = (tweets) => {
    return {
        type:RETRIEVE_TWEETS_SUCCESS,
        tweets,
    }
}

const retrieveError = (error) => {
    return {
        type:RETRIEVE_TWEETS_FAILURE,
        error,
    }
}

const deleteTweetsRequest = (tweet) => {
    return{
        type:DELETE_TWEET_REQUEST,
        tweet,
    }
}

const deleteTweetsSuccess = () => {
    return {
        type: DELETE_TWEET_SUCCESS
    }
}

const requestTweetsUpdate =(tweet) => {
    return{
        type:UPDATE_TWEET_REQUEST,
        tweet,
    }
}

const getTweetsFromApi = async(tag) => {
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.stocktwits.com/api/2/streams/symbol/${tag}.json`)     
        const tweets = { 
            tweetId: response.data.symbol.id,
            tweetSymbol: response.data.symbol.symbol, 
            tweetTitle: response.data.symbol.title, 
            tweetContent : response.data.messages, 
            tweetLength: response.data.messages.length
            }
    return tweets;
}
export const getTweets  = tag => async dispatch => {
    console.log("Action is dispatched");
    dispatch(requestTweets());
    const tweets = await getTweetsFromApi(tag);
    dispatch(retrieveTweets(tweets));
}

export const updateTweets = tag => async dispatch => {
    const newTweets = await getTweetsFromApi(tag);
    console.log("Update tweets")
    console.log(newTweets);
    dispatch(requestTweetsUpdate(newTweets));
}

export const deleteTweets = tweet => dispatch => {
    console.log(tweet);
    console.log("Action is dispatched");
    dispatch(deleteTweetsRequest(tweet));
}