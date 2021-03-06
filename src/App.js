import withRoot from './withRoot';
import { connect } from 'react-redux';
import React, { useState, useEffect } from "react";
import SearchIcon from '@material-ui/icons/Search';
import {Container,InputBase,Typography, Divider, Chip, LinearProgress,Snackbar} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { getTweets,deleteTweets,updateTweets, requestTweetsError } from './actions';
import TweetCard from './TweetCard';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width:'57%',
      margin: '0 auto',
      display:'flex',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      flex:2,
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    tabs:{
      display:'flex',
      flexDirection:'row',
      listStyle:'none',
    },
    tweetList:{
      paddingTop:theme.spacing(2),
    }
  }));
const App = (props) => {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const [updateTweetsFlag,setUpdateTweetsFlag] = useState(false);
    const {tweets, getTweets,deleteTweets, updateTweets,tweetsLoading,errorType} = props;
    
  //Checking for Updates logic  
    useEffect(() => {
        let updateInterval = setInterval(setUpdateTweetsFlag,10000)
        return function cleanup(){
         clearInterval(updateInterval);
        };
      },[updateTweetsFlag])
    if(updateTweetsFlag) {
      tweets.forEach((tweet) => updateTweets(tweet.tweetId))
      setUpdateTweetsFlag(false)
    }
    
    const handleDelete = (tweet) => () => {
      deleteTweets(tweet);
    }
    
    useEffect(() => {
      if(errorType !== ""){
        setOpen(true);
        setErrorMessage(errorType==="duplicate"? "No duplicate entries are allowed": "Something went wrong");
      }
    },[errorType])

    const handleClose = () => {
      setOpen(false);
    };
    const renderTags = () => {
      if(tweets.length !== 0){
        return tweets.map(tweet => {
          return(<li key={tweet.tweetId}>
            <Chip
              label={tweet.tweetSymbol + "|" + tweet.tweetLength}
              onDelete={handleDelete(tweet)}
              className={classes.chip}
            />
          </li>);
        })
      }
    }

    const onKeyPress = (event) => {
        if(event.key === "Enter"){
            event.target.value.split(",").map((tagElement) => {
              const doesExist = tweets.find(elem => elem.tweetSymbol === tagElement);
              if(tweets.length !== 0 && doesExist)
              return requestTweetsError('duplicate');
            else
              return getTweets(tagElement);
            });
            event.target.value="";
        }
        return;
    }

    const renderTweets = () => {
      return tweets.length?tweets.map((tweet) => {
        return tweet.tweetContent.map(tweetContent => 
          <li key={tweetContent.id} className={classes.tabs}>
            <TweetCard tweet={tweetContent} /></li>
            )}) :
            <Typography variant="caption"> No tweets here yet</Typography>
    }
    return(
        <Container>
           <Snackbar
            open={open}
            anchorOrigin={{ vertical:'top', horizontal: 'center' }}
            onClose={handleClose}
            message={ errorMessage }
        />
        <Typography variant="h5">Welcome to StockTwits API!</Typography>
        <div className={classes.search}> 
            <InputBase
              placeholder="Enter Symbol here and press enter..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={onKeyPress}
              endAdornment= {<div className={classes.searchIcon}>
              <SearchIcon />
            </div> }
            />
          </div>
          <Divider />
         { tweetsLoading ?<LinearProgress variant="query" />:(
           <React.Fragment>
             <ul className={classes.tabs}>{renderTags()}</ul>
             <ul className={classes.tweetList}>{renderTweets()}</ul>
           </React.Fragment>
         )}
    </Container>
    );
}
const mapStateToProps = (state) => {
    return {
        tweets: state.tweets.tweets,
        tweetsLoading: state.tweets.tweetsLoading,
        errorType:state.tweets.errorType
    }
}

export default connect(mapStateToProps,{getTweets,deleteTweets, updateTweets})(withRoot(App));