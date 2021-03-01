import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { getAll, fetchPublishedPosts } from '../../../redux/postsRedux'
import { getLoggedUser, fetchUser } from '../../../redux/userRedux'

import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import jwt_decode from 'jwt-decode';

import styles from './Posts.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Cookies from 'universal-cookie';


const useStyles = makeStyles({
  root: {
    width: 250,
    margin: 30,
    padding: 10,
  },
  media: {
    height: 120,
  },

  grid: { 
    display: "flex",
    justifyContent: "center",
    marginTop: 40,
    flexWrap: 'wrap'
  },

  addButtonWrapper: { 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  addButton: { 
    width: 60,
    height: 60
  }
});

const Component = ({className, children, fetchPosts, posts, fetchUser, user}) => {
  const classes = useStyles();
  const cookies = new Cookies();
  let codedToken = cookies.get('userName');
  let token = codedToken ? jwt_decode(codedToken) : ''

  useEffect(()=> {
    fetchPosts()
    fetchUser()
  }, [])
 
  return (
    <Grid className={classes.grid}>
      {token && <Card className={clsx(classes.root, classes.addButtonWrapper)}>
        <Button component={Link} to={{pathname: `${process.env.PUBLIC_URL}/post/add`, state: user ? user : ''}}><AddCircleOutlineIcon className={classes.addButton}/></Button>
      </Card>}
      {posts.length && posts.map((post)=> {
        return (
     <Card key={post._id} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={post.photo}
          title={post.title}
        />
        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button component={Link} to={{pathname: `${process.env.PUBLIC_URL}/post/${post._id}`, state: post}} size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>)
      })}
      {children}
    </Grid>
  );
}


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getLoggedUser(state)
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPublishedPosts()),
  fetchUser: () => dispatch(fetchUser())
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Posts,
  Container as Posts,
  Component as PostsComponent,
};
