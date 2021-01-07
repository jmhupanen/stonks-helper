import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../context/auth/AuthState';
//import AlertContext from '../../context/alert/alertContext';
import { Button, TextField, Typography, Link, Grid } from '@material-ui/core'

const Login = () => {
  //const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  //const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/tradelog');
    }

    if (error === 'Invalid Credentials') {
      //setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      //setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid container justify="center">
          <Typography variant="h4" gutterBottom>Log in</Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid item xs={12}>
            <TextField 
              id="outlined-basic" 
              type="email" 
              name="email" 
              label="Email" 
              variant="outlined" 
              value={email} 
              onChange={onChange} 
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              id="outlined-password-input" 
              type="password"
              name="password" 
              label="Password" 
              variant="outlined" 
              value={password} 
              onChange={onChange} 
              margin="normal"
            />
          </Grid>
          <Grid container justify="center">
           <Typography variant="body1" gutterBottom>
             <Link href="/register">
              Create account
             </Link>
           </Typography>
          </Grid>
          <br />
          <Grid container justify="center">
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default Login;