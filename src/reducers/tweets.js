import {
    RETRIEVE_TWEETS_REQUEST,
    RETRIEVE_TWEETS_SUCCESS,
    RETRIEVE_TWEETS_FAILURE,
    DELETE_TWEET_REQUEST,
    UPDATE_TWEET_REQUEST
} from '../actions/types';

export default ( state ={
    tweetsRetrieved:false,
    tweets:[],
},action) => {
    switch(action.type){
        case RETRIEVE_TWEETS_REQUEST:
            return {
                ...state,
                tweetsRetrieved:false,
            }
        case RETRIEVE_TWEETS_SUCCESS:
            return{
                ...state,
                tweets:[...state.tweets,action.tweets],
            }
        case DELETE_TWEET_REQUEST:
            return {
                ...state,
                tweets: state.tweets.filter(tweet => tweet.tweetId !== action.tweet.tweetId)
            }
        case UPDATE_TWEET_REQUEST:
            return {
                ...state,
                tweets: state.tweets.map( tweet =>  tweet.tweetId === action.tweet.tweetId? action.tweet: tweet)
            }
        default:
            return state; 
    }
}