import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import Font from 'react-font'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  textcolor: {
    color: "#5e35b1"
  },

}));
const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    alert('Login successfully')
    return <Redirect to="/" />;
  }

  return (

    <div align='center' style={{
      backgroundImage: "url(/bg.jpg)", backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>

      <Fragment >
        <Font family='Zen Dots'>
          <h1 className={classes.textcolor}>SIGN IN</h1>
          <p className={classes.textcolor}>
            <i className="fas fa-user" /> Sign Into Your Account
      </p>
        </Font>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
            />
          </div>
          <Font family='Zen Dots'>
            <input type="submit" className={classes.textcolor} value="Login" />
          </Font>
        </form>
        <p className={classes.textcolor}>
          Don't have an account? <Link to="/register">
            <Font family='Zen Dots'>
              <h5 className={classes.textcolor}>SIGN UP</h5>
            </Font>
          </Link>
        </p>

      </Fragment>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);