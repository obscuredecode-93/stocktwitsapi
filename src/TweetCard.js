import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root:{

    },
    card: {
        display: 'flex',
        padding: theme.spacing(2),
        borderRadius: 16,
        width:'100%',
      },
      media: {
        minWidth: '25%',
        maxWidth: '25%',
        flexShrink: 0,
        backgroundColor: theme.palette.grey[200],
        borderRadius: 12,
        boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
    },
    content:{
        display: 'flex',
        flexDirection:'row',
        width:'100%',
    },
    userAvatar:{
        width: '69px',
        height: '69px',
        margin:'0 auto',
        [theme.breakpoints.down('sm')] :{
            width:'50px',
            height:'50px',
            margin:0,
        }
    },
    details:{
        backgroundColor: theme.palette.grey[100],
        borderRadius:'10%',
        padding: theme.spacing(3),
        overflowWrap:'break-word',
        
    }
}));

export default function TweetCard(props){
    const classes = useStyles();
    const {tweet} = props;
    return (
    <Card className={classes.card} elevation={0} key={tweet.id}> 
        <CardContent className={classes.content} >
            <Grid container direction="row">
                <Grid item xs={12} sm={2}>
                    <Avatar alt={tweet.user.name} src={tweet.user.avatar_url} className={classes.userAvatar} />
                </Grid>
                <Grid item xs={10}>
                    <Grid container direction="column">
                        <Grid item xs={12} sm={8} >
                        <Typography variant="subtitle2" component="span">
                            {tweet.user.name}</Typography> {`@${tweet.user.username}. Posted ${new Date(tweet.created_at).getMonth() + "," + new Date(tweet.created_at).getFullYear()}`}
                        <Typography variant="subtitle2"></Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Typography variant="body2" className={classes.details} >{ tweet.body }</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    );

}