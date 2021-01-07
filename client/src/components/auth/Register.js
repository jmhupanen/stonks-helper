import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//import AlertContext from '../../context/alert/alertContext';
import { AuthContext } from '../../context/auth/AuthState';
import { Button, TextField, Typography, Link, Grid } from '@material-ui/core'

const Register = () => {
  //const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  //const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/tradelog');
    }

    if (error === 'User already exists') {
      //setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      //setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      //setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid container justify="center">
          <Typography variant="h4" gutterBottom>Register</Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid container justify="center">
            <TextField 
              id="outlined-basic" 
              name="name" 
              label="Name" 
              variant="outlined" 
              value={name} 
              onChange={onChange} 
              margin="normal"
              fullWidth="true"
            />
          </Grid>
          <Grid container justify="center">
            <TextField 
              id="outlined-basic" 
              type="email" 
              name="email" 
              label="Email" 
              variant="outlined" 
              value={email} 
              onChange={onChange} 
              margin="normal"
              fullWidth="true"
            />
          </Grid>
          <Grid container justify="center">
            <TextField 
              id="outlined-password-input" 
              type="password"
              name="password" 
              label="Password" 
              variant="outlined" 
              value={password} 
              onChange={onChange} 
              minLength='4'
              margin="normal"
              fullWidth="true"
            />
          </Grid>
          <Grid container justify="center">
            <TextField 
              id="outlined-password-input" 
              type="password"
              name="password2" 
              label="Confirm Password" 
              variant="outlined" 
              value={password2} 
              onChange={onChange} 
              minLength='4'
              margin="normal"
              fullWidth="true"
            />
          </Grid>
          <Grid container justify="center">
          <Typography variant="body1" gutterBottom>
            Already have an account? &nbsp;
            <Link href="/login">
              Log in
            </Link>
          </Typography>
          </Grid>
          <br />
          <Grid container justify="center">
            <Button variant="contained" color="primary" type="submit">
              Sign up
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default Register;