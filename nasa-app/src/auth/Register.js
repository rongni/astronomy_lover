import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import Font from 'react-font'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  textcolor: {
    color: "#5e35b1"
  },

}));
const Register = ({ register, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log("here")
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    alert('Register successfully');
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
      <Fragment>
        <Font family='Zen Dots'>
          <h1 className={classes.textcolor}>SIGN UP</h1>
          <p className={classes.textcolor}>
            <i className="fas fa-user" /> Create Your Account
          </p >
        </Font>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
              minLength="6"
            />
          </div>
          <Font family='Zen Dots'>
            <input type="submit" className={classes.textcolor} value="Register" />
          </Font>
        </form>
        <p className={classes.textcolor}>
          Already have an account? <Link to="/login">
            <Font family='Zen Dots'>
              <h5 className={classes.textcolor}>SIGN IN</h5>
            </Font>
          </Link>
        </p >
      </Fragment>
    </div >
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);