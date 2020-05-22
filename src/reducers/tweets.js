import {
    RETRIEVE_TWEETS_REQUEST,
    RETRIEVE_TWEETS_SUCCESS,
    RETRIEVE_TWEETS_FAILURE,
    DELETE_TWEET_REQUEST,
    UPDATE_TWEET_REQUEST
} from '../actions/types';

export default ( state ={
    tweets:[],
    tweetsLoading: false,
    errorType:'',
},action) => {
    switch(action.type){
        case RETRIEVE_TWEETS_REQUEST:
            return {
                ...state,
                tweetsLoading:true,
            }
        case RETRIEVE_TWEETS_SUCCESS:
            return{
                ...state,
                tweets:[...state.tweets,action.tweets],
                tweetsLoading:false,
            }
        case RETRIEVE_TWEETS_FAILURE:
            return {
                ...state,
                tweetsLoading:false,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                errorType:action.errorType === 'duplicate' ? 'duplicate': 'error'
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