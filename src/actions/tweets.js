import {
    RETRIEVE_TWEETS_REQUEST,
    RETRIEVE_TWEETS_SUCCESS,
    RETRIEVE_TWEETS_FAILURE,
    DELETE_TWEET_REQUEST,
    UPDATE_TWEET_REQUEST,
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


const deleteTweetsRequest = (tweet) => {
    return{
        type:DELETE_TWEET_REQUEST,
        tweet,
    }
}


const requestTweetsUpdate =(tweet) => {
    return{
        type:UPDATE_TWEET_REQUEST,
        tweet,
    }
}

export const requestTweetsError = (errorType) => {
    return{
        type:RETRIEVE_TWEETS_FAILURE,
        errorType,
    }
}

const getTweetsFromApi = async tag  => {
    try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.stocktwits.com/api/2/streams/symbol/${tag}.json`)
        const tweets = { 
            tweetId: response.data.symbol.id,
            tweetSymbol: response.data.symbol.symbol, 
            tweetTitle: response.data.symbol.title, 
            tweetContent : response.data.messages, 
            tweetLength: response.data.messages.length
            }
        return tweets;
    } catch(e) {
        return ['error',e];
    }
}

export const setTitleError = () => async dispatch => {
    dispatch(requestTweetsError('duplicate'))
}

export const getTweets  = tag => async dispatch => {
    console.log("Action is dispatched");
    dispatch(requestTweets());
    const tweets = await getTweetsFromApi(tag);
    console.log(tweets);
    if(tweets[0] === 'error')
        dispatch(requestTweetsError('error'));
    else
        dispatch(retrieveTweets(tweets));
}

export const updateTweets = tag => async dispatch => {
    const newTweets = await getTweetsFromApi(tag);
    console.log("Update tweets")
    console.log(newTweets);
    dispatch(requestTweetsUpdate(newTweets));
}

export const deleteTweets = tweet => dispatch => {
    console.log("Action is dispatched");
    console.log(tweet);
    dispatch(deleteTweetsRequest(tweet));
}