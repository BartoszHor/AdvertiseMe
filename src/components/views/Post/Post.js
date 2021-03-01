import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { getLoggedUser } from '../../../redux/userRedux'
import { connect } from 'react-redux';

import styles from './Post.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
  },
  grid: { 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const Component = ({className, children, user}) => {
  const history = useHistory()
  const post = [history.location.state]
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid className={classes.grid}>
      {post.map((post) => {
       return(<Card key={post._id} className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post.author.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={`Created ${post.created.substring(0,10)} Updated ${post.updated.substring(0,10)} `}
        />
        <CardMedia
          className={classes.media}
          image={post.photo}
          title={post.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: {post.price}$
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {((user && user[0] && user[0].emails == post.email) || []) && <IconButton aria-label="add to favorites">
           <Link to={{pathname:`${process.env.PUBLIC_URL}/post/${post._id}/edit`, state: post}}> <EditIcon /> </Link>
          </IconButton>}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography> {post.description.charAt(0).toUpperCase() + post.description.slice(1)} </Typography>
          </CardContent>
        </Collapse>
      </Card>)
      })}
    </Grid>
  );
} 

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  user: getLoggedUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
