import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import {addNewAdvertToDatabase, getPostsLoadingState} from '../../../redux/postsRedux';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: { 
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  addButton: { 
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(110%, -50%)"
  },
  button: { 
    height: 100,
    width: 100
  },
  btnProgress: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));



const Component = ({className, children, postAdd, postLoading}) => {
  const history = useHistory()
  const user = history.location.state
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [name, setName] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [newAdvert, setNewAdvert] = React.useState({});
  const dateComponentPad = (value) => {
    let format = String(value);
  
    return format.length < 2 ? '0' + format : format;
  }
  
  const formatDate = (date) => {
    var datePart = [ date.getFullYear(), date.getMonth() + 1, date.getDate() ].map(dateComponentPad);
    var timePart = [ date.getHours(), date.getMinutes(), date.getSeconds() ].map(dateComponentPad);
  
    return datePart.join('-') + ' ' + timePart.join(':');
  }
  
  const createNewAdvert = () => {
    if(email.includes('@') && name.length > 0 && title.length >= 10 && text.length >= 20 && price.length > 0 && phone.length > 0 && location.length > 0 && email.length ) {
      setNewAdvert({
        updated: "not yet",
        author: name,
        title: title,
        text: text,
        price: parseInt(price),
        phone: phone,
        location: location,
        email: email,
        created: formatDate(new Date()),
        status: "published",
        photo: "https://images.pexels.com/photos/5926239/pexels-photo-5926239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        description: "description",
        userId: user[0]._id
      })
      setName('')
      setTitle('')
      setText('')
      setPrice('')
      setPhone('')
      setLocation('')
      setEmail('')
    } else {
      alert('Fill in fields with proper data formats')
    }
  }
  
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  React.useEffect(() => {
    postAdd(newAdvert)
  }, [newAdvert]);

  const handleButtonClick = () => {
    if(email.includes('@') && name.length > 0 && title.length >= 10 && text.length >= 20 && price.length > 0 && phone.length > 0 && location.length > 0 && email.length ) {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 1000);
      }
    }
  };

  const handleAddName = (event) => {
    setName(event.target.value);
  };

  const handleAddTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleAddText = (event) => {
    setText(event.target.value);
  };

  const handleAddPrice = (event) => {
    setPrice(event.target.value);
  };

  const handleAddPhone = (event) => {
    setPhone(event.target.value);
  };

  const handleAddLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleAddEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Button onClick={createNewAdvert} className={classes.addButton}>
      <div className={classes.btnProgress}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      </div>
      </Button>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Name</InputLabel>
          <BootstrapInput value={name} type="text" onChange={(e) => handleAddName(e)}/>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Title (10 to 25 chars)</InputLabel>
          <BootstrapInput value={title} type="text" onChange={(e) => handleAddTitle(e)} />
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Text (20 to 50 chars)</InputLabel>
          <BootstrapInput value={text} type="text" onChange={(e) => handleAddText(e)}/>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Price</InputLabel>
          <BootstrapInput value={price} type="number" onChange={(e) => handleAddPrice(e)}/>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Phone</InputLabel>
          <BootstrapInput value={phone} type="text" onChange={(e) => handleAddPhone(e)}/>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Location</InputLabel>
          <BootstrapInput value={location} type="text" onChange={(e) => handleAddLocation(e)}/>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">E-mail</InputLabel>
          <BootstrapInput value={email} type="email" onChange={(e) => handleAddEmail(e)}/>
        </FormControl>
      </div>
    </div>
  );  
}
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  postLoading: getPostsLoadingState(state),
});

const mapDispatchToProps = dispatch => ({
  postAdd: newAdvert => dispatch(addNewAdvertToDatabase(newAdvert)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
