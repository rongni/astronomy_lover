import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Font from 'react-font'


const useStyles = makeStyles(theme => ({
  text: {
    paddingTop: 20,
    color: '#5e35b1'
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className="home" style={{
      backgroundImage: "url(/optin2.jpg)", backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }} >
      <Font family='Zen Dots'>
        <h1 align="center" className={classes.text}>Welcome on board</h1>
        <br />
        <br />
      </Font>
    </div>
  );
}