import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase/app';
import 'firebase/auth';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  avatar: {
    margin: 10,
    backgroundColor: 'white'
  }
});

const Header = () => {
  const [state, setState] = useState({
    isLogin: false,
    username: '',
    profilePicUrl: ''
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setState({
          isLogin: true,
          username: user.displayName,
          profilePicUrl: user.photoURL
        });
      } else {
        setState({
          isLogin: false,
          username: '',
          profilePicUrl: ''
        });
      }
    });
  });
  const googleLogin = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }, []);

  const googleSignOut = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  const renderLoginComponent = useMemo(() => {
    console.log();
    return (
      <Button color="inherit" onClick={googleLogin}>
        Login with Google
      </Button>
    );
  }, [googleLogin]);

  const renderLoginedComponent = useMemo(() => {
    return (
      <div>
        <Button color="inherit">
          <Avatar alt="profile image" src={`${state.profilePicUrl}`} />
          {this.state.avatar}
        </Button>
        <Button color="inherit" onClick={googleSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }, [googleSignOut, state.profilePicUrl]);
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Firebase Videos
          </Typography>
          {state.isLogin
            ? // <renderLoginedComponent classes={classes} />
              renderLoginedComponent()
            : // <renderLoginComponent classes={classes} />
              renderLoginComponent()}
          <Button color="inherit" onClick={googleLogin}></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

//useMemoは値の保存
//useCallbackは関数の保存
