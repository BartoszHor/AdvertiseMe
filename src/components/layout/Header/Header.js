import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Cookies from 'universal-cookie';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  login: {
    position: 'relative',
    color: 'white',
    textDecoration: 'none'
  },
  appBar: {
    background: '#282dd7',
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

const Component = ({className, children}) => {
    const cookies = new Cookies();
    let token = cookies.get('userName');
    const classes = useStyles();


    return (
      <div className={clsx(className, classes.root)}>
        <AppBar className={classes.appBar} position="static">
          <Container maxWidth='xl'>
            <Toolbar className={classes.toolBar} >
              <IconButton component={NavLink} to={`${process.env.PUBLIC_URL}/`} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <HomeIcon />
              </IconButton>
              <div>
                {!token ? (<a href={`http://localhost:8000/auth/google`} className={classes.login}>Login</a>):
                (
                <>
                  <a href='http://localhost:8000/api/logout' className={classes.login}>Logout</a>
                </>
                )}
              </div>
          </Toolbar>
          {children}
          </Container>
        </AppBar>
      </div>
    )
  }


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};


// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
