import React,{ useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root:{

    },
    card: {
        display: 'flex',
        padding: theme.spacing(2),
        borderRadius: 16,
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

    }
}));

export default function TweetCard(props){
    const classes = useStyles();
    const {tweet} = props;
    return (
    <Card className={classes.card} elevation={0} key={tweet.id}> 
        <CardContent className={classes.content} >
            <Grid container direction="row" justify="space-between">
                <Grid item xs={3}>
                    <Avatar alt={tweet.user.name} src={tweet.user.avatar_url} />
                </Grid>
                <Grid item xs={9}>
                    <Grid container direction="column">
                        <Grid item xs={4} >
                        <Typography variant="subtitle2" component="span">
                            {tweet.user.name}</Typography> @ {tweet.user.username}.Posted {new Date(tweet.created_at).getMonth() + " " + new Date(tweet.created_at).getFullYear()}
                        <Typography variant="subtitle2"></Typography>
                        </Grid>
                        <Grid item xs={8} >
                            <Typography variant="body1" >{ tweet.body }</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    );

}